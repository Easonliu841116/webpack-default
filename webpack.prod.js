const path = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const common = require('./webpack.base')
const publicPath = '/dist/'

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath,
    filename: 'js/[name].js?[contenthash:8]',
    assetModuleFilename: 'assets/[name][ext]?[contenthash:8]'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
})
