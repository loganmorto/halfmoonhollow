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
      const newScrollY = window.scrollY;
      const delta = newScrollY - lastScrollY;
  
      // Only apply if delta is not zero (actually scrolled)
      if (delta !== 0) {
        currentTop = clamp(currentTop - delta, minTop, maxTop);
        header.style.top = `${currentTop}px`;
      }
  
      lastScrollY = newScrollY;
    }
  
    window.addEventListener("scroll", () => {
      requestAnimationFrame(updateHeaderPosition);
    });
  });