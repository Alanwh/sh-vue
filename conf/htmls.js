const constant = require('./constant');

module.exports = (PROJECT) => {
  return {
    PROJECT: {
      entry: `${PROJECT}-vue/main.js`,
      template: 'public/index.html',
      filename: 'index.html',
      title: constant.PAGE_TITLE[PROJECT]
    }
  }
}