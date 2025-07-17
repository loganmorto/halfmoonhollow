
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("review-modal");
  const modalText = document.getElementById("modal-text");
  const modalStars = document.getElementById("modal-stars");

  document.querySelectorAll(".read-more").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const fullText = link.closest(".review-content").dataset.fulltext;
      const rating = parseInt(link.closest(".google-review-card").dataset.rating, 10);

      modalText.textContent = fullText;

      // Render stars
      modalStars.innerHTML = "";
      for (let i = 0; i < rating; i++) {
        modalStars.innerHTML += '<span class="star">★</span>';
      }

      modal.classList.add("visible");
    });
  });

  document.querySelector(".modal-close").addEventListener("click", () => {
    modal.classList.remove("visible");
  });

  document.querySelector(".modal-overlay").addEventListener("click", () => {
    modal.classList.remove("visible");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("visible");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector('.google-reviews-carousel');
  const cards = document.querySelectorAll('.google-review-card');
  const dotsContainer = document.getElementById('review-dots');

  // Create a dot for each card
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'review-dot';
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.review-dot');

  function updateDots() {
    const scrollLeft = carousel.scrollLeft;
    const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(carousel).gap || 16);
    const index = Math.round(scrollLeft / cardWidth);

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  carousel.addEventListener('scroll', () => {
    requestAnimationFrame(updateDots);
  });

  // Set first dot active on load
  updateDots();
});



