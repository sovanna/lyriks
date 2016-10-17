const webpack = require('webpack');
const webpack_plugins = require('webpack-load-plugins')();
const path = require('path');

const name_app = 'app';
const context_app = path.join(__dirname, '..', name_app);
const context_build = path.join(`${__dirname}`, '../../../', `dist/static/${name_app}`);

module.exports = require('./conf_common')({
  env: 'production',
  entry: [
    `./main.js`
  ],
  context: context_app,
  outputPath: context_build,
  publicPath: `/static/${name_app}`,
  modules_loader_css: 'style-loader!css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]&modules&importLoaders=1!postcss-loader',
  modules_loader_img: 'url-loader?limit=10000',
  modules_loader_html: 'html-loader',
  devtool: 'cheap-module-source-map',
  postcss: [
    require('postcss-focus')(),
    require('postcss-cssnext')({
      browsers: [
        'last 2 versions',
        'IE > 10'
      ]
    }),
    require('postcss-reporter')({
      clearMessages: true
    })
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack_plugins.clean([`static/${name_app}`], {
      root: path.join(`${__dirname}`, '../../../', `dist`),
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
      filename: path.join(`${__dirname}`, '../../../', `dist/index.html`),
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
