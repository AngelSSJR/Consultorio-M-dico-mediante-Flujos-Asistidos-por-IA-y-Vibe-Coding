export function setupLanguageSwitcher(getTranslations, setLang) {
  const buttons = document.querySelectorAll('#lang-menu button[data-lang]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
    });
  });
}
