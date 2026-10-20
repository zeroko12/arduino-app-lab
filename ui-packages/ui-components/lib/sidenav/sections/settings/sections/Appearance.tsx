import {
  DarkTheme,
  Decrement,
  Increment,
  LightTheme,
  ToggleOff,
  ToggleOn,
} from '@cloud-editor-mono/images/assets/icons';
import clsx from 'clsx';
import { useContext } from 'react';

import { Themes } from '../../../../../themes/theme.type';
import { NumberField } from '../../../../essential/number-field';
import { Radio, RadioGroup } from '../../../../essential/radio-group';
import { ToggleButton } from '../../../../essential/toggle-button';
import { useI18n } from '../../../../i18n/useI18n';
import { XSmall, XXSmall } from '../../../../typography';
import { SettingsContext } from '../context/settingsContext';
import { messages } from '../messages';
import styles from '../settings.module.scss';
import { Preferences } from '../settings.type';

const MIN_FONT_SIZE = 6;
const MAX_FONT_SIZE = 28;

const Appearance: React.FC = () => {
  const { getPreference, setPreference, themeContext } =
    useContext(SettingsContext);
  const { formatMessage } = useI18n();

  const autoTheme = Boolean(getPreference(Preferences.AutoTheme));
  const fontSize = Number(getPreference(Preferences.FontSize));

  return (
    <>
      <div className={styles['setting']}>
        <XSmall bold>{formatMessage(messages.themeSection)}</XSmall>
        <div className={styles['setting__theme']}>
          <div className={styles['setting__theme-buttons']}>
            <RadioGroup
              label={formatMessage(messages.themeSection)}
              classes={{ container: styles['setting__theme-radio-group'] }}
              onChange={(theme: string): void => {
                themeContext.setTheme(theme);
                setPreference(Preferences.Theme, theme);
              }}
              defaultValue={themeContext.theme}
              value={themeContext.theme}
            >
              <Radio
                value={Themes.LightTheme}
                classes={{
                  container: styles['setting__theme-radio-container'],
                  input: styles['setting__theme-radio-input'],
                }}
              >
                <>
                  <XSmall>{formatMessage(messages.themeLightLabel)}</XSmall>
                  <LightTheme />
                </>
              </Radio>
              <Radio
                value={Themes.DarkTheme}
                classes={{
                  container: clsx(
                    styles['setting__theme-radio-container'],
                    styles['hidden'],
                  ),
                  input: styles['setting__theme-radio-input'],
                }}
              >
                <>
                  <XSmall>{formatMessage(messages.themeDarkLabel)}</XSmall>
                  <DarkTheme />
                </>
                <XXSmall italic>
                  {formatMessage(messages.themeComingSoonLabel)}
                </XXSmall>
              </Radio>
            </RadioGroup>
          </div>
          <div
            className={clsx(styles['setting__theme-auto'], styles['hidden'])}
          >
            <span className={styles['setting__theme-auto-label']}>
              <XSmall>{formatMessage(messages.themeAutoLabel)}</XSmall>
              <XXSmall>{formatMessage(messages.themeAutoDescription)}</XXSmall>
            </span>
            <ToggleButton
              classes={{ button: styles['setting__saving-toggle-button'] }}
              buttonOn={<ToggleOn />}
              buttonOff={<ToggleOff />}
              defaultSelected={false}
              isSelected={autoTheme}
              onChange={(isAutoTheme): void => {
                if (isAutoTheme) {
                  const themeValue = themeContext.isDarkModeOs
                    ? Themes.DarkTheme
                    : Themes.LightTheme;
                  setPreference(Preferences.Theme, themeValue);
                  themeContext.setTheme(themeValue);
                }
                setPreference(Preferences.AutoTheme, isAutoTheme);
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles['setting']}>
        <XSmall bold>{formatMessage(messages.fontSizeSection)}</XSmall>
        <NumberField
          label={formatMessage(messages.fontSizeSection)}
          DecIcon={Decrement}
          IncIcon={Increment}
          minValue={MIN_FONT_SIZE}
          maxValue={MAX_FONT_SIZE}
          onChange={(fontSizeValue): void => {
            setPreference(Preferences.FontSize, fontSizeValue);
          }}
          value={fontSize}
          unit="px"
          classes={{
            container: styles['setting__font-size'],
            button: styles['setting__font-size-button'],
            input: styles['setting__font-size-input'],
          }}
        />
      </div>
      <div className={styles['setting']}>
        <XSmall bold>{formatMessage(messages.languageSection)}</XSmall>
        <div className={styles['setting__theme']}>
          <div className={styles['setting__theme-buttons']}>
            <RadioGroup
              label={formatMessage(messages.languageSection)}
              classes={{ container: styles['setting__theme-radio-group'] }}
              onChange={(lang: string): void => {
                setPreference(Preferences.Language, lang);
                try {
                  localStorage.setItem('app_lab_language_v2', lang);
                  window.location.reload();
                } catch {
                  // ignore
                }
              }}
              defaultValue={
                (typeof localStorage !== 'undefined' &&
                  localStorage.getItem('app_lab_language_v2')) ||
                (getPreference(Preferences.Language) as string) ||
                'zh-cn'
              }
              value={
                (typeof localStorage !== 'undefined' &&
                  localStorage.getItem('app_lab_language_v2')) ||
                (getPreference(Preferences.Language) as string) ||
                'zh-cn'
              }
            >
              <Radio
                value="en-us"
                classes={{
                  container: styles['setting__theme-radio-container'],
                  input: styles['setting__theme-radio-input'],
                }}
              >
                <XSmall>{formatMessage(messages.languageEnglish)}</XSmall>
              </Radio>
              <Radio
                value="zh-cn"
                classes={{
                  container: styles['setting__theme-radio-container'],
                  input: styles['setting__theme-radio-input'],
                }}
              >
                <XSmall>{formatMessage(messages.languageChinese)}</XSmall>
              </Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appearance;

