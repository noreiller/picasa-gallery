var request = require('superagent');

function _url (params) {
	var url = '';

	url += ('/user/' + params.user);

	url += (params.albumid
		? '/albumid/' + params.albumid
		: ''
	);

	url += '?';

	url += (params.authkey
		? 'authkey=' + params.authkey
		: 'access=public'
	);

	url += '&alt=json';

	return url;
}

function _request (params, callback) {
	request
		.get('https://picasaweb.google.com/data/feed/api' + _url(params))
		.set('Accept', 'application/json')
		.end(function (err, res) {
			if (err) {
				return callback(err);
			}

			return callback(null, params.albumid ? _parseAlbum(res.body) : _parseAlbums(res.body));
		})
	;
}

function _parseAlbums (body) {
	var response = [];

	for (var i = 0; i < body.feed.entry.length; i++) {
		var entry = body.feed.entry[i];
		var bypass = false;

		if (entry.gphoto$albumType && entry.gphoto$albumType.$t === 'ProfilePhotos') {
			bypass = true;
		}

		if (!bypass) {
			response.push({
				id: entry.gphoto$id.$t
				, title: entry.title.$t
				, description: entry.summary.$t
				, published: entry.published.$t
				, updated: entry.published.$t
				, count: entry.gphoto$numphotos
				, image: entry.media$group.media$content[0].url
				, image_height: entry.media$group.media$content[0].height
				, image_width: entry.media$group.media$content[0].width
				, thumbnail: entry.media$group.media$thumbnail[0].url
				, thumbnail_height: entry.media$group.media$thumbnail[0].height
				, thumbnail_width: entry.media$group.media$thumbnail[0].width
			});
		}
	}

	return response;
}

function _parseAlbum (body) {
	var response = {
		album: {}
		, photos: []
	};

	response.album.id = (
		(body.feed.gphoto$id && body.feed.gphoto$id.$t)
		|| (body.feed.entry.length && body.feed.entry[0].gphoto$albumid.$t)
		|| null
	);
	response.album.title = body.feed.title.$t;
	response.album.updated = body.feed.updated.$t;
	response.album.count = (body.feed.gphoto$numphotos && body.feed.gphoto$numphotos.$t) || 0;

	for (var i = 0; i < body.feed.entry.length; i++) {
		var entry = body.feed.entry[i];

		response.photos.push({
			id: entry.gphoto$id.$t
			, title: entry.title.$t
			, description: entry.summary.$t
			, published: entry.published.$t
			, updated: entry.published.$t
			, count: entry.gphoto$numphotos
			, image: entry.media$group.media$thumbnail[0].url.replace(/\/s[\d]+\//, '/s' + entry.gphoto$width.$t + '/')
			, image_height: entry.gphoto$height.$t
			, image_width: entry.gphoto$width.$t
			, thumbnail: entry.media$group.media$thumbnail[1].url
			, thumbnail_height: entry.media$group.media$thumbnail[1].height
			, thumbnail_width: entry.media$group.media$thumbnail[1].width
		});
	}

	return response;
}

module.exports = {
	list: _request
	, get: _request
};
