// js/app.js
import { getTranslations } from "./i18n/i18n.js";

const htmlEl = document.documentElement;
const navLinks = document.querySelectorAll(".nav-link");
const langButtons = document.querySelectorAll(".lang-btn");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

/* -------------------------------------------------
   1️⃣  Validar y obtener idioma guardado
   ------------------------------------------------- */
function getStoredLang() {
  const stored = sessionStorage.getItem("mediLang");
  return stored === "es" || stored === "en" ? stored : "es";
}
let currentLang = getStoredLang();

/* -------------------------------------------------
   2️⃣  Cambiar idioma y actualizar UI
   ------------------------------------------------- */
function setLang(lang) {
  if (lang !== "es" && lang !== "en") lang = "es"; // medida de seguridad
  const t = getTranslations(lang);
  currentLang = lang;
  sessionStorage.setItem("mediLang", lang);

  // atributo HTML lang
  htmlEl.lang = lang;

  /* Navegación (uso de data‑nav) */
  navLinks.forEach(link => {
    const key = link.dataset.nav;
    if (t.nav[key]) {
      link.textContent = t.nav[key];
    }
  });

  /* Hero */
  document.getElementById("hero-title").textContent = t.hero.title;
  document.getElementById("hero-description").textContent = t.hero.description;
  const cta = document.getElementById("hero-cta");
  cta.textContent = t.hero.cta;
  cta.setAttribute("aria-label", t.hero.cta);
  document.getElementById("hero-image").alt = t.hero.imgAlt;

  /* Botones de idioma – indicar activo */
  langButtons.forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("bg-primary-deep", isActive);
    btn.classList.toggle("bg-gray-200", !isActive);
    btn.classList.toggle("text-white", isActive);
    btn.classList.toggle("text-primary", !isActive);
  });
}

/* -------------------------------------------------
   3️⃣  Menú móvil: abrir / cerrar
   ------------------------------------------------- */
function toggleMobileMenu() {
  const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.classList.toggle("hidden", expanded);
}

/* Cerrar menú móvil al hacer click en cualquier enlace */
function closeMobileMenuIfOpen() {
  if (mobileMenuBtn.getAttribute("aria-expanded") === "true") {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.add("hidden");
  }
}

/* -------------------------------------------------
   4️⃣  Escuchar eventos
   ------------------------------------------------- */
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

/* Cerrar menú al pulsar un enlace (tanto desktop como móvil) */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeMobileMenuIfOpen();
  });
});

/* Cambio de idioma */
langButtons.forEach(btn => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

/* Cerrar menú al pasar a vista desktop (resize) */
window.addEventListener("resize", () => {
  const mdBreakpoint = 768; // Tailwind md = 768px
  if (window.innerWidth >= mdBreakpoint) {
    closeMobileMenuIfOpen();
  }
});

/* -------------------------------------------------
   5️⃣  Inicializar
   ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
});