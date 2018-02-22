const { resolve } = require('path');

module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: 'airbnb/base',
  plugins: ['html'],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': resolve(__dirname, 'client'),
            },
          },
        },
      },
    },
  },
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never',
    }],
    'import/no-extraneous-dependencies': 0,
    'func-names': 0
  },
};
