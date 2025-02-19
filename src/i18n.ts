import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform();


i18next
.use(initReactI18next)
.use(LanguageDetector)
.use(Backend)
.init({
  backend: {
    loadPath: isNative 
        ? './locales/{{lng}}/{{ns}}.json'
        : `${import.meta.env.VITE_BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
  debug: true,
  fallbackLng: 'en', 
  saveMissing: true,  
})
