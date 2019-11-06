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
      console.log(`/${PROJECT}`)
      app.use(`/${PROJECT}`, apiRoutes)
    }
  }
}
