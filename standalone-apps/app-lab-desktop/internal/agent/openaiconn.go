package agent

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

// OpenAIConfig holds connection settings for OpenAI-compatible APIs (like MiniMax-M3).
type OpenAIConfig struct {
	BaseURL string
	APIKey  string
	Model   string
	AgentID string
}

type openAIMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type openAISession struct {
	ID        SessionID
	Title     string
	Cwd       string
	Model     string
	Messages  []openAIMessage
	UpdatedAt time.Time
	cancel    context.CancelFunc
}

type openAIConn struct {
	cfg       OpenAIConfig
	handler   ClientHandler
	boardName string
	mcp       []MCPServer

	mu       sync.Mutex
	sessions map[SessionID]*openAISession
	client   *http.Client
}

// NewOpenAIConn creates an in-process OpenAI/MiniMax compatible AgentConn.
func NewOpenAIConn(cfg OpenAIConfig, handler ClientHandler) AgentConn {
	if cfg.BaseURL == "" {
		if cfg.AgentID == "minimax" {
			cfg.BaseURL = "https://api.minimax.chat/v1"
		} else {
			cfg.BaseURL = "https://api.openai.com/v1"
		}
	}
	cfg.BaseURL = strings.TrimRight(cfg.BaseURL, "/")

	if cfg.Model == "" {
		if cfg.AgentID == "minimax" {
			cfg.Model = "minimax-m3"
		} else {
			cfg.Model = "gpt-4o"
		}
	}

	return &openAIConn{
		cfg:      cfg,
		handler:  handler,
		sessions: make(map[SessionID]*openAISession),
		client: &http.Client{
			Timeout: 120 * time.Second,
		},
	}
}

func (c *openAIConn) Initialize(_ context.Context) ([]AuthMethod, error) {
	return []AuthMethod{
		{
			ID:          "api_key",
			Name:        "API Key",
			Description: "Authenticate with your API Key",
		},
	}, nil
}

func (c *openAIConn) Authenticate(_ context.Context, _ string) error {
	return nil
}

func (c *openAIConn) advertisedModels() []AgentModel {
	if c.cfg.AgentID == "minimax" {
		return []AgentModel{
			{ID: "minimax-m3", Name: "MiniMax-M3", Description: "MiniMax 强大的全能代码与中文模型"},
			{ID: "abab6.5s-chat", Name: "MiniMax 6.5s", Description: "高速轻量模型"},
		}
	}
	return []AgentModel{
		{ID: c.cfg.Model, Name: c.cfg.Model, Description: "当前配置的默认大模型"},
		{ID: "minimax-m3", Name: "MiniMax-M3", Description: "MiniMax-M3 中文与硬件代码生成"},
		{ID: "gpt-4o", Name: "GPT-4o", Description: "OpenAI 旗舰全能模型"},
		{ID: "deepseek-chat", Name: "DeepSeek-V3", Description: "DeepSeek 通用推理大模型"},
	}
}

func (c *openAIConn) NewSession(_ context.Context, cwd string) (NewSessionResult, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	sid := SessionID(fmt.Sprintf("sess_%d", time.Now().UnixNano()))
	models := c.advertisedModels()
	currentModel := c.cfg.Model

	c.sessions[sid] = &openAISession{
		ID:        sid,
		Title:     "New Chat",
		Cwd:       cwd,
		Model:     currentModel,
		Messages:  make([]openAIMessage, 0),
		UpdatedAt: time.Now(),
	}

	return NewSessionResult{
		SessionID:      sid,
		Models:         models,
		CurrentModelID: currentModel,
		Modes: []AgentMode{
			{ID: "chat", Name: "Chat", Description: "标准交互与代码生成模式"},
		},
		CurrentModeID: "chat",
	}, nil
}

func (c *openAIConn) ListSessions(_ context.Context, _ string) ([]SessionSummary, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	out := make([]SessionSummary, 0, len(c.sessions))
	for _, s := range c.sessions {
		out = append(out, SessionSummary{
			ID:        string(s.ID),
			Title:     s.Title,
			UpdatedAt: s.UpdatedAt.Format(time.RFC3339),
		})
	}
	return out, nil
}

func (c *openAIConn) LoadSession(_ context.Context, sid SessionID, cwd string) (NewSessionResult, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	s, ok := c.sessions[sid]
	if !ok {
		s = &openAISession{
			ID:        sid,
			Title:     "Restored Chat",
			Cwd:       cwd,
			Model:     c.cfg.Model,
			Messages:  make([]openAIMessage, 0),
			UpdatedAt: time.Now(),
		}
		c.sessions[sid] = s
	}

	models := c.advertisedModels()
	return NewSessionResult{
		SessionID:      sid,
		Models:         models,
		CurrentModelID: s.Model,
		Modes: []AgentMode{
			{ID: "chat", Name: "Chat", Description: "标准交互与代码生成模式"},
		},
		CurrentModeID: "chat",
	}, nil
}

type chatStreamChunk struct {
	Choices []struct {
		Delta struct {
			Content          string `json:"content"`
			ReasoningContent string `json:"reasoning_content"`
		} `json:"delta"`
		FinishReason *string `json:"finish_reason"`
	} `json:"choices"`
}

func (c *openAIConn) Prompt(ctx context.Context, sid SessionID, text string) error {
	c.mu.Lock()
	sess, ok := c.sessions[sid]
	if !ok {
		sess = &openAISession{
			ID:        sid,
			Title:     text,
			Model:     c.cfg.Model,
			Messages:  make([]openAIMessage, 0),
			UpdatedAt: time.Now(),
		}
		c.sessions[sid] = sess
	}
	if len(sess.Messages) == 0 {
		runes := []rune(text)
		if len(runes) > 30 {
			sess.Title = string(runes[:30]) + "..."
		} else {
			sess.Title = text
		}
	}
	sess.Messages = append(sess.Messages, openAIMessage{Role: "user", Content: text})
	sess.UpdatedAt = time.Now()

	pctx, pcancel := context.WithCancel(ctx)
	sess.cancel = pcancel
	model := sess.Model
	if model == "" {
		model = c.cfg.Model
	}
	c.mu.Unlock()

	defer func() {
		c.mu.Lock()
		if sess.cancel != nil {
			sess.cancel = nil
		}
		c.mu.Unlock()
		pcancel()
	}()

	systemPrompt := "You are an intelligent Arduino and embedded hardware AI assistant inside Arduino App Lab.\n" +
		"You help developers build Arduino sketches (C++/C), MicroPython code, and connected IoT applications.\n" +
		"Provide clear, concise explanations with correct, well-structured and runnable code blocks.\n" +
		"Always answer in the same language as the user's prompt (default to Chinese when user writes Chinese)."
	if c.boardName != "" {
		systemPrompt += fmt.Sprintf("\nTarget Arduino Board: %s", c.boardName)
	}

	messages := make([]openAIMessage, 0, len(sess.Messages)+1)
	messages = append(messages, openAIMessage{Role: "system", Content: systemPrompt})
	messages = append(messages, sess.Messages...)

	reqBody := map[string]any{
		"model":       model,
		"messages":    messages,
		"stream":      true,
		"temperature": 0.7,
	}

	payloadBytes, err := json.Marshal(reqBody)
	if err != nil {
		return err
	}

	url := fmt.Sprintf("%s/chat/completions", c.cfg.BaseURL)
	req, err := http.NewRequestWithContext(pctx, http.MethodPost, url, bytes.NewReader(payloadBytes))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "text/event-stream")
	if c.cfg.APIKey != "" {
		req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.cfg.APIKey))
	}

	slog.Info("[openai] starting streaming prompt", "model", model, "url", url, "session", sid)

	resp, err := c.client.Do(req)
	if err != nil {
		return fmt.Errorf("call %s: %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("provider error (HTTP %d): %s", resp.StatusCode, string(body))
	}

	scanner := bufio.NewScanner(resp.Body)
	var fullResponse strings.Builder

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" || strings.HasPrefix(line, ":") {
			continue
		}
		if !strings.HasPrefix(line, "data:") {
			continue
		}

		data := strings.TrimSpace(strings.TrimPrefix(line, "data:"))
		if data == "[DONE]" {
			break
		}

		var chunk chatStreamChunk
		if err := json.Unmarshal([]byte(data), &chunk); err != nil {
			continue
		}

		if len(chunk.Choices) > 0 {
			delta := chunk.Choices[0].Delta
			if delta.ReasoningContent != "" {
				c.handler.HandleUpdate(sid, Update{
					Type:  "thinking",
					Delta: delta.ReasoningContent,
				})
			}
			if delta.Content != "" {
				fullResponse.WriteString(delta.Content)
				c.handler.HandleUpdate(sid, Update{
					Type:  "message_chunk",
					Delta: delta.Content,
				})
			}
		}
	}

	if err := scanner.Err(); err != nil && !errors.Is(err, context.Canceled) {
		return err
	}

	c.mu.Lock()
	sess.Messages = append(sess.Messages, openAIMessage{
		Role:    "assistant",
		Content: fullResponse.String(),
	})
	c.mu.Unlock()

	return nil
}

func (c *openAIConn) Cancel(_ context.Context, sid SessionID) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	if sess, ok := c.sessions[sid]; ok && sess.cancel != nil {
		sess.cancel()
	}
	return nil
}

func (c *openAIConn) CloseSession(_ context.Context, sid SessionID) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.sessions, sid)
	return nil
}

func (c *openAIConn) DeleteSession(_ context.Context, sid SessionID) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.sessions, sid)
	return nil
}

func (c *openAIConn) SetModel(_ context.Context, sid SessionID, modelID string) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	if sess, ok := c.sessions[sid]; ok {
		sess.Model = modelID
	}
	c.handler.HandleUpdate(sid, Update{
		Type:    "model_change",
		ModelID: modelID,
		Models:  c.advertisedModels(),
	})
	return nil
}

func (c *openAIConn) SetMode(_ context.Context, _ SessionID, _ string) error {
	return nil
}

func (c *openAIConn) SetMCPServers(servers []MCPServer) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.mcp = servers
}

func (c *openAIConn) SetBoardName(name string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.boardName = name
}

func (c *openAIConn) Close() error {
	c.mu.Lock()
	defer c.mu.Unlock()
	for _, s := range c.sessions {
		if s.cancel != nil {
			s.cancel()
		}
	}
	return nil
}
