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

## HMR 模块热替换
仅适用于 开发阶段

```js
// A 模块
if (module.hot) {
    module.hot.accept('./b.js', function (params) {
        // 模块热替换, 重新 require 模块 从而实现不刷新页面
        var newModule = require('./b'); // 使用 require 重新引入, 不能使用 import from
        console.log('模块更新, 写一些更新后的逻辑', newModule);
    })
}
```
使用场景: 在 A 模块, 点点点, 进入了一个页面, 这个页面引入了一个B模块(组件),
你要修改了 B 的一个代码, 结果浏览器就刷新了, 你就又要 点点点 点开 这个页面组件.这也太难受了.
这时候 HMR 就非常有用了 , 修改 B 页面也不会刷新 .如果 B模块完成后, 就可以把, 这段代码删了.

# 优化

## mode: production

**一. tree shaking**

会移除没有引用的代码,利用了 import from 语法的静态结构的特性.

注:
 1. import from 只能在顶级作用域使用, 不能 if 使用 , 所以推荐使用 import from 
 2. require 可以灵活使用 if 动态 引入模块, 所以 webpack require 不能 tree shaking. 

**二. scope hoisting**

ModuleConcatenationPlugin , 在mode: production 自动启动, 或手动启动该插件

分析模块或代码之间的依赖关系, 尽可能将打散的模块或代码 合并到一个函数中去, 避免冗余
只有引入一次的模块才能被合并, 所以也需要 import from 

```js
let a = 1
let b = 2
console.log(a+b) // 打包后 console.log(3)
console.log(a,b) // console.log(1,2)
```
只能分析推断, 预执行, 有点 Quokka.js 的感觉

**三. 代码混淆与压缩**

通过 UglifyjsPlugin

## CSS优化

**一. 提取到CSS文件**

npm i -D mini-css-extract-plugin // 这是一个插件 + loader

之前 的style-loader 会将CSS 插入到 html 中 , 所以 我们替换成
mini-css-extract-plugin 的 loader, 则会把 CSS 提取到 文件中. 并在 相应的模板 html 中引入 CSS文件

**二. 添加CSS前缀**

提升CSS的兼容性

npm i -D postcss-loader autoprefixer

需要注意的是

1. postcss-loader放置在css-loader的右边
2. 需要配置 在项目根目录配置 postcss.config.js ,配置一下 postcss 使用的依赖插件 autoprefixer

**三. CSS压缩**

npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin // CSS 压缩 和 JS 压缩

webpack 默认有 JS 压缩 , 没有CSS 压缩
我们需要 webpack配置 optimization.minimizer 节点, 配置 CSS 压缩, 会把原来的 JS 压缩配置覆盖.
所以需要把 JS压缩插件 一同配置上去.

压缩消耗性能, 开发也不需要, 把插件 配置到 prod 上去即可.

注: webpakc5 肯能 会默认自带 CSS 压缩

## JS 优化

**配置多入口**

**代码分离**

1. 提取公共代码

SplitChunksPlugin

optimization.splitChunks.chunks:'all'
配置后, webpack 会分析 公共的模块, 提出到一个公共的JS 中

注: 一个坑, 单入口没问题
开启 splitChunks 后 , 如果是多入口
html-webpack-plugin@3.2.0 : latest, 的bug不会把 提取的公共js 引入html
升级到 @next 4.0.0-beta.11 修复了
npm i -D html-webpack-plugin@next
https://www.cnblogs.com/founderswitch/p/10481818.html

**动态导入(懒加载)**

import('jquery') 的语法

需要babel 转换

npm i -D @babel/plugin-syntax-dynamic-import

```js
// 返回一个 promise
function getComponent() {
  return import('jquery').then(({ default: $ }) => {
    return $('<div></div>').html('main')
  })
}

```

**SplitChunksPlugin**

```js

module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 只对异步加载的模块进行拆分，可选值还有all | initial
      minSize: 30000, // 模块最少大于30KB才拆分
      maxSize: 0,  // 模块上限大小, 超过大小, 会进一步拆分. 0 不设置 无上限
      minChunks: 1, // 模块最少引用一次才会被拆分
      maxAsyncRequests: 5, // 异步加载时同时发送的请求数量最大不能超过5,超过5的部分不拆分
      maxInitialRequests: 3, // 页面初始化时同时发送的请求数量最大不能超过3,超过3的部分不拆分
      automaticNameDelimiter: '~', // 默认的连接符
      name: true, // 拆分的chunk名,设为true表示根据模块名和CacheGroup的key来自动生成,使用上面连接符连接
      cacheGroups: { // 缓存组配置,上面配置读取完成后进行拆分,如果需要把多个模块拆分到一个文件,就需要缓存,所以命名为缓存组
        vendors: { // 自定义缓存组名
          test: /[\\/]node_modules[\\/]/, // 检查node_modules目录,只要模块在该目录下就使用上面配置拆分到这个组
          priority: -10 // 权重-10,决定了哪个组优先匹配,例如node_modules下有个模块要拆分,同时满足vendors和default组,此时就会分到vendors组,因为-10 > -20
        },
        default: { // 默认缓存组名
          minChunks: 2, // 最少引用两次才会被拆分
          priority: -20, // 权重-20
          reuseExistingChunk: true // 如果主入口中引入了两个模块,其中一个正好也引用了后一个,就会直接复用,无需引用两次
        }
      }
    }
  }
};


```

splitChunks.chunks:'all' 对所有模块进行分割
splitChunks.chunks:'async' 对异步模块进行分割
splitChunks.chunks:'initial' 对异步模块进行分割

splitChunks.minSize: 30000 大于30kb 才进行拆分
splitChunks.maxSize: 0 , 模块上限大小, 超过大小, 会进一步拆分. 0 不设置

splitChunks.minChunks: 1 , 最少引入一次才会被差分,
splitChunks.maxAsyncRequests: 5 , 异步加载时, 对同时请求的个数 进行控制, 超过不拆分
splitChunks.maxInitialRequests: 3 , 页面初始加载, 对同时请求的个数 进行控制, 超过不拆分

splitChunks.automaticNameDelimiter: '~' , 默认的连接符
splitChunks.name: true , 拆分的文件名 默认 以chunks 名 + 连接符 命名, entry 入口 的key?

splitChunks.cacheGroups: {} , 缓存组, 按组打包 自定义规则如何拆分: 匹配 拆分 命名. 

**noParse**

在 module.noParse: /jquery|bootstrap/ , 不需要解析分析的模块,没有依赖的, 以提升打包速度
注: bootstrap 这里有个坑, 如果只引入 bootstrap 的CSS 需要把 bootstrap 从 正则中去掉 , 肯能版本的原因

webpack 中, 尽量少的使用loader, 会提升构建速度,比如说 css 通常, 选个 less 或 sass 就行了.

babel-loader 配置
exclude: /node_modules/, 排除 node_modules
include: path.resolve(__dirname,'../src') // 只处理 src 下的, exclude 可以不用设置


