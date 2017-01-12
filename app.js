const express = require('express');

const links = require('./requires.js').links;
const columns = require('./requires.js').columns;

const app = express();

app.set('view engine', 'pug');

app.use('/static' ,express.static('public'));

app.get('/', (req, res) => {
	res.render('index', {
		links:   links,
		columns: columns
	});
});

for (let i = 0; i < links.length; i++) {
	app.get('/' + links[i].path, (req, res) => {
		res.render(links[i].path + '.pug');
	});
}

app.listen(8001, () => {
	console.log('app running on http://127.0.0.1:8001');
});