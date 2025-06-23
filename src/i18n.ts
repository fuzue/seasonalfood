import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { Capacitor } from "@capacitor/core";

// Import translations directly for native builds
import enTranslations from "../public/locales/en/translation.json";
import itTranslations from "../public/locales/it/translation.json";
import ptTranslations from "../public/locales/pt/translation.json";

const isNative = Capacitor.isNativePlatform();
const baseUrl = import.meta.env.VITE_BASE_URL || "/";
const resources = {
  en: { translation: enTranslations },
  it: { translation: itTranslations },
  pt: { translation: ptTranslations },
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...(isNative
      ? { resources }
      : {
          backend: {
            loadPath: `${baseUrl}locales/{{lng}}/{{ns}}.json`,
          },
        }),
    debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "it", "pt"],
    saveMissing: !isNative,
  });

//debugging consoles
i18next.on("failedLoading", (lng, ns, msg) => {
  console.error("Failed loading translation:", lng, ns, msg);
});

i18next.on("loaded", (loaded) => {
  console.log("Translations loaded:", loaded);
});

export default i18next;
