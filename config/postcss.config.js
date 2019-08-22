const path = require('path');

module.exports = {
  plugins: [
    require('css-mqpacker')({
      sort: true,
    }),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
    require('stylelint')({
      configFile: path.resolve(__dirname, 'stylelint.config.js'),
      context: path.resolve(__dirname, '/src'),
      files: '**/*.css',
      failOnError: false,
      quiet: false,
    }),
    require('autoprefixer'),
  ],
};