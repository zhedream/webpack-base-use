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

class Dog{
    name = '小黑'
    static color = '黑色'
}

let p =  new Dog()

console.log(p);

// 最新浏览器支持, babel 需要插件 @babel/plugin-transform-runtime
function *Gen(){
    yield 1
    yield 2
    return 3;
}

let g = Gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());



