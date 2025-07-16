document.addEventListener("DOMContentLoaded", () => {
  runAnimation();
});

// === Timing Controls ===
const CHAR_DELAY_RANGE = [20, 60]; // ms between each character
const WORD_PAUSE = 130;            // ms after a space before starting a word
const HIGHLIGHT_DELAY = 130;        // ms pause after final letter before highlighting

const line1El = document.getElementById("line1-text");
const line2El = document.getElementById("line2-text");
const cursor = document.getElementById("cursor");

let idleTimer = null;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function blinkCursor(on) {
  cursor.classList.toggle("blink", on);
}

function resetIdleCursor() {
  blinkCursor(false);
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => blinkCursor(true), 800);
}

function moveCursorBefore(el) {
  if (!el || !el.parentNode) return;
  el.parentNode.insertBefore(cursor, el);
}

function moveCursorAfter(el) {
  if (!el || !el.parentNode) return;
  if (el.nextSibling) {
    el.parentNode.insertBefore(cursor, el.nextSibling);
  } else {
    el.parentNode.appendChild(cursor);
  }
}

function hideCursor() {
  cursor.style.visibility = "hidden";
  blinkCursor(false);
}

function showCursor() {
  cursor.style.visibility = "visible";
  resetIdleCursor();
}

function typeFromDOM(container, onComplete) {
  const flatEls = [];

  for (const node of container.childNodes) {
    if (node.nodeType === 1 && node.matches('span[data-word]')) {
      flatEls.push(...Array.from(node.querySelectorAll('span.hidden')));
    } else if (
      node.nodeType === 1 &&
      node.tagName === "SPAN" &&
      node.textContent === " "
    ) {
      flatEls.push(node);
    }
  }

  let i = 0;

  function revealNext() {
    if (i >= flatEls.length) {
      resetIdleCursor();
      onComplete && onComplete();
      return;
    }

    const current = flatEls[i];
    const next = flatEls[i + 1] || null;

    if (current.classList.contains("hidden")) {
      current.classList.remove("hidden");
    }

    if (current.textContent !== " ") {
      moveCursorAfter(current);
    } else if (next && next.classList.contains("hidden")) {
      moveCursorBefore(next);
    }

    resetIdleCursor();

    let delay = randomBetween(CHAR_DELAY_RANGE[0], CHAR_DELAY_RANGE[1]);

    if (
      current.textContent === " " &&
      next &&
      next.classList.contains("hidden")
    ) {
      delay += WORD_PAUSE;
    }

    i++;
    setTimeout(revealNext, delay);
  }

  revealNext();
}

function simulateHighlightThenUnderline(words, containerId, callback) {
  const container = document.getElementById(containerId);
  const wordSpans = Array.from(container.querySelectorAll("span[data-word]"));

  const firstIndex = wordSpans.findIndex(w => w.dataset.word === words[0]);
  const secondIndex = wordSpans.findIndex(w => w.dataset.word === words[1]);

  if (firstIndex === -1 || secondIndex !== firstIndex + 1) return;

  const word1 = wordSpans[firstIndex];
  const word2 = wordSpans[secondIndex];
  const space = word1.nextSibling; // the space between the two

  hideCursor();

  // Step 1: Wait before starting highlight
  setTimeout(() => {
    const partialWrapper = document.createElement("span");
    partialWrapper.className = "highlight";
    word2.parentNode.insertBefore(partialWrapper, word2);
    partialWrapper.appendChild(word2);

    // Step 2: Extend to full highlight
    setTimeout(() => {
      partialWrapper.parentNode.insertBefore(word2, partialWrapper);
      partialWrapper.remove();

      const fullWrapper = document.createElement("span");
      fullWrapper.className = "highlight";

      container.insertBefore(fullWrapper, word1);
      fullWrapper.appendChild(word1);
      fullWrapper.appendChild(space);
      fullWrapper.appendChild(word2);

      // Step 3: Add underline inside highlight
      setTimeout(() => {
        const underlineWrapper = document.createElement("span");
        underlineWrapper.className = "underline";
        while (fullWrapper.firstChild) {
          underlineWrapper.appendChild(fullWrapper.firstChild);
        }
        fullWrapper.appendChild(underlineWrapper);

        // Step 4: Remove highlight, restore cursor
        setTimeout(() => {
          fullWrapper.classList.remove("highlight");
          showCursor();
          if (callback) callback();
        }, 600);
      }, 600);
    }, 300);
  }, HIGHLIGHT_DELAY);
}

function runAnimation() {
  typeFromDOM(line1El, () => {
    simulateHighlightThenUnderline(["blank", "page"], "line1-text", () => {
      setTimeout(() => {
        document.getElementById("line2").style.visibility = "visible";
        typeFromDOM(line2El, () => {
          // Add delay after line2 typing before showing buttons
          setTimeout(() => {
            // Step 1: Reveal CTA buttons
            const cta = document.querySelector('.cta-hero-wrapper');
            cta.classList.add('visible');
            
            // 👉 Show the animated Google reviews element
            const reviewsEl = document.getElementById('google-reviews-short');
            reviewsEl?.classList.add('visible');            

            // 👉 Fade in border around hero-text
            const heroText = document.getElementById('hero-text');
            heroText.classList.add('border-visible');

            // Step 2: Animate video
            setTimeout(() => {
              const videoWrapper = document.querySelector('.hero-video-wrapper');
              const video = videoWrapper.querySelector('video');

              videoWrapper.classList.add('visible');

              if (video) {
                video.muted = true;
                video.playsInline = true;
                video.autoplay = true;
                video.setAttribute('muted', '');
                video.setAttribute('playsinline', '');
                video.setAttribute('autoplay', '');
                video.load();

                requestAnimationFrame(() => {
                  video.play().catch((e) => {
                    console.warn("Initial video play failed:", e);
                  });
                });

                video.addEventListener('canplay', () => {
                  if (video.paused) {
                    video.play().catch((e) => {
                      console.warn('Fallback video play on canplay failed:', e);
                    });
                  }
                });
              }
            }, 800); // delay after CTA animation
          }, 1000);
        });
      }, 1000); // delay before starting line2 typing
    });
  });
}
