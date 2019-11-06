const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = (PROJECT) => {
  return {
    // devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve(`${PROJECT}-vue/`),
        'common': resolve('../common')
      }
    },
    output: {
      // filename: '[name].[hash].js',
      chunkFilename: 'js/[name].[hash].js'
    }
  }
}