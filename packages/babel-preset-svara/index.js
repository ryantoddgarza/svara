module.exports = function preset() {
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    env: {
      production: {
        plugins: ['transform-react-remove-prop-types'],
      },
    },
  };
};
