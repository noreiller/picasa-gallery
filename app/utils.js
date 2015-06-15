var Promise = require('es6-promise').Promise; // jshint ignore:line
var config = require('../config.js');
var utils = {};

utils.getPageTitle = function (titles) {
	if (typeof titles === 'string') {
		titles = [titles];
	}
	else if (!titles || (typeof titles !== 'object' && typeof titles.push !== 'function')) {
		titles = [];
	}

	titles.push(config.title);

	return titles.join(' - ');
};

utils.getOffsetTop = function (element) {
	var offsetTop = 0;

	while (element.offsetParent) {
		offsetTop += element.offsetTop;

		element = element.offsetParent;
	}

	return offsetTop;
};

utils.imgLoad = function (url) {
	return new Promise(function (resolve, reject) {
		var img = new Image();

		img.onload = function () {
			resolve();
		};

		img.onerror = function () {
			reject(Error('Image didn\'t load successfully'));
		};

		img.src = url;
	});
};

module.exports = utils;
