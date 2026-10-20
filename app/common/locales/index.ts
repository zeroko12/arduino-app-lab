export interface Language {
  name: string;
}

export const Locales = {
  ENGLISH: 'en-us',
  CHINESE: 'zh-cn',
} as const;

export type LocaleType = (typeof Locales)[keyof typeof Locales];

export const LANGUAGES: Record<LocaleType, Language> = {
  [Locales.ENGLISH]: {
    name: 'English',
  },
  [Locales.CHINESE]: {
    name: '简体中文',
  },
} as const;
