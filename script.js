const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const stopAlarmBtn = document.getElementById("stop-alarm");
const alarm = document.getElementById("alarm");

let animationFrame;
let paused = false;

function playAlarm() {
    cancelAnimationFrame(animationFrame);
    alarm.muted = false; // Unmute the audio before playing it
    alarm.play();
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
  }

function updateTimer() {
  const now = new Date().getTime();
  const remainingTime = endTime - now;

  if (remainingTime <= 0) {
    playAlarm();
  } else {
    const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    hoursInput.value = remainingHours;
    minutesInput.value = remainingMinutes;
    secondsInput.value = remainingSeconds;

    if (!paused) {
      animationFrame = requestAnimationFrame(updateTimer);
    }
  }
}

let endTime;

startBtn.addEventListener("click", () => {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    return;
  }

  endTime = new Date().getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000;
  paused = false;
  updateTimer();
});

pauseBtn.addEventListener("click", () => {
  paused = true;
});

resetBtn.addEventListener("click", () => {
  cancelAnimationFrame(animationFrame);
  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
});

stopAlarmBtn.addEventListener("click", () => {
  alarm.pause();
  alarm.currentTime = 0;
});