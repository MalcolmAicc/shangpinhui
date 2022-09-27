const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  // 打包时去掉map文件
  productionSourceMap:false,
  // 关闭eslint
  lintOnSave:false,
  // 配置代理服务器
  devServer:{
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      }
    },
    
  }
}