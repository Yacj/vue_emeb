module.exports = {
	plugins: {
		"autoprefixer": {
		},
		"postcss-px-to-viewport": {
			"unitToConvert": "px",
			"viewportWidth": 375,
			"unitPrecision": 3,
			"viewportUnit": "vw",
			"minPixelValue": 1
		}
	}
}
