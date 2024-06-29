// src/utils/i18n.ts
import { createI18n } from 'vue-i18n';
import zhTW from '@/locales/zh-tw.json';
import zhCN from '@/locales/zh-cn.json';
import en from '@/locales/en.json';

// 解析 URL 中的 locale 參數，並設置預設值
const urlParams = new URLSearchParams(window.location.search);
export const defaultLocale = urlParams.get('locale') || 'zh_TW';

// 設置文檔語言屬性
document.body.lang = defaultLocale;

// 創建 I18n 實例
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    zh_TW: zhTW,
    zh_CN: zhCN,
    en: en,
  },
  globalInjection: true,
});
