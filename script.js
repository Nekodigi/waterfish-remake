import { find_angle } from "./function/angle.js";
import { hands_required_angles } from "./consts/hand.js";
import { drawAngle, drawLandmarks } from "./function/draw.js";
import { hand_imgs } from "./consts/hand_img.js";

var holding_time = 0;
var accept_emoji = "";
var required_hoding_time = 100;

var videoWidth = 640;
var videoHeight = 480;

// if (typeof Storage !== "undefined") {
//   // Code for localStorage/sessionStorage.
// } else {
//   // Sorry! No Web Storage support..
//   alert("Sorry please change browser");
// }

const videoElement = document.getElementById("input_video");
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

var index = 0;
var count = 0;

// on page load...
moveProgressBar();
// on browser resize...
$(window).resize(function () {
  moveProgressBar();
});

// SIGNATURE PROGRESS
export function moveProgressBar() {
  console.log("moveProgressBar");
  //var getPercent = $(".progress-wrap").data("progress-percent") / 100;
  var getProgressWrapWidth = $(".progress-wrap").width();
  var progressTotal =
    (holding_time / required_hoding_time) * getProgressWrapWidth;
  var animationLength = 0;

  // on page load, animate percentage bar to data percentage length
  // .stop() used to prevent animation queueing
  $(".progress-bar").stop().animate(
    {
      width: progressTotal,
    },
    animationLength
  );
}

startAuth();

var selected_hands = hands_required_angles[index];
function startAuth() {
  holding_time = 0;

  console.log("start auth:" + index);
  selected_hands = hands_required_angles[index];
  let res_elem = document.getElementById("result");
  res_elem.innerHTML = `<h4>${"Auth completed: " + count}</h4>`;
}

var wrongAngles = [];
function doMeasureHand(results) {
  document.getElementById("target_img").src = hand_imgs[index];
  //console.log(selected_hands);

  let angles = [];
  for (let i = 0; i < 5; i++) {
    let angle = find_angle(
      results.multiHandLandmarks,
      selected_hands[i][0][0],
      selected_hands[i][0][1],
      selected_hands[i][0][2]
    );
    angles.push(angle);

    canvasCtx.font = "20px Arial";
    canvasCtx.fillStyle = "#000000";
    canvasCtx.fillText("Angle" + Math.round(angle), 10, 30 + 30 * i);
  }
  canvasCtx.fillText("Holding time: " + String(holding_time), 10, 180);

  wrongAngles = [];
  for (let i = 0; i < 5; i++) {
    if (angles[i] == 0) return;
  }
  let flag = true;
  for (let i = 0; i < 5; i++) {
    if (
      (selected_hands[i][1] > 0 &&
        angles[i] <= Math.abs(selected_hands[i][1])) ||
      (selected_hands[i][1] < 0 && angles[i] >= Math.abs(selected_hands[i][1]))
    ) {
    } else {
      wrongAngles.push(i);
      flag = false;
    }
  }

  if (flag) {
    canvasCtx.font = "100px Arial";
    canvasCtx.fillText(accept_emoji, 10, 300);

    holding_time += 1;

    if (holding_time > required_hoding_time) {
      alert("successful");

      index = Number(index);
      var index_old = index;
      while (index == index_old) {
        index = Math.floor(Math.random() * 3);
      }
      count++;
      startAuth();
    }
  } else {
    holding_time = 0;
  }

  // $(".progress-wrap").attr("data-progress-percent", holding_time);
  moveProgressBar();
}

//This is the loop start
function onResults(results) {
  canvasCtx.save();
  canvasElement.height = (canvasElement.width / videoWidth) * videoHeight;
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: "rgba(0, 255, 0, 0.4)",
        lineWidth: 2,
      });
      drawLandmarks(canvasCtx, landmarks, {
        color: "rgba(255, 0, 0, 0.4)",
        lineWidth: 1,
      });
    }
  }
  for (let wa of wrongAngles) {
    drawAngle(
      canvasCtx,
      results.multiHandLandmarks,
      selected_hands[wa][0][0],
      selected_hands[wa][0][1],
      selected_hands[wa][0][2]
    );
  }

  doMeasureHand(results);
  canvasCtx.restore();
}

//hand tracking
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});

hands.setOptions({
  selfieMode: true,
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
    videoWidth = videoElement.videoWidth;
    videoHeight = videoElement.videoHeight;
  },
  //width: 640,
  //height: 360
});
canvasCtx.font = "30px Arial";
canvasCtx.fillStyle = "#ffffff";
canvasCtx.fillText("Please allow camera permission, Loading...", 10, 50);
camera.start();
