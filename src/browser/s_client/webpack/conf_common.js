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
      path: opts.output.path,
      publicPath: opts.output.publicPath ? opts.output.publicPath : '/',
      filename: `[name].[hash].js`,
      chunkFilename: `[name].chunk.[hash].js`
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader'
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader!sass-loader',
        include: /node_modules\/react-flexbox-grid/
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader!less-loader'
      }, {
        test: /\.svg$/,
        loader: 'babel!svg-react'
      }, {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      }, {
        test: /\.(eot|woff|woff2|ttf|svg)/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },{
        test: /\.json$/,
        loader: "json-loader"
      }]
    },
    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx'
      ]
    },
    target: 'electron-renderer',
    devtool: opts.devtool ? opts.devtool : 'eval',
    postcss: () => {
      return [
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
      ];
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
