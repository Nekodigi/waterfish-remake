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
      -40 //required angle 
    ],

    [
      [6, 5, 9], //landmark points
      80 //required angle
    ],

    [
      [16, 15, 14], //landmark points
      -170  //required angle
    ],

    [
      [18, 17, 13], //landmark points
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
      130 //required angle
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
];