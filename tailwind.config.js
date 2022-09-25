module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: {
				// 'lith1': "url('/background.jpg')",
				// 'lith2': "url('/backgroundV2.jpg')",
				'lith3': "url('/backgroundA.jpg')",
			}
		}
	},
	variants: {
		extend: {},
		scrollbar: ['rounded']
	},
	plugins: [
		require('tailwind-scrollbar'),
	]
};
