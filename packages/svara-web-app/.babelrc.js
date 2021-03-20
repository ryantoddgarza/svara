module.exports = {
  presets: ['@svara/babel-preset-svara'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~': './src',
        },
      },
    ],
  ],
};
