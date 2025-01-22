const selectMenu = document.querySelectorAll("select");
const time = document.querySelector("h1");
const button = document.querySelector("button");
const imgage = document.querySelector("img");

const ring = new Audio("./assets/audio/ringtone.mp3");

let alarmTime = "";
let alarmState = "unset";

for (let i = 0; i < 24; i++) {
  i = i < 10 ? "0" + i : i;

  let option = `<option value="${i}">${i}</option>`;

  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 0; i < 60; i++) {
  i = i < 10 ? "0" + i : i;

  let option = `<option value="${i}">${i}</option>`;

  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  time.innerHTML = `${h}:${m}:${s}`;

  if (alarmTime === `${h}:${m}`) {
    ring.play();
    ring.loop = true;
    imgage.style.animation = "ring 0.2s infinite";
  }
}, 1000);

button.addEventListener("click", () => {
  if (selectMenu[0].value === "hour") {
    alert("ساعت را انتخاب نمایید");
  } else if (selectMenu[1].value === "minute") {
    alert("دقیقه را انتخاب نمایید");
  } else {
    checkState(alarmState);    
  }
});

function checkState(state) {
  if (state == "unset") {
    alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;
    selectMenu[0].disabled = true;
    selectMenu[1].disabled = true;
    button.style.opacity = "0.7";
    button.innerHTML = "Clear Alarm";
    alarmState = "set";
  } else {
    alarmTime = "";
    selectMenu[0].disabled = false;
    selectMenu[1].disabled = false;
    button.style.opacity = "1";
    button.innerHTML = "Set Alarm";
    alarmState = "unset";
    ring.pause();
    imgage.style.animation = "";
  }
}
