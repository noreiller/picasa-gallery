var _ = require('underscore');
var Dispatcher = require('./dispatcher');
var constants = require('../constants.js');

var AppDispatcher = _.extend(new Dispatcher(), {
	/**
	 * @param {object} action The details of the action, including the action's
	 * type and additional data coming from the server.
	 */
	handleServerAction: function (action) {
		var payload = {
			source: constants.PayloadSources.SERVER_ACTION
			, action: action
		};

		this.dispatch(payload);
	}

	/**
	 * @param {object} action The details of the action, including the action's
	 * type and additional data coming from the view.
	 */
	, handleViewAction: function (action) {
		var payload = {
			source: constants.PayloadSources.VIEW_ACTION
			, action: action
		};

		this.dispatch(payload);
	}
});

module.exports = AppDispatcher;
