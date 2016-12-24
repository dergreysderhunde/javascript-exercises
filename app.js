const path = require('path');

const express = require('express');

const linksObject = require('./links-object.js').linksObject;

const app = express();

app.use('/static/', express.static(path.join(__dirname, '\\public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '\\views'));

app.get('/', (req, res) => {
	res.render('index', linksObject);
});

app.listen(8001);