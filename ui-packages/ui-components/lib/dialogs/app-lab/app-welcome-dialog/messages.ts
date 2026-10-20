import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app-lab.app-welcome-dialog.title',
    defaultMessage: '欢迎使用 Arduino App Lab',
    description: 'Title shown on the app welcome dialog',
  },
  contentTitle: {
    id: 'app-lab.app-welcome-dialog.content-title',
    defaultMessage: '准备好开发了吗？了解 App Lab 核心理念',
    description: 'Main content title in the welcome dialog',
  },
  confirmButton: {
    id: 'app-lab.app-welcome-dialog.confirm-button',
    defaultMessage: '知道了，开始使用',
    description: 'Text for the confirmation button',
  },
  appsTitle: {
    id: 'app-lab.app-welcome-dialog.features.apps.title',
    defaultMessage: '应用 (Apps)',
    description: 'Feature title for Apps section',
  },
  appsDescription: {
    id: 'app-lab.app-welcome-dialog.features.apps.description',
    defaultMessage:
      '现在您可以轻松构建将 Linux 上的 Python 与嵌入式 C 代码 (Sketch) 完美融合的应用程序。',
    description: 'Feature description for Apps section',
  },
  bricksTitle: {
    id: 'app-lab.app-welcome-dialog.features.brick.title',
    defaultMessage: '积木 (Bricks)',
    description: 'Feature title for Bricks section',
  },
  bricksDescription: {
    id: 'app-lab.app-welcome-dialog.features.brick.description',
    defaultMessage:
      '开箱即用的功能积木，涵盖 AI 视觉、音频与数据存储。只需添加到项目中即可解锁强大功能。',
    description: 'Feature description for Bricks section',
  },
  examplesTitle: {
    id: 'app-lab.app-welcome-dialog.features.examples.title',
    defaultMessage: '示例',
    description: 'Feature title for Examples section',
  },
  examplesDescription: {
    id: 'app-lab.app-welcome-dialog.features.examples.description',
    defaultMessage:
      '新手的绝佳起点。每个示例都是一个精炼的应用，演示如何通过几行代码组合各类积木实现强大功能。',
    description: 'Feature description for Examples section',
  },
});
