module.exports = {
	entry: "./src/index.js",
	output: {
		path: "./dist",
		filename: "bundle.js",
		publicPath: "/dist/"

	},
	module: {
		loaders: [
			{test: /\.json$/, loader: "json"},
			{test: /\.jsx?$/, exclude: /node_modules/, loader: "babel", query: { }}
		]
	},
	devtool: "inline-source-map",
	devServer: {
		inline: true
	}
};
