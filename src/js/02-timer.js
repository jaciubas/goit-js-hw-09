import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let chosenTime = Date.now();

const timerRefs = {
  startTimer: document.querySelector('[data-start]'),
  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-Hours]'),
  minsLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

timerRefs.startTimer.addEventListener('click', reverseTimer);

const dateInput = document.querySelector('#datetime-picker');
timerRefs.startTimer.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      timerRefs.startTimer.disabled = true;
      Notiflix.Notify.failure('Incorrect date! Choose the future date');
      return;
    }
    chosenTime = selectedDates[0].getTime();
    timerRefs.startTimer.disabled = false;
  },
};

const flatpick = flatpickr(dateInput, options);

function reverseTimer() {
  Notiflix.Notify.success('Timer started');
  timerRefs.startTimer.disabled = true;
  const intervalID = setInterval(() => {
    let timeLeft = chosenTime - Date.now();
    if (timeLeft <= 0) {
      clearInterval(intervalID);
      Notiflix.Notify.info('TIME IS OUT');
      timerRefs.startTimer.disabled = false;
      return;
    }
    editTimeValue(timeLeft);
  }, 1000);
}

function editTimeValue(timeLeft) {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  timerRefs.daysLeft.textContent = addLeadingZero(days);
  timerRefs.hoursLeft.textContent = addLeadingZero(hours);
  timerRefs.minsLeft.textContent = addLeadingZero(minutes);
  timerRefs.secondsLeft.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  const a = value.toString();
  return a.padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
