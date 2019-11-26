// import '../public/styles/index.css'
// import '../public/styles/index.less'
// import '../public/styles/index.scss'

// import $ from "jquery"
// window.onload = function () {
//     let el = document.getElementById('btn')
//     console.log(el);
//     if (el)
//         document.getElementById('btn').onclick = function () {
//             $('<div></div>').html('异步加载模块 懒加载').appendTo('body')
//         }
// }
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'


import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('ZH-cn')
console.log(moment().subtract(6, 'days').calendar())

console.log('hello webpack');
