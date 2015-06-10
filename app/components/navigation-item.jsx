var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var constants = require('../constants.js');
var config = require('../../config.js');

var NavigationItemComponent = React.createClass({
	mixins: [Router.State]

	, getDefaultProps: function () {
		return {
			activeClassName: 'active'
		};
	}

	, render: function () {
		var isActive = this.isActiveRoute();
		var itemClassName = 'nav-item';
		var linkClassName = 'nav-link';

		if (typeof this.props.className !== 'undefined') {
			itemClassName += ((itemClassName.length ? ' ' : '') + this.props.className);
		}

		if (isActive) {
			itemClassName += ((itemClassName.length ? ' ' : '') + this.props.activeClassName);
			linkClassName += ((linkClassName.length ? ' ' : '') + this.props.activeClassName);
		}

		return (
			<li className={itemClassName}>
				<Link to={this.props.to} className={linkClassName}>{this.props.label}</Link>
			</li>
		);
	}

	, isActiveRoute: function () {
		var status = false;

		if (this.props.activeClassName) {
			status = this.isActive(this.props.to, this.getParams(), this.getQuery());

			if (!status && this.props.pageKey === constants.PageKeys.HOMEPAGE) {
				status = this.isActive(config.root, this.getParams(), this.getQuery());
			}
			else if (!status && this.props.pageKey === constants.PageKeys.GALLERY) {
				status = this.isActive(this.props.to, this.getParams(), this.getQuery());

				if (!status) {
					status = this.isActive(constants.PageKeys.GALLERY + '-album', this.getParams(), this.getQuery());
				}

				if (!status) {
					status = this.isActive(constants.PageKeys.GALLERY + '-photo', this.getParams(), this.getQuery());
				}
			}
		}

		return status;
	}
});

module.exports = NavigationItemComponent;
