function paths(app, linksObject) {
	app.get('/', (req, res) => {
		res.render('index', linksObject);
	});

	app.get('/deepbunnyhole', (req, res) => {
		res.render('deepbunnyhole');
	});

	app.get('/mandelbrot', (req, res) => {
		res.render('mandelbrot');
	});

	app.get('/jsonbot', (req, res) => {
		const Twit = require('twit');
		const config = require('./config.json');
		const T = new Twit(config);

		res.render('jsonbot');

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
		bot();
		setInterval(bot, 1000 * 60); // tweets each minute
	});
}

module.exports.paths = paths;
