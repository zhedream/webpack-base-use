const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack');
module.exports = {
    mode: 'development',
    // entry: './src/index.js',
    entry: { index: './src/index.js', other: './src/other.js' },
    output: {
        path: path.resolve(__dirname, './dist'), // 解析成绝对路径
        filename: '[name].js' // [name] 对应每个入口 
    },
    plugins: [
        new webpack.BannerPlugin('这里添加版权信息啦'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'other.html',
            template: 'public/other.html',
            chunks: ['other']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './public/static'),
                to: 'static' // output
            }
        ]),
        new webpack.ProvidePlugin({
            $:'jquery',
            Jquery:'jquery',
        }), // 所有页面所有模块都会注入 jq
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                // 管道调用, 从右到左 做处理的, css 解析, style 应用
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] // 把 less 转成 css , 解析 css , 应用 css
            },
            {
                test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] // 把 sass 转成 css , 解析 css , 应用 css
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
                exclude: /node_modules/
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
    devtool: 'cheap-module-eval-source-map'
};