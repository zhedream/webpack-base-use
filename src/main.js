import '../public/styles/index.css'
// import '../public/styles/index.less'
// import '../public/styles/index.scss'

import $ from "jquery"
// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

console.log('hello webpack');

window.onload = function () {
    let el = document.getElementById('btn')
    console.log(el);
    if (el)
        document.getElementById('btn').onclick = function () {
            $('<div></div>').html('异步加载模块 懒加载').appendTo('body')
        }
}