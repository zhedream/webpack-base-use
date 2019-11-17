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

