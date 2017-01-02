const path = require('path');

const express = require('express');

const linksObject = require('./links-object.js').linksObject;
const linksPath = require('./links-path.js').paths;

const app = express();

app.use('/static/', express.static(path.join(__dirname, '\\public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '\\views'));

linksPath(app, linksObject);

app.listen(8001);

console.log('Server running at http://127.0.0.1:8001');
