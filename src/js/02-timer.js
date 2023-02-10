import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('datetime-picker');
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const DELAY = 1000;
let differenceInTime = null;
let chosedTime = null;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosedTime = selectedDates[0];
    differenceInTime = chosedTime - new Date();

    if (differenceInTime < 0) {
      youChoseDateInThePast();
    } else if (differenceInTime > 0) {
      btn.disabled = false;
    }
  },
};

btn.addEventListener('click', () => {
  const interval = setInterval(() => {
    const newDate = new Date();
    const differencesBetweenFutureTimeAndNow = convertMs(chosedTime - newDate);
    // differencesBetweenFutureTimeAndNow это объект который нужно добавить как textContent на страницу
    createTimeTextContent(differencesBetweenFutureTimeAndNow);
    if (
      days.textContent === '00' &&
      hours.textContent === '00' &&
      minutes.textContent === '00' &&
      seconds.textContent === '00'
    ) {
      clearInterval(interval);
      // проверка на то, что когда счетчик равен 00:00:00:00 то интервал очищается и счетчик останавливается
    }
  }, DELAY);
});

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = modifyDateToDateWhichStartOnZero(Math.floor(ms / day));
  // Remaining hours
  const hours = modifyDateToDateWhichStartOnZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = modifyDateToDateWhichStartOnZero(
    Math.floor(((ms % day) % hour) / minute)
  );
  // Remaining seconds
  const seconds = modifyDateToDateWhichStartOnZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function modifyDateToDateWhichStartOnZero(number) {
  return String(number).padStart(2, 0);
}
function createTimeTextContent(time) {
  days.textContent = time.days;
  hours.textContent = time.hours;
  minutes.textContent = time.minutes;
  seconds.textContent = time.seconds;
}

function youChoseDateInThePast() {
  Notify.failure('Please choose a date in the future', () => {}, {
    position: 'center-center',
    closeButton: true,
  });
}

const timer = document.querySelector('.timer');
