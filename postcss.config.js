const postcssSass = require('@csstools/postcss-sass');

module.exports = {
  plugins: [
    require('postcss-nested'),
    require('autoprefixer'),
    postcssSass(/* pluginOptions */),
  ],
  syntax: require('postcss-scss')
};
