var React = require('react');
var ReactMount  = require('react/lib/ReactMount');
var Router = require('react-router');
var routes = require('./routes.jsx');
var config = require('../config.js');

ReactMount.allowFullPageRender = true;

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
	React.render(<Handler />, document.getElementById('main'));
});
