var React = require('react');
var Router = require('react-router');
var DocumentTitle = require('react-document-title');
var constants = require('../constants.js');
var config = require('../../config.js');
var utils = require('../utils.js');

var ContentPageComponent = React.createClass({
	mixins: [Router.State]

	, getDefaultProps: function () {
		return {
			page: {}
		}
	}

	, render: function () {
		return (
			<div className="static-component" dangerouslySetInnerHTML={{ __html: this.props.page.content }} />
		);
	}
});

module.exports = ContentPageComponent;
