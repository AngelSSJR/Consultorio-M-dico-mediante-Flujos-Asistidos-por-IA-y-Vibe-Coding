import { es } from "./es.js";
import { en } from "./en.js";

const translations = { es, en };

export function getTranslations(lang) {
  // Fallback to Spanish if an unexpected value is passed
  return translations[lang] || translations.es;
}

/* Impliementacion de idiomas */