import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

import common_en from './locales/en/translation.json'
import common_vi from './locales/vi/translation.json'

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en', // language to use
  resources: {
    en: {
      common: common_en // 'common' is our custom namespace
    },
    vi: {
      common: common_vi
    }
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: [],
  defaultNS: 'common',

  keySeparator: false // we use content as keys
})

export default i18n
