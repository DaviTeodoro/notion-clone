const { render } = require('./nuxt');

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  const app = this;

  app.use((req, res, next) => {
    switch (req.accepts('html', 'json')) {
      case 'json': {
        next();
        break;
      }
      default: {
        render(req, res, next);
      }
    }
  });
};
