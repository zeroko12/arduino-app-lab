package app

// Cross-agent preferences (which agent is the default for new sessions), persisted in the app-data root so they survive a per-agent runtime uninstall.

import (
	"encoding/json"
	"os"
	"path/filepath"

	"app-lab-desktop/internal/airuntime"
)

const aiSettingsFile = "ai-settings.json"

type OpenAIAgentConfig struct {
	BaseURL string `json:"baseUrl"`
	APIKey  string `json:"apiKey"`
	Model   string `json:"model"`
}

type aiSettings struct {
	DefaultAgent  string                       `json:"defaultAgent,omitempty"`
	OpenAIConfigs map[string]OpenAIAgentConfig `json:"openAiConfigs,omitempty"`
}

func aiSettingsPath() (string, error) {
	dir, err := airuntime.AppDataDir()
	if err != nil {
		return "", err
	}
	return filepath.Join(dir, aiSettingsFile), nil
}

func readAISettings() aiSettings {
	path, err := aiSettingsPath()
	if err != nil {
		return aiSettings{}
	}
	data, err := os.ReadFile(path)
	if err != nil {
		return aiSettings{}
	}
	var s aiSettings
	if json.Unmarshal(data, &s) != nil {
		return aiSettings{}
	}
	if s.OpenAIConfigs == nil {
		s.OpenAIConfigs = make(map[string]OpenAIAgentConfig)
	}
	return s
}

func writeAISettings(s aiSettings) error {
	path, err := aiSettingsPath()
	if err != nil {
		return err
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return err
	}
	data, err := json.MarshalIndent(s, "", "  ")
	if err != nil {
		return err
	}
	tmp := path + ".tmp"
	if err := os.WriteFile(tmp, data, 0o600); err != nil {
		return err
	}
	return os.Rename(tmp, path)
}

// readOpenAIConfig returns the persisted config for an OpenAI-compatible agent with smart defaults.
func readOpenAIConfig(agentID string) OpenAIAgentConfig {
	s := readAISettings()
	cfg, ok := s.OpenAIConfigs[agentID]
	if !ok {
		cfg = OpenAIAgentConfig{}
	}

	// Apply defaults
	switch agentID {
	case string(airuntime.AgentMiniMax):
		if cfg.BaseURL == "" {
			if ob := os.Getenv("MINIMAX_BASE_URL"); ob != "" {
				cfg.BaseURL = ob
			} else {
				cfg.BaseURL = "https://api.minimax.chat/v1"
			}
		}
		if cfg.Model == "" {
			if om := os.Getenv("MINIMAX_MODEL"); om != "" {
				cfg.Model = om
			} else {
				cfg.Model = "minimax-m3"
			}
		}
		if cfg.APIKey == "" {
			cfg.APIKey = os.Getenv("MINIMAX_API_KEY")
		}
	case string(airuntime.AgentOpenAI):
		if cfg.BaseURL == "" {
			if ob := os.Getenv("OPENAI_BASE_URL"); ob != "" {
				cfg.BaseURL = ob
			} else {
				cfg.BaseURL = "https://api.openai.com/v1"
			}
		}
		if cfg.Model == "" {
			if om := os.Getenv("OPENAI_MODEL"); om != "" {
				cfg.Model = om
			} else {
				cfg.Model = "gpt-4o"
			}
		}
		if cfg.APIKey == "" {
			cfg.APIKey = os.Getenv("OPENAI_API_KEY")
		}
	default:
		if cfg.BaseURL == "" {
			cfg.BaseURL = "https://api.openai.com/v1"
		}
		if cfg.Model == "" {
			cfg.Model = "gpt-4o"
		}
	}

	return cfg
}

// writeOpenAIConfig persists the OpenAI agent configuration.
func writeOpenAIConfig(agentID string, cfg OpenAIAgentConfig) error {
	s := readAISettings()
	if s.OpenAIConfigs == nil {
		s.OpenAIConfigs = make(map[string]OpenAIAgentConfig)
	}
	s.OpenAIConfigs[agentID] = cfg
	return writeAISettings(s)
}

// readDefaultAgent returns the persisted default agent id (empty if unset or unreadable).
func readDefaultAgent() string {
	s := readAISettings()
	return s.DefaultAgent
}

// writeDefaultAgent persists the default agent id atomically (temp file + rename).
func writeDefaultAgent(id string) error {
	s := readAISettings()
	s.DefaultAgent = id
	return writeAISettings(s)
}

