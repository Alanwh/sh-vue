module.exports = (config, NODE_ENV, PROJECT) => {
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
}