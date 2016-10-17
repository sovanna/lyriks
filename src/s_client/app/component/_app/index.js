if (process.env.NODE_ENV === 'production') {
  module.exports = require('./_index.prod');
} else {
  module.exports = require('./_index.dev');
}