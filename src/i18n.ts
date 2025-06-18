import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { Capacitor } from "@capacitor/core";

const isNative = Capacitor.isNativePlatform();
const baseUrl = import.meta.env.VITE_BASE_URL || "/";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    backend: {
      loadPath: isNative
        ? "./locales/{{lng}}/{{ns}}.json"
        : `${baseUrl}locales/{{lng}}/{{ns}}.json`,
    },
    debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "it", "pt"], // Explicitly list supported languages
    saveMissing: true,
  });

export default i18next;
