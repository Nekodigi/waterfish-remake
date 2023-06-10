//find angle of input_array[point1], input_array[point2], input_array[point3]
export function find_angle(input_array, point_1, point_2, point_3) {
  if (input_array[0] === undefined)return 0;
  for(var i=0;i<3;i++)if(input_array[0][i] === undefined)return 0;

  var angle = calculate_angle(input_array[0][point_1], input_array[0][point_2], input_array[0][point_3])
  return angle

}

export function precise(x) {
  return Number.parseFloat(x).toFixed(2);
}

function calculate_angle(a, b, c) {
  var radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  var angle = (radians * 180 / Math.PI);


  angle = Math.abs(angle)

  if (angle > 180)
    angle = 360 - angle;

  return angle;
}