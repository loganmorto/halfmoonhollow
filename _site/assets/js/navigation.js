document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navWrapper = document.querySelector(".nav-wrapper");
    const overlay = document.querySelector(".menu-overlay");
    const header = document.querySelector("header");

    function isSmallScreen() {
        return window.innerWidth < 768;
    }

    function setupHamburgerMenu() {
        if (isSmallScreen()) {
            hamburger.addEventListener("click", toggleMenu);
            document.addEventListener("click", closeMenuOnOutsideClick);
        } else {
            hamburger.removeEventListener("click", toggleMenu);
            document.removeEventListener("click", closeMenuOnOutsideClick);
            navWrapper.classList.remove("open");
            hamburger.classList.remove("active");
            overlay.classList.remove("active"); // Ensure overlay is hidden
        }
    }

    function toggleMenu(event) {
        const isOpen = navWrapper.classList.toggle("open");
        hamburger.classList.toggle("active");
        overlay.classList.toggle("active", isOpen);
        event.stopPropagation();
    }
    
    function closeMenuOnOutsideClick(event) {
        if (!navWrapper.contains(event.target) && !hamburger.contains(event.target)) {
            navWrapper.classList.remove("open");
            hamburger.classList.remove("active");
            overlay.classList.remove("active");
        }
    }
    

    // Close the menu if overlay is clicked
    overlay.addEventListener("click", () => {
        navWrapper.classList.remove("open");
        hamburger.classList.remove("active");
        overlay.classList.remove("active");
    });

    setupHamburgerMenu();

    window.addEventListener("resize", () => {
        setupHamburgerMenu();
    });


    
});
