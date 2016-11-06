if (process.env.NODE_ENV === 'production') {
  module.exports = require('./_indexStore.prod');
} else {
  module.exports = require('./_indexStore.dev');
}