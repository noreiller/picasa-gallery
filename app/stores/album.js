var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var constants = require('../constants.js');
var CHANGE_EVENT = "change";

var _album;

function _set (album) {
	_album = album;
}

function _empty () {
	_album = null;
}

var AlbumStore = _.extend({}, EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	}

	, addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	}

	, removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	, getAlbum: function () {
		return _album;
	}

	, isAlbum: function (albumid) {
		return (!!_album && _album.album.id === albumid) || false;
	}

	, empty: function () {
		_empty();

		return _album;
	}
});

AlbumStore.dispatchToken = AppDispatcher.register(function (payload) {
	if (
		payload.action.type === constants.ActionTypes.ALBUM
		&& payload.source === constants.PayloadSources.SERVER_ACTION
	) {
		_set(payload.action.album);
		AlbumStore.emitChange();
	}

	return true;
});

module.exports = AlbumStore;
