//Copied from https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js, override function
var w = {
  color: "white",
  lineWidth: 4,
  radius: 6,
  visibilityMin: .5
};
function q(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : {
    next: h(a)
  }
}
var r = "function" == typeof Object.assign ? Object.assign : function (a, c) {
  for (var b = 1; b < arguments.length; b++) {
    var d = arguments[b];
    if (d)
      for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e])
  }
  return a
};
function x(a) {
  a = a || {};
  return Object.assign(Object.assign(Object.assign({}, w), {
    fillColor: a.color
  }), a)
}
function y(a, c) {
  return a instanceof Function ? a(c) : a
}

function z(a, c, b) {
  return Math.max(Math.min(c, b), Math.min(Math.max(c, b), a))
}

/*
  function drawConnectors (a, c, b, d) {
  if (c && b) {
    d = x(d);
    a.save();
    var e = a.canvas,
      f = 0;
    b = q(b);
    for (var g = b.next(); !g.done; g = b.next()) {
      var k = g.value;
      a.beginPath();
      g = c[k[0]];
      k = c[k[1]];
      g && k && (void 0 === g.visibility || g.visibility > d.visibilityMin) && (void 0 === k.visibility || k.visibility > d.visibilityMin) && (a.strokeStyle = y(d.color, {
        index: f,
        from: g,
        to: k
      }), a.lineWidth = y(d.lineWidth, {
        index: f,
        from: g,
        to: k
      }), a.moveTo(g.x * e.width, g.y * e.height), a.lineTo(k.x * e.width, k.y * e.height));
      ++f;
      a.stroke()
    }
    a.restore()
  }
};
*/

function drawLandmarks(a, c, b) {
  if (c) {
    b = x(b);
    a.save();
    var d = a.canvas,
      e = 0;
    c = q(c);
    for (var f = c.next(); !f.done; f = c.next())
      if (f = f.value, void 0 !== f && (void 0 === f.visibility || f.visibility > b.visibilityMin)) {
        a.fillStyle = y(b.fillColor, {
          index: e,
          from: f
        });
        a.strokeStyle = y(b.color, {
          index: e,
          from: f
        });
        a.lineWidth = y(b.lineWidth, {
          index: e,
          from: f
        });
        var g = new Path2D;
        g.arc(f.x * d.width, f.y * d.height, y(b.radius / 2, {
          index: e,
          from: f
        }), 0, 2 * Math.PI);
        a.fill(g);
        a.stroke(g);
        ++e
      } a.restore()
  }
};  