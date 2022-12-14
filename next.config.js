const withPWA = require('next-pwa');

module.exports = {
	reactStrictMode: true,
};

module.exports = withPWA({
	pwa: {
		dest: "public",
		register: true,
    // disable: process.env.NODE_ENV === 'development',
		skipWaiting: true,
	},
});