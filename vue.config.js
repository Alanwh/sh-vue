const { chainWebpack, devServer, htmls, configure } = require('./conf');
const [NODE_ENV, PROJECT] = process.env.NODE_ENV.split(':')

module.exports = {
  pages: htmls(PROJECT), // 项目页面入口配置
  outputDir: `dist/${PROJECT}/`, // 项目页面 build 出口配置
  lintOnSave: NODE_ENV === 'development', // 是否开启 eslint 保存检测
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理 babel 编译
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件
  chainWebpack: (config) => chainWebpack(config, NODE_ENV, PROJECT), // 对内部的 webpack 配置进行更细粒度的修改
  configureWebpack: configure(PROJECT), // 通过 webpack-merge 合并到最终的配置中
  devServer: devServer(PROJECT) // 开发服务器配置
}