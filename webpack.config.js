const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const IgnoreNotFoundExportPlugin = require("ignore-not-found-export-webpack-plugin");
const path = require("path");

// Add support for uncompiled class fields to webpack
const acorn = require("acorn");
const stage3 = require("acorn-stage3");
acorn.Parser = acorn.Parser.extend(stage3);

module.exports = {
	mode: process.env.WEBPACK_MODE ?? "production",
	entry: path.resolve(__dirname, "./src/main.js"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "./dist"),

		// By default, webpack assumes modernish browsers and generates
		// a bundles which contains some ES2015 syntax. We need to
		// disable it for IE support.
		environment: {
			arrowFunction: false,
			const: false,
			destructuring: false,
			forOf: false,
		},
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.html$/,
				use: "html-loader",
			},
			{
				test: /\.jsx?$/,
				exclude: [/regenerator-runtime/, /core-js/],
				use: {
					loader: "babel-loader",
					options: {
						configFile: path.resolve(__dirname, "./babel.config.json"),
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "./src/index.html"),
		}),
		new CleanWebpackPlugin(),
		new IgnoreNotFoundExportPlugin(),
	],
	devServer: {
		contentBase: "./dist",
		watchContentBase: true,
		port: 8080,
	},
};
