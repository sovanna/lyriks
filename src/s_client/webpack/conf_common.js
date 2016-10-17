const webpack = require('webpack');

const _consts = require('./_consts');

module.exports = (opts) => {
  return {
    __host: opts.__host,
    __port: opts.__port,
    __require_access: opts.__require_access ? opts.__require_access : false,
    context: opts.context,
    entry: opts.entry,
    output: {
      path: opts.outputPath,
      publicPath: opts.publicPath ? opts.publicPath : '/',
      filename: `[name].[hash].js`,
      chunkFilename: `[name].chunk.[hash].js`
    },
    target: 'electron-renderer',
    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
        'react.js',
        '.scss'
      ]
    },
    devtool: opts.devtool ? opts.devtool : 'eval',
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loader: opts.modules_loader_css
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]&modules&importLoaders=1!postcss-loader!sass-loader',
        include: /node_modules\/react-flexbox-grid/
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]&modules&importLoaders=1!postcss-loader!less'
      }, {
        test: /\.svg$/,
        loader: 'babel!svg-react'
      }, {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        exclude: /node_modules/,
        loader: opts.modules_loader_img
      }, {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: opts.modules_loader_html
      }, {
        test: /\.(eot|woff|woff2|ttf|svg)/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },{
        test: /\.json$/,
        loader: "json-loader"
      }]
    },
    postcss: () => {
      return opts.postcss;
    },
    plugins: opts.plugins.concat([
      new webpack.BannerPlugin(`-- ${_consts.pkg.author} --`, {}),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: `[name].[hash].js`
      })
    ])
  };
};
