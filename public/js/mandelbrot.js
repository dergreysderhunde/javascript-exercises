// author: Daniel Shiffman
// source: https://www.youtube.com/watch?v=6z7GQewK-Ks

const iterations = 20;

let lastX;
let lastY;
let currentX;
let currentY;
let minX;
let maxX;
let minY;
let maxY;
let ratioX;
let ratioY;

function setup() {
	createCanvas(360, 240);
	pixelDensity(1);
	lastX = 0;
	lastY = 0;
	currentX = 0;
	currentY = 0;
	minX = -2;
	maxX = 1;
	minY = -1;
	maxY = 1;
	ratioX = (maxX - minX) / width;
	ratioY = (maxY - minY) / height;
}

function draw() {
	loadPixels();

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			let a = map(x, 0, width, minX, maxX);
			let b = map(y, 0, height, minY, maxY);
			const constA = a;
			const constB = b;
			let n = 0;

			while (n < iterations) {
				const letA = (a * a) - (b * b);
				const letB = 2 * a * b;

				a = letA + constA;
				b = letB + constB;

				if (a === letA && b === letB) {
					break;
				}

				n++;
			}

			const pix = (x + (y * width)) * 4;

			if (n === iterations || (a === 0 && b === 0)) {
				pixels[pix + 0] = 0;
				pixels[pix + 1] = 0;
				pixels[pix + 2] = 0;
				pixels[pix + 3] = 255;
			}			else {
				let bright = map(n, 0, iterations, 0, 1);
				bright = map(sqrt(bright), 0, 1, 0, 255);

				pixels[pix + 0] = bright;
				pixels[pix + 1] = bright;
				pixels[pix + 2] = 150;
				pixels[pix + 3] = 255;
			}
		}
	}

	updatePixels();
}

function mousePressed() {
	noLoop();

	setTimeout(() => {
		lastX = mouseX;
		lastY = mouseY;
	}, 0);
}

function mouseReleased() {
	currentX = mouseX;
	currentY = mouseY;
	minX += (lastX - currentX) * ratioX;
	maxX += (lastX - currentX) * ratioX;
	minY += (lastY - currentY) * ratioY;
	maxY += (lastY - currentY) * ratioY;
	lastX = 0;
	lastY = 0;
	currentX = 0;
	currentY = 0;
	loop();
}
