/* ==================================
   BAVANI BIRTHDAY WEBSITE
   FINAL COMPLETE SCRIPT
================================== */


// SETTINGS

const PASSWORD = "1204";

const BIRTHDAY = new Date(
  "2026-12-04T00:00:00+05:30"
);

// true = Test website now
// false = Birthday countdown lock
const TEST_MODE = true;


// GLOBAL VARIABLES

let currentPage = 1;
let pin = "";

let musicStarted = false;

let scratchDone = false;
let canvas = null;
let ctx = null;
let drawing = false;

let typingStarted = false;

let openedMessages = new Set();

const pages = document.querySelectorAll(".page");
const progressDots = document.querySelectorAll(".progress span");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");


// ==================================
// BACKGROUND STARS
// ==================================

const particles = document.getElementById("particles");

for (let i = 0; i < 75; i++) {

  const star = document.createElement("span");

  star.className = "star";
  star.textContent = "✦";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  star.style.fontSize =
    (Math.random() * 10 + 5) + "px";

  star.style.animationDelay =
    Math.random() * 3 + "s";

  particles.appendChild(star);

}


// ==================================
// FALLING PETALS
// ==================================

const petals = document.getElementById("petals");

for (let i = 0; i < 20; i++) {

  const petal = document.createElement("span");

  petal.className = "petal";

  petal.textContent =
    ["🌸", "🌹", "✨", "💗"][i % 4];

  petal.style.left =
    Math.random() * 100 + "%";

  petal.style.animationDuration =
    (7 + Math.random() * 9) + "s";

  petal.style.animationDelay =
    Math.random() * 8 + "s";

  petal.style.fontSize =
    (12 + Math.random() * 13) + "px";

  petals.appendChild(petal);

}


// ==================================
// BACKGROUND MUSIC
// ==================================

async function startMusic() {

  try {

    await bgMusic.play();

    musicStarted = true;

    musicBtn.textContent = "🎵 Music: ON";

  } catch (error) {

    musicBtn.textContent = "🎵 TAP FOR MUSIC";

  }

}


// Browser autoplay restrictions

document.addEventListener(
  "click",
  function firstClick() {

    if (!musicStarted) {
      startMusic();
    }

  },
  { once: true }
);


musicBtn.addEventListener("click", async () => {

  if (bgMusic.paused) {

    await startMusic();

  } else {

    bgMusic.pause();

    musicStarted = false;

    musicBtn.textContent = "🎵 Music: OFF";

  }

});


// ==================================
// REAL TIME COUNTDOWN
// ==================================

function updateCountdown() {

  const now = new Date();

  const diff =
    BIRTHDAY.getTime() - now.getTime();

  const continueButton =
    document.getElementById("countContinue");

  const countNote =
    document.getElementById("countNote");


  if (diff <= 0) {

    ["days", "hours", "minutes", "seconds"].forEach(id => {

      document.getElementById(id).textContent = "00";

    });

    countNote.textContent =
      "It's your special day! Happy Birthday, Bavani! 🎂💖";

    continueButton.disabled = false;

    continueButton.textContent = "CONTINUE ✨";

    return;

  }


  const days = Math.floor(diff / 86400000);

  const hours = Math.floor(
    (diff % 86400000) / 3600000
  );

  const minutes = Math.floor(
    (diff % 3600000) / 60000
  );

  const seconds = Math.floor(
    (diff % 60000) / 1000
  );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");


  if (TEST_MODE) {

    continueButton.disabled = false;

    continueButton.textContent =
      "TEST NEXT PAGE 🧪";

    countNote.textContent =
      "Test Mode ON - Preview your surprise 💗";

  } else {

    continueButton.disabled = true;

    continueButton.textContent =
      "PLEASE WAIT ✨";

    countNote.textContent =
      "Counting down to your special moment ♡";

  }

}


updateCountdown();

setInterval(updateCountdown, 1000);


// ==================================
// PAGE NAVIGATION
// ==================================

function showPage(number) {

  currentPage = number;

  pages.forEach((page, index) => {

    page.classList.toggle(
      "active",
      index === number - 1
    );

  });


  progressDots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index <= number - 1
    );

  });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (number === 6) {
    setupScratch();
  }

  if (number === 7) {
    startTyping();
  }

}


// NEXT PAGE

function nextPage() {

  // Countdown lock

  if (currentPage === 2) {

    const birthdayReached =
      new Date() >= BIRTHDAY;

    if (!birthdayReached && !TEST_MODE) {

      alert(
        "Your surprise unlocks on 4 December 2026 at 12:00 AM 💗"
      );

      return;

    }

  }


  // 26 messages lock

  if (currentPage === 4) {

    if (openedMessages.size !== 26) {

      alert(
        "Please open all 26 messages first! 💌"
      );

      return;

    }

  }


  if (currentPage < 8) {

    showPage(currentPage + 1);

  }

}


// RESTART

function restart() {

  pin = "";

  updatePinDisplay();

  showPage(1);

}


// ==================================
// PASSWORD SYSTEM
// ==================================

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

  document.querySelectorAll(".pin-dot").forEach(
    (dot, index) => {

      dot.classList.toggle(
        "filled",
        index < pin.length
      );

    }
  );

}


function checkPin() {

  const message =
    document.getElementById("pinMessage");

  if (pin === PASSWORD) {

    message.textContent =
      "Correct! Welcome, Bavani 💖";

    setTimeout(() => {

      showPage(4);

    }, 700);

  } else {

    message.textContent =
      "Oops! Try again 💗";

    pin = "";

    updatePinDisplay();

  }

}


// ==================================
// 26 ALPHABET MESSAGES
// ==================================

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


const letters =
  document.getElementById("letters");

const lettersNextButton =
  document.getElementById("lettersNext");

const letterStatus =
  document.getElementById("letterStatus");


// Initially locked

lettersNextButton.disabled = true;

lettersNextButton.textContent =
  "OPEN ALL 26 MESSAGES 💌";


// CREATE CARDS

messages.forEach((message, index) => {

  const card = document.createElement("button");

  card.className = "letter-card";

  const letter =
    String.fromCharCode(65 + index);

  card.textContent = letter;

  card.setAttribute(
    "aria-label",
    "Double tap to reveal message"
  );


  function flip() {

    const isFlipped =
      card.classList.toggle("flipped");


    if (isFlipped) {

      card.textContent = message;

      // Count this message only once

      openedMessages.add(index);

      card.style.boxShadow =
        "0 0 25px #ffd18b, 0 0 35px #ff58da";

      checkAllMessages();

    } else {

      card.textContent = letter;

    }

  }


  // Desktop double click

  card.addEventListener("dblclick", flip);


  // Mobile double tap

  let lastTap = 0;

  card.addEventListener("touchend", (event) => {

    const now = Date.now();

    if (now - lastTap < 350) {

      event.preventDefault();

      flip();

      lastTap = 0;

    } else {

      lastTap = now;

    }

  });


  letters.appendChild(card);

});


// CHECK ALL 26 MESSAGES

function checkAllMessages() {

  const count = openedMessages.size;

  letterStatus.textContent =
    `Opened: ${count} / 26 💗`;


  if (count === 26) {

    lettersNextButton.disabled = false;

    lettersNextButton.textContent =
      "ALL 26 OPENED! NEXT ✨";

    sparkle();

  } else {

    lettersNextButton.disabled = true;

    lettersNextButton.textContent =
      `OPENED ${count}/26 💌`;

  }

}


// ==================================
// GIFT BOX
// ==================================

function openGift() {

  document.getElementById("bigGift").textContent =
    "💝";

  document
    .getElementById("giftMessage")
    .classList.remove("hidden");

  sparkle();

}


// ==================================
// SCRATCH CARD
// ==================================

function setupScratch() {

  if (scratchDone || canvas) return;

  canvas =
    document.getElementById("scratchCanvas");

  ctx = canvas.getContext("2d");


  const rect =
    canvas.getBoundingClientRect();

  const ratio =
    window.devicePixelRatio || 1;


  canvas.width = rect.width * ratio;

  canvas.height = rect.height * ratio;

  ctx.scale(ratio, ratio);


  // Scratch cover

  ctx.fillStyle = "#b6a0b9";

  ctx.fillRect(
    0,
    0,
    rect.width,
    rect.height
  );


  ctx.fillStyle = "#8c7894";

  ctx.font = "bold 24px Poppins";

  ctx.textAlign = "center";

  ctx.fillText(
    "SCRATCH HERE ✨",
    rect.width / 2,
    rect.height / 2
  );


  ctx.font = "40px serif";

  ctx.fillText(
    "🎁",
    rect.width / 2,
    rect.height / 2 - 45
  );


  ctx.globalCompositeOperation =
    "destination-out";


  function scratch(e) {

    if (!drawing || scratchDone) return;

    e.preventDefault();

    const bounds =
      canvas.getBoundingClientRect();

    const pos = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top
    };


    ctx.beginPath();

    ctx.arc(
      pos.x,
      pos.y,
      24,
      0,
      Math.PI * 2
    );

    ctx.fill();

    checkScratch();

  }


  canvas.addEventListener("pointerdown", e => {

    drawing = true;

    canvas.setPointerCapture(e.pointerId);

    scratch(e);

  });


  canvas.addEventListener("pointermove", scratch);


  canvas.addEventListener("pointerup", () => {

    drawing = false;

  });


  canvas.addEventListener("pointercancel", () => {

    drawing = false;

  });

}


// ==================================
// SCRATCH PERCENTAGE
// ==================================

function checkScratch() {

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  let cleared = 0;


  for (
    let i = 3;
    i < imageData.data.length;
    i += 4
  ) {

    if (imageData.data[i] < 30) {

      cleared++;

    }

  }


  const total =
    imageData.data.length / 4;

  const percentage =
    (cleared / total) * 100;


  document.getElementById("scratchStatus").textContent =
    `Scratched: ${Math.floor(percentage)}% 💗`;


  // Reveal at 80%

  if (percentage >= 80 && !scratchDone) {

    scratchDone = true;

    canvas.style.transition =
      "opacity 1s";

    canvas.style.opacity = "0";


    setTimeout(() => {

      canvas.classList.add("hidden");

      document
        .getElementById("downloadGift")
        .classList.remove("hidden");

      document
        .getElementById("scratchNext")
        .classList.remove("hidden");

      document.getElementById("scratchStatus").textContent =
        "Your surprise is revealed! 💖✨";

      sparkle();

    }, 1000);

  }

}


// ==================================
// SPARKLE EFFECT
// ==================================

function sparkle() {

  for (let i = 0; i < 35; i++) {

    const star =
      document.createElement("span");

    star.textContent = "✨";

    star.style.position = "fixed";

    star.style.left =
      Math.random() * 100 + "vw";

    star.style.top =
      Math.random() * 100 + "vh";

    star.style.zIndex = "20";

    star.style.pointerEvents = "none";

    document.body.appendChild(star);


    setTimeout(() => {

      star.remove();

    }, 1800);

  }

}


// ==================================
// AUTO TYPING MESSAGE
// ==================================

const birthdayMessage =

`Happy Birthday, Bavani! 💗

I hope this new chapter brings you peace, laughter and beautiful memories.

Never forget that you are special and deserve the very best.

Keep smiling, keep dreaming and keep shining.

May every little wish in your heart come true. ✨

With lots of love. ❤️`;


function startTyping() {

  if (typingStarted) return;

  typingStarted = true;

  const target =
    document.getElementById("typedMessage");

  let index = 0;


  function type() {

    if (index < birthdayMessage.length) {

      target.textContent +=
        birthdayMessage[index];

      index++;

      setTimeout(type, 42);

    }

  }


  type();

}


// ==================================
// FORMSPREE REPLY FORM
// ==================================

const replyForm =
  document.getElementById("replyForm");


replyForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const status =
    document.getElementById("formStatus");

  const button =
    replyForm.querySelector("button");


  button.disabled = true;

  button.textContent = "SENDING...";


  try {

    const response = await fetch(
      replyForm.action,
      {
        method: "POST",
        body: new FormData(replyForm),
        headers: {
          Accept: "application/json"
        }
      }
    );


    if (response.ok) {

      status.textContent =
        "Your reply was sent successfully! 💖";

      replyForm.reset();

    } else {

      status.textContent =
        "Unable to send. Please try again.";

    }

  } catch (error) {

    status.textContent =
      "Network error. Please try again.";

  }


  button.disabled = false;

  button.textContent =
    "SEND YOUR REPLY 💗";

});


// ==================================
// INITIALIZE WEBSITE
// ==================================

updateCountdown();

showPage(1);
     
