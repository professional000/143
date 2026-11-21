
// BAVANI Birthday Website — 2026

const BIRTHDAY = new Date("2026-12-04T00:00:00+05:30").getTime();
const PASSWORD = "1204";

const pages = [...document.querySelectorAll(".page")];

function showPage(id) {
  pages.forEach(page =>
    page.classList.toggle("active", page.id === id)
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// STARS AND FALLING PETALS

const stars = document.getElementById("stars");

for (let i = 0; i < 65; i++) {
  const star = document.createElement("i");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.opacity = Math.random();
  stars.appendChild(star);
}

const petals = document.getElementById("petals");

for (let i = 0; i < 20; i++) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = Math.random() > .5 ? "✿" : "♥";
  petal.style.left = Math.random() * 100 + "%";
  petal.style.animationDuration = (9 + Math.random() * 13) + "s";
  petal.style.animationDelay = (-Math.random() * 20) + "s";
  petal.style.fontSize = (10 + Math.random() * 13) + "px";
  petals.appendChild(petal);
}

// BACKGROUND MUSIC

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

async function playMusic() {
  try {
    await music.play();
    musicButton.textContent = "♫";
    musicButton.setAttribute("aria-label", "Pause music");
  } catch (e) {
    musicButton.textContent = "♪";
    musicButton.setAttribute("aria-label", "Tap to play music");
  }
}

function toggleMusic() {
  if (music.paused) {
    playMusic();
  } else {
    music.pause();
    musicButton.textContent = "♪";
  }
}

musicButton.addEventListener("click", toggleMusic);

document.addEventListener("pointerdown", () => {
  if (music.paused) playMusic();
}, { once: true });

// WELCOME PAGE

document.getElementById("startButton").addEventListener("click", () => {
  playMusic();
  showPage("pageCountdown");
  updateCountdown();
});

// REAL-TIME COUNTDOWN

const countdownContinue =
  document.getElementById("countdownContinue");

function updateCountdown() {
  const now = Date.now();
  let distance = BIRTHDAY - now;

  if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });

    document.getElementById("countdownMessage").textContent =
      "Happy Birthday, Bavani! Your special day is here! 🎂💖";

    countdownContinue.classList.remove("hidden");
    return;
  }

  const days = Math.floor(distance / 86400000);
  distance %= 86400000;

  const hours = Math.floor(distance / 3600000);
  distance %= 3600000;

  const minutes = Math.floor(distance / 60000);
  distance %= 60000;

  const seconds = Math.floor(distance / 1000);

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

  countdownContinue.classList.add("hidden");
}

setInterval(() => {
  if (
    document.getElementById("pageCountdown")
      .classList.contains("active")
  ) {
    updateCountdown();
  }
}, 1000);

countdownContinue.addEventListener("click", () => {
  showPage("pagePassword");
});

// PASSWORD

document.getElementById("unlockButton")
  .addEventListener("click", checkPassword);

document.getElementById("passwordInput")
  .addEventListener("keydown", e => {
    if (e.key === "Enter") checkPassword();
  });

function checkPassword() {
  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");

  if (input.value === PASSWORD) {
    error.textContent = "";
    showPage("pageMessages");
  } else {
    error.textContent = "Wrong code. Try again 💗";
    input.value = "";
    input.focus();
  }
}

// 26 A-Z MESSAGES

const messages = [
  "A — Always keep smiling; your smile makes everything brighter.",
  "B — Be happy, be brave, and keep being wonderfully you.",
  "C — Create beautiful memories and enjoy every little moment.",
  "D — Dream big, because you deserve every good thing.",
  "E — Every day, may happiness find its way to you.",
  "F — Fill your life with laughter, love, and lovely surprises.",
  "G — Glow with confidence; your kindness is your magic.",
  "H — Hope this year brings you endless reasons to smile.",
  "I — I wish you peace, success, and all the happiness you deserve.",
  "J — Just keep shining in your own beautiful way.",
  "K — Keep your heart strong and your dreams alive.",
  "L — Let every new day bring something wonderful.",
  "M — May your life be filled with love and sweet moments.",
  "N — Never forget how special and precious you are.",
  "O — Only beautiful things and happy memories are wished for you.",
  "P — Peace, positivity, and prosperity always be with you.",
  "Q — Queen of your own story; keep writing it beautifully.",
  "R — Remember that you are loved and appreciated.",
  "S — Smile often, laugh loudly, and stay happy.",
  "T — Today is yours; make it magical and unforgettable.",
  "U — You are unique, and that is your superpower.",
  "V — Very special wishes for a very special person.",
  "W — Wishing you wonderful adventures and success.",
  "X — Xtra happiness, hugs, and love for your birthday.",
  "Y — Your dreams matter; never stop believing in them.",
  "Z — Zero worries today, only joy, love, and celebration!"
];

const opened = new Set();

const letterGrid = document.getElementById("letterGrid");
const letterMessage = document.getElementById("letterMessage");
const messageCount = document.getElementById("messageCount");
const messageProgress = document.getElementById("messageProgress");
const toGiftButton = document.getElementById("toGiftButton");

messages.forEach((message, index) => {
  const letter = String.fromCharCode(65 + index);

  const button = document.createElement("button");
  button.className = "letter";
  button.type = "button";
  button.textContent = letter;

  let lastTap = 0;

  button.addEventListener("click", () => {
    const now = Date.now();

    if (now - lastTap < 650) {
      opened.add(letter);
      button.classList.add("opened");
      letterMessage.textContent = message;
      updateMessageProgress();
    } else {
      letterMessage.textContent =
        `Tap ${letter} one more time to open its message 💗`;
    }

    lastTap = now;
  });

  letterGrid.appendChild(button);
});

function updateMessageProgress() {
  const count = opened.size;

  messageCount.textContent = `${count} / 26 opened`;

  messageProgress.style.width =
    (count / 26 * 100) + "%";

  if (count === 26) {
    toGiftButton.classList.remove("hidden");
  }
}

toGiftButton.addEventListener("click", () => {
  showPage("pageGiftBox");
});

// GIFT BOX

document.getElementById("openGiftButton")
  .addEventListener("click", () => {
    document.getElementById("giftEmoji").textContent = "💝";
    showPage("pageScratch");
    setupScratch();
  });

// SCRATCH CARD

let scratchReady = false;

function setupScratch() {
  if (scratchReady) return;

  const canvas = document.getElementById("scratchCanvas");
  const area = document.querySelector(".scratch-area");

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true
  });

  const cover = document.createElement("canvas");
  const coverCtx = cover.getContext("2d");

  let drawing = false;
  let lastPoint = null;
  let revealed = false;

  function resize() {
    const rect = area.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    cover.width = canvas.width;
    cover.height = canvas.height;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    coverCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;

    const gradient = coverCtx.createLinearGradient(0, 0, w, h);

    gradient.addColorStop(0, "#f7c5dd");
    gradient.addColorStop(.5, "#b78ad2");
    gradient.addColorStop(1, "#f8d58e");

    coverCtx.fillStyle = gradient;
    coverCtx.fillRect(0, 0, w, h);

    coverCtx.fillStyle = "rgba(38,16,50,.85)";
    coverCtx.font = "bold 24px sans-serif";
    coverCtx.textAlign = "center";

    coverCtx.fillText("✨ SCRATCH HERE ✨", w / 2, h / 2 - 8);

    coverCtx.font = "16px sans-serif";
    coverCtx.fillText(
      "A surprise is waiting for you",
      w / 2,
      h / 2 + 25
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      cover, 0, 0,
      canvas.width, canvas.height
    );

    ctx.globalCompositeOperation = "destination-out";
  }

  resize();

  window.addEventListener("resize", resize);

  function point(e) {
    const r = canvas.getBoundingClientRect();

    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  }

  function scratch(e) {
    if (!drawing || revealed) return;

    const p = point(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 34;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();

    if (lastPoint) {
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(p.x, p.y);
    } else {
      ctx.arc(p.x, p.y, 17, 0, Math.PI * 2);
    }

    ctx.stroke();

    lastPoint = p;

    sparkle(p.x, p.y);
    checkScratch();
  }

  canvas.addEventListener("pointerdown", e => {
    drawing = true;
    lastPoint = null;
    canvas.setPointerCapture(e.pointerId);
    scratch(e);
  });

  canvas.addEventListener("pointermove", scratch);

  ["pointerup", "pointercancel", "lostpointercapture"]
    .forEach(ev => {
      canvas.addEventListener(ev, () => {
        drawing = false;
        lastPoint = null;
      });
    });

  function sparkle(x, y) {
    const s = document.createElement("span");

    s.textContent = "✦";
    s.style.position = "absolute";
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.color = "#fff0a8";
    s.style.pointerEvents = "none";
    s.style.fontSize = "17px";
    s.style.textShadow = "0 0 12px #ff4fa3";
    s.style.zIndex = "3";

    area.appendChild(s);

    setTimeout(() => s.remove(), 500);
  }

  function checkScratch() {
    const pixels = ctx.getImageData(
      0, 0, canvas.width, canvas.height
    ).data;

    let clear = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 64) {
      total++;

      if (pixels[i] < 80) {
        clear++;
      }
    }

    const percent = Math.round(clear / total * 100);

    document.getElementById("scratchProgress")
      .textContent = `${percent}% revealed`;

    if (percent >= 80 && !revealed) {
      revealed = true;

      canvas.style.transition = "opacity .5s";
      canvas.style.opacity = "0";

      setTimeout(() => canvas.remove(), 550);

      document.getElementById("downloadGift")
        .classList.remove("hidden");

      document.getElementById("toWishButton")
        .classList.remove("hidden");

      document.getElementById("scratchProgress")
        .textContent = "Your surprise is revealed! 💖";
    }
  }

  scratchReady = true;
}

// BIRTHDAY WISH

const wish =
`Happy Birthday, Bavani! 💖🌹

May your life always be filled with happiness, love, peace, and success. Keep smiling, keep dreaming, and never stop shining. I hope this new year of your life brings you beautiful memories, unexpected surprises, and everything your heart wishes for.

You deserve all the good things in this world. Have the most magical birthday! ✨`;

document.getElementById("toWishButton")
  .addEventListener("click", () => {
    showPage("pageWish");
    typeWish();
  });

let typingStarted = false;

function typeWish() {
  if (typingStarted) return;

  typingStarted = true;

  const target = document.getElementById("typedMessage");
  let i = 0;

  const timer = setInterval(() => {
    target.textContent = wish.slice(0, i++);

    if (i > wish.length) {
      clearInterval(timer);

      document.querySelector(".cursor").style.display = "none";

      document.getElementById("toReplyButton")
        .classList.remove("hidden");
    }
  }, 36);
}

document.getElementById("toReplyButton")
  .addEventListener("click", () => {
    showPage("pageReply");
  });

// REPLY FORM

document.getElementById("replyForm")
  .addEventListener("submit", async event => {

    event.preventDefault();

    const form = event.currentTarget;
    const status = document.getElementById("replyStatus");

    status.textContent = "Sending…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        status.textContent =
          "Your reply has been sent. Thank you! 💗";

        form.reset();
      } else {
        status.textContent =
          "Could not send right now. Please try again.";
      }

    } catch {
      status.textContent =
        "Network issue. Please check your connection and try again.";
    }
  });
     
