/* ---------- NAVBAR ---------- */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navbar = document.querySelector(".navbar");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
  navbar.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    navbar.classList.remove("active");
  });
});

/* ---------- PARALLAX MOTION ---------- */
(function () {
  const l0 = document.querySelector(".parallax-layer.layer-0");
  const l1 = document.querySelector(".parallax-layer.layer-1");
  window.addEventListener(
    "scroll",
    () => {
      const s = window.scrollY;

      l0.style.transform = `translateY(${s * 0.12}px)`;
      l1.style.transform = `translateY(${s * 0.06}px)`;
    },
    { passive: true }
  );
})();

/* ---------- PARTICLE CANVAS (lightweight) ---------- */
(function () {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = innerWidth),
    h = (canvas.height = innerHeight);
  window.addEventListener("resize", () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  });

  const N = Math.max(40, Math.floor((w * h) / 90000));
  const particles = [];
  for (let i = 0; i < N; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: 0.12 + Math.random() * 0.18,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, `rgba(255,80,80,${p.alpha * 0.6})`);
      g.addColorStop(0.5, `rgba(153,11,11,${p.alpha * 0.15})`);
      g.addColorStop(1, `rgba(153,11,11,0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- REVEAL ON SCROLL ---------- */
(function () {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.18 }
  );
  reveals.forEach((r) => observer.observe(r));
})();

/* ---------- CAROUSEL: automatic fade + zoom (per carousel) ---------- */
(function () {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".slide"));
    const id = carousel.id;
    const dotsContainer = document.querySelector(
      `.dots[data-carousel="${id}"]`
    );

    slides.forEach((s, i) => {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.children);
    let idx = 0;
    let anim;
    function show(i) {
      slides.forEach((s, si) => s.classList.toggle("show", si === i));
      dots.forEach((d, di) => d.classList.toggle("active", di === i));
    }
    function goTo(i) {
      idx = i;
      show(idx);
    }
    function next() {
      idx = (idx + 1) % slides.length;
      show(idx);
    }

    show(0);

    setInterval(next, 4200 + Math.floor(Math.random() * 800));
  });
})();

/* ---------- NAV ACTIVE (highlight simple) ---------- */
(function () {
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = Array.from(navLinks).map((link) =>
    document.querySelector(link.getAttribute("href"))
  );

  function highlight() {
    const top = window.scrollY + innerHeight / 3;
    let activeIndex = 0;
    sections.forEach((section, i) => {
      if (section && top >= section.offsetTop) activeIndex = i;
    });

    navLinks.forEach((link, i) =>
      link.classList.toggle("active", i === activeIndex)
    );
  }

  window.addEventListener("scroll", highlight, { passive: true });
  highlight();
})();

/* ---------- READ MORE / COLLAPSE TEXT BUTTON ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((button) => {
    const section = button.closest(".story-left");
    const textBlock = section.querySelector(".text-collapse");
    let expanded = false;

    button.addEventListener("click", () => {
      expanded = !expanded;
      textBlock.style.maxHeight = expanded
        ? textBlock.scrollHeight + "px"
        : "150px";
      button.textContent = expanded
        ? "Tampilkan Lebih Sedikit"
        : "Baca Selengkapnya..";
    });
  });
});
