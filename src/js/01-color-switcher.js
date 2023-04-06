function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

refs.stopButton.addEventListener('click', () => {
  refs.stopButton.disabled = true;
  refs.startButton.disabled = false;
  clearInterval(intervalId);
});

refs.startButton.addEventListener('click', () => {
  refs.startButton.disabled = true;
  refs.stopButton.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

let intervalId = null;
