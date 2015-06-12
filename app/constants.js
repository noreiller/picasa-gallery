var keyMirror = require('react/lib/keyMirror');

module.exports = {
	PageKeys: {
		HOMEPAGE: 'homepage'
		, GALLERY: 'gallery'
	}

	, ActionTypes: keyMirror({
		ALBUMS: null
		, ALBUM: null
	})

	, PayloadSources: keyMirror({
		SERVER_ACTION: null
		, VIEW_ACTION: null
	})

	, I18n: {
		en: {
			BACK_TO_LIST: 'Back to the list'
			, BACK_TO_ALBUM: 'Back to the album'
			, PREVIOUS_PHOTO: 'Previous photo'
			, NEXT_PHOTO: 'Next photo'
			, LOADING: 'Loading...'
		}
		, fr: {
			BACK_TO_LIST: 'Retour à la liste'
			, BACK_TO_ALBUM: 'Retour à l\'album'
			, PREVIOUS_PHOTO: 'Photo précédente'
			, NEXT_PHOTO: 'Photo suivante'
			, LOADING: 'Chargement...'
		}
	}
};
