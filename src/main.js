//导入vue
import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
//导入头部底部
import App from './App.vue'
//导入主页
import Index from './components/01index.vue'
//导入商品详情
import Detail from './components/02.productDetail.vue'
//导入购物车页面
import shopping from './components/03.shoppingcart.vue'
// 导入登录页
import Login from './components/04.login.vue'
//导入订单页
import Order from './components/05.order.vue'
//导入支付页面
import payOrder from './components/06.payOrder.vue'
//导入支付成功页面
import paySuccess from './components/07.paysuccess.vue'
//导入vip页面
import vipCenter from './components/08.vipcenter.vue'
//导入交易订单页面
import tradingOrder from './components/09.tradingorder.vue'
//导入订单详情页面
import orderDetails from './components/10.orderdetails.vue'


//导入Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//导入axios
import axios from 'axios';
//axios基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899/';
axios.defaults.withCredentials = true
//给Vue原型加方法
Vue.prototype.$axios = axios;


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

//Vuex 管理
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({

  state: {
    cartCount: JSON.parse(window.localStorage.getItem('goodkey')) || {},
    islogin: false,
    //网址
    itemPath: '',

  },
  mutations: {
    //添加购物车
    addcomment(state, goodInfo) {

      if (state.cartCount[goodInfo.goodId] == undefined) {
        Vue.set(state.cartCount, goodInfo.goodId, goodInfo.goodNum);

      } else {
        state.cartCount[goodInfo.goodId] += goodInfo.goodNum

      }
    },
    //修改购物车
    updatecomment(state, goodInfo) {
      state.cartCount[goodInfo.goodId] = goodInfo.goodNum;
    },
    //删除商品id
    deletecomment(state, goodId) {
      Vue.delete(state.cartCount, goodId)
    },
    changeLoginStatus(state, isLogin) {
      state.islogin = isLogin
    },
    timePath(state, itemPath) {
      state.itemPath = itemPath
    }
  },
  //计算属性
  getters: {
    goodsComments: state => {
      let Num = 0;
      for (const key in state.cartCount) {
        Num += state.cartCount[key]
      }
      return Num
    }
  },

})

//本地存储
window.onbeforeunload = function () {
  window.localStorage.setItem('goodkey', JSON.stringify(store.state.cartCount));
}

// Vue.config.productionTip = false

//注册全局过滤器
//导入moment
import moment from 'moment';
Vue.filter('capitalize', function (value, filters) {
  if (filters != undefined) {
    return moment(value).format(filters);
  } else {
    // 返回处理后的值
    return moment(value).format("YYYY年MM月DD日");
  }

})

let routes = [{
    path: '/',
    redirect: '/index'
  },
  //http://localhost:8080/index.html#/shopping
  {
    path: '/index',
    component: Index
  },
  {
    path: '/Detail/:id',
    component: Detail,
  },
  {
    path: '/shopping',
    component: shopping,
  },
  //登录路由
  {
    path: '/login',
    component: Login
  },
  // 订单路由
  {
    path: '/order/:ids',
    component: Order,
    meta: {
      checklogin: true
    }
  },
  // 支付路由
  {
    path: '/payorder/:orderid',
    component: payOrder,
    meta: {
      checklogin: true
    }
  },
  // 支付成功
  {
    path: '/paysuccess/:id',
    component: paySuccess,
    meta: {
      checklogin: true
    }
  },
  //vip会员中心
  {
    path: '/vipcenter/:id',
    component: vipCenter,
    meta: {
      checklogin: true
    }
  },
  //交易订单
  {
    path: '/tradingorder/:id',
    component: tradingOrder,
    meta: {
      checklogin: true
    }
  },
  //订单详情
  {
    path: '/orderdetails/:id',
    component: orderDetails,
    meta: {
      checklogin: true
    }
  }
]

let router = new VueRouter({
  //固定写法不然要赋值
  // routes:xxxx
  routes
})

//# 全局守卫
router.beforeEach((to, from, next) => {
  store.commit('timePath', from.path)

  if (to.meta.checklogin == true) {

    axios.get(`site/account/islogin`).then(response => {

      if (response.data.code != 'nologin') {
        next()
      } else {
        next('/login')
      }

    })
  } else {

    next()
  }
})


new Vue({
  render: h => h(App),
  router,
  //挂载
  store,
  beforeCreate() {
    axios.get('site/account/islogin').then(response => {
      if (response.data.code == 'logined') {
        // 修改vuex的状态
        store.commit('changeLoginStatus', true);
      }
    })
  }
}).$mount('#app')