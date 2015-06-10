var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var AlbumsStore = require('../stores/albums.js');
var constants = require('../constants.js');
var api = require('../api.js');
var config = require('../../config.js');

var AlbumsActions = {
	list: function (next) {
		AppDispatcher.handleViewAction({
			type: constants.ActionTypes.ALBUMS
			, user: config.user
		});

		function onCompleteList (err, response) {
			if (err) {
				throw err;
			}

			AppDispatcher.handleServerAction({
				type: constants.ActionTypes.ALBUMS
				, albums: response
			});

			if (typeof next === 'function') {
				next();
			}
		}

		if (AlbumsStore.hasAlbums()) {
			onCompleteList(null, AlbumsStore.getAlbums());
		}
		else {
			api.list({ user: config.user }, onCompleteList);
		}
	}
};

module.exports = AlbumsActions;
