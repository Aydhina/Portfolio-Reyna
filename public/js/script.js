function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const icon = document.getElementById("music-icon");

  if (audio.paused) {
    audio.play()
      .then(() => {
        icon.classList.remove("fa-volume-mute");
        icon.classList.add("fa-volume-up");
      })
      .catch(err => console.log("Autoplay diblokir:", err));
  } else {
    audio.pause();
    icon.classList.remove("fa-volume-up");
    icon.classList.add("fa-volume-mute");
  }
}

function toggleSocials() {
  document.querySelector(".social-menu").classList.toggle("active");
}

let loveCount = 0;
const counter = document.getElementById("love-counter");

document.getElementById("love-btn").addEventListener("click", () => {
  loveCount++;
  counter.textContent = loveCount; // update angka

  const container = document.getElementById("love-container");
  const love = document.createElement("div");
  love.classList.add("love");

  love.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 
               19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  `;

  // Random warna
  const colors = ["#ff4d6d", "#ff7eb9", "#ff65a3", "#f72585", "#fb6f92"];
  love.querySelector("path").setAttribute(
    "fill",
    colors[Math.floor(Math.random() * colors.length)]
  );

  // Random posisi kanan
  love.style.right = Math.floor(Math.random() * 40) + "px";

  container.appendChild(love);

  setTimeout(() => love.remove(), 3000);
});
