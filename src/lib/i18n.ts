// src/lib/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    interpolation: {
        escapeValue: false,
    },
})

export default i18n