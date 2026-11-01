// js/app.js
import { getTranslations } from "./i18n/i18n.js";
import { services } from "./data/services.js";
import { professionals } from "./data/professionals.js";
import { initAppointmentForm } from "./components/appointment-form.js";
import { setupLanguageSwitcher } from "./components/language-switcher.js";
import { initNavigation } from "./components/navigation.js";
import { STORAGE_KEY_LANG, DEFAULT_LANG, SUPPORTED_LANGS } from "./config/constants.js";

const htmlEl = document.documentElement;
const navLinks = document.querySelectorAll(".nav-link");
const langButtons = document.querySelectorAll("#lang-menu button[data-lang]");
const langToggle = document.getElementById("lang-toggle");
const langMenu = document.getElementById("lang-menu");
const currentLangLabel = document.getElementById("current-lang-label");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

/* -------------------------------------------------
   1️⃣  Validate & obtain stored language
   ------------------------------------------------- */
function getStoredLang() {
  const stored = sessionStorage.getItem(STORAGE_KEY_LANG);
  return SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG;
}
let currentLang = getStoredLang();

/* -------------------------------------------------
   2️⃣  Render dynamic content blocks
   ------------------------------------------------- */
function renderServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) {return;}
  grid.innerHTML = services.map(s => `
    <article class="bg-surface p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div class="w-12 h-12 bg-primary-deep/10 rounded-lg flex items-center justify-center mb-4 text-primary-deep">
        <span class="text-lg">${s.icon}</span>
      </div>
      <h3 class="text-lg font-semibold text-primary mb-2">${s.name}</h3>
      <p class="text-secondary text-sm">${s.description}</p>
    </article>
  `).join("");
}

function renderTeam(t) {
  const grid = document.getElementById("team-grid");
  if (!grid) {return;}
  grid.innerHTML = professionals.map(p => `
    <article class="bg-surface p-6 rounded-lg border border-gray-200 shadow-sm text-center">
      <img src="${p.image}"
           alt="Foto de ${p.name}"
           class="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
           onerror="this.src='assets/images/hero.svg'; this.alt='Placeholder de imagen';">
      <h3 class="text-lg font-semibold text-primary mb-1">${p.name}</h3>
      <p class="text-secondary text-sm mb-3">${p.specialty}</p>
      <span class="text-xs text-primary-deep font-medium bg-primary-deep/10 px-2 py-1 rounded">${t.team.demo}</span>
    </article>
  `).join("");
}

function renderSelectSpecialties(t) {
  const select = document.getElementById("specialty");
  if (!select) {return;}
  select.innerHTML = `<option value="">${t.appointment.selectSpecialty}</option>` +
    services.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
}

/* -------------------------------------------------
   3️⃣  Change language & update UI
   ------------------------------------------------- */
function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {lang = DEFAULT_LANG;}
  const t = getTranslations(lang);
  currentLang = lang;
  sessionStorage.setItem(STORAGE_KEY_LANG, lang);

  // <html lang>
  htmlEl.lang = lang;

  // Navigation (using data-nav)
  navLinks.forEach(link => {
    const key = link.dataset.nav;
    const span = link.querySelector(".nav-text");
    if (t.nav[key] && span) {
      span.textContent = t.nav[key];
    }
  });

  // Hero
  document.getElementById("hero-title").textContent = t.hero.title;
  document.getElementById("hero-description").textContent = t.hero.description;
  const cta = document.getElementById("hero-cta");
  cta.textContent = t.hero.cta;
  cta.setAttribute("aria-label", t.hero.cta);
  document.getElementById("hero-image").alt = t.hero.imgAlt;

  // Section titles & descriptions
  const setText = (id, value) => { const el = document.getElementById(id); if (el) {el.textContent = value;} };
  setText("services-title", t.services.title);
  setText("team-title", t.team.title);
  setText("testimonials-title", t.testimonials.title);
  setText("appointment-title", t.appointment.title);
  setText("contact-title", t.contact.title);

  // Description paragraphs are next siblings of titles in each section
  const descMap = {
    "services-desc": t.services.description,
    "team-desc": t.team.description,
    "testimonials-desc": t.testimonials.description,
    "appointment-desc": t.appointment.description,
    "contact-desc": t.contact.description
  };
  Object.entries(descMap).forEach(([id, val]) => { const el = document.getElementById(id); if (el) {el.textContent = val;} });

  // Appointment form labels
  const labelMap = {
    "name-label": t.appointment.name,
    "dni-label": t.appointment.dni,
    "email-label": t.appointment.email,
    "phone-label": t.appointment.phone,
    "specialty-label": t.appointment.specialty,
    "date-label": t.appointment.date,
    "time-label": t.appointment.time
  };
  Object.entries(labelMap).forEach(([id, val]) => { const el = document.getElementById(id); if (el) {el.textContent = val;} });

  // Appointment submit button
  const submitBtn = document.querySelector("#appointment-form button[type='submit']");
  if (submitBtn) {submitBtn.textContent = t.appointment.submit;}

  // Demo notice
  const demoNotice = document.getElementById("appointment-demo-notice");
  if (demoNotice) {demoNotice.textContent = t.appointment.demoNotice;}

  // Footer
  setText("footer-text", t.footer.text);

  // Update visible language label
  if (currentLangLabel) {
    currentLangLabel.textContent = lang.toUpperCase();
  }

  // Language buttons – indicate active
  langButtons.forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("bg-primary-deep", isActive);
    btn.classList.toggle("bg-gray-200", !isActive);
    btn.classList.toggle("text-white", isActive);
    btn.classList.toggle("text-primary", !isActive);
  });

  // Close language dropdown after selecting
  if (langMenu) {
    langMenu.classList.add("hidden");
    if (langToggle) {
      langToggle.setAttribute("aria-expanded", "false");
    }
  }

  // Re-render dynamic content
  renderServices(t);
  renderTeam(t);
  renderSelectSpecialties(t);
}

/* -------------------------------------------------
   4️⃣  Mobile menu: open / close
   ------------------------------------------------- */
function toggleMobileMenu() {
  const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.classList.toggle("hidden", expanded);
}

function closeMobileMenuIfOpen() {
  if (mobileMenuBtn.getAttribute("aria-expanded") === "true") {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.add("hidden");
  }
}

/* -------------------------------------------------
   5️⃣  Event listeners
   ------------------------------------------------- */
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeMobileMenuIfOpen();
  });
});

setupLanguageSwitcher(getTranslations, setLang);
initNavigation();

/* Language dropdown toggle */
if (langToggle && langMenu) {
  langToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const expanded = langToggle.getAttribute("aria-expanded") === "true";
    langToggle.setAttribute("aria-expanded", String(!expanded));
    langMenu.classList.toggle("hidden", expanded);
  });
}

/* Close language dropdown when clicking outside */
window.addEventListener("click", (event) => {
  if (langToggle && langMenu && !langToggle.contains(event.target) && !langMenu.contains(event.target)) {
    langMenu.classList.add("hidden");
    langToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMobileMenuIfOpen();
  }
});

/* -------------------------------------------------
   6️⃣  Initialise
   ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
  renderServices();
  renderTeam(getTranslations(currentLang));
  renderSelectSpecialties(getTranslations(currentLang));

  initAppointmentForm("appointment-form", (result) => {
    const resultEl = document.getElementById("appointment-result");
    if (resultEl) {
      const t = getTranslations(currentLang);
      resultEl.classList.remove("hidden", "text-error", "text-success");
      resultEl.classList.add("text-success", "mt-4", "text-sm", "font-medium");
      resultEl.textContent = t.appointment.successMessage.replace("{ref}", result.reference);
      resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});
