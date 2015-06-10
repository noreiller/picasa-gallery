var config = require('./config/' + (process.env.APP_ENV || 'sample') + '.json');

config.debug = (typeof config.debug !== 'undefined'
	? config.debug
	: process.env.NODE_ENV !== 'production'
);

module.exports = config;
