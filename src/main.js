import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'

//导入主页
import Index from './components/01index.vue'

import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
//打入Element
import ElementUI from 'element-ui';

//注册Vuerouter的中间件
Vue.use(VueRouter);

Vue.use(ElementUI);

Vue.config.productionTip = false


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
  }
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
