export function initNavigation() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      const mobileBtn = document.getElementById("mobile-menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileBtn && mobileBtn.getAttribute("aria-expanded") === "true") {
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileMenu.classList.add("hidden");
      }
    });
  });
}
