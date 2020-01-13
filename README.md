# webpack搭建vue开发环境

#### 项目运行

- `npm i` 安装依赖

- `npm run dll` 构建出不需打包的vendor包

- `npm run build` 构建打包

#### entry 入口文件

#### output 出口文件名及路径

#### webpack-dev-server可以开启本地服务器，或者设置proxy代理

#### source-map 可以生成.map文件，方便调试

#### mode取值development或者production，production模式下js会自动压缩

### loader与plugin

- html-webpack-plugin 可以将打包后的资源自动引入到html中

- style-loader css-loader可以支持css模块

- sass-loader node-sass 可以支持sass

- less-loader 可以支持less

- postcss-loader autoprefixer 可以支持自动加css前缀

- mini-css-extract-plugin 或者 extract-text-webpack-plugin可以支持css从js中抽离

- optimize-css-assets-webpack-plugin 可以压缩css

- purify-css purifycss-webpack 可以去除无用的css

- babel-loader @babel/core 可以支持es6语法

- @babel/preset-env 是根据浏览器或者运行环境来将es6转化成es5，比如根据browserslist

- 补充说明1：@babel/polyfill 是对es6降级es5的一个垫片，是对babel-loader的补充，但是会污染全局，不能按需引入，不建议这种方式

- 补充说明2：@babel/runtime @babel/plugin-transform-runtime也是对es6降级es5的一个垫片，可以按需引入，模块化加载，不污染全局，推荐使用

- file-loader 或者 url-loader可以支持引入文件

- file-loader不支持小文件转化为base64格式，但是可以为文件名添加hash值，url-loader可以支持小文件转化为base64格式，这两个可以搭配使用

- vue-loader vue-template-compiler 可以支持编译.vue文件

- cache-loader 可以将性能开销比较大的结果缓存在磁盘里

- thread-loader 使用worker池去运行loader，加快构建速度

- clean-webpack-plugin 可以清除打包后的文件夹

- webpack.HotModuleReplacementPlugin webpack自带的热替换plugin，或者，devServer的热替换hot:true自带热更新这个插件

- 热更新是修改就会刷新页面，热替换（简称HMR）是修改只会替换修改的模块，保存其他模块的状态


### 打包优化

##### 开发环境

- 使用DllPlugin打包，可以隔离不用重新构建的包，比如vue react react-dom这些js库，DllPlugin一般只使用在开发环境，加快构建速度

- 使用 cache-loader 和 thread-loader加快构建速度

- 使用includes和excludes去除不必要的构建

- 因为node.js是单线程的，所以webpack打包是一个任务一个任务按照顺序执行的，可以引入happypack将loader的转换任务变成多进程去处理，加快转换速度

##### 生产环境

- production环境默认开启tree-shaking和使用UglifyJSPlugin去除不必要代码，正确配置sideEffects，注意css的引入不能去掉副作用

- 解释1：tree-shaking只是将没有使用到的代码标识为unused，而且只能识别es6的import export，不能识别其他的模块化导入导出，UglifyJSPlugin是将unused的代码移除掉

- 解释2：在vue中sideEffects可以这么设置sideEffects: ['*.css']，避免将css当成副作用移除掉了，其他的会移除副作用，节省代码，不懂sideEffects可以看看https://juejin.im/post/5b4ff9ece51d45190c18bb65

- 使用purify-css purifycss-webpack去除无用的css

- 使用optimize-css-assets-webpack-plugin压缩css


