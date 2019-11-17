let A = require('./a')
import B from './b';

import '../public/styles/index.css'
import '../public/styles/index.less'
import '../public/styles/index.scss'

console.log(A);
console.log(B);

console.log('hello webpack');

window.onload = function () {
    let el = document.getElementById('webpack')

    console.log(el);
}

