const path = require('path');

module.exports = {
    mode: 'production', // 打包模式
    watch: false, // 开启监视文件,自动打包
    entry: './src/index.js', // 入口
    output: {
        // 打包出口
        path: path.resolve(__dirname, 'dist'), // 解析成绝对路径
        filename: 'bundle.js'
    },
    devServer: {
        open: true, // 自动打开浏览器
        port: 3000, // 端口
        compress: true, // gzip
        contentBase: 'public', // 根目录
        hot: true, // 热模块更替
    }
};