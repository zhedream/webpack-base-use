let A = require('./a')
import B from './b';

import '../public/styles/index.css'

console.log(A);
console.log(B);

console.log('hello webpack');

window.onload = function () {
    let el = document.getElementById('webpack')

    console.log(el);
}

