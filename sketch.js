let quadArr = [];
let myCanvas;
let num = 60;
let newAng = 1;
let noiseBase = 0.001;

class Rect {
  constructor (xc1, yc1, xc2, yc2, xc3, yc3, xc4, yc4) {
    this.xc1 = xc1;
    this.yc1 = yc1;
    this.xc2 = xc2;
    this.yc2 = yc2;
    this.xc3 = xc3;
    this.yc3 = yc3;
    this.xc4 = xc4;
    this.yc4 = yc4;
    this.colour = color(random(0, 255), random(0, 255), random(0, 255), 42);
  }

  paint() {
    fill(this.colour);
    noStroke();
    //paint irregular 4 sided shape
    quad(this.xc1, this.yc1, this.xc2, this.yc2, this.xc3, this.yc3, this.xc4, this.yc4);
  }

  update(direction) {
    newAng += 0.1;
    noiseBase += 0.001;
    const noiseAmt = noise(noiseBase);
    let mult = 20 * noiseAmt;
    const wildcard = random(20, 120);

    //randomly increase or decrease
    //the noise multiplier
    if (wildcard < 70 && wildcard > 50) {
      mult = 40 * noiseAmt;
    }
    else if (wildcard < 50 && wildcard > 30) {
      mult = 10 * noiseAmt;
    }
    else {
      mult = 20 * noiseAmt;
    }

    if (direction === 'left') {
      this.xc2 += sin(newAng) * mult;
      this.yc2 += cos(newAng) * mult;
      this.xc3 += sin(newAng) * mult;
      this.yc3 += cos(newAng) * mult;
    }
    else {
      this.xc2 -= sin(newAng) * mult;
      this.yc2 -= cos(newAng) * mult;
      this.xc3 -= sin(newAng) * mult;
      this.yc3 -= cos(newAng) * mult;
    }
  }
}

function createQuadArr(mode) {

	mode = true;
	//Spiral logic
	let innerRadius = 1;
	let outerRadius = 80;
	//fixed points
	//TODO if mode is true
	//let radAngle = 15;
	//let radAngle2 = 22;
	//points based on num
	let radAngle = num/3;
	let radAngle2 = num/1.5;

	for (var i = 0; i < num; i++) {

		innerRadius += 1;
		outerRadius += 1;
		rad = radians(i * radAngle);
		rad2 = radians(i * radAngle2);

		//Inner pt one
		const xc1 = sin(rad) * innerRadius + (width/2);
		const yc1 = cos(rad) * innerRadius + (height/2);
		//Outer pt one
		const xc2 = sin(rad) * outerRadius + (width/2);
		const yc2 = cos(rad) * outerRadius + (height/2);
		//Outer pt two
		const xc3 = sin(rad2) * outerRadius + (width/2);
		const yc3 = cos(rad2) * outerRadius + (height/2);
		//Inner pt two
		const xc4 = sin(rad2) * innerRadius + (width/2);
		const yc4 = cos(rad2) * innerRadius + (height/2);
		const newQuad = new Rect(xc1, yc1, xc2, yc2, xc3, yc3, xc4, yc4);
		quadArr.push(newQuad);
	}
}

function initControls() {
	const more = document.getElementById('more');
	const less = document.getElementById('less');
	more.addEventListener('click', function() {
		num += 30;
		quadArr = [];
		createQuadArr();
	});
	less.addEventListener('click', function() {
		num -= 30;
		quadArr = [];
		createQuadArr();
	});
}

function setup() {
	myCanvas = createCanvas(1024,600);
	myCanvas.parent('canvas-container');
	background(0,0,0);
	createQuadArr();
	initControls();
}

function draw() {
	background(0, 0, 0);
	//loop through every other object
	//starting at zero
	for (var i = 0; i < quadArr.length; i += 2) {
		quadArr[i].paint();
		quadArr[i].update('left');
	}
	//loop through every other object
	//starting at one
	for (var i = 1; i < quadArr.length; i += 2) {
		quadArr[i].paint();
		quadArr[i].update('right');
	}
}
