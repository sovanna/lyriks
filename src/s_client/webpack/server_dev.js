const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ip = require('ip');
const chalk = require('chalk');
const async = require('async');

const _consts = require('./_consts');

const get_conf_files = (done) => {
  let conf_files = [];
  let dir_path = path.join(__dirname, '.');

  fs.readdir(dir_path, (err, files) => {
    let pending = files.length;

    if (!pending) {
      return done(conf_files);
    }

    _.each(files, (file) => {
      fs.stat(path.join(dir_path, file), (err, stat) => {
        if (stat && !stat.isDirectory() && /^conf_dev_\w*\.js$/.test(file)) {
          conf_files.push(file.substring(0, file.indexOf('.js')));
        }

        if (!--pending) {
          done(conf_files);
        }
      });
    });
  });
};

const get_compilers = (done) => {
  get_conf_files((confs) => {
    let compilers = [];
    _.each(confs, (conf) => {
      compilers.push(webpack(require(`./${conf}`)));
    });
    done(compilers);
  });
};

const start_apps = (done) => {
  const map_compilers = (compiler) => {
    let compiler_opts = compiler.options;

    return (callback) => {
      new WebpackDevServer(compiler, {
        quiet: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        stats: {
          colors: true
        }
        // publicPath: compiler_opts.output.publicPath
      }).listen(compiler_opts.__port, compiler_opts.__host, () => {
        let name_context = compiler_opts.context;

        console.log(
          chalk.gray('\n------------------------------------------------------------') +
          chalk.cyan(`\n[WDS] - ${_consts.pkg.name} start frontend ${name_context.substring(name_context.indexOf('/client/') + 8).toUpperCase()}`) +
          chalk.gray('\n------------------------------------------------------------') +
          chalk.cyan('\nSource: ') + chalk.white(name_context) +
          chalk.cyan('\nExternal URL: ') + chalk.magenta(`http://${ip.address()}:${compiler_opts.__port}`) +
          chalk.cyan('\nLocal URL: ') + chalk.magenta(`http://${compiler_opts.__host}:${compiler_opts.__port}`) +
          chalk.cyan('\nApp URL: ') + chalk.magenta(`${compiler_opts.output.publicPath}`) +
          chalk.cyan('\nEnv: ') + chalk.green('Development') +
          chalk.gray('\n------------------------------------------------------------') +
          chalk.cyan('\n[HMR]: ') + chalk.green('Enabled') +
          chalk.gray('\n------------------------------------------------------------')
        );

        callback(null);
      });
    };
  };

  get_compilers((compilers) => {
    require('./_cowmontbe')(() => {
      async.parallel(_.map(compilers, map_compilers), () => {
        if (done) {
          done();
        }
      });
    });
  });
};

if (!module.parent) {
  start_apps();
} else {
  module.exports = (callback) => {
    start_apps(callback);
  };
}
