const constant = require('./constant')
const apiRoutes = require('../mock')

module.exports = (PROJECT) => {
  return {
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: constant.PROXY_URL[PROJECT],
    before (app) {
      if (constant.USE_MOCK) {
        app.use(`/${PROJECT}`, apiRoutes)
      }
    }
  }
}
