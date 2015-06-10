var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DocumentTitle = require('react-document-title');
var constants = require('../constants.js');
var config = require('../../config.js');
var utils = require('../utils.js');

var Navigation = require('./navigation.jsx');

var AppComponent = React.createClass({
	mixins: [Router.State]

	/**
	 * @see https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
	 */
	, getHandlerKey: function () {
		var keys = ['albumid', 'photoid'];

		var childDepth = 1; // assuming App is top-level route
		var key = this.getRoutes()[childDepth].name;
		var params = this.getParams();

		for (var i = 0; i < keys.length; i++) {
			if (params[keys[i]]) {
				key += ('-' + keys[i] + '-' + params[keys[i]]);
			}
		}

		return key;
	}

	, getCurrentPage: function () {
		var pathname = this.getPathname();
		var currentPage;

		for (var i = 0; i < config.pages.length; i++) {
			var page = config.pages[i];

			if (
				pathname === page.route
				|| (page.key === constants.PageKeys.HOMEPAGE && pathname === config.root)
				|| (page.key === constants.PageKeys.GALLERY && pathname.indexOf(page.route) === 0)
			) {
				currentPage = page;
			}
		}

		return currentPage || {};
	}

	, render: function () {
		var params = this.getParams();
		var currentPage = this.getCurrentPage();
		var currentKey = this.getHandlerKey();

		return (
			<DocumentTitle title={utils.getPageTitle(currentPage.title)}>
				<div data-role="layout">
					<Navigation />

					<div className="content-component" role="main">
						<RouteHandler key={currentKey} page={currentPage} albumid={params.albumid} photoid={params.photoid} />
					</div>
				</div>
			</DocumentTitle>
		);
	}
});

module.exports = AppComponent;
