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
			photoid: null
			, page: {}
		};
	}

	, getInitialStateAsync: function (cb) {
		this._update(cb);
	}

	, componentDidMount: function () {
		AlbumStore.addChangeListener(this._onChange);

		if (this.refs.active && !env.server) {
			var y = utils.getOffsetTop(React.findDOMNode(this.refs.active));
			window.scrollTo(0, y - 30);
		}
	}

	, componentWillUnmount: function () {
		AlbumStore.removeChangeListener(this._onChange);
	}

	, render: function () {
		var items = [];
		var hasActive = false;
		var titles = [this.props.page.title];

		if (this.state.album) {
			titles.unshift(this.state.album.album.title);

			for (var i = 0; i < this.state.album.photos.length; i++) {
				var className = 'photo-item';
				var photo = this.state.album.photos[i];
				var active = this.props.photoid === photo.id;
				var image = null;

				if (active) {
					hasActive = true;
					className += ((className.length ? ' ' : '') + 'active');
					titles.unshift(photo.title);
					image = (
						<img ref="active" className="photo-image full" alt={photo.title} src={photo.image} width={photo.image_width} height={photo.image_height} />
					);
				}
				else {
					image = (
						<img className="photo-image thumb" alt={photo.title} src={photo.thumbnail} width={photo.thumbnail_width} height={photo.thumbnail_height} />
					);
				}

				items.push(
					<li className={className} key={'photo-' + photo.id}>
						<Link className="photo-link" to={constants.PageKeys.GALLERY + '-photo'} params={{ albumid: this.state.album.album.id, photoid: photo.id }}>
							{image}
						</Link>
					</li>
				);
			}
		}
		else {
			items.push(
				<li><Loading/></li>
			);
		}

		var link;

		if (hasActive) {
			link = (
				<Link className="back" to={constants.PageKeys.GALLERY + '-album'} params={{ albumid: this.state.album.album.id }}>
					{constants.I18n[config.lang].BACK_TO_ALBUM}
				</Link>
			);
		}
		else {
			link = (
				<Link className="back" to={constants.PageKeys.GALLERY}>
					{constants.I18n[config.lang].BACK_TO_LIST}
				</Link>
			);
		}

		return (
			<DocumentTitle title={utils.getPageTitle(titles)}>
				<div className="album-component">
					<h1>{titles[0]}</h1>

					<ul className="photo-list">
						{items}
					</ul>

					{link}
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
