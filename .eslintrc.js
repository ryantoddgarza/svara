module.exports = {
  root: true,
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
