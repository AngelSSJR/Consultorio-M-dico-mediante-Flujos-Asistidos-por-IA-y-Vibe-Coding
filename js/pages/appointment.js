// js/pages/appointment.js
import { getTranslations } from "../i18n/i18n.js";
import { services } from "../data/services.js";
import { initAppointmentForm } from "../components/appointment-form.js";
import { STORAGE_KEY_LANG, DEFAULT_LANG, SUPPORTED_LANGS } from "../config/constants.js";

const htmlEl = document.documentElement;
const form = document.getElementById("appointment-form");
const specialtySelect = document.getElementById("specialty");
const resultEl = document.getElementById("appointment-result");
const resultText = document.getElementById("result-text");
const resultIcon = document.getElementById("result-icon");
const btnText = document.getElementById("btn-text");
const btnLoader = document.getElementById("btn-loader");
const submitBtn = document.getElementById("submit-btn");

const langButtons = document.querySelectorAll("#lang-menu button[data-lang]");
const langToggle = document.getElementById("lang-toggle");
const langMenu = document.getElementById("lang-menu");
const currentLangLabel = document.getElementById("current-lang-label");

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

let currentLang = SUPPORTED_LANGS.includes(sessionStorage.getItem(STORAGE_KEY_LANG))
  ? sessionStorage.getItem(STORAGE_KEY_LANG)
  : DEFAULT_LANG;

function renderLabels(t) {
  document.getElementById("page-title").textContent = t.appointment.title;
  document.getElementById("page-desc").textContent = t.appointment.description;
  document.getElementById("badge-demo").textContent = "Modo demostrativo";

  const labels = {
    "name-label": t.appointment.name,
    "dni-label": t.appointment.dni,
    "email-label": t.appointment.email,
    "phone-label": t.appointment.phone,
    "specialty-label": t.appointment.specialty,
    "date-label": t.appointment.date,
    "time-label": t.appointment.time,
  };
  Object.entries(labels).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) { el.textContent = val; }
  });

  const opt = document.getElementById("opt-select-specialty");
  if (opt) { opt.textContent = t.appointment.selectSpecialty; }

  if (btnText) { btnText.textContent = t.appointment.submit; }

  const dn = document.getElementById("demo-notice");
  if (dn) { dn.textContent = t.appointment.demoNotice; }

  document.getElementById("footer-text").textContent = t.footer.text;

  document.querySelectorAll(".nav-link").forEach((link) => {
    const key = link.dataset.nav;
    const span = link.querySelector(".nav-text");
    if (t.nav[key] && span) { span.textContent = t.nav[key]; }
  });

  if (currentLangLabel) { currentLangLabel.textContent = currentLang.toUpperCase(); }

  langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle("bg-primary-deep", isActive);
    btn.classList.toggle("bg-gray-200", !isActive);
    btn.classList.toggle("text-white", isActive);
    btn.classList.toggle("text-primary", !isActive);
  });
}

function renderSpecialties(t) {
  specialtySelect.innerHTML = `<option value="" id="opt-select-specialty">${t.appointment.selectSpecialty}</option>` +
    services.map((s) => `<option value="${s.id}">${s.name}</option>`).join("");
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) { lang = DEFAULT_LANG; }
  const t = getTranslations(lang);
  currentLang = lang;
  sessionStorage.setItem(STORAGE_KEY_LANG, lang);
  htmlEl.lang = lang;

  renderLabels(t);
  renderSpecialties(t);

  if (langMenu) {
    langMenu.classList.add("hidden");
    if (langToggle) { langToggle.setAttribute("aria-expanded", "false"); }
  }
}

function showResult(success, message) {
  resultEl.classList.remove("hidden");
  if (success) {
    resultEl.classList.remove("alert-error");
    resultEl.classList.add("alert-success");
    resultIcon.innerHTML = "<svg class=\"w-5 h-5 text-green-600\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-2.293-2.293a1 1 0 00-1.414 1.414l2.5 2.5a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\"></path></svg>";
  } else {
    resultEl.classList.remove("alert-success");
    resultEl.classList.add("alert-error");
    resultIcon.innerHTML = "<svg class=\"w-5 h-5 text-red-600\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z\" clip-rule=\"evenodd\"></path></svg>";
  }
  resultText.textContent = message;
  resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function setSubmitLoading(loading) {
  if (submitBtn) {
    submitBtn.disabled = loading;
    btnLoader.classList.toggle("hidden", !loading);
    btnText.classList.toggle("hidden", loading);
  }
}

initAppointmentForm("appointment-form",
  (result) => {
    const t = getTranslations(currentLang);
    setSubmitLoading(false);
    showResult(true, t.appointment.successMessage.replace("{ref}", result.reference));
    form.reset();
  },
  (errorMessage) => {
    setSubmitLoading(false);
    showResult(false, errorMessage);
  }
);

// Override button text during submit via initAppointmentForm inner logic is enough;
// we keep the visual loader by hooking submit event once more for the loader state.
form.addEventListener("submit", () => {
  setSubmitLoading(true);
});

// Language switcher
langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

if (langToggle && langMenu) {
  langToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const expanded = langToggle.getAttribute("aria-expanded") === "true";
    langToggle.setAttribute("aria-expanded", String(!expanded));
    langMenu.classList.toggle("hidden", expanded);
  });
}

window.addEventListener("click", (event) => {
  if (langToggle && langMenu && !langToggle.contains(event.target) && !langMenu.contains(event.target)) {
    langMenu.classList.add("hidden");
    langToggle.setAttribute("aria-expanded", "false");
  }
});

function toggleMobileMenu() {
  const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.classList.toggle("hidden", expanded);
}
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && mobileMenuBtn.getAttribute("aria-expanded") === "true") {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
});
