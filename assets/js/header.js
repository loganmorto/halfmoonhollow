// document.addEventListener("DOMContentLoaded", function () {
//     const navWrapper = document.querySelector(".nav-wrapper");
//     const headerRight = document.querySelector(".header-left");
//     const header = document.querySelector("header");

//     function updateNavPosition() {
//         if (window.innerWidth > 768) {
//             if (!headerRight.contains(navWrapper)) {
//                 headerRight.appendChild(navWrapper);
//             }
//         } else {
//             if (!Array.from(header.children).includes(navWrapper)) {
//                 header.appendChild(navWrapper); // Move it back as a direct child of <header>
//             }
//         }
//     }

//     // Run on initial load
//     updateNavPosition();

//     // Run on window resize
//     window.addEventListener("resize", updateNavPosition);
//   });