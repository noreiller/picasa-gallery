var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var config = require('../../config.js');
var NavigationItem = require('./navigation-item.jsx');

var NavigationComponent = React.createClass({
	render: function () {
		var items = [];

		for (var i = 0; i < config.pages.length; i++) {
			var page = config.pages[i];

			items.push(
				<NavigationItem key={'nav-' + page.key} label={page.title} to={page.route || config.root} pageKey={page.key} />
			);
		}

		return (
			<nav className="navigation-component">
				<Link className="nav-list-title" to={config.root}>{config.title}</Link>
				<ul className="nav-list" data-role="navigation">
					{items}
				</ul>
			</nav>
		);
	}
});

module.exports = NavigationComponent;
