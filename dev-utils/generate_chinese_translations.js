import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { coreUiTranslations } from './translations/coreUi.js';
import { appLabTranslations } from './translations/appLab.js';
import { dialogTranslations } from './translations/dialogs.js';
import { aiAndLspTranslations } from './translations/aiAndLsp.js';
import { exactUiKeysTranslations } from './translations/exactUiKeys.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enPath = path.resolve(__dirname, '../app/core-ui/lang/en.json');
const aiMessagesPath = path.resolve(__dirname, '../app/ai-assistant/src/messages.ts');
const zhOut1 = path.resolve(__dirname, '../app/core-ui/src/common/providers/i18n/locales/zh-cn.json');
const zhOut2 = path.resolve(__dirname, '../app/core-ui/lang/zh-cn.json');

const rawEn = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Extract AI messages
let aiContent = '';
try {
  aiContent = fs.readFileSync(aiMessagesPath, 'utf8');
} catch {
  // ignore
}
const aiRegex = /id:\s*'([^']+)',\s*defaultMessage:\s*'([^']+)'/g;
const rawAi = {};
let match;
while ((match = aiRegex.exec(aiContent)) !== null) {
  rawAi[match[1]] = match[2];
}

// Merge all specialized translation dictionaries
const masterTranslations = {
  ...coreUiTranslations,
  ...appLabTranslations,
  ...dialogTranslations,
  ...aiAndLspTranslations,
  ...exactUiKeysTranslations,
};

// Common word dictionary for any missing keys
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

function autoTranslate(text) {
  if (!text) return text;
  const trimmed = text.trim();
  if (GLOSSARY[trimmed]) return text.replace(trimmed, GLOSSARY[trimmed]);
  return text;
}

const out = {};

// 1. Process all keys in en.json
for (const [key, item] of Object.entries(rawEn)) {
  const defaultMsg = item.defaultMessage || '';
  if (masterTranslations[key]) {
    out[key] = masterTranslations[key];
  } else {
    out[key] = autoTranslate(defaultMsg);
  }
}

// 2. Process all keys from AI messages
for (const [key, defaultMsg] of Object.entries(rawAi)) {
  if (masterTranslations[key]) {
    out[key] = masterTranslations[key];
  } else if (!out[key]) {
    out[key] = autoTranslate(defaultMsg);
  }
}

// 3. Guarantee all master translations are included
for (const [key, val] of Object.entries(masterTranslations)) {
  out[key] = val;
}

// Verification stats
let chineseCount = 0;
let englishCount = 0;
const untranslatedList = [];

for (const [k, v] of Object.entries(out)) {
  if (/[\u4e00-\u9fa5]/.test(v)) {
    chineseCount++;
  } else {
    englishCount++;
    untranslatedList.push({ key: k, text: v });
  }
}

console.log(`----------------------------------------`);
console.log(`Total Keys in Chinese dictionary: ${Object.keys(out).length}`);
console.log(`Keys with Chinese translation: ${chineseCount}`);
console.log(`Keys without Chinese (English fallback): ${englishCount}`);
if (untranslatedList.length > 0) {
  console.log(`First 10 remaining without Chinese:`, untranslatedList.slice(0, 10));
}
console.log(`----------------------------------------`);

fs.mkdirSync(path.dirname(zhOut1), { recursive: true });
fs.writeFileSync(zhOut1, JSON.stringify(out, null, 2), 'utf8');
fs.mkdirSync(path.dirname(zhOut2), { recursive: true });
fs.writeFileSync(zhOut2, JSON.stringify(out, null, 2), 'utf8');

console.log(`Successfully written to:`);
console.log(`- ${zhOut1}`);
console.log(`- ${zhOut2}`);
