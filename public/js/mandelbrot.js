// author: Daniel Shiffman
// source: https://www.youtube.com/watch?v=6z7GQewK-Ks

let lastX;
let lastY;
let currentX;
let currentY;

function setup() {
	createCanvas(360, 240);
	pixelDensity(1);
	lastX = 0;
	lastY = 0;
	currentX = 0;
	currentY = 0;
}

function draw() {
	console.log(lastX);
	console.log(lastY);
	console.log(currentX);
	console.log(currentY);

	const iterations = 20;
	const minX = -2;
	const maxX = 1;
	const minY = -1;
	const maxY = 1;
	const ratioX = (maxX - minX) / width;
	const ratioY = (maxY - minY) / height;

	loadPixels();

	for(let x = 0; x < width; x++) {
		for(let y = 0; y < height; y++) {
			let a = map(x, 0, width, minX + (lastX - currentX) * ratioX, maxX + (lastX - currentX) * ratioX);
			let b = map(y, 0, height, minY + (lastY - currentY) * ratioY, maxY + (lastY - currentY) * ratioY);
			const constA = a;
			const constB = b;
			let n = 0;

			while(n < iterations) {
				const letA = a * a - b * b;
				const letB = 2 * a * b;

				a = letA + constA;
				b = letB + constB;

				if (a === letA && b === letB) {
					break;
				}

				n++;
			}

			const pix = (x + y * width) * 4;

			if (n === iterations || (a === 0 && b === 0)) {
				pixels[pix + 0] = 0;
				pixels[pix + 1] = 0;
				pixels[pix + 2] = 0;
				pixels[pix + 3] = 255;
			}
			else {
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
	}, 0)
}

function mouseReleased() {
	currentX = mouseX;
	currentY = mouseY;
	loop();
}