if (typeof (Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
} else {
  // Sorry! No Web Storage support..
  alert("Sorry please change browser");
}
var notcal = true






const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
var videoWidth = 640
var videoHeight = 480

//Pictures
var pictures = [

  'https://raw.githubusercontent.com/clctstem1/clctstem1.github.io/726e8f8445bf5246194f868c0959f9a29c3bb466/V1.jpg',
  'https://raw.githubusercontent.com/clctstem1/clctstem1.github.io/726e8f8445bf5246194f868c0959f9a29c3bb466/V2.jpg',
  'https://raw.githubusercontent.com/clctstem1/clctstem1.github.io/main/fish_cross_finger_3.jpeg',
  'https://raw.githubusercontent.com/clctstem1/clctstem1.github.io/726e8f8445bf5246194f868c0959f9a29c3bb466/V4.jpg',
  'https://raw.githubusercontent.com/clctstem1/clctstem1.github.io/726e8f8445bf5246194f868c0959f9a29c3bb466/fist.jpg',
  'https://raw.githubusercontent.com/clctstem1/clctstem1.github.io/726e8f8445bf5246194f868c0959f9a29c3bb466/ok.jpg',

];


//angle setting

var holding_time = 0
var hands_required_angles = [

  //0 
  [
    [
      [4, 1, 0], //landmark points
      -150 //required angle
    ],

    [
      [5, 0, 1], //landmark points
      -35 //required angle 
    ],

    [
      [6, 5, 9], //landmark points
      90 //required angle
    ],

    [
      [12, 11, 9], //landmark points
      -170  //required angle
    ],

    [
      [14, 13, 17], //landmark points
      120  //required angle
    ]
  ],

  //1
  [
    [
      [16, 15, 13], //landmark points
      -175 //required angle
    ],

    [
      [18, 17, 13], //landmark points
      55 //required angle 
    ],

    [
      [10, 9, 13], //landmark points
      110 //required angle
    ],

    [
      [6, 5, 9], //landmark points
      -95  //required angle
    ],

    [
      [3, 2, 1], //landmark points
      170  //required angle
    ]
  ],

  //2
  [
    [
      [6, 5, 0], //landmark points
      165 //required angle
    ],

    [
      [12, 11, 9], //landmark points
      -170 //required angle 
    ],

    [
      [15, 14, 13], //landmark points
      30 //required angle
    ],

    [
      [19, 18, 17], //landmark points
      30  //required angle
    ],

    [
      [3, 2, 1], //landmark points
      150  //required angle
    ]
  ],
  
  /* 
  //3
     [ 
          [
              [14, 13, 17], //landmark points
              115 //required angle
          ],
  
          [ 
              [13, 17, 18], //landmark points
              75 //required angle
          ],
  
          [ 
              [13, 17, 18], //landmark points
              75 //required angle
          ]
      ],
  
  //4 
      [ 
          [
              [0, 17, 18], //landmark points
              -100 //required angle
          ],
  
          [ 
              [17, 18, 19], //landmark points
              -100 //required angle
          ],
  
          [ 
              [18, 19, 20], //landmark points
              -130 //required angle
          ]
      ],
      
  //5 
      [ 
          [
              [7, 6, 5], //landmark points
              -95 //required angle
          ],
  
          [ 
              [6, 5, 0], //landmark points
              -95 //required angle
          ],
  
          [ 
              [6, 5, 0], //landmark points
              -130 //required angle
          ]
      ],  
  */
];

//var random_index = Math.floor(Math.random() * hands_required_angles.length);
var random_index = 0
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var index = urlParams.get('hand')

//sleep function

function sleep(duration) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, duration * 1000)
    })
  }


console.log(index)
alert(index)


function calculate_angle(a, b, c) {
  var radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  var angle = (radians * 180 / Math.PI);


  angle = Math.abs(angle)

  if (angle > 180)
    angle = 360 - angle;

  return angle;
}

function find_angle(input_array, point_1, point_2, point_3) {

  if (typeof (input_array[0]) == 'undefined')
    return 0;

  //console.log(input_array)
  //console.log(point_1)
  //console.log(input_array[0])
  //console.log(input_array[1])

  if (typeof (input_array[0][point_1]) !== 'undefined' || typeof (input_array[0][point_2]) !== 'undefined' || typeof (input_array[0][point_3]) !== 'undefined')

    var angle = calculate_angle(input_array[0][point_1], input_array[0][point_2], input_array[0][point_3])
  return angle

}

function precise(x) {
  return Number.parseFloat(x).toFixed(2);
}

//This is the loop start
function onResults(results) {
  canvasCtx.save();
  canvasElement.width = videoWidth;
  canvasElement.height = videoHeight;
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
        { color: '#00FF00', lineWidth: 5 });
      drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
    }
  }

  //function of doMeasureHand
  function doMeasureHand(index) {

    var selected_hands = hands_required_angles[index];

    document.getElementById('target_img').src = pictures[index];
    console.log(selected_hands)

    var angle1 = find_angle(results.multiHandLandmarks, selected_hands[0][0][0], selected_hands[0][0][1], selected_hands[0][0][2]);
    //canvasCtx.fillStyle = "#ffffffE5";
    //canvasCtx.fillRect(0, 0, 640, 100)

    canvasCtx.font = "20px Arial";
    canvasCtx.fillStyle = "#FF0000";
    canvasCtx.fillText("Angle" + angle1, 10, 30);
    // console.log(angle1)

    var angle2 = find_angle(results.multiHandLandmarks, selected_hands[1][0][0], selected_hands[1][0][1], selected_hands[1][0][2]);

    canvasCtx.font = "20px Arial";
    canvasCtx.fillStyle = "#FF0000";
    canvasCtx.fillText("Angle" + angle2, 10, 60);
    // console.log(angle2)

    var angle3 = find_angle(results.multiHandLandmarks, selected_hands[2][0][0], selected_hands[2][0][1], selected_hands[2][0][2]);

    canvasCtx.font = "20px Arial";
    canvasCtx.fillStyle = "#FF0000";
    canvasCtx.fillText("Angle" + angle3, 10, 90);
    // console.log(angle3)

    var angle4 = find_angle(results.multiHandLandmarks, selected_hands[3][0][0], selected_hands[3][0][1], selected_hands[3][0][2]);

    canvasCtx.font = "20px Arial";
    canvasCtx.fillStyle = "#FF0000";
    canvasCtx.fillText("Angle" + angle4, 10, 120);
    // console.log(angle4)

    var angle5 = find_angle(results.multiHandLandmarks, selected_hands[4][0][0], selected_hands[4][0][1], selected_hands[4][0][2]);

    canvasCtx.font = "20px Arial";
    canvasCtx.fillStyle = "#FF0000";
    canvasCtx.fillText("Angle" + angle5, 10, 150);
    // console.log(angle5)

    //console.log(selected_hands[0][1]);

    // Store
    // localStorage.setItem("times", timesval);

    // Retrieve
    canvasCtx.fillText("Holding time: " + String(holding_time), 10, 180);
    //var timeval = parseInt(localStorage.getItem("times")) + 0;
    //console.log(timeval);
    
    if (angle1 != 0 && angle2 != 0 && angle3 != 0 && angle4 != 0 && angle5 != 0) {
      if (((selected_hands[0][1] > 0 && angle1 <= Math.abs(selected_hands[0][1])) || (selected_hands[0][1] < 0 && angle1 >= Math.abs(selected_hands[0][1]))) &&
        ((selected_hands[1][1] > 0 && angle2 <= Math.abs(selected_hands[1][1])) || (selected_hands[1][1] < 0 && angle2 >= Math.abs(selected_hands[1][1]))) &&
        ((selected_hands[2][1] > 0 && angle3 <= Math.abs(selected_hands[2][1])) || (selected_hands[2][1] < 0 && angle3 >= Math.abs(selected_hands[2][1]))) &&
        ((selected_hands[3][1] > 0 && angle4 <= Math.abs(selected_hands[3][1])) || (selected_hands[3][1] < 0 && angle4 >= Math.abs(selected_hands[3][1]))) &&
        ((selected_hands[4][1] > 0 && angle5 <= Math.abs(selected_hands[4][1])) || (selected_hands[4][1] < 0 && angle5 >= Math.abs(selected_hands[4][1])))) 

        {
        canvasCtx.font = "100px Arial";
        canvasCtx.fillText("😁", 10, 300)
        
        holding_time += 1

        if (holding_time > 99) {
          alert("successful")

          index=Number(index)
        //index = Math.floor(Math.random() * 3) - 1
        //index = Math.floor(Math.random() * (max - min + 1) + min)
        var index_old = index
        while (index == index_old)
        {
          index = Math.floor(Math.random() * 3)
        }
        //index += Math.floor(Math.random() * (1) % 3

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        urlParams.set('hand', (index) )
        
        

        //window.location.href = '?'+urlParams.toString();

        setTimeout(function() {
          
          window.location.href = '?'+urlParams.toString();
        }, 2000);
        
        

        //doMeasureHand(1)
              //var next_index = index + 1;
              // if (next_index >= hands_required_angles.length)
              //  next_index = 0;
        
             // doMeasureHand(next_index)
        
        /*if (notcal == true) {
          timeval = timeval + 1;
          localStorage.setItem("times", timeval);
          notcal = false
        }*/
        
        //}
    //else {
    //  holding_time = 0
    //}
        }

        }
      else 
        {
        holding_time = 0
        }
        /*
        if (notcal == true) {
          setTimeout(function() {
            
            alert("successful");
          }, 2000);
          notcal = false
        }
        
        //https://clctstem1.github.io/
        //https://clctstem1.github.io/?hand=0
        */
        


        
    }
  }



  /*let timeout;
  
  function doMeasureTimeout(index)
  {
    timeout = setTimeout(doMeasureHand(index), 3000);
  }
    doMeasureTimeout(0)
    doMeasureTimeout(1)
  */
  doMeasureHand(index)

  //Number of completions 
  /*    canvasCtx.font = "20px Arial";
      canvasCtx.fillText("Number of completions: "+timeval, 10, 160);        
  */
  canvasCtx.restore();



}



const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});
hands.setOptions({
  selfieMode: true,
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
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
canvasCtx.fillText("Please allow camera permission, Loading...", 10, 50);
camera.start();


