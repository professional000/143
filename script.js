
const PASSWORD = "1204";
const BIRTHDAY = new Date("2026-12-04T00:00:00+05:30");

let currentPage = 1;
let pin = "";
let musicStarted = false;
let scratchDone = false;
let scratchPercent = 0;

const pages = document.querySelectorAll(".page");
const progressDots = document.querySelectorAll(".progress span");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

// Background stars
const particles = document.getElementById("particles");

for (let i = 0; i < 75; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = "✦";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = (Math.random() * 10 + 5) + "px";
  star.style.animationDelay = Math.random() * 3 + "s";
  particles.appendChild(star);
}

// Falling petals
const petals = document.getElementById("petals");

for (let i = 0; i < 20; i++) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = ["🌸", "🌹", "✨", "💗"][i % 4];
  petal.style.left = Math.random() * 100 + "%";
  petal.style.animationDuration = (7 + Math.random() * 9) + "s";
  petal.style.animationDelay = Math.random() * 8 + "s";
  petal.style.fontSize = (12 + Math.random() * 13) + "px";
  petals.appendChild(petal);
}

// Music: browsers may block autoplay until a user gesture
async function startMusic() {
  try {
    await bgMusic.play();
    musicStarted = true;
    musicBtn.textContent = "🎵 Music: ON";
  } catch (error) {
    musicBtn.textContent = "🎵 TAP FOR MUSIC";
  }
}

function enableMusic() {
  if (!musicStarted) startMusic();
}

document.addEventListener("click", enableMusic, { once: true });

musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    await startMusic();
  } else {
    bgMusic.pause();
    musicStarted = false;
    musicBtn.textContent = "🎵 Music: OFF";
  }
});

// Countdown - uses the visitor's device clock
function updateCountdown() {
  const now = new Date();
  const diff = BIRTHDAY.getTime() - now.getTime();

  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    document.getElementById("countNote").textContent =
      "It's your special day! Happy Birthday, Bavani! 🎂💖";
    document.getElementById("countContinue").disabled = false;
    document.getElementById("countContinue").textContent = "CONTINUE ✨";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Navigation
function showPage(number) {
  currentPage = number;
  pages.forEach((page, index) => {
    page.classList.toggle("active", index === number - 1);
  });

  progressDots.forEach((dot, index) => {
    dot.classList.toggle("active", index <= number - 1);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (number === 6) setupScratch();
  if (number === 7) startTyping();
}

function nextPage() {
  if (currentPage < 8) showPage(currentPage + 1);
}

function restart() {
  pin = "";
  updatePinDisplay();
  showPage(1);
}

// PIN
function addPin(number) {
  if (pin.length >= 4) return;
  pin += number;
  updatePinDisplay();
}

function deletePin() {
  pin = pin.slice(0, -1);
  updatePinDisplay();
}

function clearPin() {
  pin = "";
  updatePinDisplay();
}

function updatePinDisplay() {
  document.querySelectorAll(".pin-dot").forEach((dot, index) => {
    dot.classList.toggle("filled", index < pin.length);
  });
}

function checkPin() {
  if (pin === PASSWORD) {
    document.getElementById("pinMessage").textContent = "Correct! Welcome, Bavani 💖";
    setTimeout(() => showPage(4), 700);
  } else {
    document.getElementById("pinMessage").textContent = "Oops! Try again 💗";
    pin = "";
    updatePinDisplay();
  }
}

// Alphabet cards
const messages = [
  "A - Amazing smile 💖",
  "B - Beautiful heart 🌹",
  "C - Cute always ✨",
  "D - Dream big 💫",
  "E - Extraordinary soul 💗",
  "F - Full of kindness 🌸",
  "G - Gorgeous smile 💕",
  "H - Happiness always 🌙",
  "I - Irreplaceable person 💝",
  "J - Just be yourself 🌷",
  "K - Keep shining ⭐",
  "L - Lovely heart 💖",
  "M - Magical moments ✨",
  "N - Never stop dreaming 🌹",
  "O - One of a kind 💗",
  "P - Pure happiness 🌸",
  "Q - Queen of smiles 👑",
  "R - Radiant beauty 🌟",
  "S - Stay special 💕",
  "T - Truly wonderful 💝",
  "U - Unforgettable soul 🌙",
  "V - Very precious 💖",
  "W - Wonderful person 🌷",
  "X - Xtraordinary always ✨",
  "Y - Your smile matters 💗",
  "Z - Zero reasons to stop smiling 🌹"
];

const letters = document.getElementById("letters");

messages.forEach((message, index) => {
  const card = document.createElement("button");
  card.className = "letter-card";
  card.textContent = String.fromCharCode(65 + index);
  card.setAttribute("aria-label", "Double tap to reveal message");
  let lastTap = 0;

  function flip() {
    card.classList.toggle("flipped");
    card.textContent = card.classList.contains("flipped")
      ? message : String.fromCharCode(65 + index);
  }

  card.addEventListener("dblclick", flip);

  card.addEventListener("touchend", () => {
    const now = Date.now();
    if (now - lastTap < 350) flip();
    lastTap = now;
  });

  letters.appendChild(card);
});

// Gift box
function openGift() {
  document.getElementById("bigGift").textContent = "💝";
  document.getElementById("giftMessage").classList.remove("hidden");
}

// Scratch card
let canvas, ctx, drawing = false;

function setupScratch() {
  if (scratchDone || canvas) return;

  canvas = document.getElementById("scratchCanvas");
  ctx = canvas.getContext("2d");

  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;

  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.scale(ratio, ratio);

  ctx.fillStyle = "#b6a0b9";
  ctx.fillRect(0, 0, rect.width, rect.height);

  // Scratch cover design
  ctx.fillStyle = "#8c7894";
  ctx.font = "bold 24px Poppins";
  ctx.textAlign = "center";
  ctx.fillText("SCRATCH HERE ✨", rect.width / 2, rect.height / 2);

  ctx.font = "40px serif";
  ctx.fillText("🎁", rect.width / 2, rect.height / 2 - 45);

  ctx.globalCompositeOperation = "destination-out";

  function getPosition(e) {
    const bounds = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return {
      x: point.clientX - bounds.left,
      y: point.clientY - bounds.top
    };
  }

  function scratch(e) {
    if (!drawing || scratchDone) return;
    e.preventDefault();

    const pos = getPosition(e);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkScratch();
  }

  canvas.addEventListener("pointerdown", e => {
    drawing = true;
    scratch(e);
  });

  canvas.addEventListener("pointermove", scratch);
  window.addEventListener("pointerup", () => drawing = false);
}

function checkScratch() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let cleared = 0;

  for (let i = 3; i < imageData.data.length; i += 4) {
    if (imageData.data[i] < 30) cleared++;
  }

  scratchPercent = cleared / (imageData.data.length / 4) * 100;

  document.getElementById("scratchStatus").textContent =
    `Scratched: ${Math.floor(scratchPercent)}% 💗`;

  if (scratchPercent >= 80 && !scratchDone) {
    scratchDone = true;
    canvas.style.transition = "opacity 1s";
    canvas.style.opacity = "0";

    setTimeout(() => {
      canvas.classList.add("hidden");
      document.getElementById("downloadGift").classList.remove("hidden");
      document.getElementById("scratchNext").classList.remove("hidden");
      document.getElementById("scratchStatus").textContent =
        "Your surprise is revealed! 💖✨";
      sparkle();
    }, 1000);
  }
}

// Sparkles
function sparkle() {
  for (let i = 0; i < 35; i++) {
    const star = document.createElement("span");
    star.textContent = "✨";
    star.style.position = "fixed";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.zIndex = "20";
    star.style.pointerEvents = "none";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1800);
  }
}

// Typing message
const birthdayMessage =
`Happy Birthday, Bavani! 💗

I hope this new chapter brings you peace, laughter and beautiful memories.

Never forget that you are special and deserve the very best.

Keep smiling, keep dreaming and keep shining.

May every little wish in your heart come true. ✨

With lots of love. ❤️`;

let typingStarted = false;

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;

  const target = document.getElementById("typedMessage");
  let index = 0;

  function type() {
    if (index < birthdayMessage.length) {
      target.textContent += birthdayMessage[index];
      index++;
      setTimeout(type, 42);
    }
  }

  type();
}

// Formspree reply submission
const replyForm = document.getElementById("replyForm");

replyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("formStatus");
  const button = replyForm.querySelector("button");

  button.disabled = true;
  button.textContent = "SENDING...";

  try {
    const response = await fetch(replyForm.action, {
      method: "POST",
      body: new FormData(replyForm),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      status.textContent = "Your reply was sent successfully! 💖";
      replyForm.reset();
    } else {
      status.textContent = "Unable to send. Please try again.";
    }
  } catch (error) {
    status.textContent = "Network error. Please try again.";
  }

  button.disabled = false;
  button.textContent = "SEND YOUR REPLY 💗";
});
    
