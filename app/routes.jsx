var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var constants = require('./constants.js');
var config = require('../config.js');

var App = require('./components/app.jsx');
var ContentPage = require('./components/content-page.jsx');
var AlbumList = require('./components/album-list.jsx');
var Album = require('./components/album.jsx');
var Photo = require('./components/photo.jsx');
var NotFound = require('./components/not-found.jsx');

var routes = [];

for (var i = 0; i < config.pages.length; i++) {
	var page = config.pages[i];

	if (page.key === constants.PageKeys.HOMEPAGE) {
		routes.push(
			<Route key={'route-' + page.key} name={page.key} path={page.route || config.root} handler={ContentPage} />
		);

		if (page.route !== config.root) {
			routes.push(
				<Route key={'route-' + page.key + '-root'} name={page.key + '-root'} path={config.root} handler={ContentPage} />
			);
		}
	}
	else if (page.key === constants.PageKeys.GALLERY) {
		routes.push(
			<Route key={'route-' + page.key} path={page.route}>
				<Route path=":albumid">
					<Route name={page.key + '-photo'} path=":photoid" handler={Photo} />
					<DefaultRoute name={page.key + '-album'} handler={Album} />
				</Route>
				<DefaultRoute name={page.key} handler={AlbumList} />
			</Route>
		);
	}
	else {
		routes.push(
			<Route key={'route-' + page.key} name={page.key} path={page.route || config.root} handler={ContentPage} />
		);
	}
}

module.exports = (
	<Route name="index" path={config.root} handler={App}>
		<DefaultRoute name="default" handler={ContentPage} />
		<NotFoundRoute name="not-found" handler={NotFound} />

		{routes}
	</Route>
);
