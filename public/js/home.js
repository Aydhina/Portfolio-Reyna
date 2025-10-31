// =============================
// 🌟 UTILITY FUNCTIONS
// =============================
function openProject(url) {
  window.location.href = url;
}

// === NAVBAR RESPONSIVE ===
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
    });
  }
});


// =============================
// 🌟 TOGGLE PROJECTS
// =============================
function toggleProjects() {
  const hiddenProjects = document.querySelectorAll(
    "#portfolio .project.hidden"
  );
  const btn = document.getElementById("toggle-projects");

  hiddenProjects.forEach((p) => {
    p.style.display = p.style.display === "block" ? "none" : "block";
  });

  btn.textContent = btn.textContent.includes("More")
    ? "Show Less Projects"
    : "Show More Projects";
}

// =============================
// 🌟 SCROLL REVEAL ANIMATION
// =============================
const reveal = (els) => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.animate(
            [
              { opacity: 0, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 600, easing: "ease", fill: "forwards" }
          );
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
};
reveal(
  document.querySelectorAll(
    "section .section-title, .skills .skill, .grid .project, .about .bubble, .about .facts .chip"
  )
);

// =============================
// 🌟 MODAL HANDLING (add/edit)
// =============================
function showModal(modal) {
  modal.style.display = "flex";
  modal.classList.add("show");
}

function hideModal(modal) {
  modal.classList.remove("show");
  setTimeout(() => (modal.style.display = "none"), 250);
}

function openModal() {
  const modal = document.getElementById("projectModal");
  const form = document.getElementById("projectForm");
  document.getElementById("modalTitle").textContent = "Tambah Project";
  form.action = "/project/add";
  form.reset();
  showModal(modal);
}

function openEditModal(id, title, description, github, demo, extra) {
  const modal = document.getElementById("projectModal");
  const form = document.getElementById("projectForm");
  document.getElementById("modalTitle").textContent = "Edit Project";

  form.action = `/project/edit/${id}`;

  form.querySelector('input[name="title"]').value = title || "";
  form.querySelector('textarea[name="description"]').value = description || "";
  form.querySelector('input[name="github_url"]').value = github || "";
  form.querySelector('input[name="demo_url"]').value = demo || "";
  form.querySelector('input[name="extra_url"]').value = extra || "";

  showModal(modal);
}

function closeModal() {
  const addModal = document.getElementById("addProjectModal");
  const editModal = document.getElementById("projectModal");
  hideModal(addModal);
  hideModal(editModal);
}

// =============================
// 🌟 DELETE PROJECT
// =============================
function deleteProject(id) {
  if (confirm("Apakah yakin ingin menghapus project ini?")) {
    fetch(`/project/delete/${id}`, { method: "POST" })
      .then((res) => {
        if (res.ok) {
          alert("✅ Project berhasil dihapus!");
          location.reload();
        } else {
          alert("❌ Gagal menghapus project!");
        }
      })
      .catch((err) => console.error(err));
  }
}

// =============================
// 🌟 SKILLS ANIMATION
// =============================
const skills = document.querySelectorAll(".skill");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const bar = e.target.querySelector(".bar span");
        const percent = e.target.getAttribute("data-percent");
        bar.style.width = percent + "%";
        skillObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
skills.forEach((s) => skillObserver.observe(s));

document.querySelectorAll(".skill").forEach((skill) => {
  const percent = skill.getAttribute("data-percent");
  const numEl = skill.querySelector(".percent");
  let current = 0;
  const timer = setInterval(() => {
    current++;
    numEl.textContent = current + "%";
    if (current >= percent) clearInterval(timer);
  }, 20);
});

// =============================
// 🌟 TOGGLE ICON PROJECT GRID
// =============================
const toggleIcon = document.getElementById("toggle-icon");
if (toggleIcon) {
  toggleIcon.addEventListener("click", () => {
    const hiddenProjects = document.querySelectorAll(
      "#portfolio .project-card.hidden"
    );
    const showing =
      hiddenProjects.length > 0 && hiddenProjects[0].style.display === "block";
    hiddenProjects.forEach(
      (p) => (p.style.display = showing ? "none" : "block")
    );
    toggleIcon.classList.toggle("fa-chevron-up");
    toggleIcon.classList.toggle("fa-chevron-down");
  });
}

// =============================
// 🌟 DROPDOWN ACTION MENU
// =============================
document.addEventListener("click", function (e) {
  const isDropdownBtn = e.target.closest(".dropdown .btn-icon");
  const allDropdowns = document.querySelectorAll(".dropdown");

  allDropdowns.forEach((d) => {
    if (d.contains(e.target) && isDropdownBtn) {
      d.classList.toggle("open");
    } else {
      d.classList.remove("open");
    }
  });
});

// =============================
// 🌟 ABOUT TABS
// =============================
document.querySelectorAll(".about-tabs .tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".about-tabs .tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

// =============================
// 🌟 LOGIN MODAL
// =============================
function openLoginModal() {
  const modal = document.getElementById("loginModal");
  showModal(modal);
}

function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  hideModal(modal);
}

// Klik di luar modal = tutup
window.addEventListener("click", function (event) {
  const addModal = document.getElementById("addProjectModal");
  const editModal = document.getElementById("projectModal");
  const loginModal = document.getElementById("loginModal");

  if (event.target === addModal) hideModal(addModal);
  if (event.target === editModal) hideModal(editModal);
  if (event.target === loginModal) hideModal(loginModal);
});

// Biarkan login form dikirim normal
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function () {
    // biarkan default submit
  });
}

  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault(); // hentikan redirect default
    const confirmLogout = confirm("Apakah kamu yakin ingin logout?");
    if (confirmLogout) {
      // kalau user klik "OK", arahkan ke /logout
      window.location.href = logoutBtn.href;
    }
    // kalau user klik "Cancel", tidak terjadi apa-apa
  });