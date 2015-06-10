var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var constants = require('../constants.js');
var CHANGE_EVENT = "change";

var _albums = [];

function _set (albums) {
	_albums = albums;
}

function _empty () {
	_albums = [];
}

var AlbumsStore = _.extend({}, EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	}

	, addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	}

	, removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	, hasAlbums: function () {
		return !!_albums.length;
	}

	, getAlbums: function () {
		return _albums;
	}

	, empty: function () {
		_empty();

		return _albums;
	}
});

AlbumsStore.dispatchToken = AppDispatcher.register(function (payload) {
	if (
		payload.action.type === constants.ActionTypes.ALBUMS
		&& payload.source === constants.PayloadSources.SERVER_ACTION
	) {
		_set(payload.action.albums);
		AlbumsStore.emitChange();
	}

	return true;
});

module.exports = AlbumsStore;
