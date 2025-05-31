// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// додаткові настройки бібліотеки  iziToast
iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

const refs = {
  form: document.querySelector('.form'),
};
const { form } = refs;

// Прослуховувач події
form.addEventListener('submit', handlersubmit);

function handlersubmit(event) {
  event.preventDefault();
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // Створення промісу
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (state == 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay)
  )
    .then(delay => {
      iziToast.show({
        title: 'Hey!',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        backgroundColor: 'green',

        messageColor: 'white',
        messageSize: '20',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'Hey!',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: '20',
      });
    });
}
