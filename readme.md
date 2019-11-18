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
