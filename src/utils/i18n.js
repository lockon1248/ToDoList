import { createI18n } from 'vue-i18n';
import zhTW from '@/locales/zh-tw.json';
import zhCN from '@/locales/zh-cn.json';
import en from '@/locales/en.json';
const urlParams = new URLSearchParams(window.location.search);
export  const defaultLocale = urlParams.has('locale') ? urlParams.get('locale') : 'zh_TW';
document.body.lang = defaultLocale;
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