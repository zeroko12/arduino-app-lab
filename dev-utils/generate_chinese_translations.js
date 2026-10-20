import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enPath = path.resolve(__dirname, '../app/core-ui/lang/en.json');
const zhOut1 = path.resolve(__dirname, '../app/core-ui/src/common/providers/i18n/locales/zh-cn.json');
const zhOut2 = path.resolve(__dirname, '../app/core-ui/lang/zh-cn.json');

const raw = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// High-frequency curated glossary for IDE terms
const GLOSSARY = {
  'Verify': '验证',
  'Upload': '上传',
  'Verifying...': '正在验证...',
  'Uploading...': '正在上传...',
  'Cancel': '取消',
  'Save': '保存',
  'Saving...': '正在保存...',
  'Saved': '已保存',
  'Success': '成功',
  'Close': '关闭',
  'Clear': '清除',
  'Delete': '删除',
  'Rename': '重命名',
  'Download': '下载',
  'Search': '搜索',
  'Settings': '设置',
  'Appearance': '外观',
  'Theme': '主题',
  'Light': '浅色',
  'Dark': '深色',
  'Auto': '自动',
  'Coming Soon': '即将推出',
  'Device': '设备',
  'Sketch': '代码',
  'Examples': '示例',
  'Libraries': '库',
  'Reference': '语言参考',
  'Serial Monitor': '串口监视器',
  'Select device': '选择设备',
  'Connect': '连接',
  'Disconnect': '断开连接',
  'Reconnect': '重新连接',
  'Install': '安装',
  'Installing…': '正在安装…',
  'Preview': '预览版',
  'Sign in': '登录',
  'API Key': 'API 密钥',
  'Font size': '字号',
  'Autosave': '自动保存',
  'Enable autosave': '启用自动保存',
  'Select all': '全选',
  'Next': '下一步',
  'Back': '上一步',
  'Done': '完成',
  'Copy': '复制',
  'Paste': '粘贴',
  'Cut': '剪切',
  'Undo': '撤销',
  'Redo': '重做',
  'Find': '查找',
  'Replace': '替换',
  'Help': '帮助',
};

// Common prefixes / rules
function translateText(key, text) {
  if (!text) return text;
  const trimmed = text.trim();
  if (GLOSSARY[trimmed]) return text.replace(trimmed, GLOSSARY[trimmed]);

  // Contextual pattern translations
  if (key.startsWith('toolbar.')) {
    if (trimmed === 'Verify') return '验证';
    if (trimmed === 'Upload') return '上传';
    if (trimmed === 'Select device') return '选择设备';
    if (trimmed === 'Pending...') return '等待中...';
    if (trimmed === 'Creating...') return '创建中...';
    if (trimmed === 'Verifying...') return '正在验证...';
    if (trimmed === 'Uploading...') return '正在上传...';
    if (trimmed === 'Save') return '保存';
    if (trimmed === 'Saving...') return '正在保存...';
    if (trimmed === 'Share') return '分享';
  }

  if (key.startsWith('serialMonitor.')) {
    if (trimmed.includes('baud')) return trimmed.replace(/baud/i, '波特率');
    if (trimmed.includes('Clear')) return '清除输出';
    if (trimmed.includes('Autoscroll') || trimmed.includes('Auto scroll')) return '自动滚动';
    if (trimmed.includes('Timestamp')) return '时间戳';
    if (trimmed.includes('Send')) return '发送';
  }

  if (key.startsWith('settings.')) {
    if (trimmed === 'Theme') return '主题';
    if (trimmed === 'Light') return '浅色模式';
    if (trimmed === 'Dark') return '深色模式';
    if (trimmed === 'Auto') return '自动跟随系统';
    if (trimmed === 'Font size') return '字号大小';
    if (trimmed === 'RESTORE Settings to Default') return '恢复默认设置';
    if (trimmed === 'Appearance') return '外观';
    if (trimmed === 'Sketch') return '代码';
    if (trimmed === 'Device') return '设备';
    if (trimmed === 'Verify & upload') return '验证与上传';
  }

  if (key.startsWith('aiAssistant.') || key.startsWith('genai.')) {
    if (trimmed === 'Connect') return '连接';
    if (trimmed === 'Install') return '安装';
    if (trimmed === 'Installing…') return '正在安装…';
    if (trimmed === 'Coming soon') return '即将推出';
    if (trimmed === 'Preview') return '预览版';
    if (trimmed === 'Cancel') return '取消';
    if (trimmed === 'Sign in') return '账号登录';
    if (trimmed === 'API Key') return 'API 密钥';
    if (trimmed === 'Reconnect') return '重新连接';
    if (trimmed === 'New Chat' || trimmed === 'New chat') return '新建对话';
  }

  return null;
}

// Built-in translations dictionary mapping key to Chinese
const translations = {
  // Toolbar
  "toolbar.verify": "验证",
  "toolbar.pending": "等待中...",
  "toolbar.creating": "创建中...",
  "toolbar.pend": "等待...",
  "toolbar.verifying": "正在验证...",
  "toolbar.verifying-short": "验证...",
  "toolbar.upload": "上传",
  "toolbar.uploading": "正在上传...",
  "toolbar.associateDevice": "选择设备",
  "toolbar.deviceTooltip.notFound": "如果您的设备已接入，请尝试：",
  "toolbar.detachDevice": "断开设备",
  "toolbar.disconnectDevice": "断开连接",
  "toolbar.connectedDevice": "已连接设备",
  "toolbar.noDeviceSelected": "未选择设备",
  "toolbar.noDeviceFound": "未发现设备",
  "toolbar.searchingDevices": "正在搜索设备...",
  "toolbar.otherBoardAndPort": "选择其他开发板与端口...",
  "toolbar.serialMonitor": "打开串口监视器",
  "toolbar.save": "保存",
  "toolbar.saving": "正在保存...",
  "toolbar.saved": "已保存",
  "toolbar.saveFailed": "保存失败",
  "toolbar.shareSketch": "分享代码",

  // Sidenav
  "sidenav.sketch": "代码",
  "sidenav.files": "文件",
  "sidenav.examples": "示例",
  "sidenav.libraries": "库",
  "sidenav.reference": "语言参考",
  "sidenav.search": "搜索",
  "sidenav.settings": "设置",
  "sidenav.serialMonitor": "串口监视器",
  "sidenav.models": "AI 助手",
  "sidenav.genAi": "AI 助手",

  // Settings
  "settings.appearance": "外观",
  "settings.sketch": "代码",
  "settings.device": "设备",
  "settings.verifyAndUpload": "验证与上传",
  "settings.restoreSettings": "恢复所有默认设置",
  "settings.appearance.themeSection": "主题",
  "settings.appearance.themeSection.light": "浅色模式",
  "settings.appearance.themeSection.dark": "深色模式",
  "settings.appearance.themeSection.comingSoon": "即将推出",
  "settings.appearance.themeSection.auto": "自动跟随系统",
  "settings.appearance.themeSection.auto.description": " - 自动根据系统匹配深色或浅色主题",
  "settings.appearance.fontSizeSection": "编辑器字号",
  "settings.appearance.languageSection": "界面语言",
  "settings.appearance.language.english": "English",
  "settings.appearance.language.chinese": "简体中文 (Chinese)",
  "settings.sketch.savingSection": "代码保存",
  "settings.sketch.savingSection.enableAutoSave": "启用自动保存",
  "settings.sketch.savingSection.saveOnVerifyAndUpload": "在验证和上传前自动保存",
  "settings.device.deviceSelectionSection": "开发板识别",
  "settings.device.deviceSelectionSection.enableAutoSelection": "插入时自动识别并选择开发板",
  "settings.verifyAndUpload.consoleOutputSection": "控制台输出级别",
  "settings.verifyAndUpload.consoleOutputSection.concise": "精简输出",
  "settings.verifyAndUpload.consoleOutputSection.verbose": "详细输出",

  // Serial Monitor
  "serialMonitor.title": "串口监视器",
  "serialMonitor.connected": "已连接",
  "serialMonitor.disconnected": "已断开",
  "serialMonitor.clearOutput": "清除输出",
  "serialMonitor.autoScroll": "自动滚动",
  "serialMonitor.timestamp": "时间戳",
  "serialMonitor.send": "发送",
  "serialMonitor.inputPlaceholder": "输入要发送给开发板的消息...",
  "serialMonitor.baudrate": "波特率",
  "serialMonitor.lineEnding": "换行选项",
  "serialMonitor.noLineEnding": "无换行",
  "serialMonitor.newline": "换行符 (NL)",
  "serialMonitor.carriageReturn": "回车符 (CR)",
  "serialMonitor.bothNLCR": "回车换行 (NL & CR)",

  // AI Assistant
  "aiAssistant.panel.resuming": "正在启动 AI 助手…",
  "aiAssistant.panel.boardChanged.title": "AI 助手已重新启动",
  "aiAssistant.panel.boardChanged.body": "检测到您切换了开发板。对话历史已保存，点击重新连接即可在新板卡环境下继续。",
  "aiAssistant.panel.agentStopped.title": "AI Agent 异常停止",
  "aiAssistant.panel.agentStopped.body": "Agent 遇到了异常终止。您的历史对话已保存，请点击下方按钮重新连接。",
  "aiAssistant.panel.agentStopped.reconnect": "重新连接",
  "aiAssistant.connect.title": "连接 AI 助手开启智能编程",
  "aiAssistant.connect.subtitle": "支持 MiniMax-M3、OpenAI 兼容接口及 Claude Code 智能辅助开发。",
  "aiAssistant.connect.sessionExpired": "登录认证已失效，请重新输入密钥或登录。",
  "aiAssistant.connect.connect": "连接",
  "aiAssistant.connect.install": "安装",
  "aiAssistant.connect.comingSoon": "即将推出",
  "aiAssistant.connect.preview": "预览版",
  "aiAssistant.connect.installing": "正在安装依赖…",
  "aiAssistant.connect.cancel": "取消",
  "aiAssistant.connect.tab.signIn": "账号登录",
  "aiAssistant.connect.tab.apiKey": "API 密钥",
  "aiAssistant.connect.signInWith": "选择登录方式",
  "aiAssistant.connect.apiKeyLabel": "API 密钥 (API Key)",
  "aiAssistant.connect.apiKeyInputPlaceholder": "输入您的 API 密钥 (如 sk-... 或 MiniMax API Key)",
  "aiAssistant.connect.baseUrlLabel": "API 接口地址 (Base URL)",
  "aiAssistant.connect.baseUrlPlaceholder": "例如 https://api.minimax.chat/v1",
  "aiAssistant.connect.modelLabel": "模型名称 (Model)",
  "aiAssistant.connect.modelPlaceholder": "例如 minimax-m3, gpt-4o, deepseek-chat",
  "aiAssistant.chat.inputPlaceholder": "输入您的问题或硬件需求，按 Enter 发送...",
  "aiAssistant.chat.newChat": "新建对话",
  "aiAssistant.chat.stop": "停止生成",
  "aiAssistant.chat.clear": "清空记录",
  "aiAssistant.chat.thinking": "正在思考与分析代码...",
  "aiAssistant.chat.apply": "插入/应用到编辑器",

  // Files & Tabs
  "files.newFile": "新建文件",
  "files.newTab": "新建标签页",
  "files.rename": "重命名",
  "files.delete": "删除",
  "files.deleteConfirm": "确定要删除此文件吗？该操作无法恢复。",
  "files.download": "下载文件",
  "files.upload": "上传文件",
  "tabs.close": "关闭",
  "tabs.closeOthers": "关闭其他",
  "tabs.closeAll": "关闭全部"
};

// Generate full output dictionary
const out = {};
for (const [key, item] of Object.entries(raw)) {
  const defaultMsg = item.defaultMessage || '';
  if (translations[key]) {
    out[key] = translations[key];
  } else {
    const auto = translateText(key, defaultMsg);
    if (auto) {
      out[key] = auto;
    } else {
      out[key] = defaultMsg;
    }
  }
}

// Add all explicit translations
for (const [k, v] of Object.entries(translations)) {
  out[k] = v;
}

fs.mkdirSync(path.dirname(zhOut1), { recursive: true });
fs.writeFileSync(zhOut1, JSON.stringify(out, null, 2), 'utf8');
fs.mkdirSync(path.dirname(zhOut2), { recursive: true });
fs.writeFileSync(zhOut2, JSON.stringify(out, null, 2), 'utf8');

console.log(`Successfully generated ${Object.keys(out).length} Chinese translations!`);
