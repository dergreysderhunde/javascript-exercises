// author: Daniel Shiffman
// source: https://www.youtube.com/watch?v=6z7GQewK-Ks

function setup() {
	createCanvas(360, 240);
	pixelDensity(1);
}

function draw() {
	const iterations = 200;
	const minX = -2;
	const maxX = 1;
	const minY = -1;
	const maxY = 1;

	loadPixels();

	for(let x = 0; x < width; x++) {
		for(let y = 0; y < height; y++) {
			let a = map(x, 0, width, minX, maxX);
			let b = map(y, 0, height, minY, maxY);
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