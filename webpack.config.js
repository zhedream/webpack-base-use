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
            filename:'index.html',
            template:'public/index.html'
        })
    ]
};