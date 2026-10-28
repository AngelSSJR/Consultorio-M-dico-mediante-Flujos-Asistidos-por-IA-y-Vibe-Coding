// js/i18n/i18n.js
import { ES } from "./es.js";
import { EN } from "./en.js";

const LANG_MAP = {
  es: ES,
  en: EN
};

/**
 * Devuelve el objeto de traducciones para el idioma indicado.
 * Si el idioma no está soportado, vuelve al español por defecto.
 */
export function getTranslations(lang = "es") {
  return LANG_MAP[lang] || LANG_MAP["es"];
}