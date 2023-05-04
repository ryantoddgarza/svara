module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb'],
  rules: {
    // Override function-component-definition rule set in eslint-config-airbnb
    'react/function-component-definition': 0,
    // Override object-curly-newline rule set in eslint-config-airbnb
    'object-curly-newline': 0,
  },
};
