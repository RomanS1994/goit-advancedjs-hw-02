/************ fun RandomHexColor ************/
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
// console.log(getRandomHexColor());
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let int;
buttonStop.disabled = true;

/************ start  ************/
buttonStart.addEventListener('click', handlerClickOnStart);
function handlerClickOnStart() {
  int = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

/************ stop ************/
buttonStop.addEventListener('click', handlerClickOnStop);
function handlerClickOnStop() {
  clearInterval(int);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}
