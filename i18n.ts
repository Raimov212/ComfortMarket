import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import uzJSON from "./src/translation/uz.json";
import enJSON from "./src/translation/en.json";
import ruJSON from "./src/translation/ru.json";

i18n.use(initReactI18next).init({
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: "en",
  resources: {
    uz: { ...uzJSON },
    en: { ...enJSON },
    ru: { ...ruJSON },
  }, // Where we're gonna put translations' files
  lng: JSON.parse(localStorage.getItem("language") || ""), // Set the initial language of the App
});
