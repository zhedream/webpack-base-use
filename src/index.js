let A = require('./a')
import B from './b';

import '../public/styles/index.css'
import '../public/styles/index.less'
import '../public/styles/index.scss'

// 引入bootstrap3的css文件 , 使用的 字体图标 icon
import 'bootstrap/dist/css/bootstrap.css'

console.log(A);
console.log(B);

console.log('hello webpack');

window.onload = function () {
    let el = document.getElementById('webpack')

    console.log(el);
}

