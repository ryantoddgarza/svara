module.exports = {
  arrowParens: 'always',
  quoteProps: 'consistent',
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: ['*.[s]css'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
