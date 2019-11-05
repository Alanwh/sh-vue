const chainWebpack = require('./chainwebpack');
const devServer = require('./devserver');
const configure = require('./configure');
const htmls = require('./htmls');

module.exports = {
  chainWebpack,
  devServer,
  configure,
  htmls
}