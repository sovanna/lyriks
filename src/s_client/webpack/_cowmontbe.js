const cowsay = require('cowsay');

const _consts = require('./_consts');

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
