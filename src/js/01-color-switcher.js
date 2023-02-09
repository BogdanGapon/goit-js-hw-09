function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.body;
const btnOpen = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

const DELAY = 1000;
let changingColor = null;
btnStop.disabled = true;

body.addEventListener('click', onIntervalChangingBodyColor);
function onIntervalChangingBodyColor(evt) {
  if (evt.target === btnOpen) {
    changingColor = setInterval(changeBodyColor, DELAY);
    btnOpen.disabled = true;
    btnStop.disabled = false;
  } else if (evt.target === btnStop) {
    clearInterval(changingColor);
    btnOpen.disabled = false;
    btnStop.disabled = true;
  }
}

function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}
