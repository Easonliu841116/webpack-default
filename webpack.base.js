const { readdirSync } = require('fs')
const { resolve } = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const Webapckbar = require('webpackbar')

const isDevMode = process.env.NODE_ENV === 'development'

function pageWalker (absolutePath) {
  return readdirSync(resolve(__dirname, absolutePath))
    .map(el => el.replace(/.hbs/g, ''))
}

function entryMaker() {
  const entry = {}
  pageWalker('src/pages')
    .map(page => {
      entry[page] = ['regenerator-runtime/runtime', 'core-js/stable', `./js/${page}.js`]
    })
  return entry
}

function htmlMaker() {
  return pageWalker('src/pages')
    .map(page => {
      return new htmlWebpackPlugin({
        template: `./pages/${page}.hbs`,
        filename: `${page}.html`,
        inject: 'body',
        chunks: ['vendor', page]
      })
    })
}

const config = {
  entry: entryMaker(),
  devtool: isDevMode ? 'eval-source-map' : 'eval',
  mode: process.env.NODE_ENV,
  target: 'browserslist',
  context: resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~': resolve(__dirname, ''),
      '@': resolve(__dirname, 'src'),
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
          priority: 10
        }
      },
    },
  },
  plugins: [
    ...htmlMaker(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new Webapckbar()
  ],
  module: {
    rules: [
      {
        test: /.s[ac]ss$/i,
        use:
          isDevMode
            ? [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
            : [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /.css$/i,
        use: isDevMode ? ['style-loader', 'css-loader'] : [ MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.(hbs|handlebars)$/i,
        loader: 'handlebars-loader',
        options: {
          inlineRequires: '\/assets\/',
          partialDirs: [resolve(__dirname, 'src/partials')],
          helperDirs: resolve(__dirname, 'src/helpers'),
        }
      },
      {
        test: /.js?$/i,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.(png|jpe?g|webp|svg|woff2?|ttf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      }
    ]
  }
}

module.exports = config
