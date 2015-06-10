var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ReactAsync = require('react-async');
var Router = require('react-router');
var Link = Router.Link;
var constants = require('../constants.js');
var config = require('../../config.js');
var AlbumsActions = require('../actions/albums.js');
var AlbumsStore = require('../stores/albums.js');

function _getAlbums () {
	return {
		albums: AlbumsStore.getAlbums()
	};
}

var AlbumListComponent = React.createClass({
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
		AlbumsStore.addChangeListener(this._onChange);
	}

	, componentWillUnmount: function () {
		AlbumsStore.removeChangeListener(this._onChange);
	}

	, render: function () {
		var items = [];

		for (var i = 0; i < (this.state.albums || []).length; i++) {
			var album = this.state.albums[i];

			items.push(
				<li className="album-item" key={'album-' + album.id}>
					<Link className="album-link" to={constants.PageKeys.GALLERY + '-album'} params={{ albumid: album.id }}>
						<img src={album.thumbnail} width={album.thumbnail_width} height={album.thumbnail_height} alt={album.title} className="album-image" />
						<div className="album-title">
							<h2>{album.title}</h2>
						</div>
					</Link>
				</li>
			);
		}

		return (
			<div className="album-list-component">
				<h1>{this.props.page.title || config.title}</h1>
				<ul className="album-list">
					{items}
				</ul>
			</div>
		);
	}

	, _update: function (cb) {
		var next;

		if (typeof cb === 'function') {
			next = function () {
				cb(null, _getAlbums());
			};
		}

		AlbumsActions.list(next);
	}

	, _onChange: function () {
		if (this.isMounted()) {
			this.setState(_getAlbums());
		}
	}
});

module.exports = AlbumListComponent;
