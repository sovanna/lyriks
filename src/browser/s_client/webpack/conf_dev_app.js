const webpack = require('webpack');
const webpack_plugins = require('webpack-load-plugins')();
const path = require('path');

import ECR from 'electron-connect-replacement-webpack-plugin';

const name_app = 'app';
const host = 'localhost';
const port = 5000;
const context_app = path.join(__dirname, '..', name_app);
const context_build = path.join(
  `${__dirname}`,
  '../../',
  `static/`
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
      filename: `../../index.html`,
      inject: true
    }),
    new webpack_plugins.exportFiles(`../../index.html`),
    new ECR()
  ]
});
