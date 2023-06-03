/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	purge: {
		content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	},
	theme: {
		extend: {
			fontFamily: {
				overpass: ["Overpass Mono", "monospace"],
				roboto: ["Roboto", "sans-serif"],
			},
			strokeWidth: {
				16: "16",
			},
			colors: {
				aqua: {
					100: "#F4FFFD",
					300: "#CBFFF5",
					500: "#6BFFE3",
					700: "#3CF3D2",
					900: "#24D1B2",
				},
				purple: {
					300: "#DD4AB6",
					500: "#5A1B84",
					900: "#27053e",
				},
			},
		},
		screens: {
			sm: "400px",
			md: "720px",
			lg: "1024px",
			xl: "1280px",
			xxl: "1440px",
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
