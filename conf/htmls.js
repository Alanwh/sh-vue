const constant = require('./constant');

module.exports = (app) => {
  return {
    app: {
      // js 下生成文件名已app命名，这里用PROJECT变量不生效，原因未知
      entry: `${app}-vue/main.js`,
      template: 'public/index.html',
      filename: 'index.html',
      title: constant.PAGE_TITLE[app]
    }
  }
}