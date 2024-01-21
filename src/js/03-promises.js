import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = form.elements;

  let delayNum = Number(delay.value);
  let stepNum = Number(step.value);
  let amountNum = Number(amount.value);

  for (let i = 1; i <= amountNum; i++) {
    createPromise(i, delayNum)
      .then(({ position, delay }) => {
        iziToast.success({
          position: 'topRight',
          title: '✅',
          message: `Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          position: 'topRight',
          title: '❌',
          message: `Rejected promise ${position} in ${delay}ms`,
        });
      });
    delayNum += stepNum;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
