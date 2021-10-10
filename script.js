// DOM Element's Selection
const inputDate = document.querySelector("input");
const beginButton = document.querySelector(".iniciar");
const resetButton = document.querySelector(".reiniciar");
const displayDateChoose = document.querySelector(".data");
const displayCountDown = document.querySelector(".contagem");
const showDays = document.querySelector(".dia li:first-child");
const showHours = document.querySelector(".hora li:first-child");
const showMinutes = document.querySelector(".minuto li:first-child");
const showSeconds = document.querySelector(".segundo li:first-child");
const dayOrDays = document.querySelector(".dia li:last-child");
const hourOrHours = document.querySelector(".hora li:last-child");
const minuteOrMinutes = document.querySelector(".minuto li:last-child");
const secondOrSeconds = document.querySelector(".segundo li:last-child");

// Ambient var's
const date = new Date();
let interval;

// Functions
const setMinimumDate = () =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    .toISOString()
    .substr(0, 10);

inputDate.setAttribute("min", setMinimumDate());

const daysConvert = (timeStamp) => timeStamp / (24 * 60 * 60 * 1000);
const hoursConvert = (timeStamp) =>
  (timeStamp % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000);
const minutesConvert = (timeStamp) =>
  (timeStamp % (60 * 60 * 1000)) / (60 * 1000);
const secondsConvert = (timeStamp) => (timeStamp % (60 * 1000)) / 1000;

const handleZeroLeft = (time) => (time < 10 ? `0${time}` : time);

const showCountDown = (days, hours, minutes, seconds) => {
  if (displayCountDown.classList.contains("hide-area")) {
    displayDateChoose.classList.add("hide-area");
    displayCountDown.classList.remove("hide-area");
  }
  days === 1 ? (dayOrDays.innerText = "Dia") : (dayOrDays.innerText = "Dias");
  hours === 1
    ? (hourOrHours.innerText = "Hora")
    : (hourOrHours.innerText = "Horas");
  minutes === 1
    ? (minuteOrMinutes.innerText = "Minuto")
    : (minuteOrMinutes.innerText = "Minutos");
  seconds === 1
    ? (secondOrSeconds.innerText = "Segundo")
    : (secondOrSeconds.innerText = "Segundos");
  showDays.innerText = days;
  showHours.innerText = handleZeroLeft(hours);
  showMinutes.innerText = handleZeroLeft(minutes);
  showSeconds.innerText = handleZeroLeft(seconds);
};

const initCountDown = (chosenTimeStamp) => {
  interval = setInterval(() => {
    const nowTimeStamp = new Date().getTime();
    const leftTimeStamp = chosenTimeStamp - nowTimeStamp;
    const daysLeft = Math.floor(daysConvert(leftTimeStamp));
    const hoursLeft = Math.floor(hoursConvert(leftTimeStamp));
    const minutesLeft = Math.floor(minutesConvert(leftTimeStamp));
    const secondsLeft = Math.floor(secondsConvert(leftTimeStamp));
    showCountDown(daysLeft, hoursLeft, minutesLeft, secondsLeft);
  }, 1000);
};

const handleChosenDate = () => {
  if (inputDate.value.length) {
    const chosenDateList = inputDate.value.split("-").map(Number);
    const minimumDateList = inputDate
      .getAttribute("min")
      .split("-")
      .map(Number);
    const chosenDateTimeStamp = new Date(
      chosenDateList[0],
      chosenDateList[1] - 1,
      chosenDateList[2]
    ).getTime();
    const minimumDateTimeStamp = new Date(
      minimumDateList[0],
      minimumDateList[1] - 1,
      minimumDateList[2]
    ).getTime();
    chosenDateTimeStamp >= minimumDateTimeStamp
      ? initCountDown(chosenDateTimeStamp)
      : alert("Escolha uma data posterior a atual!");
  } else {
    alert("Escolha uma data válida!");
  }
};

const resetCountDown = () => {
  clearInterval(interval);
  inputDate.value = "";
  displayCountDown.classList.add("hide-area");
  displayDateChoose.classList.remove("hide-area");
};

// Event Listener's
beginButton.addEventListener("click", handleChosenDate);
resetButton.addEventListener("click", resetCountDown);
