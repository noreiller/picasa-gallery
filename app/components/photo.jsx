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

function _getAlbum () {
	return {
		album: AlbumStore.getAlbum()
	};
}

var AlbumComponent = React.createClass({
	mixins: [Router.State, ReactAsync.Mixin, PureRenderMixin]

	, getDefaultProps: function () {
		return {
			photoid: null
			, page: {}
		};
	}

	, getInitialStateAsync: function (cb) {
		this._update(cb);
	}

	, componentDidMount: function () {
		AlbumStore.addChangeListener(this._onChange);
	}

	, componentWillUnmount: function () {
		AlbumStore.removeChangeListener(this._onChange);
	}

	, render: function () {
		var image;
		var backLink;
		var prevId;
		var prevLink;
		var nextId;
		var nextLink;
		var titles = [this.props.page.title];

		if (this.state.album) {
			titles.unshift(this.state.album.album.title);

			for (var i = 0; i < this.state.album.photos.length; i++) {
				var className = 'photo-item';
				var photo = this.state.album.photos[i];
				var active = this.props.photoid === photo.id;

				if (this.props.photoid === photo.id) {
					hasActive = true;
					className += ((className.length ? ' ' : '') + 'active');
					titles.unshift(photo.title);
					image = (
						<img ref="active" className="image full" alt={photo.title} src={photo.image} width={photo.image_width} height={photo.image_height} />
					);

					if (i > 0) {
						prevId = this.state.album.photos[i - 1].id;
					}

					if (i < this.state.album.photos.length - 1) {
						nextId = this.state.album.photos[i + 1].id;
					}
				}
			}

			backLink = (
				<Link className="back" to={constants.PageKeys.GALLERY + '-album'} params={{ albumid: this.state.album.album.id }}>
					{constants.I18n[config.lang].BACK_TO_ALBUM}
				</Link>
			);

			if (!!prevId) {
				prevLink = (
					<li className="prev">
						<Link className="prev" to={constants.PageKeys.GALLERY + '-photo'} params={{ albumid: this.state.album.album.id, photoid: prevId }}>
							{constants.I18n[config.lang].PREVIOUS_PHOTO}
						</Link>
					</li>
				);
			}

			if (!!nextId) {
				nextLink = (
					<li className="next">
						<Link className="next" to={constants.PageKeys.GALLERY + '-photo'} params={{ albumid: this.state.album.album.id, photoid: nextId }}>
							{constants.I18n[config.lang].NEXT_PHOTO}
						</Link>
					</li>
				);
			}
		}

		return (
			<DocumentTitle title={utils.getPageTitle(titles)}>
				<div className="photo-component">
					<h1>{titles[0]}</h1>

					{image}

					<ul className="links">
						{prevLink}
						{nextLink}
					</ul>

					{backLink}
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
