// iterations
const minIterations = 100; // minimum number of iterations
const maxIterations = 4000; // maximum number of iterations
let iterations = minIterations; // current number of iterations

// drawing
const canvasX = 100; // width of canvas
const canvasY = 100; // height of canvas
let minX = -2; // left limit
let maxX = 2; // right limit
let minY = -2; // top limit
let maxY = 2; // bottom limit

// drag and drop
let lastX = 0; // horizontal value when mouse down
let lastY = 0; // vertical value when mouse down
let currentX = 0; // horizontal value when mouse up
let currentY = 0; // vertical value when mouse up
let ratioX = (maxX - minX) / canvasX; // proportion coordinates abscissae/canvas width
let ratioY = (maxY - minY) / canvasY; // proportion coordinates ordinates/canvas height

// couloring
let ratio = 1; // exponent of the couloring curve
const p1 = 0.166; // first stop point (white)
const p2 = 0.333; // second stop point (orange)
const p3 = 0.5; // third stop point (black)
const p4 = 0.666; // third stop point (black)
const p5 = 0.833; // third stop point (black)

let info = {
	iterations: iterations,
	minX: minX,
	maxX: maxX,
	minY: minY,
	maxY: maxY
};

function setup() {
	createCanvas(canvasX, canvasY);
	pixelDensity(1);
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
				bright = map(pow(bright, ratio), 0, 1, 0, 1);

				if (bright < p1) {
					pixels[pix + 0] = 255;
					pixels[pix + 1] = 255 * (bright / p1);
					pixels[pix + 2] = 0;
					pixels[pix + 3] = 255;
				}				else if (bright < p2) {
					pixels[pix + 0] = 255 - (255 * ((bright - p1)/(p2 - p1)));
					pixels[pix + 1] = 255;
					pixels[pix + 2] = 0;
					pixels[pix + 3] = 255;
				}				else if (bright < p3) {
					pixels[pix + 0] = 0;
					pixels[pix + 1] = 255;
					pixels[pix + 2] = 255 * ((bright - p2)/(p3 - p2));
					pixels[pix + 3] = 255;
				}				else if (bright < p4) {
					pixels[pix + 0] = 0;
					pixels[pix + 1] = 255 - (255 * ((bright - p3)/(p4 - p3)));
					pixels[pix + 2] = 255;
					pixels[pix + 3] = 255;
				}				else if (bright < p5) {
					pixels[pix + 0] = 255 * ((bright - p4)/(p5 - p4));
					pixels[pix + 1] = 0;
					pixels[pix + 2] = 255;
					pixels[pix + 3] = 255;
				}				else {
					pixels[pix + 0] = 255;
					pixels[pix + 1] = 0;
					pixels[pix + 2] = 255 - (255 * ((bright - p5)/(p5 - p4)));
					pixels[pix + 3] = 255;
				}
			}
		}
	}

	updatePixels();
}

function updateInfo() {
	info.iterations = iterations;
	info.minX = minX;
	info.maxX = maxX;
	info.minY = minY;
	info.maxY = maxY;
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

	updateInfo();
}

function mouseWheel(e) {
	const dir = -(e.delta / abs(e.delta));
	minX += 0.04875 * (maxX - minX) * dir;
	maxX -= 0.05125 * (maxX - minX) * dir;
	minY += 0.04875 * (maxY - minY) * dir;
	maxY -= 0.05125 * (maxY - minY) * dir;
	ratioX = (maxX - minX) / width;
	ratioY = (maxY - minY) / height;
	if (dir > 0) {
		if (iterations < maxIterations) {
			iterations = Math.ceil(iterations *= 1.025);
		}
	}
	if (dir < 0) {
		if (iterations > minIterations) {
			iterations = Math.floor(iterations *= 0.975);
		}
	}

	updateInfo();
}
