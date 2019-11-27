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

console.log('hello webpack');

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('ZH-cn')

import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: {
                template: '<h1>This is Home page</h1>'
            }
        },
        {
            path:'/index',
            component:{
                template:'<h1>This is Index page</h1>'
            }
        }
    ]

})
new Vue({
    el: '#webpack',
    data:{
        msg:'webpack-Vue'
    },
    router
    
})

console.log(moment().subtract(6, 'days').calendar())

