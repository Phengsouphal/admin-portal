import { createI18n } from 'vue-i18n'

import EN from './en.json'
import ZH from './zh.json'
import HI from './hi.json'
import KM from './km.json'
import ID from './id.json'
import TH from './th.json'
import VI from './vi.json'
export default createI18n({
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    zh: ZH,
    en: EN,
    hi: HI,
    km: KM,
    id: ID,
    th: TH,
    vi: VI
  },
  specialCharacters: {
    linked: '~@'
  }
})
