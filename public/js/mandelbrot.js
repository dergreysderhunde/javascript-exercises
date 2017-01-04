// author: Daniel Shiffman
// source: https://www.youtube.com/watch?v=6z7GQewK-Ks

const iterations = 400;

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
let ratio;
let p1;
let p2;
let p3;

function setup() {
	createCanvas(100, 100);
	pixelDensity(1);
	lastX = 0;
	lastY = 0;
	currentX = 0;
	currentY = 0;
	minX = -2;
	maxX = 2;
	minY = -2;
	maxY = 2;
	ratioX = (maxX - minX) / width;
	ratioY = (maxY - minY) / height;
	ratio = 1;
	p1 = 0.22;
	p2 = 0.24;
	p3 = 0.86;
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
			}
			else {
				let bright = map(n, 0 , iterations, 0, 1);
				bright = map(pow(bright, ratio), 0, 1, 0, 1);

				if (bright < p1) {
					pixels[pix + 0] = bright * (255 / p1);
					pixels[pix + 1] = bright * (255 / p1);
					pixels[pix + 2] = 100 + bright * (155 / p1);
					pixels[pix + 3] = 255;
				}
				else if (bright < p2) {
					pixels[pix + 0] = 255;
					pixels[pix + 1] = 255 - (bright - p1) * (135 / (p2 - p1));
					pixels[pix + 2] = 255 - (bright - p1) * (255 / (p2 - p1));
					pixels[pix + 3] = 255;
				}
				else if (bright < p3) {
					pixels[pix + 0] = 255 - (bright - p2) * (255 / (p3 - p2));
					pixels[pix + 1] = 170 - (bright - p2) * (170 / (p3 - p2));
					pixels[pix + 2] = 0;
					pixels[pix + 3] = 255;
				}
				else {
					pixels[pix + 0] = 0;
					pixels[pix + 1] = 0;
					pixels[pix + 2] = 0 + (bright - p3) * (100 / (1 - p3));
					pixels[pix + 3] = 255;
				}
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
	minX += 0.04875 * (maxX - minX) * dir;
	maxX -= 0.05125 * (maxX - minX) * dir;
	minY += 0.04875 * (maxY - minY) * dir;
	maxY -= 0.05125 * (maxY - minY) * dir;
	ratioX = (maxX - minX) / width;
	ratioY = (maxY - minY) / height;
}