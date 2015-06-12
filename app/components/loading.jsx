var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var config = require('../../config.js');
var constants = require('../constants.js');

var LoadingComponent = React.createClass({
	render: function () {
		return (
			<div className="loading">{constants.I18n[config.lang].LOADING}</div>
		);
	}
});

module.exports = LoadingComponent;
