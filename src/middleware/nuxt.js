const { Nuxt, Builder } = require('nuxt');
const logger = require('winston');
const config = require('../../nuxt.config');

const nuxt = new Nuxt(config);

if (config.dev) {
  new Builder(nuxt).build()
    .then(() => process.emit('nuxt:build:done'))
    .catch((error) => {
      logger.error(error);
      process.exit(1);
    });
} else {
  process.nextTick(() => process.emit('nuxt:build:done'));
}

module.exports = nuxt;

