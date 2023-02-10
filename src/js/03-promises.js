const form = document.querySelector('.form');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();
  const delay = +evt.target.elements.delay.value;
  const delayStep = Number(evt.target.elements.step.value);
  const amount = Number(evt.target.elements.amount.value);
  let firstDelay = delay - delayStep;
  for (let i = 1; i <= amount; i += 1) {
    let position = i;
    firstDelay += delayStep;

    createPromise(position, firstDelay)
      .then(resolve => {
        Notify.success(resolve);
      })
      .catch(reject => {
        Notify.failure(reject);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
