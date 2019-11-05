const path = require('path');
const { constant } = require('./conf');
const [NODE_ENV, PROJECT] = process.env.NODE_ENV.split(':')
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  pages: {
    PROJECT: {
      entry: `${PROJECT}-vue/main.js`,
      template: 'public/index.html',
      filename: 'index.html',
      title: constant.PAGE_TITLE[PROJECT]
    }
  },
  lintOnSave: NODE_ENV === 'development', // 是否开启eslint保存检测
  outputDir: `dist/${PROJECT}/`, // 构建输出目录
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve(`${PROJECT}-vue/`)
      }
    }
  },
  chainWebpack: (config) => {
    config // 开启开发环境 source map
      .when(NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              // allChunks: true,
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('common/'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )

    config.output.filename(`${PROJECT}.[hash].js`).end(); 
  },
  devServer: {
    open: true, 
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/mock'
        }
      },
    },
    before(app) {}
  }
}
