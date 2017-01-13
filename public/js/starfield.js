const n = 400; // number of stars

const stars = [];

let speed = 0.5;

function setup() {
	createCanvas(document.body.offsetWidth, document.body.offsetHeight);
	background(0);
	for(let i = 0; i < n; i++) {
		const star = {
			x: width/2,
			y: height/2,
			r: random(height * 2),
			i: 0,
			theta: random(360)
		};
		star.currentX = star.x + star.r * cos(star.theta);
		star.currentY = star.y + star.r * sin(star.theta);
		stars.push(star);
	}
}

function draw() {
	background(0);
	for(let i = 0; i < n; i++) {
		ellipse(stars[i].x + stars[i].r * cos(stars[i].theta), stars[i].y + stars[i].r * sin(stars[i].theta), 8);
		stars[i].r += stars[i].i;
		stars[i].currentX += stars[i].i * cos(stars[i].theta);
		stars[i].currentY += stars[i].i * sin(stars[i].theta);
		stars[i].i += speed;
		if(stars[i].currentX < -width || stars[i].currentX > width * 2 || stars[i].currentY < -height || stars[i].currentY > height * 2) {
			stars[i].r = random(height * 2);
			stars[i].theta = random(360);
			stars[i].currentX = stars[i].x + stars[i].r * cos(stars[i].theta);
			stars[i].currentY = stars[i].y + stars[i].r * sin(stars[i].theta);
			stars[i].i = 0;
		}
	}
}

function mouseMoved() {
	for (let i = 0; i < n; i++) {
		stars[i].x = mouseX;
		stars[i].y = mouseY;
	}
}

function mouseWheel(e) {
	if(e.delta < 0) {
		for (let i = 0; i < n; i++) {
			speed *= 1.0001;
		}
	}
	if(e.delta > 0) {
		for (let i = 0; i < n; i++) {
			speed *= 0.9999;
		}
	}
}
