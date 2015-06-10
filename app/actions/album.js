var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var AlbumStore = require('../stores/album.js');
var constants = require('../constants.js');
var api = require('../api.js');
var config = require('../../config.js');

var AlbumActions = {
	get: function (albumid, next) {
		AppDispatcher.handleViewAction({
			type: constants.ActionTypes.ALBUM
			, user: config.user
			, albumid: albumid
		});

		function onCompleteGet (err, response) {
			if (err) {
				throw err;
			}

			AppDispatcher.handleServerAction({
				type: constants.ActionTypes.ALBUM
				, album: response
			});

			if (typeof next === 'function') {
				next();
			}
		}

		if (AlbumStore.isAlbum(albumid)) {
			onCompleteGet(null, AlbumStore.getAlbum());
		}
		else {
			api.get({
				user: config.user
				, albumid: albumid
			}, onCompleteGet);
		}
	}
};

module.exports = AlbumActions;
