const webpack = require('webpack');
const webpack_plugins = require('webpack-load-plugins')();
const path = require('path');

const name_app = 'app';
const context_app = path.join(__dirname, '..', name_app);
const context_build = path.join(
  `${__dirname}`,
  '../../',
  `static/`
);

module.exports = require('./conf_common')({
  env: 'production',
  context: context_app,
  entry: [
    `./main.js`
  ],
  output: {
    path: context_build,
    publicPath: `/static/`
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack_plugins.clean([`static/`], {
      root: path.join(`${__dirname}`, '../../'),
      verbose: true,
      dry: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      debug: true,
      minimize: true,
      sourceMap: false,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new webpack_plugins.html({
      template: 'index.html',
      filename: path.join(`${__dirname}`, '../../', `index.html`),
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ]
});
