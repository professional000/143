// =====================================
// BAVANI BIRTHDAY WEBSITE
// =====================================

// CHANGE ONLY THIS VALUE FOR TESTING

const TEST_MODE = true;

// true  = Testing mode (skip countdown lock)
// false = Real birthday countdown lock

// Birthday: December 04, 2026, 12:00 AM IST

const BIRTHDAY = new Date(
  "2026-12-04T00:00:00+05:30"
).getTime();

const PASSWORD = "1204";


// =====================================
// PAGE NAVIGATION
// =====================================

const pages = [...document.querySelectorAll(".page")];

function showPage(id) {

  pages.forEach(page => {
    page.classList.toggle("active", page.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// =====================================
// STARS AND FALLING PETALS
// =====================================

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
  petal.style.animationDuration =
    (9 + Math.random() * 13) + "s";

  petal.style.animationDelay =
    (-Math.random() * 20) + "s";

  petal.style.fontSize =
    (10 + Math.random() * 13) + "px";

  petals.appendChild(petal);
}


// =====================================
// BACKGROUND MUSIC
// =====================================

const music = document.getElementById("bgMusic");

const musicButton =
  document.getElementById("musicButton");

async function playMusic() {

  try {

    await music.play();

    musicButton.textContent = "♫";

  } catch (error) {

    musicButton.textContent = "♪";

  }
}

musicButton.addEventListener("click", () => {

  if (music.paused) {

    playMusic();

  } else {

    music.pause();

    musicButton.textContent = "♪";

  }

});


// =====================================
// WELCOME PAGE
// =====================================

document.getElementById("startButton")
.addEventListener("click", () => {

  playMusic();

  showPage("pageCountdown");

  updateCountdown();

});


// =====================================
// REAL TIME COUNTDOWN
// =====================================

const countdownContinue =
  document.getElementById("countdownContinue");

function updateCountdown() {

  const now = Date.now();

  const expired = now >= BIRTHDAY;

  let distance = Math.max(0, BIRTHDAY - now);

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


  if (expired) {

    document.getElementById("countdownMessage").textContent =
      "Happy Birthday Bavani! 🎂💖";

  } else {

    document.getElementById("countdownMessage").textContent =
      "Every second brings your special day closer 💗";

  }


  // TEST MODE LOGIC

  if (TEST_MODE || expired) {

    countdownContinue.classList.remove("hidden");

  } else {

    countdownContinue.classList.add("hidden");

  }

}


// Update countdown every second

updateCountdown();

setInterval(() => {

  if (
    document.getElementById("pageCountdown")
    .classList.contains("active")
  ) {

    updateCountdown();

  }

}, 1000);


// Go to password page

countdownContinue.addEventListener("click", () => {

  showPage("pagePassword");

});


// =====================================
// PASSWORD SYSTEM
// =====================================

const passwordInput =
  document.getElementById("passwordInput");

const passwordError =
  document.getElementById("passwordError");

document.getElementById("unlockButton")
.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {

    checkPassword();

  }

});

function checkPassword() {

  if (passwordInput.value === PASSWORD) {

    passwordError.textContent = "";

    passwordInput.value = "";

    showPage("pageMessages");

  } else {

    passwordError.textContent =
      "Wrong code. Try again 💗";

    passwordInput.value = "";

    passwordInput.focus();

  }

}


// =====================================
// 26 A-Z BIRTHDAY MESSAGES
// =====================================

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


// =====================================
// MESSAGE OPENING SYSTEM
// =====================================

const opened = new Set();

const letterGrid =
  document.getElementById("letterGrid");

const letterMessage =
  document.getElementById("letterMessage");

const messageCount =
  document.getElementById("messageCount");

const messageProgress =
  document.getElementById("messageProgress");

const toGiftButton =
  document.getElementById("toGiftButton");


messages.forEach((message, index) => {

  const letter = String.fromCharCode(65 + index);

  const button = document.createElement("button");

  button.className = "letter";

  button.type = "button";

  button.textContent = letter;

  button.addEventListener("click", () => {

    // Display selected message

    letterMessage.textContent = message;

    // Mark letter as opened

    if (!opened.has(letter)) {

      opened.add(letter);

      button.classList.add("opened");

      updateMessageProgress();

    }

  });

  letterGrid.appendChild(button);

});


function updateMessageProgress() {

  const count = opened.size;

  messageCount.textContent =
    `${count} / 26 opened`;

  messageProgress.style.width =
    (count / 26 * 100) + "%";


  // Only after all 26 messages are opened

  if (count === 26) {

    toGiftButton.classList.remove("hidden");

    letterMessage.textContent =
      "You opened all 26 messages! Lots of love 💖";

  }

}


// Next page

toGiftButton.addEventListener("click", () => {

  if (opened.size === 26) {

    showPage("pageGiftBox");

  }

});


// =====================================
// GIFT BOX
// =====================================

document.getElementById("openGiftButton")
.addEventListener("click", () => {

  document.getElementById("giftEmoji").textContent = "💝";

  showPage("pageScratch");

  setupScratch();

});


// =====================================
// SCRATCH CARD
// =====================================

let scratchReady = false;

function setupScratch() {

  if (scratchReady) return;

  const canvas =
    document.getElementById("scratchCanvas");

  const area =
    document.querySelector(".scratch-area");

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true
  });

  let drawing = false;

  let lastPoint = null;

  let revealed = false;


  function resize() {

    if (revealed) return;

    const rect = area.getBoundingClientRect();

    const dpr = Math.max(
      1,
      window.devicePixelRatio || 1
    );

    canvas.width = Math.round(rect.width * dpr);

    canvas.height = Math.round(rect.height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;

    const h = rect.height;

    const gradient = ctx.createLinearGradient(
      0, 0, w, h
    );

    gradient.addColorStop(0, "#f7c5dd");

    gradient.addColorStop(.5, "#b78ad2");

    gradient.addColorStop(1, "#f8d58e");

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(38,16,50,.85)";

    ctx.font = "bold 24px sans-serif";

    ctx.textAlign = "center";

    ctx.fillText(
      "✨ SCRATCH HERE ✨",
      w / 2,
      h / 2 - 8
    );

    ctx.font = "16px sans-serif";

    ctx.fillText(
      "A surprise is waiting for you",
      w / 2,
      h / 2 + 25
    );

    ctx.globalCompositeOperation = "destination-out";

  }


  resize();

  window.addEventListener("resize", resize);


  function getPoint(event) {

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

  }


  function scratch(event) {

    if (!drawing || revealed) return;

    const p = getPoint(event);

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

    checkScratch();

  }


  canvas.addEventListener("pointerdown", event => {

    drawing = true;

    lastPoint = null;

    canvas.setPointerCapture(event.pointerId);

    scratch(event);

  });


  canvas.addEventListener("pointermove", scratch);


  ["pointerup", "pointercancel", "lostpointercapture"]
  .forEach(type => {

    canvas.addEventListener(type, () => {

      drawing = false;

      lastPoint = null;

    });

  });


  function checkScratch() {

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let clear = 0;

    let total = 0;

    // Sample pixels for scratch percentage

    for (let i = 3; i < pixels.length; i += 64) {

      total++;

      if (pixels[i] < 80) {

        clear++;

      }

    }

    const percent = Math.round(
      clear / total * 100
    );

    document.getElementById("scratchProgress")
      .textContent = `${percent}% revealed`;


    // Reveal at 80%

    if (percent >= 80 && !revealed) {

      revealed = true;

      canvas.style.transition = "opacity .5s";

      canvas.style.opacity = "0";

      setTimeout(() => {

        canvas.remove();

      }, 550);

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


// =====================================
// BIRTHDAY WISH TYPING EFFECT
// =====================================

const wish = `Happy Birthday, Bavani! 💖🌹

May your life always be filled with happiness, love, peace, and success.

Keep smiling, keep dreaming, and never stop shining.

I hope this new year of your life brings you beautiful memories, unexpected surprises, and everything your heart wishes for.

You deserve all the good things in this world.

Have the most magical birthday! ✨`;


let typingStarted = false;


document.getElementById("toWishButton")
.addEventListener("click", () => {

  showPage("pageWish");

  typeWish();

});


function typeWish() {

  if (typingStarted) return;

  typingStarted = true;

  const target =
    document.getElementById("typedMessage");

  let i = 0;

  const timer = setInterval(() => {

    target.textContent = wish.slice(0, i);

    i++;

    if (i > wish.length) {

      clearInterval(timer);

      document.querySelector(".cursor")
        .style.display = "none";

      document.getElementById("toReplyButton")
        .classList.remove("hidden");

    }

  }, 36);

}


// =====================================
// FINAL PAGE
// =====================================

document.getElementById("toReplyButton")
.addEventListener("click", () => {

  showPage("pageReply");

});


// =====================================
// REPLY FORM
// =====================================

// Replace YOUR_FORM_ID with your Formspree ID
// Create your form at https://formspree.io/

const REPLY_ENDPOINT =
  "https://formspree.io/f/YOUR_FORM_ID";


document.getElementById("replyForm")
.addEventListener("submit", async event => {

  event.preventDefault();

  const form = event.currentTarget;

  const status =
    document.getElementById("replyStatus");

  status.textContent = "Sending...";

  try {

    const response = await fetch(REPLY_ENDPOINT, {

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
        "Please configure your Formspree ID and try again.";

    }

  } catch (error) {

    status.textContent =
      "Network issue. Please try again.";

  }

});
  
