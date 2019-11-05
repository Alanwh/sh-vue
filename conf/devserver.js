const constant = require('./constant');

module.exports = (PROJECT) => {
  return {
    open: true, 
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: constant.PROXY_URL[PROJECT],
    before(app) {
      
    }
  }
}