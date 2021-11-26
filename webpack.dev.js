const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.base')

module.exports = merge(common, {
  devServer: {
    compress: false,
    static: {
      directory: path.resolve(__dirname, 'src'),
      watch: true
    },
    host: '0.0.0.0',
    port: 8081,
    liveReload: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
