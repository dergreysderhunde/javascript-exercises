// author: Daniel Shiffman
// source: https://www.youtube.com/watch?v=6z7GQewK-Ks

const iterations = 200;

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
	createCanvas(720, 480);
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

				if (sqrt((a * a) + (b * b)) > 2) {
					break;
				}

				n++;
			}

			const pix = (x + (y * width)) * 4;

			if (n === iterations) {
				pixels[pix + 0] = 0;
				pixels[pix + 1] = 0;
				pixels[pix + 2] = 0;
				pixels[pix + 3] = 255;
			}			else {
				let bright = map(n, 0, iterations, 0, 1);
				bright = map(pow(bright, 0.25), 0, 1, 0, 255);

				pixels[pix + 0] = bright;
				pixels[pix + 1] = 0;
				pixels[pix + 2] = 255 - bright;
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

function mouseWheel() {
	const dir = -(event.delta / abs(event.delta));
	minX += 0.1 * dir;
	maxX -= 0.1 * dir;
	minY += 0.066 * dir;
	maxY -= 0.066 * dir;
}
