const CopyWebpackPlugin = require("copy-webpack-plugin");
const IgnoreNotFoundExportPlugin = require("ignore-not-found-export-webpack-plugin");
const path = require("path");

// Add support for uncompiled class fields to webpack
const acorn = require("acorn");
const stage3 = require("acorn-stage3");
acorn.Parser = acorn.Parser.extend(stage3);

module.exports = [
	generateConfig({ babelEnv: "public-fields", devServer: true }),
	generateConfig({ babelEnv: "modern", devServer: false }),
	generateConfig({
		babelEnv: "legacy",
		devServer: false,

		// By default, webpack assumes modernish browsers and generates
		// a bundles which contains some ES2015 syntax. We need to
		// disable it for IE support.
		environment: {
			arrowFunction: false,
			const: false,
			destructuring: false,
			forOf: false,
		},
	}),
];

function generateConfig({ babelEnv, devServer, environment }) {
	return {
		mode: process.env.WEBPACK_MODE ?? "production",
		entry: path.resolve(__dirname, "./src/main.js"),
		output: {
			filename: `bundle.${babelEnv}.js`,
			path: path.resolve(__dirname, "./dist"),
			environment,
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
							envName: babelEnv,
						},
					},
				},
			],
		},
		plugins: [
			new CopyWebpackPlugin({
				patterns: [path.resolve(__dirname, "./src/index.html")],
			}),
			new IgnoreNotFoundExportPlugin(),
		],
		devServer: devServer
			? {
					contentBase: "./dist",
					watchContentBase: true,
					port: 8080,
			  }
			: undefined,
	};
}
