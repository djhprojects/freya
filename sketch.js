// Coding Challenge 130.3: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130.1-fourier-transform-drawing.html
// https://thecodingtrain.com/CodingChallenges/130.2-fourier-transform-drawing.html
// https://thecodingtrain.com/CodingChallenges/130.3-fourier-transform-drawing.html
// https://youtu.be/7_vKzcgpfvU
// https://editor.p5js.org/codingtrain/sketches/ldBlISrsQ

let x = [];
let fourierX;
let time = 0;
let path = [];

function setup() {
  createCanvas(800, 600);
  const skip = 8;
  for (let i = 0; i < drawing.length; i += skip) {
    const c = new Complex(drawing[i].x, drawing[i].y);
    x.push(c);
  }
  fourierX = dft(x);
  fourierX.sort((a, b) => b.amp - a.amp);
}


function epicycles(x, y, rotation, fourier) {

  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);


    stroke(0, 0, 0, 10);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255, 255, 255, 0);
    line(prevx, prevy, x, y);

  }
  return createVector(x, y);
}


function pythagorean_theorem(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
return false; 
		return Math.sqrt(x * x + y * y);
  }
  

function draw() {
  background(245, 215, 243);

  let v = epicycles(width / 2, height / 2, 0, fourierX);
  path.unshift(v);

  beginShape(TRIANGLE_STRIP);
  noFill();

  var x_before = path[0].x;
  var y_before = path[0].y;
  for (let i = 0; i < path.length; i++) {
    x = path[i].x;
    y = path[i].y;

    dist = pythagorean_theorem(x-x_before, y-y_before);
    if (dist < 9) {
      stroke(59, 173, 89);
    } else {
      stroke(0, 0, 0, 0);
    }

    vertex(x, y);

    x_before = x;
    y_before = y;

  }
  endShape();

  const dt = TWO_PI / fourierX.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    //path = [];
  }
}

