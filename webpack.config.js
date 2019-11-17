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
            }
        ]
    }
};