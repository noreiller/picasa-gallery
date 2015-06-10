var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NotFoundComponent = React.createClass({
	render: function () {
		return (
			<div className="static-component">
				<h2 className="page-header">Page not found</h2>
				<p>The page you requested doesn't exist.</p>
				<p><Link to="homepage">Go to the homepage.</Link></p>
			</div>
		);
	}
});

module.exports = NotFoundComponent;
