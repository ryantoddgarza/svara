module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
  },
};
