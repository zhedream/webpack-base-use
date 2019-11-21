const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.common.js');

const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 生产环境的配置
module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    devtool: 'none',
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: "false",
            IS_NUM: "1+1",
            IS_STR: "'strstr'",
        })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
})