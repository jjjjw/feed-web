const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')
const rucksack = require('rucksack-css')
const webpack = require('webpack')

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, '../public/'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
        allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1',
          'postcss-loader'
        )
      }
    ]
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ]
}
