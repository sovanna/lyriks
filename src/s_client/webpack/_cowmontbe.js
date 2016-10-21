const cowsay = require('cowsay');

const _consts = require('./_consts');

/**
 * Print readable information based on project's package
 * @param  {Function} afterCow callback called after log the 'cow'
 * @return {void}
 */
module.exports = (afterCow) => {
  const {
    name,
    version,
    author
  } = _consts.pkg;

  const {
    animal
  } = _consts;

  console.log(cowsay.say({
    text: `Welcome to ${name.toUpperCase()} v${version} by ${author}`,
    f: animal,
    w: 60
  }));

  if (Object.prototype.toString.call(afterCow) === '[object Function]') {
    afterCow();
  }
};
