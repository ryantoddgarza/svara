const off = 0;
const error = 2;

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['import', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      off,
      { devDependencies: ['webpack.*.js'] },
    ],
    'prettier/prettier': error,
  },
};
