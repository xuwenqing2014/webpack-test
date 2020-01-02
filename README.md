# webpack-test
webpack的学习记录
### master是webpack+vue
### react是webpack+react

#### entry 入口文件

#### output 出口文件名及路径

#### webpack-dev-server可以开启本地服务器，或者设置proxy代理

#### source-map 可以生成.map文件，方便调试

### loader与plugin

#### html-webpack-plugin 可以将打包后的资源自动引入到html中

#### style-loader css-loader可以支持css模块

#### sass-loader node-sass 可以支持sass

#### less-loader 可以支持less

#### postcss-loader autoprefixer 可以支持自动加css前缀

#### mini-css-extract-plugin 或者 extract-text-webpack-plugin可以支持css从js中抽离

#### babel-loader @babel/core @babel/preset-env 可以支持es6语法

#### file-loader 或者 url-loader可以支持图片模块

##### file-loader不支持小图片base64，url-loader可以支持小图片base64

#### vue-loader vue-template-compiler 可以支持编译.vue文件

#### clean-webpack-plugin 可以清除打包后的文件夹

#### 打包优化

##### 使用DllPlugin打包，可以隔离不用重新构建的包，加快构建速度，比如vue react react-dom这些js库

##### 使用includes和excludes去除不必要的构建

##### production环境默认开启tree-shaking去除不必要代码
