var React = require('react');
var ReactAsync = require('react-async');
var Router = require('react-router');
var DocumentTitle = require('react-document-title');
var config = require('../config.js');
var routes = require('./routes.jsx');

module.exports = function (req, res) {
	Router.run(routes, req.path, function (Handler, state) {
		ReactAsync.renderToStringAsync(<Handler />, function (err, markup, data) {
			if (err) {
				throw err;
			}

			var reactOutput = ReactAsync.injectIntoMarkup(markup, data, ['/scripts/app.js']);
			var title = DocumentTitle.rewind();

			res.render('index.ejs', {
				lang: config.lang
				, favicon: config.favicon
				, title: title || config.title
				, reactOutput: reactOutput
			});
		});
	});
};
