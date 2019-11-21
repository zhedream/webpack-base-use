# Webpacb

webpack 的学习

1. npm init -y

2. npm install webpack webpack-cli -D

3. npx webpack | npx webpack --config webpack.myconfig.js

## webpack打包
1. webpack  本地build 打包
2. webpack-dev-server 开启服务打包. 适合开发调式, 官方推荐
自动监视文件变化, 自动刷新浏览器
webpack-dev-server 
--compress // 压缩传输 gzip
--hot // 热模块更替
--contentBase public // 服务根目录
--port 8080 // 端口

3. html-webpack-plugin 插件
npm i html-webpack-plugin -D

webpack打包或webpack-dev-server开发时, 根据模板生成一个生成一个 html
webpack 在硬盘, dist 生成, 开发, 的内存中 /index.html

4. webpack-dev-middleware
webpack-dev-server 的底层, 可以自定服务
｢wds｣: Compiled successfully. webpack-dev-server 
｢wdm｣: Compiled successfully. webpack-dev-middleware
必须使用html-webpack-plugin, 不然找不到 index.html

## Loader
webpack 默认只对 js 进行打包, 
需要打包 xx.css , 就需要 css 的 loader. xxx.less 其他后缀的 需要相应的 loader
1. css 的 loader
style-loader css-loader // 有顺序, style 应用, css  解析 

less-loader & less
less-loader 需要 less  处理

sass-loader & sass

2. file-loader & url-loader

处理图片, 字体文件.
url-loader 可对图片进行高级处理, 如转换成  base64. 依赖 file-loader
配置 图片小于 5kb 传唤成 base64 以减少浏览器请求次数

3. babel-loader
转换语法, 兼容浏览器

npm i babel-loader @babel/core @babel/preset-env webpack -D
babel-loader: 中间层
@babel/cor 核心
@babel/preset-env: 预设语法, 配置支持哪些语法, es6 , es7 ..

写了一些 高级语法,babel 不能转换
babel 能检测出来, 会提示你装个 babel 的插件
如: 'Add @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.'
npm i @babel/plugin-proposal-class-properties -D , 在wenpack babel-loader 配置 option plugins

**常用的babel插件**
支持或兼容 语法
npm install --D @babel/plugin-transform-runtime
npm install --S @babel/runtime

npm i @babel/polyfill -S
polyfill "foo".includes('0) , 为对象方法,做兼容

**.babelrc**
官方推荐,把 babel-loader 的配置项 , 写入 .babelrc 里

4. sourceMap
devtool:'cheap-module-eval-source-map' 会生产模式 none
LINK: https://webpack.docschina.org/configuration/devtool

5. webpack plugin 一些有用的插件
npm i clean-webpack-plugin -D // 打包时清理 dist
npm i copy-webpack-plugin -D // 复制 静态文件, 到 dist 不需要打包的 static
npm i html-withimg-loader -D // 处理 index.html 的图片打包 使用相对路径 "../" , 以来 file-loader

6. 多页应用的打包
配置多个入口,
HtmlWebpackPlugin, 配置多个 多html 的拷贝,与选择所需要的 js , chunks

7. 注入依赖包 如: jq
npm i expose-loader -D // 加载包到window全局, 仅限这个页面, 打包入口及其引入的模块 @
new webpack.ProvidePlugin({$:'jquery',}) // 每个页面, 每个模块都会注入 jq , 注: 是模块内, 非 window.$ @

8. wenpack-merge
npm i webpack-merge -D  // 合并webpack 配置
npm i live-server -D // 启动一个node服务 查看dist

9. 环境变量
new webpack.DefinePlugin({IS_DEV: "true"}) // 给每一个模块注入一个变量

10. devServer proxy
解决开发时的跨域问题
