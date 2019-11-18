let A = require('./a')
import B from './b';

import '../public/styles/index.css'
import '../public/styles/index.less'
import '../public/styles/index.scss'

// 引入bootstrap3的css文件 , 使用的 字体图标 icon
import 'bootstrap/dist/css/bootstrap.css'

// 给对象原型 打兼容补丁
import '@babel/polyfill'

console.log(A);
console.log(B);

console.log('hello webpack');

window.onload = function () {
    let el = document.getElementById('webpack')

    console.log(el);
}

// 最新语法,做浏览器支持,  使用babel插件 @babel/plugin-transform-runtime
class Dog {
    name = '小黑'
    static color = '黑色'
}
let p = new Dog()
console.log(p);

function* Gen() {
    yield 1
    yield 2
    return 3;
}

let g = Gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());


// 对象原型方法, 引用 @babel/polyfill 做兼容
let Foo = "foo";
console.log(Foo.includes('o'));






