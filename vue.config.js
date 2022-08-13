const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave:false,
  // 代理跨域  webpack上的
  devServer:{
    proxy:{
      '/api':{ //理解： 前台服务器发起请求路径带有/api的话，代理服务器就开启工作
        target:'http://gmall-h5-api.atguigu.cn',  //目标服务器
        // pathRewrite:{'^/api':''}
      }
    }
  }
})
