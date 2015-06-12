// REQUIREMENTS
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var React = require('react/addons');
var config = require('./config.js');

if (!config.user) {
	throw ('No user set! Please fill in the "config/' + (process.env.APP_ENV || 'APP_ENV') + '.json" file.');
}

// APP CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// APP JSX
require("node-jsx").install({ extension: '.jsx' });
app.get('*', require(path.join(__dirname, 'app', 'server.jsx')));

// SERVER
var server = app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost', function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App is listening at http://%s:%s', host, port);
});

module.exports = server;
