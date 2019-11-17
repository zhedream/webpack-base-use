const path = require('path');

module.exports = {
    mode:'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // 解析成绝对路径
        filename: 'bundle.js'
    }
};