export var hands_required_angles = [
  /*
    for (let i = 0; i < 5; i++) {
    if (
      (selected_hands[i][1] > 0 &&
        angles[i] <= Math.abs(selected_hands[i][1])) ||
      (selected_hands[i][1] < 0 && angles[i] >= Math.abs(selected_hands[i][1]))
    );
    else {
      flag = false;
      break;
    }
  }
  */
  //0 
  [
    [
      [4, 1, 0], //landmark points
      -110 //required angle
    ],

    [
      [5, 1, 2], //landmark points
      -35 //required angle 
    ],

    [
      [6, 5, 9], //landmark points
      87 //required angle
    ],

    [
      [16, 15, 14], //landmark points
      -170  //required angle
    ],

    [
      [18, 17, 13], //landmark points
      130  //required angle
    ]
  ],

  //1
  [
    [
      [16, 14, 13], //landmark points
      -150 //required angle
    ],

    [
      [18, 17, 13], //landmark points
      70 //required angle 
    ],

    [
      [10, 9, 13], //landmark points
      130 //required angle
    ],

    [
      [6, 5, 9], //landmark points
      -92  //required angle
    ],

    [
      [5, 1, 0], //landmark points
      170  //required angle
    ]
  ],

  //2
  [
    [
      [6, 5, 9], //landmark points
      92 //required angle
    ],

    [
      [12, 10, 9], //landmark points
      -170 //required angle 
    ],

    [
      [15, 14, 13], //landmark points
      60 //required angle
    ],

    [
      [20, 18, 17], //landmark points
      90  //required angle
    ],

    [
      [3, 2, 1], //landmark points
      165  //required angle
    ]
  ],
];