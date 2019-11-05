const { chainWebpack, devServer, htmls, configure } = require('./conf');
const [NODE_ENV, PROJECT] = process.env.NODE_ENV.split(':')


module.exports = {
  pages: htmls(PROJECT), // 项目页面入口配置
  outputDir: `dist/${PROJECT}/`, // 项目页面build出口配置
  lintOnSave: NODE_ENV === 'development', // 是否开启eslint保存检测
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件
  chainWebpack: (config) => chainWebpack(config, NODE_ENV, PROJECT),
  configureWebpack: configure(PROJECT),
  devServer: devServer(PROJECT)
}