const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

const HtmlWebpackPluginConfig =  new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: path.resolve(__dirname, 'src/index'),
	target: 'web',
	output: {
		path: __dirname+ '/dist',
		publicPath: '/',
		filename: 'index.bundle.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'src')
	},
	module: {
		loaders: [
			{ test: /\.json$/, loader: 'json' },
      		{test: /\.jsx?$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
			{test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
			{test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
		]
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoEmitOnErrorsPlugin()
    ]
}
