import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'

//导入主页
import Index from './components/01index.vue'
//导入商品详情
import Detail from './components/02.productDetail.vue'

import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';

//导入Element
import ElementUI from 'element-ui';
Vue.use(ElementUI);

//导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

//导入axios
import axios from 'axios';
//axios基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899/';
//给Vue原型加方法
Vue.prototype.$axios = axios;


Vue.use(iView);
//懒加载
import VueLazyload from 'vue-lazyload'
//懒加载配置
Vue.use(VueLazyload, {
  preLoad: 1.3,
  //错误提示
  // error: 'dist/error.png',
  //懒加载图片
  // loading: 'dist/loading.gif',
  loading: require('./assets/img/bfc737fbf3745022e4bea20e481d1b2b.gif'),
  attempt: 1
})

//注册Vuerouter的中间件
Vue.use(VueRouter);

//导入放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)


Vue.config.productionTip = false

//注册全局过滤器
//导入moment
import moment from 'moment';
Vue.filter('capitalize', function (value) {
  // 返回处理后的值
  return moment(value).format("YYYY年MM月DD日");
})


let routes = [
  {
    // path:'/',
    // redirect:Index
    path:'/',
    component:Index
  },
  {
    path:'/index',
    component:Index
  },
  {
    path:'/Detail/:id',
    component:Detail
  },
]

let router = new VueRouter({
  //固定写法不然要赋值
  // routes:xxxx
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
