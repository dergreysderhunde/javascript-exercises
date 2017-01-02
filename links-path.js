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
}

module.exports.paths = paths;