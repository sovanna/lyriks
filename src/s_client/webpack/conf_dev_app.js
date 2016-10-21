const webpack = require('webpack');
const webpack_plugins = require('webpack-load-plugins')();
const path = require('path');

import ECR from 'electron-connect-replacement-webpack-plugin';

const name_app = 'app';
const host = 'localhost';
const port = 7001;
const context_app = path.join(__dirname, '..', name_app);
const context_build = path.join(
  `${__dirname}`,
  '../../../',
  `dist/static/${name_app}`
);

module.exports = require('./conf_common')({
  __host: host,
  __port: port,
  env: 'development',
  context: context_app,
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/dev-server',
    `./main.js`
  ],
  output: {
    path: context_build,
    publicPath: `http://${host}:${port}/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack_plugins.html({
      template: 'index.html',
      inject: true
    }),
    new webpack_plugins.html({
      template: `index.html`,
      filename: `../../src/browser/index.html`,
      inject: true
    }),
    new webpack_plugins.exportFiles(`../../src/browser/index.html`),
    new ECR()
  ]
});
