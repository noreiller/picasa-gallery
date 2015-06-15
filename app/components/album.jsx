var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ReactAsync = require('react-async');
var Router = require('react-router');
var Link = Router.Link;
var DocumentTitle = require('react-document-title');
var constants = require('../constants.js');
var utils = require('../utils.js');
var config = require('../../config.js');
var env = require('../../env.js');
var AlbumActions = require('../actions/album.js');
var AlbumStore = require('../stores/album.js');
var Loading = require('./loading.jsx');

function _getAlbum () {
	return {
		album: AlbumStore.getAlbum()
	};
}

var AlbumComponent = React.createClass({
	mixins: [Router.State, ReactAsync.Mixin, PureRenderMixin]

	, getDefaultProps: function () {
		return {
			page: {}
		};
	}

	, getInitialStateAsync: function (cb) {
		this._update(cb);
	}

	, componentDidMount: function () {
		AlbumStore.addChangeListener(this._onChange);
		this._update();
	}

	, componentWillUnmount: function () {
		AlbumStore.removeChangeListener(this._onChange);
	}

	, render: function () {
		var items = [];
		var titles = [this.props.page.title];

		if (this.state.album) {
			titles.unshift(this.state.album.album.title);

			for (var i = 0; i < this.state.album.photos.length; i++) {
				var photo = this.state.album.photos[i];

				items.push(
					<li className="photo-item" key={'photo-' + photo.id}>
						<Link className="photo-link" to={constants.PageKeys.GALLERY + '-photo'}
							params={{ albumid: this.state.album.album.id, photoid: photo.id }}>
							<img className="photo-image thumb" alt={photo.title} src={photo.thumbnail}
								width={photo.thumbnail_width} height={photo.thumbnail_height} />
						</Link>
					</li>
				);
			}
		}
		else {
			items.push(
				<li key="photo-loading">
					<Loading/>
				</li>
			);
		}

		return (
			<DocumentTitle title={utils.getPageTitle(titles)}>
				<div className="album-component">
					<h1>{titles[0]}</h1>

					<ul className="photo-list">
						{items}
					</ul>

					<Link className="back" to={constants.PageKeys.GALLERY}>
						{constants.I18n[config.lang].BACK_TO_LIST}
					</Link>
				</div>
			</DocumentTitle>
		);
	}

	, _update: function (cb) {
		var next;

		if (typeof cb === 'function') {
			next = function () {
				cb(null, _getAlbum());
			};
		}

		AlbumActions.get(this.props.albumid, next);
	}

	, _onChange: function () {
		if (this.isMounted()) {
			this.setState(_getAlbum());
		}
	}
});

module.exports = AlbumComponent;
