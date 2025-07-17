
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");

  let lastScrollY = window.scrollY;
  let currentTop = 0;
  const minTop = -40;
  const maxTop = 0;

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function updateHeaderPosition() {
    if (window.innerWidth <= 968) return; // Stop for small screens

    const newScrollY = window.scrollY;
    const delta = newScrollY - lastScrollY;

    if (delta !== 0) {
      currentTop = clamp(currentTop - delta, minTop, maxTop);
      header.style.top = `${currentTop}px`;
    }

    lastScrollY = newScrollY;
  }

  window.addEventListener("scroll", () => {
    requestAnimationFrame(updateHeaderPosition);
  });

  // Reset header top if screen is resized smaller than 969
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 968) {
      header.style.top = "0px";
      currentTop = 0;
    }
  });
});

