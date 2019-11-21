const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.common.js');

// 开发环境的配置
module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // watch: true, // 监听文件, 有 devServer, 就不需要了
    devServer: {
        // open: true, // 自动打开浏览器
        hot: true, // 开启热更新
        compress: true, // gzip
        port: 8080, // 服务端口
        // contentBase: './src' // 服务根目录
        proxy: {
            '/api': {
                target: 'http://localhost:9999', // http://localhost:9999/api ... 默认带 /api
                pathRewrite: {
                    '^api': '' // 重写地址,为空去除 /api
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: "true",
            IS_NUM: "1+1",
            IS_STR: "'str'",
        })
    ]
})