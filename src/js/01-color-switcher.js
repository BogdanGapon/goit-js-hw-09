function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.body;
const btnOpen = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

const DELAY = 1000;
let changingColor = null;
btnStop.disabled = true;

btnOpen.addEventListener('click', onStartBodyColorChanging);
btnStop.addEventListener('click', onStopBodyColorChanging);

function onStartBodyColorChanging() {
  changingColor = setInterval(changeBodyColor, DELAY);
  btnOpen.disabled = true;
  btnStop.disabled = false;
}

function onStopBodyColorChanging() {
  clearInterval(changingColor);
  btnOpen.disabled = false;
  btnStop.disabled = true;
}

function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}
