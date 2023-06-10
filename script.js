

if (typeof(Storage) !== "undefined") {
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


var pictures = [
    
    'https://raw.githubusercontent.com/YukiPoon724/yukipoon724.github.io/main/V1.jpg',
    'https://raw.githubusercontent.com/YukiPoon724/yukipoon724.github.io/main/V2.jpg',
    'https://raw.githubusercontent.com/YukiPoon724/yukipoon724.github.io/main/V3.jpg',
    'https://raw.githubusercontent.com/YukiPoon724/yukipoon724.github.io/main/V4.jpg',
    'https://raw.githubusercontent.com/YukiPoon724/yukipoon724.github.io/main/fist.jpg',
    'https://raw.githubusercontent.com/YukiPoon724/yukipoon724.github.io/main/ok.jpg',

  ];


var hands_required_angles = [

//0 
    [
        [ 
            [3, 2, 1], //landmark points
            155 //required angle
        ],

        [ 
            [2, 1, 0], //landmark points
            160 //required angle
        ],

        [ 
            [1, 0, 5], //landmark points
            40 //required angle
        ]
    ],

//1 
    [ 
        [
            [6, 5, 9], //landmark points
            -90 //required angle
        ],

        [ 
            [5, 9, 10], //landmark points
            -110 //required angle
        ],

        [ 
            [5, 9, 10], //landmark points
            -110 //required angle
        ]
    ],
    
//2
     [ 
        [
            [10, 9, 13], //landmark points
            110 //required angle
        ],

        [ 
            [9, 13, 14], //landmark points
            85 //required angle
        ],

        [ 
            [9, 13, 14], //landmark points
            85 //required angle
        ]
    ],  

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


];

var random_index = Math.floor(Math.random()*hands_required_angles.length);


function calculate_angle(a,b,c){
    var radians = Math.atan2(c.y-b.y, c.x-b.x) - Math.atan2(a.y-b.y, a.x-b.x);
    var angle = (radians*180/Math.PI);
   

    angle=Math.abs(angle)
    
    if (angle > 180) 
        angle = 360-angle;
        
    return angle;
}

function find_angle(input_array, point_1, point_2, point_3)
{

  if ( typeof (input_array[0]) == 'undefined' )
    return 0;

    //console.log(input_array)
    //console.log(point_1)
    //console.log(input_array[0])
    //console.log(input_array[1])

  if ( typeof (input_array[0][point_1]) !== 'undefined' || typeof (input_array[0][point_2]) !== 'undefined' || typeof (input_array[0][point_3]) !== 'undefined' )
      
    var angle = calculate_angle(input_array[0][point_1],input_array[0][point_2], input_array[0][point_3] )
    return angle

}

function precise(x) {
  return Number.parseFloat(x).toFixed(2);
}

//This the loop start
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
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }


  

  var selected_hands = hands_required_angles[random_index];

  document.getElementById('target_img').src=pictures[random_index];

 
  var angle1 = find_angle(results.multiHandLandmarks, selected_hands[0][0][0], selected_hands[0][0][1], selected_hands[0][0][2]);

    canvasCtx.font = "30px Arial";
    canvasCtx.fillText("Angle"+angle1, 10, 50);        
    console.log(angle1)

  var angle2 = find_angle(results.multiHandLandmarks, selected_hands[1][0][0], selected_hands[1][0][1], selected_hands[1][0][2]);

    canvasCtx.font = "30px Arial";
    canvasCtx.fillText("Angle"+angle2, 10, 80);        
    console.log(angle2)

  var angle3 = find_angle(results.multiHandLandmarks, selected_hands[2][0][0], selected_hands[2][0][1], selected_hands[2][0][2]);

    canvasCtx.font = "30px Arial";
    canvasCtx.fillText("Angle"+angle3, 10, 110);        
    console.log(angle3)

  //console.log(selected_hands[0][1]);

  // Store
  //localStorage.setItem("times", timesval);

  // Retrieve
  
  var timeval = parseInt(localStorage.getItem("times"));
  console.log(timeval);

  

   if ( angle1 <= selected_hands[0][1] && angle2 <= selected_hands[1][1] && angle3 <= selected_hands[2][1] &&angle1!=0 &&angle2!=0 &&angle3!=0)
   {

      canvasCtx.font = "100px Arial";
      canvasCtx.fillText("😁", 10, 220)

      if ( notcal == true )
      {
        timeval = timeval + 1;
        localStorage.setItem("times", timeval);
        notcal = false
      }
  


   }

  canvasCtx.restore();
}


const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
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
    await hands.send({image: videoElement});
    videoWidth = videoElement.videoWidth;
    videoHeight = videoElement.videoHeight;    
  },
  //width: 640,
  //height: 360
});
canvasCtx.font = "30px Arial";
canvasCtx.fillText("Please allow camera permission, Loading..." , 10, 50);    
camera.start();