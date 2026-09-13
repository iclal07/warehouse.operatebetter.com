import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

const savedLanguage = typeof window === "undefined" ? "tr" : localStorage.getItem("warehouse-language") ?? "tr";

void i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "tr",
  interpolation: { escapeValue: false },
});

export default i18n;
