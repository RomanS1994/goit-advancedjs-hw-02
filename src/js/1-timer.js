// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/themes/dark.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів

import 'izitoast/dist/css/iziToast.min.css';
iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

const refs = {
  input: document.getElementById('datetime-picker'),
  button: document.querySelector('[data-start]'),

  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
const { input, button } = refs;
const { dataDays, dataHours, dataMinutes, dataSeconds } = refs;

let userSelectedDate;
let today = new Date();

// додкаткові опції бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  // minDate: 'today',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < today) {
      iziToast.show({
        title: 'Hey!',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: '20',
      });
      button.disabled = true;
      input.disabled = true;
    } else {
      input.disabled = false;
      button.disabled = false;
    }
  },
};

// ініціалізація бібліотеки
flatpickr(input, options);

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

// Прослуховувач події 'click'
button.addEventListener('click', handlerClick);

function handlerClick() {
  setInterval(() => {
    today = new Date();

    const difference = userSelectedDate - today;
    button.disabled = true;

    if (difference > 0) {
      const data = convertMs(difference);

      dataDays.textContent = addLeadingZero(data.days);
      dataHours.textContent = addLeadingZero(data.hours);
      dataMinutes.textContent = addLeadingZero(data.minutes);
      dataSeconds.textContent = addLeadingZero(data.seconds);
    } else {
      button.disabled = false;
    }
  }, 1000);
}

// функція форматування числа
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
