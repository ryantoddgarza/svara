module.exports = {
  arrowParens: 'always',
  quoteProps: 'consistent',
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.[s]css'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
