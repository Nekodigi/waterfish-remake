const timerElement = document.getElementById("timer");
var start_time = new Date().getTime();

let updateTimer = () => {
  var now = new Date().getTime();
  var distance = now - start_time;
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  timerElement.innerHTML = `<h4>Time used: ${minutes}:${seconds}</h4>`;
};
var interval = setInterval(updateTimer, 1000);
updateTimer();
interval();
