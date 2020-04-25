var minuteSoftDisplay = document.getElementById('countdown-minute-soft');
var secondSoftDisplay = document.getElementById('countdown-second-soft');
var startSoft = document.getElementById('soft-button');

var minuteMediumDisplay = document.getElementById('countdown-minute-medium');
var secondMediumDisplay = document.getElementById('countdown-second-medium');
var startMedium = document.getElementById('medium-button');

var minuteHardDisplay = document.getElementById('countdown-minute-hard');
var secondHardDisplay = document.getElementById('countdown-second-hard');
var startHard = document.getElementById('hard-button');

var customHourDisplay = document.getElementById('hour');
var customMinuteDisplay = document.getElementById('minute');
var customSecondDisplay = document.getElementById('second');
var startCustom = document.getElementById('start');

function addZero(n) {
  return n < 10 ? '0' + n : n;
}

function startTimer(secondDisplay, minuteDisplay, timeStart) {
  var timeLeftSecond = timeStart * 60;
  var displaySecond = 60;
  var timerDuration = setInterval(function () {
    timeLeftSecond--;
    displaySecond--;
    minuteDisplay.textContent = addZero(timeStart-1);
    secondDisplay.textContent = addZero(displaySecond);
    if (displaySecond <= 0) {
      displaySecond = 60;
      timeStart = timeStart - 1;
      minuteDisplay.textContent = addZero(timeStart);
    }
    if (timeLeftSecond <= 0) {
      clearInterval(timerDuration);
    }
    if (timeLeftSecond <= 0 && timeStart == 0) {
      minuteDisplay.style.color = 'red';
      secondDisplay.style.color = 'red';
      var audio = new Audio('./gallery/alarm.mp3');
      audio.play();
    }
  }, 1000);
}

startSoft.addEventListener('click', function () {
  startTimer(secondSoftDisplay, minuteSoftDisplay, 5);
  startSoft.disabled = true;
});

startMedium.addEventListener('click', function () {
  startTimer(secondMediumDisplay, minuteMediumDisplay, 7);
  startMedium.disabled = true;
});

startHard.addEventListener('click', function () {
  startTimer(secondHardDisplay, minuteHardDisplay, 12);
  startHard.disabled = true;
});

const input = document.querySelector('input');
const log = document.getElementById('log');

var summary = 0;

customHourDisplay.addEventListener('change', updateValue);
customMinuteDisplay.addEventListener('change', updateValue);
customSecondDisplay.addEventListener('change', updateValue);

function updateValue() {
  summary =
    Number(customHourDisplay.value) * 60 * 60 +
    Number(customMinuteDisplay.value) * 60 +
    Number(customSecondDisplay.value);
}

start.addEventListener('click', function (e) {
  e.preventDefault();
  var timeStart = summary;
  var displayHour = customHourDisplay.value;
  var displayMinute = customMinuteDisplay.value;
  var displaySecond = customSecondDisplay.value;
  var timerDuration = setInterval(function () {
    summary--;
    customSecondDisplay.value--;
    customSecondDisplay.textContent = addZero(customSecondDisplay);
    if (customMinuteDisplay.value < 0) {
      customMinuteDisplay.value = 59;
      customMinuteDisplay.value.textContent = addZero(customMinuteDisplay);
      customHourDisplay.value--;
      customHourDisplay.value.textContent = addZero(customHourDisplay);
    }
    if (customSecondDisplay.value < 0) {
      customSecondDisplay.value = 59;
      customSecondDisplay.value.textContent = addZero(customSecondDisplay);
      customMinuteDisplay.value--;
      customMinuteDisplay.value.textContent = addZero(customMinuteDisplay);
    }
    if (summary <= 0) {
      clearInterval(timerDuration);
    }
    if (customSecondDisplay.value <= 0 && summary == 0) {
      customSecondDisplay.style.color = 'red';
      customMinuteDisplay.style.color = 'red';
      customHourDisplay.style.color = 'red';
      var audio = new Audio('./gallery/alarm.mp3');
      audio.play();
    }
  }, 1000);
});
