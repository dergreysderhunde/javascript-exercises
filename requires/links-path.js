const linksObject = require('./links-object.js').linksObject;

// jsonbot dependencies
const Twit = require('twit');
const config = require('./config.json');
const T = new Twit(config);

function paths(app) {
	app.get('/', (req, res) => {
		res.render('index', linksObject);
	});

	app.get('/blanc', (req, res) => {
		res.render('blanc');
	})

	app.get('/deepbunnyhole', (req, res) => {
		res.render('deepbunnyhole');
	});

	// author: Daniel Shiffman
	// source: https://www.youtube.com/watch?v=RF5_MPSNAtU
	app.get('/jsonbot', (req, res) => {
		function bot() {
			const date = new Date();
			const seconds = date.getUTCSeconds();
			const milliseconds = date.getUTCMilliseconds();
			const random = Math.random() * seconds * (milliseconds / 1000);

			T.post('statuses/update', {status: `{\n  "random": ${random}\n}`}, function (err, data, res) {
				if (err) {
					console.log(err);
				}
				if (data && res) {
					console.log(`tweet'd:\n  {\n    "random": ${random}\n  }`);
				}
			});
		}

		res.render('jsonbot');

		bot();
		setInterval(bot, 1000 * 60); // tweets each minute
	});

	app.get('/mandelbrot', (req, res) => {
		res.render('mandelbrot');
	});
}

module.exports.paths = paths;
