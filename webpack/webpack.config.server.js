const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs')
const path = require('path')
const rucksack = require('rucksack-css')
const webpack = require('webpack')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: [
    './server/index.js'
  ],
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  externals: nodeModules,
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'server.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
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
