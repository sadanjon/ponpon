module.exports = {
	entry: "./src/index.js",
	output: {
		path: "./dist",
		filename: "bundle.js",
		publicPath: "/dist/"

	},
	module: {
		loaders: [
			{test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"}
		]
	},
	devtool: "inline-source-map",
	devServer: {
		inline: true
	}
};
