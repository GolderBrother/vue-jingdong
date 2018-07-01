import Home from '../view/home/index.vue'
import GoodsDetail from '../components/goods/index.vue'
import search from '../components/search/index.vue'
import Category from '../view/category/index.vue'
import Find from '../view/find/index.vue'
import Cart from '../view/cart/index.vue'
import Mine from '../view/mine/index.vue'
import Login from '../view/login/index.vue'
import Register from '../view/reg/index.vue'
import ChangePwd from '../view/login/ChangePwd.vue'
import Count from '../view/count/Count.vue';
export default [{
    path: '/home',
    component: Home
}, {
    path: '/search',
    component: search
}, {
    path: '/detail/:id',
    component: GoodsDetail 
}, {
    path:'/catgory',
    component:Category
}, {
    path:'/catgory/:id',
    component:Category
}, {
    path:'/find',
    component:Find
}, {
    path:'/cart',
    component:Cart
}, {
    path:'/mine',
    component:Mine
}, {
    path:'/login',
    component:Login
}, {
    path:'/register',
    component:Register
}, {
    path:'/changePwd',
    component:ChangePwd
}, {
    path:'/count',
    component:Count
}, {
    path: '/',
    redirect: '/home'
}, {
    path: '*',
    redirect: '/home'
}]
