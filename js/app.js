// js/app.js
import { getTranslations } from "./i18n/i18n.js";

const htmlEl = document.documentElement;
const navLinks = document.querySelectorAll(".nav-link");
const langButtons = document.querySelectorAll(".lang-btn");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

/* -------------------------------------------------
   1️⃣  Validate & obtain stored language
   ------------------------------------------------- */
function getStoredLang() {
  const stored = sessionStorage.getItem("mediLang");
  return stored === "es" || stored === "en" ? stored : "es";
}
let currentLang = getStoredLang();

/* -------------------------------------------------
   2️⃣  Change language & update UI
   ------------------------------------------------- */
function setLang(lang) {
  if (lang !== "es" && lang !== "en") lang = "es";
  const t = getTranslations(lang);
  currentLang = lang;
  sessionStorage.setItem("mediLang", lang);

  // <html lang>
  htmlEl.lang = lang;

  // Navigation (using data‑nav)
  navLinks.forEach(link => {
    const key = link.dataset.nav;
    if (t.nav[key]) link.textContent = t.nav[key];
  });

  // Hero
  document.getElementById("hero-title").textContent = t.hero.title;
  document.getElementById("hero-description").textContent = t.hero.description;
  const cta = document.getElementById("hero-cta");
  cta.textContent = t.hero.cta;
  cta.setAttribute("aria-label", t.hero.cta);
  document.getElementById("hero-image").alt = t.hero.imgAlt;

  // Language buttons – indicate active
  langButtons.forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("bg-primary-deep", isActive);
    btn.classList.toggle("bg-gray-200", !isActive);
    btn.classList.toggle("text-white", isActive);
    btn.classList.toggle("text-primary", !isActive);
  });
}

/* -------------------------------------------------
   3️⃣  Mobile menu: open / close
   ------------------------------------------------- */
function toggleMobileMenu() {
  const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.classList.toggle("hidden", expanded);
}

/* Close mobile menu when a link is clicked */
function closeMobileMenuIfOpen() {
  if (mobileMenuBtn.getAttribute("aria-expanded") === "true") {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.add("hidden");
  }
}

/* -------------------------------------------------
   4️⃣  Event listeners
   ------------------------------------------------- */
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

/* Close menu on any navigation click (desktop & mobile) */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeMobileMenuIfOpen();
  });
});

/* Language switch */
langButtons.forEach(btn => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

/* Close mobile menu when viewport becomes desktop */
window.addEventListener("resize", () => {
  const mdBreakpoint = 768; // Tailwind md = 768 px
  if (window.innerWidth >= mdBreakpoint) {
    closeMobileMenuIfOpen();
  }
});

/* -------------------------------------------------
   5️⃣  Initialise
   ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
});