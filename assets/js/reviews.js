
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

