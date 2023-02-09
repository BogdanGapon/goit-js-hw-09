import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.getElementById('datetime-picker');
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
let differenceInTime = null;
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosedTime = selectedDates[0];
    differenceInTime = chosedTime - new Date();

    if (differenceInTime < 0) {
      alert('Please choose a date in the future');
    } else if (differenceInTime > 0) {
      btn.disabled = false;
      btn.addEventListener('click', () => {
        const interval = setInterval(() => {
          const newDate = new Date();
          const differencesBetweenFutureTimeAndNow = convertMs(
            chosedTime - newDate
          );
          createTimeTextContent(differencesBetweenFutureTimeAndNow);
          if (
            days.textContent === '00' &&
            hours.textContent === '00' &&
            minutes.textContent === '00' &&
            seconds.textContent === '00'
          ) {
            clearInterval(interval);
          }
        }, 1000);
      });
    }
  },
};

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
