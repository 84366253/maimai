<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{item.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{item.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{item.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{item.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{item.order_amount}}元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                               <div class="el-row">
                                   
                                        <div class="el-col el-col-12">
                                            
                                                <dl class="form-group">
                                                    
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{item.address}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div>
                                <dl>
                                    <dt> <a href="#" @click="pay" style="fontSize:20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点击页面支付</a> </dt>
                                </dl>
                            </div>
                            <br>
                            <br>
                            <div class="el-col el-col-6">
                                <div id="container2">

                                        <qrcode :value="`http://47.106.148.205:8899/site/validate/pay/alipay/`+$route.params.orderid" :options="{ size: 200 }"></qrcode>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//导入二维码
import VueQrcode from "@xkeshi/vue-qrcode";

export default {
  //定义二维码
  components: {
    [VueQrcode.name]: VueQrcode
  },
  name: "payOrder",
  data: function() {
    return {
      item: {},
      itemID:0
    };
  },
  created() {
    this.$axios
      .get(`site/validate/order/getorder/` + this.$route.params.orderid)
      .then(response => {
        this.item = response.data.message[0];
      });

    this.itemID = setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/` + this.$route.params.orderid)
        .then(response => {
          if (response.data.message[0].status == 2) {
            this.$router.push("/paysuccess/" + response.data.message[0].id);
            clearInterval(this.itemID);
          }
        });
    }, 500);
  },
  destroyed() {
      clearInterval(this.itemID);
  },
  //事件
  methods: {
    pay() {
      window.open(
        `http://47.106.148.205:8899/site/validate/pay/alipay/` +
          this.$route.params.orderid
      );
    }
  }
};
</script>

<style>
</style>
