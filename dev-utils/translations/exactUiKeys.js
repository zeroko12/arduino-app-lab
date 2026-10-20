export const exactUiKeysTranslations = {
  // App Lab Editor
  "app-lab-editor.code-copied": "代码已复制到剪贴板",
  "app-lab-editor.read-only-banner": "当前代码为只读状态。若需编辑，请由此示例创建您自己的 App。",

  // Attach Media Carrier
  "attachMediaCarrierDialog.rememberButton": "不再显示此提示",

  // Cloud Connector
  "cloudConnectorConnectDialog.continueButton": "继续",
  "cloudConnectorConnectDialog.networkButton": "连接 Wi-Fi",
  "cloudConnectorConnectDialog.networkDescription": "您的设备需要连接网络才能添加到 Arduino Cloud。",
  "cloudConnectorConnectDialog.networkTitle": "需要网络连接",
  "cloudConnectorErrorDialog.bodyDescription2": "请携带上述设备 ID 联系技术支持。您可能需要重置开发板后继续。",
  "cloudConnectorErrorDialog.confirmButton": "好的，了解",
  "cloudConnectorErrorDialog.contactSupportButton": "联系技术支持",
  "cloudConnectorErrorDialog.uhwidLabel": "硬件唯一标识码 (UHWID)",

  // Configure App Brick
  "configureAppBrick.deviceIdLink": "设置您的开发板",
  "configureAppBrick.secretDescription": "用于向 Arduino Cloud 验证 Arduino 开发板身份的关键安全凭证。",
  "configureAppBrick.secretLabel": "Arduino Cloud 机密密钥 (Secret)",
  "configureAppBrick.secretLink": "请参照此使用指南",
  "configureAppBricks.bodySubtitle": "兼容的 AI 模型",
  "configureAppBricks.bodyTitle": "{brickName} 需要进行必要配置才能运行",

  // Create App Dialog
  "createAppDialog.failedCreate": "创建应用失败，请重试。",
  "createAppDialog.failedDuplicate": "复制应用失败，请重试。",
  "createAppDialog.storageFull": "无法复制应用：开发板存储空间已满。",
  "createAppDialog.successCreate": "应用创建成功",
  "createAppDialog.successDuplicate": "应用副本创建成功",

  // Custom Brick Dialog
  "customBrickDialog.createBrickDialogTitle": "创建积木",
  "customBrickDialog.createButton": "创建",
  "customBrickDialog.createCustomBrickSubtitle": "为您的项目构建模块化的软件功能组件",
  "customBrickDialog.createCustomBrickTitle": "创建自定义积木",
  "customBrickDialog.customBrickId": "新积木标识: {brickId} (小写，不含空格)",
  "customBrickDialog.customBrickInputLabel": "积木名称",
  "customBrickDialog.customBrickRenameInputLabel": "重命名积木",
  "customBrickDialog.mainPy": "main.py",
  "customBrickDialog.renameBrickBodyDescription": "重命名将同步更改积木文件夹名称和 ID。请确保同步更新 {mainPy} 中的名称，否则导入代码可能失效。",
  "customBrickDialog.renameBrickBodyTitle": "重命名 {brickName}",
  "customBrickDialog.renameBrickDialogTitle": "重命名积木",

  // Delete Dialogs
  "deleteAppBrickDialog.customBrickBodyTitle": "确定要删除 {brickName} 吗？",
  "deleteFileDialog.confirmMessage": "此操作无法撤销。您确定要删除此文件吗？",
  "deleteFileDialog.messageName": "{fileFullName}",
  "deleteLibraryDialog.confirmMessage": "此操作无法撤销。您确定要删除此自定义库吗？",
  "deleteSecretDialog.actionDescription": "此操作无法撤销。您确定要删除此 Secret 吗？",
  "deleteSecretDialog.deleteButton": "确认删除",
  "deleteSecretDialog.warningDescription": "请注意：删除机密配置后，项目代码中引用该变量的地方将失效，您需要手动在代码中修改或移除对应键。",
  "deleteSketchDialog.confirmMessage": "此操作无法撤销。您确定要删除此代码工程吗？",
  "deleteTreeItemDialog.deleteFileTitle": "删除文件",
  "deleteTreeItemDialog.deleteFolderTitle": "删除文件夹",
  "deleteTreeItemDialog.directoryBodyDescription": "此操作将永久删除该文件夹及其包含的所有文件",
  "deleteTreeItemDialog.directoryBodyTitle": "删除 {fileName}？",
  "deleteTreeItemDialog.fileBodyDescription": "此操作将永久删除此文件",
  "deleteTreeItemDialog.fileBodyTitle": "删除 {fileName}？",

  // Duplicate File Dialog
  "duplicateFileDialog.fileBodyDescription": "是否覆盖现有文件或保留两者？",
  "duplicateFileDialog.fileBodyTitle": "已存在同名文件 {fileName}",
  "duplicateFileDialog.fileConflictTitle": "文件冲突",
  "duplicateFileDialog.fileFolderConflictDescription": "无法移动此文件：已存在同名文件夹。",
  "duplicateFileDialog.folderBodyDescription": "已存在同名文件夹。您可以合并文件夹或保留两者作为独立文件夹。",
  "duplicateFileDialog.folderBodyTitle": "已存在同名文件夹 {fileName}",
  "duplicateFileDialog.folderConflictTitle": "文件夹冲突",
  "duplicateFileDialog.folderFileConflictDescription": "无法移动此文件夹：已存在同名文件。",
  "duplicateFileDialog.keepBothButton": "保留两者",
  "duplicateFileDialog.mergeButton": "合并文件夹",
  "duplicateFileDialog.nameConflictBodyTitle": "{fileName} 已存在",
  "duplicateFileDialog.nameConflictTitle": "名称冲突",
  "duplicateFileDialog.okGotItButton": "好的，明白",
  "duplicateFileDialog.overwriteButton": "覆盖",
  "duplicateFileDialog.skipButton": "跳过",
  "duplicateFileDialog.sourceLabel": "源路径",
  "duplicateFileDialog.targetLabel": "目标路径",
  "duplicateFileDialog.warningMessage": "警告：选择“覆盖”将永久替换现有的 {itemType}。",

  // Editor Panel & Examples
  "editor-panel.split-view-button": "分屏视图",
  "examples.allDevices": "所有设备",
  "examples.searchExamples": "搜索示例...",
  "examples.showExamples": "展示示例适用于：",
  "examplesMenu.copyInYourSketches": "复制到我的代码库",
  "files.addFile": "新建",
  "files.files": "文件列表",
  "files.searchFiles": "搜索文件...",

  // Find & Replace
  "findAndReplace.noResults": "未找到匹配项",
  "findAndReplace.occurrences": "第 {currentMatch} 项 / 共 {totalOccurrences} 项",
  "findAndReplace.prev": "上一个",
  "findAndReplace.selectAll": "全选",

  // Mobile Warning
  "mobileWarningDialog.otaDescription": "请注意：目前仅支持向已关联在线 <link>OTA (无线传输) 设备</link> 的 IoT 代码执行上传。",

  // New File & Tab Menu
  "newFileMenu.addTextFile": "新建文本文件 (.txt)",
  "newFileMenu.importFile": "导入本地文件",
  "newTabMenu.addTextFile": "新建文本标签页",
  "newTabMenu.importFile": "导入本地文件",

  // Offline Warning
  "offlineWarningDialog.continueButton": "以离线模式继续",
  "offlineWarningDialog.feature4": "需要网络连接的应用或示例",
  "offlineWarningDialog.feature5": "打开外部网页链接 (仅限 SBC 模式)",
  "offlineWarningDialog.networkSettingsButton": "连接 Wi-Fi",

  // Onboarding Steps
  "onboardingSteps.examplesContent": "不知道从何开始？您可以浏览并选择各类示例项目，满足不同硬件需求并激发创作灵感。",
  "onboardingSteps.examplesTitle": "从示例项目中获取灵感",
  "onboardingSteps.finishTour": "完成新手教程",
  "onboardingSteps.librariesAndLanguageContent": "获取丰富的 Arduino 依赖库生态支持，并随时借助语言参考掌握编程语法核心。",
  "onboardingSteps.librariesAndLanguageTitle": "库与语言参考速查",
  "onboardingSteps.sketchCollectionContent": "使用导航栏在 Arduino Cloud 功能间快速切换，随时查看与整理您的全部代码库。",
  "onboardingSteps.sketchCollectionTitle": "返回您的代码集合",
  "onboardingSteps.skipAll": "跳过全部教程",
  "onboardingSteps.verifyAndUploadContent": "点击“验证”排查语法错误，或一键“上传”至开发板，见证硬件运行的精彩瞬间！",
  "onboardingSteps.verifyAndUploadTitle": "轻松验证与上传代码",
  "onboardingWindow.description": "您刚刚打开了名为 {sketchName} 的代码工程，现在可以在此挥洒创意，让灵感在硬件上变为现实。",
  "onboardingWindow.hideButton": "收起",
  "onboardingWindow.startButton": "开始教程",

  // Read Only Bar
  "readOnlyBar.byOwner": "作者: {owner}",
  "readOnlyBar.createdLabel": "创建于",
  "readOnlyBar.modifiedLabel": "修改于",
  "readOnlyBar.sizeLabel": "大小",

  // Reference Category
  "referenceCategory.functions": "用于控制 Arduino 开发板和进行运算的内置函数。",
  "referenceCategory.structure": "Arduino (C++) 编程语言的结构与控制语句。",
  "referenceCategory.variables": "Arduino 数据类型、常量以及变量作用域。",

  // Rename Dialogs
  "renameAppDialog.inputPlaceholder": "请输入新应用名称...",
  "renameAppDialog.successRename": "应用重命名成功",
  "renameDialog.actionTitle": "重命名代码工程",
  "renameDialog.sketchNameAlreadyExists": "该名称已被占用，请使用其他名称。",
  "renameDialog.sketchNameContainsInvalidCharacters": "名称中不允许包含空格、标点及特殊字符。",
  "renameDialog.sketchNameExceedsLimit": "名称字数超过限制上限。",

  // Secrets Editor
  "secretsEditor.addButton": "新增配置",
  "secretsEditor.duplicateError": "键名重复，请使用唯一的变量名。",
  "secretsEditor.header": "加密保护您的敏感数据",
  "secretsEditor.keyLabel": "配置键名 (Key)",
  "secretsEditor.valueLabel": "配置取值 (Value)",

  // Serial Monitor (Component body keys)
  "serialMonitor.body.bothNLandCR": "回车与换行 (NL & CR)",
  "serialMonitor.body.carriageReturn": "回车符 (CR)",
  "serialMonitor.body.clearLog": "清空输出",
  "serialMonitor.body.connecting": "正在连接串口...",
  "serialMonitor.body.connectionLost": "未找到设备，请确保设备已连接到串口。历史日志仍可查看，重新连接后将恢复数据打印。",
  "serialMonitor.body.downloadLog": "下载日志",
  "serialMonitor.body.hideTimestamp": "隐藏时间戳",
  "serialMonitor.body.newLine": "换行符 (NL)",
  "serialMonitor.body.noLineEnding": "无行尾符",
  "serialMonitor.body.searchLog": "搜索日志内容...",
  "serialMonitor.body.searchLogDisabled": "如需启用搜索，请先点击暂停串口监视器输出。",
  "serialMonitor.body.send": "发送数据",
  "serialMonitor.body.showTimestamp": "显示时间戳",
  "serialMonitor.body.unavailable": "串口监视器当前不可用。",
  "serialMonitor.body.viewNewData": "查看最新数据",
  "serialMonitor.toolbar.pause": "暂停",
  "serialMonitor.toolbar.run": "继续运行",

  // Settings (Component appearance, device, sketch)
  "settings.appearance.language.english": "English",
  "settings.appearance.languageSection": "界面语言",
  "settings.appearance.themeSection.auto.description": "- 跟随操作系统设置",
  "settings.device.consoleVerbositySection": "控制台输出详细度",
  "settings.device.consoleVerbositySection.concise": "精简",
  "settings.device.consoleVerbositySection.conciseOutput": "精简输出模式",
  "settings.device.consoleVerbositySection.info": "此修改将在下一次编译时生效。",
  "settings.device.consoleVerbositySection.verbose": "详细",
  "settings.device.consoleVerbositySection.verboseOutput": "详细调试输出模式",
  "settings.device.deviceSelectionSection": "设备识别与选择",
  "settings.device.deviceSelectionSection.autoSelectionInfo": "在新建代码项目中，接入开发板时将自动进行识别与选择。",
  "settings.device.deviceSelectionSection.enableAutoSelection": "启用自动选择设备",
  "settings.restoreSettings": "恢复所有偏好设置为默认值",
  "settings.sketch.savingSection": "保存机制",
  "settings.sketch.savingSection.saveOnVerifyAndUpload": "在执行验证与上传时自动保存",

  // Share Sketch
  "shareSketch.personal-label": "仅您本人可以查看和编辑此代码",
  "shareSketch.public-disabled": "已关闭公开分享",
  "shareSketch.public-enabled": "已开启公开分享",
  "shareSketch.public-label": "拥有此链接的任何人都可以查看此代码，但无法修改原始文件。",
  "shareSketch.share-to-classroom": "分享至 Google Classroom",
  "shareSketch.title-organization": "公开分享",
  "shareSketch.title-personal": "代码分享",
  "shareSketch.url-label": "分享链接",
  "shareSketchDialog.body-title": "选择代码的公开可见性",
  "shareSketchDialog.embed-label": "HTML 网页内嵌",
  "shareSketchDialog.private-label": "私有 — 仅限您本人访问查看",
  "shareSketchDialog.public-label": "公开 — 任何拥有链接的人均可查看",
  "shareSketchDialog.url-label": "访问链接",
  "shareSketchToClassroomDialog.body": "继续操作后，代码可见性将自动设为公开，所有拥有链接的用户均可查看代码。",
  "shareSketchToClassroomDialog.shareToClassroomButton": "分享到 Google Classroom",

  // Side Panel
  "sidePanel.bricks": "积木组件 (Bricks)",
  "sidePanel.bricksManager": "积木管理器",
  "sidePanel.createApp": "新建应用",
  "sidePanel.inspirations": "创意灵感库",
  "sidePanel.learnAndExplore": "学习与探索",
  "sidePanel.noBoardConnected": "暂无已连接开发板",
  "sidePanel.resources": "开发资源",

  // Skip Login & Tab Menu
  "skipLoginDialog.bodyListItem4": "不断扩充的应用商店与组件生态",
  "skipLoginDialog.bodyTitle": "确定要跳过登录吗？",
  "skipLoginDialog.skipButton": "跳过登录",
  "tabMenu.closeOthers": "关闭其他标签页",
  "tabMenu.closeToTheLeft": "关闭左侧标签页",
  "tabMenu.closeToTheRight": "关闭右侧标签页",
  "tabMenu.deleteFile": "删除文件",
  "tabMenu.splitLeft": "向左分屏",
  "tabMenu.splitRight": "向右分屏",
  "verify-timeout": "代码编译时间较长，系统仍在努力验证中，感谢您的耐心等待"
};
