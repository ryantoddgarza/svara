module.exports = function preset() {
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
      production: {
        plugins: ['transform-react-remove-prop-types'],
      },
    },
  };
};
