/* =========================================================
   KHMER CALCULATOR HUB
   UI EFFECTS - animations & micro-interactions
   Pure visual layer: never touches calculator / auth logic.
   ========================================================= */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const canHover = window.matchMedia("(hover: hover)").matches;

  const $ = (selector, root = document) => root.querySelector(selector);

  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  /* -------------------------------------------------------
     PAGE TYPE (auth / dashboard pages get an aurora backdrop)
  ------------------------------------------------------- */

  if (!$(".hero-section") && !$(".calculator-page")) {
    document.body.classList.add("plain-page");
  }

  /* -------------------------------------------------------
     SCROLL PROGRESS + NAVBAR + BACK TO TOP
  ------------------------------------------------------- */

  const progress = document.createElement("div");
  progress.id = "scrollProgress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  const toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
  document.body.appendChild(toTop);

  const navbar = $(".navbar");

  let ticking = false;

  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const y = window.scrollY;

    progress.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);

    if (navbar) navbar.classList.toggle("scrolled", y > 12);

    toTop.classList.toggle("show", y > 500);

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );

  onScroll();

  /* -------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------- */

  const revealGroups = [
    ".section-heading",
    ".calculators-section > .container > .text-center",
    ".category-filter",
    ".popular-section .row > div",
    "#calculatorGrid > div",
    ".tools-section .row > div",
    ".tool-list a",
    ".dashboard-item",
    ".about-section .container > *",
    "footer .row > div",
    ".ad-placeholder",
  ];

  function setupReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;

          observer.unobserve(el);

          el.classList.add("in");

          // Remove helper classes afterwards so hover transforms work again
          const delay = parseInt(el.style.getPropertyValue("--d")) || 0;

          setTimeout(() => {
            el.classList.remove("reveal", "in");
            el.style.removeProperty("--d");
          }, 900 + delay);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealGroups.forEach((selector) => {
      $$(selector).forEach((el, index) => {
        if (el.classList.contains("reveal")) return;

        el.classList.add("reveal");

        el.style.setProperty("--d", Math.min(index % 8, 7) * 70 + "ms");

        observer.observe(el);
      });
    });
  }

  setupReveal();

  /* -------------------------------------------------------
     HERO: orbs, floating symbols, spotlight
  ------------------------------------------------------- */

  const hero = $(".hero-section");

  if (hero && !reduceMotion) {
    const orbs = document.createElement("div");
    orbs.className = "hero-orbs";
    orbs.setAttribute("aria-hidden", "true");

    orbs.innerHTML = "<span></span><span></span><span></span>";

    const symbols = ["+", "−", "×", "÷", "%", "=", "π", "√", "∑"];

    symbols.forEach((symbol, i) => {
      const s = document.createElement("span");

      s.className = "float-symbol";
      s.textContent = symbol;

      s.style.setProperty("--x", ((i * 11 + 5) % 96) + "%");
      s.style.setProperty("--s", 22 + ((i * 7) % 26) + "px");
      s.style.setProperty("--dur", 16 + ((i * 3) % 12) + "s");
      s.style.setProperty("--delay", -(i * 2.1) + "s");

      orbs.appendChild(s);
    });

    hero.insertBefore(orbs, hero.firstChild);

    if (canHover) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();

        hero.style.setProperty("--hx", e.clientX - r.left + "px");
        hero.style.setProperty("--hy", e.clientY - r.top + "px");
      });
    }
  }

  /* -------------------------------------------------------
     HERO PREVIEW: chips, tilt, count-up, key highlight
  ------------------------------------------------------- */

  const preview = $(".calculator-preview");

  if (preview) {
    ["bi-percent", "bi-graph-up-arrow", "bi-piggy-bank"].forEach((icon, i) => {
      const chip = document.createElement("div");

      chip.className = "preview-chip c" + (i + 1);
      chip.setAttribute("aria-hidden", "true");
      chip.innerHTML = `<i class="bi ${icon}"></i>`;

      preview.appendChild(chip);
    });

    if (!reduceMotion && canHover) {
      preview.addEventListener("pointermove", (e) => {
        const r = preview.getBoundingClientRect();

        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;

        preview.style.setProperty("--ry", (x * 14).toFixed(2) + "deg");
        preview.style.setProperty("--rx", (-y * 14).toFixed(2) + "deg");
      });

      preview.addEventListener("pointerleave", () => {
        preview.style.setProperty("--rx", "0deg");
        preview.style.setProperty("--ry", "0deg");
      });
    }

    // Count-up for the demo GPA value
    const value = $(".preview-screen strong", preview);

    if (value && !reduceMotion) {
      const target = parseFloat(value.textContent);

      if (!isNaN(target)) {
        const start = performance.now();
        const duration = 1800;

        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);

          value.textContent = (target * eased).toFixed(2);

          if (t < 1) requestAnimationFrame(step);
        };

        setTimeout(() => requestAnimationFrame(step), 700);
      }
    }

    // Keys light up one after another like a live calculator
    const keys = $$(".preview-buttons div", preview);

    if (keys.length && !reduceMotion) {
      setInterval(() => {
        if (document.hidden) return;

        const key = keys[Math.floor(Math.random() * keys.length)];

        key.classList.add("lit");

        setTimeout(() => key.classList.remove("lit"), 420);
      }, 900);
    }

    keys.forEach((key) => {
      key.addEventListener("click", () => {
        key.classList.add("lit");

        setTimeout(() => key.classList.remove("lit"), 300);
      });
    });
  }

  /* -------------------------------------------------------
     CARD GLOW + 3D TILT
  ------------------------------------------------------- */

  if (canHover && !reduceMotion) {
    document.addEventListener(
      "pointermove",
      (e) => {
        const card = e.target.closest && e.target.closest(".calculator-card");

        if (!card) return;

        const r = card.getBoundingClientRect();

        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        card.style.setProperty("--mx", x + "px");
        card.style.setProperty("--my", y + "px");
        card.style.setProperty("--ry", ((x / r.width - 0.5) * 8).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((0.5 - y / r.height) * 8).toFixed(2) + "deg");
      },
      { passive: true },
    );

    document.addEventListener(
      "pointerout",
      (e) => {
        const card = e.target.closest && e.target.closest(".calculator-card");

        if (!card || card.contains(e.relatedTarget)) return;

        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      },
      { passive: true },
    );
  }

  /* -------------------------------------------------------
     CATEGORY FILTER: re-animate cards that appear
  ------------------------------------------------------- */

  $$(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (reduceMotion) return;

      // wait for the page's own filter code to toggle display
      setTimeout(() => {
        let n = 0;

        $$(".calculator-card-wrapper").forEach((card) => {
          if (card.style.display === "none") return;

          card.classList.remove("pop");

          void card.offsetWidth;

          card.style.setProperty("--d", Math.min(n++, 10) * 45 + "ms");

          card.classList.add("pop");
        });
      }, 0);
    });
  });

  /* -------------------------------------------------------
     BUTTON RIPPLE
  ------------------------------------------------------- */

  if (!reduceMotion) {
    document.addEventListener("pointerdown", (e) => {
      const target =
        e.target.closest &&
        e.target.closest(".btn, .category-btn, .search-box button, .language-btn");

      if (!target || target.disabled) return;

      const r = target.getBoundingClientRect();

      const size = Math.max(r.width, r.height);

      const ripple = document.createElement("span");

      ripple.className = "ripple";

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - r.left - size / 2 + "px";
      ripple.style.top = e.clientY - r.top - size / 2 + "px";

      target.appendChild(ripple);

      ripple.addEventListener("animationend", () => ripple.remove());
    });
  }

  /* -------------------------------------------------------
     SMOOTH PAGE TRANSITION BETWEEN INTERNAL PAGES
  ------------------------------------------------------- */

  if (!reduceMotion) {
    document.addEventListener("click", (e) => {
      const link = e.target.closest && e.target.closest("a[href]");

      if (
        !link ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const url = new URL(link.href, location.href);

      if (
        url.origin !== location.origin ||
        url.pathname === location.pathname ||
        !/\.html?$|\/$/.test(url.pathname)
      ) {
        return;
      }

      e.preventDefault();

      document.body.classList.add("leaving");

      setTimeout(() => {
        location.href = url.href;
      }, 220);
    });

    // Restore page when coming back through the browser cache
    window.addEventListener("pageshow", () =>
      document.body.classList.remove("leaving"),
    );
  }
})();
