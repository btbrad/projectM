import Vue from 'vue'
import  App from './App.vue'
import  router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Mock from '../mock'; // 引入mock模块
Mock.start(); //并且执行初始化函数

Vue.use(ElementUI)

new Vue({
    el:'#app',
    router,
    template: '<App/>',
    components: { App }
})
