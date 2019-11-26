const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 提取CSS 到文件 插件 + loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 基本的公共配置
module.exports = {
    entry: './src/main.js',
    // entry: { index: './src/index.js', other: './src/other.js' }, // 相对路径, 相对与项目根目录, 应该是 package.json 的文件夹
    output: {
        path: path.resolve(__dirname, '..', './dist'), // 解析成绝对路径
        filename: '[name]-[hash:4].js', // [name] 对应每个入口
        publicPath: '/', // 放到服务根目录 / ,或其他 如 /admin

    },
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
    },
    plugins: [
        new webpack.BannerPlugin('这里添加版权信息啦'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            // chunks: ['main']
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'other.html',
        //     template: 'public/other.html',
        //     // chunks: ['other']
        // }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash:4].css'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '..', './public/static'),
                to: 'static' // output
            }
        ]),
        new webpack.IgnorePlugin(/.local/,/moment/),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     Jquery: 'jquery',
        // }), // 所有页面所有模块都会注入 jq , 队提取公共代码不友好.  import from 有利与代码优化
    ],
    module: {
        noParse: /jquery/, // bootstrap 就是个坑
        rules: [
            {
                test: /\.css$/,
                // 管道调用, 从右到左 做处理的, css 解析, style 应用
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',]
            },
            {
                test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] // 把 less 转成 css , 解析 css , 应用 css
            },
            {
                test: /\.s(a|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] // 把 sass 转成 css , 解析 css , 应用 css
            },
            {
                test: /\.(png|jpg|bmp|jpeg|gif)$/, use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024, // 小于 5kb 转换成 base64(占空间) , 以减少 浏览器请求. 
                        outputPath: 'images', // 放在 images 目录下
                        name: '[name]-[hash:4].[ext]', // 自定义图片名
                    }
                } // 处理 图片文件 , 字体文件 , url-loader 基于 file-loader 封装, limit 是 ulr 的功能
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf)$/, use: 'file-loader' // file-loader 处理字体文件. (都是 file-loader 但一般习惯分开写)
            },
            {
                test: /\.js$/, use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/env'], // 常用的预设
                    //     plugins: [
                    //         '@babel/plugin-proposal-class-properties',
                    //         '@babel/plugin-transform-runtime'] // babel 通过插件, 转换高级语法
                    // }
                },
                exclude: /node_modules/,
                include: path.resolve(__dirname,'../src')
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            // {
            //     test: require.resolve('jquery'), // 解析node_modules 的 jq 路径, 把 jq 放到 window 上 , 当前页面
            //     use: {
            //         loader: 'expose-loader',
            //         options: '$'
            //     }
            // }
        ]
    },
};