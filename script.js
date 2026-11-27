const orderButtons = document.querySelectorAll("[data-order-mode]");
const orderFeedback = document.querySelector(".order-feedback");
const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

const setMenuOpen = (isOpen) => {
  navbar.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
};

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a, .location-btn")) {
    setMenuOpen(false);
  }
});

document.addEventListener("click", (event) => {
  const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";
  if (
    menuIsOpen &&
    !primaryNavigation.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 951px)").matches) {
    setMenuOpen(false);
  }
});

orderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    orderButtons.forEach((option) => {
      const selected = option === button;
      option.setAttribute("aria-pressed", String(selected));
    });

    orderFeedback.textContent = `${button.dataset.orderMode} selected.`;
    orderFeedback.hidden = false;
  });
});
