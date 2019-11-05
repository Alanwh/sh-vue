const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = (PROJECT) => {
  return {
    // devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve(`${PROJECT}-vue/`)
      }
    }
  }
}