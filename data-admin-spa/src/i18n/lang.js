import Vue from 'vue'
import VueI18n from 'vue-i18n'

import i18EnLocale from './en'
import i18ZhLocale from './zh'

Vue.use(VueI18n);


let cacheLanguage = localStorage.getItem('language');

// Create VueI18n instance with options
export const i18n = new VueI18n({
    locale: cacheLanguage || 'zh', // 语言标识
    messages: {
      en: i18EnLocale,
      zh: i18ZhLocale
    }
  })