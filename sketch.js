var quadArr = [];
var myCanvas;
var num = 60;
var newAng = 1;
var noiseBase = 0.001;

function Rect(xc1, yc1, xc2, yc2, xc3, yc3, xc4, yc4) {
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

Rect.prototype.paint = function() {
	fill(this.colour);
	noStroke();
	//paint irregular 4 sided shape
	quad(this.xc1, this.yc1, this.xc2, this.yc2, this.xc3, this.yc3, this.xc4, this.yc4);
}

Rect.prototype.update = function(direction) {
	newAng += 0.1;
	noiseBase += 0.001;
	var noiseAmt = noise(noiseBase);
	var mult = 20 * noiseAmt;
	var wildcard = random(20, 120);

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

function createQuadArr(mode) {

	mode = true;
	//Spiral logic
	var innerRadius = 1;
	var outerRadius = 80;
	//fixed points
	//TODO if mode is true
	//var radAngle = 15;
	//var radAngle2 = 22;
	//points based on num
	 var radAngle = num/3;
	var radAngle2 = num/1.5;
		
	for (var i = 0; i < num; i++) {

		innerRadius += 1;
		outerRadius += 1;
		rad = radians(i * radAngle);
		rad2 = radians(i * radAngle2);

		//Inner pt one
		var xc1 = sin(rad) * innerRadius + (width/2);
		var yc1 = cos(rad) * innerRadius + (height/2);
		//Outer pt one
		var xc2 = sin(rad) * outerRadius + (width/2);
		var yc2 = cos(rad) * outerRadius + (height/2);
		//Outer pt two
		var xc3 = sin(rad2) * outerRadius + (width/2);
		var yc3 = cos(rad2) * outerRadius + (height/2);
		//Inner pt two
		var xc4 = sin(rad2) * innerRadius + (width/2);
		var yc4 = cos(rad2) * innerRadius + (height/2);
		var newQuad = new Rect(xc1, yc1, xc2, yc2, xc3, yc3, xc4, yc4);
		quadArr.push(newQuad);
	}
}

function initControls() {
	var more = document.getElementById('more');
	var less = document.getElementById('less');
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