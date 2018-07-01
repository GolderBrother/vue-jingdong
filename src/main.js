import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import Less from 'Less'
import axios from 'axios'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import Loading from './components/loading'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'; 
import VueAwesomeSwiper from 'vue-awesome-swiper';
// 引入jquery插件，在webpack.config.js中配置使用
import $ from 'jquery';
import 'element-ui/lib/theme-chalk/index.css'
// require ('../node_modules/element-ui/lib/theme-chalk/index.css')
require('./assets/css/base.css'); //全局引入
Vue.use(Less);
Vue.use(VueRouter); 
Vue.use(ElementUI);
Vue.use(Loading); 
Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/images/err.png'),
    loading: require('./assets/images/loading.gif'),
    attempt: 1,
    listenEvents: ['scroll']
});
const router = new VueRouter({
    mode: 'history',
    routes
});
//axios的一些配置，比如发送请求显示loading，请求完成loading消失之类的
//拦截器
axios.interceptors.request.use(function(config) { //配置发送请求的信息
    store.dispatch('showLoading');
    return config;
}, function(error) {
    return Promise.reject(error);
});
// 初始化隐藏动画
store.dispatch('hideLoading');
axios.interceptors.response.use(function(response) { //配置请求回来的信息
    store.dispatch('hideLoading');
    return response;
}, function(error) {
    return Promise.reject(error);
});
// axios.defaults.baseURL = 'http://192.168.0.109:3333/';
axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// 将axios对象和ele的Message方法放在vue原型上，声明后就可以在任何地方调用
Vue.prototype.$http = axios;
Vue.prototype.$message = Message;

// 配置vue实例
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
