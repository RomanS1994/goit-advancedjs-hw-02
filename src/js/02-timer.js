import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.button.disabled = true;

/************ Бібліотека flatpickr ************/
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    // console.log(options.defaultDate);
    if (selectedDates[0] <= options.defaultDate) {
      return iziToast.error({
        title: 'Hey',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      //   window.alert('Please choose a date in the future');
    } else {
      iziToast.success({
        title: 'Hey',
        message: 'Click on the Start button',
        position: 'topRight',
      });

      refs.button.disabled = false;
    }
  },
};
flatpickr(refs.input, options);

refs.button.addEventListener('click', handlerClickOnStart);

function handlerClickOnStart(evt) {
  const int = setInterval(() => {
    const currentDate = new Date();
    const receivedDate = new Date(refs.input.value);
    const resultMs = receivedDate - currentDate;

    if (resultMs > 0) {
      refs.button.disabled = true;
      refs.input.disabled = true;

      const timer = convertMs(resultMs);
      //   console.log(timer);
      refs.days.textContent = addLeadingZero(timer.days);
      refs.hours.textContent = addLeadingZero(timer.hours);
      refs.minutes.textContent = addLeadingZero(timer.minutes);
      refs.seconds.textContent = addLeadingZero(timer.seconds);
    } else {
      clearInterval(int);
    }
  }, 1000);
}

/************ fn addLeadingZero ************/
const addLeadingZero = value => value.toString().padStart(2, '0');
// console.log(addLeadingZero('3'));

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
