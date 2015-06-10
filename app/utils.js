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

module.exports = utils;
