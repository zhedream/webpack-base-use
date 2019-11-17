const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

// 中间件
app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
}));

app.listen(3000, function () {
    console.log('http://localhost:3000/');

})