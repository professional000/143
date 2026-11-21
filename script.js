// ==================================
// BAVANI BIRTHDAY WEBSITE
// ==================================

// CHANGE PASSWORD HERE
const PASSWORD = "1204";

// BIRTHDAY DATE: 4 DECEMBER 2026
const BIRTHDAY = new Date("2026-12-04T00:00:00+05:30");

// ==================================
// A TO Z - 26 MESSAGES
// ==================================

const alphabetMessages = [
["A","Always keep your beautiful smile."],
["B","Be happy, brave and beautifully you."],
["C","Celebrate every little thing that makes you special."],
["D","Dream big; your wishes deserve to come true."],
["E","Every day is brighter with your kindness."],
["F","Forever remember how precious you are."],
["G","Glow with confidence wherever you go."],
["H","Happiness looks lovely on you."],
["I","I hope life gives you endless reasons to smile."],
["J","Just being you makes the world sweeter."],
["K","Keep shining, even on cloudy days."],
["L","Let your heart always find peace."],
["M","May your dreams bloom like roses."],
["N","Never stop believing in your magic."],
["O","Only beautiful things should find their way to you."],
["P","Promise yourself to choose happiness."],
["Q","Quiet moments can hold the sweetest memories."],
["R","Remember, you are loved and appreciated."],
["S","Stay soft, strong and full of sparkle."],
["T","Today and always, you deserve the best."],
["U","Under every sky, keep following your dreams."],
["V","Very few people make moments as special as you do."],
["W","Wishing you a year full of wonder."],
["X","X-tra happiness and hugs for you today."],
["Y","Your smile is your most beautiful magic."],
["Z","Zero limits to the happiness you deserve."]
];

// ==================================
// FINAL AUTO TYPING MESSAGE
// ==================================

const finalMessage = `Happy Birthday, Bavani! 💖

I hope this new chapter brings you peace, laughter, courage and beautiful memories.

Never forget that you are special and deserve the very best.

Keep smiling, keep dreaming and keep shining.

May every little wish in your heart come true. ✨

With lots of love. 🌹`;

// ==================================
// PAGE NAVIGATION
// ==================================

const pages = [...document.querySelectorAll(".page")];
const dots = document.getElementById("progressDots");

pages.forEach((_,i)=>{
const dot=document.createElement("span");
if(i===0)dot.classList.add("active");
dots.appendChild(dot);
});

function go(n){

pages.forEach((p,i)=>{
p.classList.toggle("active",i===n-1);
});

[...dots.children].forEach((d,i)=>{
d.classList.toggle("active",i===n-1);
});

window.scrollTo({top:0,behavior:"smooth"});

if(n===6){
requestAnimationFrame(setupScratch);
}

if(n===7){
startTyping();
}

}

document.querySelectorAll("[data-go]").forEach(b=>{
b.addEventListener("click",()=>{
go(Number(b.dataset.go));
});
});

// ==================================
// COUNTDOWN + TEST MODE
// ==================================

let testMode=false;

const continueButton =
document.getElementById("countdownContinue");

const testButton =
document.getElementById("testModeButton");

function updateCountdown(){

const diff=Math.max(0,BIRTHDAY.getTime()-Date.now());

const values=[
Math.floor(diff/86400000),
Math.floor(diff/3600000)%24,
Math.floor(diff/60000)%60,
Math.floor(diff/1000)%60
];

["days","hours","minutes","seconds"].forEach((id,i)=>{
document.getElementById(id).textContent =
String(values[i]).padStart(2,"0");
});

const reached=diff===0;

continueButton.disabled=!(reached||testMode);

document.getElementById("countdownStatus").textContent =
reached
?"It's midnight! Your birthday surprise is ready. 🎉"
:testMode
?"Preview mode is ON — you can continue now."
:"Counting down to 12:00 AM India time.";

}

testButton.addEventListener("click",()=>{

testMode=!testMode;

testButton.textContent=
`TEST MODE: ${testMode?"ON":"OFF"}`;

testButton.setAttribute(
"aria-pressed",
String(testMode)
);

document.getElementById("testModeHelp").textContent =
testMode
?"Test Mode enabled. Preview all pages now."
:"Test Mode is off. The real countdown controls access.";

updateCountdown();

});

updateCountdown();
setInterval(updateCountdown,1000);

// ==================================
// PASSWORD KEYPAD
// ==================================

let pin="";

const pinDots=[
...document.querySelectorAll("#pinDots span")
];

function renderPin(){

pinDots.forEach((d,i)=>{
d.textContent=i<pin.length?"●":"○";
});

}

document.querySelectorAll("[data-digit]").forEach(b=>{

b.addEventListener("click",()=>{

if(pin.length<4){
pin+=b.dataset.digit;
}

renderPin();

});

});

document.querySelector('[data-action="clear"]')
.addEventListener("click",()=>{

pin="";
renderPin();

});

document.querySelector('[data-action="backspace"]')
.addEventListener("click",()=>{

pin=pin.slice(0,-1);
renderPin();

});

document.getElementById("unlockButton")
.addEventListener("click",()=>{

const error=
document.getElementById("passwordError");

if(pin===PASSWORD){

error.textContent="Unlocked! Welcome to your surprise. ♥";

setTimeout(()=>{
go(4);
},400);

}else{

error.textContent=
"That isn't the magic number. Try again ✨";

pin="";
renderPin();

}

});

// ==================================
// A TO Z CARDS - DOUBLE TAP
// ==================================

const alphabetGrid =
document.getElementById("alphabetGrid");

alphabetMessages.forEach(([letter,message],index)=>{

const card=document.createElement("div");

card.className="letter-card";
card.tabIndex=0;
card.setAttribute("role","button");

card.setAttribute(
"aria-label",
`Letter ${letter}. Double tap to read message.`
);

card.innerHTML=`
<div class="letter-inner">

<div class="letter-face letter-front">
${letter}
<small>${String(index+1).padStart(2,"0")} ♥</small>
</div>

<div class="letter-face letter-back">
${message}
</div>

</div>
`;

let taps=0;
let timer;

const flip=()=>{
card.classList.toggle("flipped");
};

card.addEventListener("click",()=>{

taps++;

if(taps===1){

timer=setTimeout(()=>{
taps=0;
},350);

}else if(taps===2){

clearTimeout(timer);
taps=0;
flip();

}

});

card.addEventListener("keydown",e=>{

if(e.key==="Enter"||e.key===" "){
e.preventDefault();
flip();
}

});

alphabetGrid.appendChild(card);

});

// ==================================
// OPEN GIFT BOX
// ==================================

document.getElementById("openBoxButton")
.addEventListener("click",()=>{

const box=document.getElementById("presentBox");

box.textContent="💝";
box.classList.add("open");

document.getElementById("boxMessage").textContent =
"The best gifts aren't things — they're love, memories and happiness. You deserve all of it, Bavani. 💗";

const button=
document.getElementById("openBoxButton");

button.textContent="OPENED ✨";
button.disabled=true;

setTimeout(()=>{
go(6);
},1800);

});

// ==================================
// SCRATCH TO REVEAL GIFT PHOTO
// 80% SCRATCH REQUIRED
// ==================================

const canvas =
document.getElementById("scratchCanvas");

const ctx=canvas.getContext(
"2d",
{willReadFrequently:true}
);

const frame =
document.getElementById("scratchFrame");

const progressBar =
document.getElementById("scratchProgressBar");

const scratchStatus =
document.getElementById("scratchStatus");

const loading =
document.getElementById("scratchLoading");

const REQUIRED=80;

let scratching=false;
let revealed=false;
let ready=false;
let lastCheck=0;

document.getElementById("giftPhoto")
.addEventListener("load",()=>{
loading.style.display="none";
});

document.getElementById("giftPhoto")
.addEventListener("error",()=>{
loading.style.display="grid";
loading.textContent=
"Please add your gift.jpg photo to this folder.";
});

function setupScratch(){

if(revealed)return;

const rect=frame.getBoundingClientRect();

if(!rect.width||!rect.height)return;

const dpr=Math.min(window.devicePixelRatio||1,2);

canvas.width=Math.round(rect.width*dpr);
canvas.height=Math.round(rect.height*dpr);

canvas.style.width=rect.width+"px";
canvas.style.height=rect.height+"px";

ctx.setTransform(dpr,0,0,dpr,0,0);

ctx.globalCompositeOperation="source-over";

const grad=ctx.createLinearGradient(
0,0,rect.width,rect.height
);

grad.addColorStop(0,"#f8d8c5");
grad.addColorStop(.45,"#c77b91");
grad.addColorStop(1,"#8e4564");

ctx.fillStyle=grad;

ctx.fillRect(
0,0,rect.width,rect.height
);

ctx.fillStyle="rgba(255,248,244,.97)";
ctx.textAlign="center";
ctx.textBaseline="middle";

ctx.font="bold 19px Arial";

ctx.fillText(
"✦ SCRATCH TO REVEAL ✦",
rect.width/2,
rect.height/2-12
);

ctx.font="13px Arial";

ctx.fillText(
"A little surprise is waiting for you",
rect.width/2,
rect.height/2+18
);

for(let i=0;i<28;i++){

ctx.fillStyle="rgba(255,244,225,.8)";
ctx.font=`${8+Math.random()*8}px Arial`;

ctx.fillText(
"✦",
Math.random()*rect.width,
Math.random()*rect.height
);

}

ctx.globalCompositeOperation="destination-out";

ready=true;

}

// SCRATCH SPARKLE EFFECT

function sparkleAt(x,y){

const layer=
document.getElementById("scratchSparkles");

for(let i=0;i<3;i++){

const s=document.createElement("span");

s.className="sparkle";

s.textContent=
Math.random()>.5?"✦":"✧";

s.style.left=
(x+Math.random()*42-21)+"px";

s.style.top=
(y+Math.random()*42-21)+"px";

s.style.fontSize=
(12+Math.random()*12)+"px";

layer.appendChild(s);

setTimeout(()=>{
s.remove();
},700);

}

}

// SCRATCH MOVEMENT

function scratchAt(e){

if(!scratching||revealed||!ready)return;

const r=canvas.getBoundingClientRect();

const x=e.clientX-r.left;
const y=e.clientY-r.top;

ctx.globalCompositeOperation="destination-out";

ctx.beginPath();

ctx.arc(x,y,23,0,Math.PI*2);

ctx.fill();

sparkleAt(x,y);

if(performance.now()-lastCheck>220){

lastCheck=performance.now();

checkScratch();

}

}

// CHECK SCRATCH PERCENTAGE

function checkScratch(){

if(revealed||!ready)return;

const data=ctx.getImageData(
0,0,canvas.width,canvas.height
).data;

let clear=0;
let total=0;

for(let i=3;i<data.length;i+=4*20){

total++;

if(data[i]<40){
clear++;
}

}

const percent=Math.min(
100,
Math.round(clear/total*100)
);

progressBar.style.width=percent+"%";

scratchStatus.textContent=
`Scratched: ${percent}% · 80% needed`;

if(percent>=REQUIRED){

revealGift();

}

}

// REVEAL PHOTO AFTER 80%

function revealGift(){

if(revealed)return;

revealed=true;

canvas.style.transition="opacity .7s";
canvas.style.opacity="0";

setTimeout(()=>{
canvas.style.display="none";
},750);

progressBar.style.width="100%";

scratchStatus.textContent=
"Surprise revealed! Happy Birthday, Bavani! 🎉";

// FINAL STAR EFFECT

for(let i=0;i<35;i++){

const s=document.createElement("span");

s.className="sparkle";

s.textContent=
Math.random()>.5?"✦":"✨";

s.style.position="fixed";
s.style.zIndex="30";

s.style.left=Math.random()*100+"vw";
s.style.top=Math.random()*85+"vh";

s.style.fontSize=
(14+Math.random()*20)+"px";

document.body.appendChild(s);

setTimeout(()=>{
s.remove();
},900);

}

}

// MOUSE + TOUCH SUPPORT

canvas.addEventListener("pointerdown",e=>{

if(revealed)return;

scratching=true;

canvas.setPointerCapture(e.pointerId);

scratchAt(e);

});

canvas.addEventListener("pointermove",scratchAt);

canvas.addEventListener("pointerup",()=>{

scratching=false;

checkScratch();

});

canvas.addEventListener("pointercancel",()=>{

scratching=false;

});

window.addEventListener("resize",()=>{

if(
!revealed &&
document.getElementById("page6").classList.contains("active")
){

setupScratch();

}

});

// ==================================
// AUTO TYPING MESSAGE
// ==================================

let typingTimer=null;

function startTyping(){

clearInterval(typingTimer);

const output=
document.getElementById("typedMessage");

output.textContent="";

let i=0;

typingTimer=setInterval(()=>{

output.textContent+=finalMessage.charAt(i);

i++;

if(i>=finalMessage.length){

clearInterval(typingTimer);
typingTimer=null;

}

},36);

}

document.getElementById("replayTyping")
.addEventListener("click",startTyping);

// ==================================
// FLOATING HEARTS + ROSES + STARS
// ==================================

const heartContainer =
document.getElementById("floatingHearts");

const symbols=["♥","♡","🌹","✦"];

function createFloatingHeart(){

const heart=document.createElement("span");

heart.className="floating-heart";

heart.textContent=
symbols[Math.floor(Math.random()*symbols.length)];

heart.style.left=Math.random()*100+"%";

heart.style.fontSize=
(12+Math.random()*19)+"px";

heart.style.animationDuration=
(8+Math.random()*8)+"s";

heartContainer.appendChild(heart);

setTimeout(()=>{
heart.remove();
},17000);

}

setInterval(createFloatingHeart,850);

for(let i=0;i<8;i++){

setTimeout(createFloatingHeart,i*300);

}
  
