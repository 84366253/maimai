<template>
<div v-loading="loading"
 element-loading-text="拼命加载中"
element-loading-background="rgba(0, 0, 0, 0.8)"
>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物物品 -->
                                <tr v-for="item in message" :key="item.id">
                                    <td>
                                     <el-switch
                                        v-model="item.value"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                     </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" width="60px" height="60px" alt=""></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number size="mini" @change="goodsNunChange(item.id,item.buycount)" :min="0" v-model="item.buycount"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <el-button type="danger" @click="delcomment(item.id)" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>

                                <tr v-if="message == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index">马上去购物吧!</router-link>
                                                    <!-- <a href="/index.html">马上去购物</a>吧！ -->
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{goodsNun}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{goodsprice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                             <button class="button">继续购物</button>
                            </router-link>
                           
                            <button class="submit" @click="checkAndsubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


</div>
</template>

<script>
export default {
  name: "shopping",
  data: function() {
    return {
      message: [],
      loading: false
    };
  },
  //生命周期函数
  created() {
    let cartCount = this.$store.state.cartCount;
    let ids = "";
    for (const key in cartCount) {
      ids += key;
      ids += ",";
    }
    ids = ids.slice(0, -1);

    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      response.data.message.forEach(v => {
        v.buycount = cartCount[v.id];
        v.value = true;
      });
      this.message = response.data.message;
    });
  },
  //计算属性
  computed: {
    //商品总数
    goodsNun() {
      let goodsNun = 0;
      this.message.forEach(v => {
        if (v.value) goodsNun += v.buycount;
      });
      return goodsNun;
    },
    //商品总金额
    goodsprice() {
      let goodsprice = 0;
      this.message.forEach(v => {
        if (v.value) goodsprice += v.sell_price * v.buycount;
      });
      return goodsprice;
    }
  },
  //方法
  methods: {
    //计数器改变事件
    goodsNunChange(id, num) {
      this.$store.commit("updatecomment", {
        goodId: id,
        goodNum: num
      });
    },
    // 删除商品事件
    delcomment(id) {   
      this.$store.commit("deletecomment", id);
      this.message.forEach((v, i) => {
        if (v.id == id) {
          this.message.splice(i, 1);
        }
      });
    },
    //立即购物
    checkAndsubmit() {
    //   this.loading = true;

      if (this.goodsNun == 0) {
        //提示没有商品购买
        this.$Message.error("买点东西啥!!!!!!!!!!!!!!!!!!");
        return;
      }
      let ids='';
      this.message.forEach(v=>{
          if(v.value==true){
              ids+=v.id;
              ids+=','
          }
      })
      ids=ids.slice(0,-1)

      this.$router.push(`/order/${ids}`);
    //   this.$axios.get(`site/account/islogin`).then(response => {
    //     if (response.data.code == "nologin") {
    //       setTimeout(() => {
    //         this.loading = false;
    //         //跳转登录页面
    //         this.$router.push("/login");
    //       }, 2000);
    //     } else {
    //       this.$router.push("/order");
    //     }
    //   });
    }
  }
};
</script>

<style>
</style>

