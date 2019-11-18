const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // 解析成绝对路径
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        })
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
            }
        ]
    },
    devtool:'cheap-module-eval-source-map'
};