const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ip = require('ip');
const chalk = require('chalk');
const async = require('async');

const _consts = require('./_consts');

/**
 * Read current directory and look for webpack configuration files
 * following conf_dev_*.js pattern
 * @param  {Function} done callback passing an Array of available conf files
 * @return {Void}
 */
const get_conf_files = (done) => {
  let conf_files = [];
  let dir_path = path.join(__dirname, '.');

  const _onReadDir = (err, files) => {
    let pending = files.length;

    if (!pending) {
      return done(conf_files);
    }

    _.each(files, (file) => {
      const _path_file = path.join(dir_path, file);

      fs.stat(_path_file, (err, stat) => {
        if (stat && !stat.isDirectory() && /^conf_dev_\w*\.js$/.test(file)) {
          conf_files.push(file.substring(0, file.indexOf('.js')));
        }

        if (!--pending) {
          done(conf_files);
        }
      });
    });
  };

  fs.readdir(dir_path, _onReadDir);
};

/**
 * Look through webpack configuration files and use webpack for each of them
 * @param  {Function} done callback passing and Array of webpack compiler
 * @return {Void}
 */
const get_compilers = (done) => {
  get_conf_files((confs) => {
    let compilers = [];

    _.each(confs, (conf) => {
      compilers.push(webpack(require(`./${conf}`)));
    });

    done(compilers);
  });
};

/**
 * Start Webpack Dev Server for each Webpack Compiler (configuration founded)
 * @param  {Function} done callback when everythings is done
 * @return {Void}
 */
const start_apps = (done) => {
  /**
   * Load a Webpack Dev Server for each configuration founded
   * @param  {Object} compiler from required webpack conf files
   * @return {Array}  ArrayOf(Function) callback to use in a parralel async tasks
   */
  const _mapCompilers = (compiler) => {
    let c_opts = compiler.options;

    return (callback) => {
      new WebpackDevServer(compiler, {
        quiet: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        stats: {
          colors: true
        }
      }).listen(c_opts.__port, c_opts.__host, () => {
        console.log(
          chalk.gray('\n--------------------------------------------------') +
          chalk.cyan(`\n[WDS] - ${_consts.pkg.name} started`) +
          chalk.gray('\n--------------------------------------------------') +
          chalk.cyan('\nExternal URL: ') +
          chalk.magenta(`http://${ip.address()}:${c_opts.__port}`) +
          chalk.cyan('\nLocal URL: ') +
          chalk.magenta(`http://${c_opts.__host}:${c_opts.__port}`) +
          chalk.cyan('\nApp URL: ') +
          chalk.magenta(`${c_opts.output.publicPath}`) +
          chalk.gray('\n--------------------------------------------------') +
          chalk.cyan('\n[HMR]: ') + chalk.green('Enabled') +
          chalk.gray('\n----------------------------------------------------')
        );

        callback(null);
      });
    };
  };

  /**
   * Load CowMontbe and immediately exec all compilers in an parralel async method
   * @param  {Object} compilers
   * @return {Void}
   */
  const _onGetCompilers = (compilers) => {
    const _afterCow = () => {
      async.parallel(_.map(compilers, _mapCompilers), () => {
        if (Object.prototype.toString.call(done) === '[object Function]') {
          done();
        }
      });
    };

    require('./_cowmontbe')(_afterCow);
  };

  get_compilers(_onGetCompilers);
};

if (!module.parent) {
  start_apps();
} else {
  module.exports = (callback) => {
    start_apps(callback);
  };
}
