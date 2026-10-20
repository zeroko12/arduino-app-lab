import { defineMessages } from 'react-intl';

import { SetupItemId } from './setup.type';

export const welcomeMessages = defineMessages({
  title: {
    id: 'appLabSetup.welcome.title',
    defaultMessage: '欢迎使用 Arduino App Lab',
    description: 'Title for the welcome section of the App Lab setup',
  },
  descriptionMultipleBoards: {
    id: 'appLabSetup.welcome.descriptionMultipleBoards',
    defaultMessage: '已连接多块开发板，请选择一块开始使用',
    description:
      'Description for the welcome section of the App Lab setup when multiple boards are connected',
  },
  connected: {
    id: 'appLabSetup.welcome.connected',
    defaultMessage: '已连接',
    description: 'Message indicating that the board is connected',
  },
  noDevice: {
    id: 'appLabSetup.welcome.noDevice',
    defaultMessage: '无设备',
    description: 'Message indicating that no device is connected',
  },
  connectYourBoard: {
    id: 'appLabSetup.welcome.connectYourBoard',
    defaultMessage: '连接开发板',
    description: 'Message prompting the user to connect their board',
  },
  connectYourBoardDescription: {
    id: 'appLabSetup.welcome.connectYourBoardDescription',
    defaultMessage: '正在等待接入开发板...',
    description: 'Description for the connect your board message',
  },
  chooseBoard: {
    id: 'appLabSetup.welcome.chooseBoard',
    defaultMessage: '选择一块开发板开始',
    description: 'Subtitle when multiple boards are available',
  },
  chooseBoardDescription: {
    id: 'appLabSetup.welcome.chooseBoardDescription',
    defaultMessage: '通过 USB 接入，或选择局域网中的开发板。',
    description: 'Description when multiple boards are available',
  },
  availableViaUsb: {
    id: 'appLabSetup.welcome.availableViaUsb',
    defaultMessage: '通过 USB 已连接',
    description: 'Group header for USB-connected boards',
  },
  availableOnNetwork: {
    id: 'appLabSetup.welcome.availableOnNetwork',
    defaultMessage: '局域网中已发现',
    description: 'Group header for network-connected boards',
  },
  linuxPasswordTitle: {
    id: 'appLabSetup.welcome.linuxPasswordTitle',
    defaultMessage: 'Linux 系统密码',
    description: 'Title for the Linux password dialog',
  },
  cancelButton: {
    id: 'appLabSetup.welcome.cancelButton',
    defaultMessage: '取消',
    description: 'Cancel button text',
  },
  confirmButton: {
    id: 'appLabSetup.welcome.confirmButton',
    defaultMessage: '确认',
    description: 'Confirm button text',
  },
  usernameLabel: {
    id: 'appLabSetup.welcome.usernameLabel',
    defaultMessage: '用户名',
    description: 'Label for the username input field',
  },
  passwordLabel: {
    id: 'appLabSetup.welcome.passwordLabel',
    defaultMessage: '密码',
    description: 'Label for the password input field',
  },
  noBoardsFound: {
    id: 'appLabSetup.welcome.noBoardsFound',
    defaultMessage: '未发现开发板',
    description: 'Message when no boards are found',
  },
  newBoardBadge: {
    id: 'appLabSetup.welcome.newBoardBadge',
    defaultMessage: '新开发板',
    description: 'Text for the new board badge',
  },
  lastConnectionPrefix: {
    id: 'appLabSetup.welcome.lastConnectionPrefix',
    defaultMessage: '上次连接时间：',
    description: 'Prefix for the last connection timestamp',
  },
});

export const setupMessages = defineMessages<SetupItemId>({
  [SetupItemId.BoardConfiguration]: {
    id: 'appLabSetup.boardConfiguration',
    defaultMessage: '开发板基础配置',
    description: 'Board Configuration',
  },
  [SetupItemId.NetworkSetup]: {
    id: 'appLabSetup.networkSetup',
    defaultMessage: '网络设置',
    description: 'Network Setup',
  },
  [SetupItemId.LinuxCredentials]: {
    id: 'appLabSetup.linuxCredentials',
    defaultMessage: 'Linux 系统凭证',
    description: 'Linux Credentials',
  },
  [SetupItemId.ArduinoAccount]: {
    id: 'appLabSetup.arduinoAccount',
    defaultMessage: 'Arduino 账号',
    description: 'Arduino Account',
  },
});

export const boardConfigurationMessages = defineMessages({
  keyboardLabel: {
    id: 'appLabSetup.boardConfiguration.keyboardLabel',
    defaultMessage: '键盘布局',
    description: 'Label for the keyboard layout input field',
  },
  nameLabel: {
    id: 'appLabSetup.boardConfiguration.nameLabel',
    defaultMessage: '开发板名称',
    description: 'Label for the board name input field',
  },
  boardConfigurationError: {
    id: 'appLabSetup.boardConfiguration.boardConfigurationError',
    defaultMessage: '保存开发板配置出错',
    description:
      'Message displayed when there is an error setting the board configuration',
  },
  boardConfigurationSuccess: {
    id: 'appLabSetup.boardConfiguration.boardConfigurationSuccess',
    defaultMessage: '开发板配置保存成功',
    description:
      'Message displayed when the board configuration is set successfully',
  },
});

export const linuxCredentialsMessages = defineMessages({
  descriptionLabel: {
    id: 'appLabSetup.linuxCredentials.descriptionLabel',
    defaultMessage: '为您的 Linux 账号设置密码',
    description: 'Description for the linux credentials setup section',
  },
  usernameLabel: {
    id: 'appLabSetup.linuxCredentials.usernameLabel',
    defaultMessage: '用户名',
    description: 'Label for the username input field',
  },
  passwordLabel: {
    id: 'appLabSetup.linuxCredentials.passwordLabel',
    defaultMessage: '密码',
    description: 'Label for the password input field',
  },
  passwordConfirmationLabel: {
    id: 'appLabSetup.linuxCredentials.passwordConfirmationLabel',
    defaultMessage: '确认密码',
    description: 'Label for the password confirmation input field',
  },
  linuxCredentialsError: {
    id: 'appLabSetup.linuxCredentials.linuxCredentialsError',
    defaultMessage: '设置用户凭证时出错',
    description:
      'Message displayed when there is an error setting the user credentials',
  },
  linuxCredentialsSuccess: {
    id: 'appLabSetup.linuxCredentials.linuxCredentialsSuccess',
    defaultMessage: '用户凭证设置成功',
    description:
      'Message displayed when the user credentials are set successfully',
  },
});

export const sectionTitleMessages = defineMessages<SetupItemId>({
  [SetupItemId.BoardConfiguration]: {
    id: 'appLabSetup.boardName.title',
    defaultMessage: '开发板基础配置',
    description: 'Title for the board name setup section',
  },
  [SetupItemId.NetworkSetup]: {
    id: 'appLabSetup.networkSetup.title',
    defaultMessage: '网络设置',
    description: 'Title for the network setup section',
  },
  [SetupItemId.LinuxCredentials]: {
    id: 'appLabSetup.linuxCredentials.title',
    defaultMessage: 'Linux 系统凭证',
    description: 'Title for the linux credentials setup section',
  },
  [SetupItemId.ArduinoAccount]: {
    id: 'appLabSetup.arduinoAccount.title',
    defaultMessage: 'Arduino 账号',
    description: 'Title for the Arduino account setup section',
  },
});

export const sectionActionMessages = defineMessages<SetupItemId>({
  [SetupItemId.BoardConfiguration]: {
    id: 'appLabSetup.boardName.action',
    defaultMessage: '下一步',
    description: 'Action for the board configuration setup section',
  },
  [SetupItemId.NetworkSetup]: {
    id: 'appLabSetup.networkSetup.action',
    defaultMessage: '确认',
    description: 'Action for the network setup section',
  },
  [SetupItemId.LinuxCredentials]: {
    id: 'appLabSetup.linuxCredentials.action',
    defaultMessage: '确认',
    description: 'Action for the linux credentials setup section',
  },
  [SetupItemId.ArduinoAccount]: {
    id: 'appLabSetup.arduinoAccount.action',
    defaultMessage: '确认',
    description: 'Action for the Arduino account setup section',
  },
});

export const tooltipMessages = defineMessages({
  wifiTooltipTitle: {
    id: 'appLabSetup.wifi.tooltip.title',
    defaultMessage: '为什么需要此项',
    description:
      'Title for the wifi tooltip explaining network connection requirements',
  },
  wifiTooltipContent: {
    id: 'appLabSetup.wifi.tooltip.content',
    defaultMessage:
      'App Lab 仅在首次配置时需要网络连接，以保证获取最新的系统组件与组件库。',
    description:
      'Content for the wifi tooltip explaining network connection requirements',
  },
  accountTooltipTitle: {
    id: 'appLabSetup.account.tooltip.title',
    defaultMessage: '为什么需要此项？',
    description:
      'Title for the account tooltip explaining Arduino account requirements',
  },
  accountTooltipContent: {
    id: 'appLabSetup.account.tooltip.content',
    defaultMessage:
      'App Lab 无需登录 Arduino 账号即可开箱使用，但登录后可以解锁全部云端及高级体验。',
    description:
      'Content for the account tooltip explaining Arduino account requirements',
  },
  chipConnectionTooltip: {
    id: 'appLabSetup.chip.connection.tooltip',
    defaultMessage: '通过 {chip} 连接',
    description:
      'Tooltip content showing the connection method for the board chip',
  },
});

export const sectionContainerMessages = defineMessages({
  backButton: {
    id: 'appLabSetup.sectionContainer.backButton',
    defaultMessage: '返回',
    description: 'Label for the back button',
  },
  stepLabel: {
    id: 'appLabSetup.sectionContainer.stepLabel',
    defaultMessage: '步骤 {current}/{total}',
    description: 'Label showing the current step number',
  },
  skipButton: {
    id: 'appLabSetup.sectionContainer.skipButton',
    defaultMessage: '跳过',
    description: 'Label for the skip button',
  },
  networkSetupSubtitle: {
    id: 'appLabSetup.sectionContainer.networkSetupSubtitle',
    defaultMessage: '选择一个网络以连接您的开发板',
    description: 'Subtitle for the network setup section',
  },
  linuxCredentialsSubtitle: {
    id: 'appLabSetup.sectionContainer.linuxCredentialsSubtitle',
    defaultMessage: '请为您的开发板设置访问密码',
    description: 'Subtitle for the linux credentials section',
  },
});
