import { Locales, LocaleType } from '@cloud-editor-mono/common';
import { useCallback, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';

import zhMessages from './locales/zh-cn.json';
import { I18nContext } from './i18nContext';

interface I18nProviderProps {
  children?: React.ReactNode;
}

const STORAGE_KEY = 'app_lab_language_v2';
const DEFAULT_LOCALE = Locales.CHINESE;

function getInitialLocale(): LocaleType {
  try {
    localStorage.removeItem('app_lab_language');
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === Locales.ENGLISH) {
      return Locales.ENGLISH;
    }
    if (saved === Locales.CHINESE) {
      return Locales.CHINESE;
    }
  } catch {
    // ignore localStorage errors in non-browser context
  }
  return DEFAULT_LOCALE;
}

const messagesByLocale: Record<LocaleType, Record<string, string>> = {
  [Locales.ENGLISH]: {},
  [Locales.CHINESE]: zhMessages as Record<string, string>,
};

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
}: I18nProviderProps) => {
  const [currentLocale, setLocaleState] = useState<LocaleType>(getInitialLocale);

  const setCurrentLocale = useCallback((locale: LocaleType) => {
    setLocaleState(locale);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, []);

  const contextValue = useMemo(
    () => ({ currentLocale, setCurrentLocale }),
    [currentLocale, setCurrentLocale],
  );

  const messages = useMemo(
    () => messagesByLocale[currentLocale] || {},
    [currentLocale],
  );

  return (
    <I18nContext.Provider value={contextValue}>
      <IntlProvider
        locale={currentLocale}
        defaultLocale={DEFAULT_LOCALE}
        messages={messages}
      >
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
};
