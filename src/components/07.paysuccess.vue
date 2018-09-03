<template>
    <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
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
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                            <div class="info">
                                                <strong>订单已支付成功！</strong>
                                                <p>您可以点击这里进入
                                                    <!-- <a href="/user/center/index.html">会员中心</a>查看订单状态！</p> -->
                                                    <router-link to="/vipcenter">会员中心<span style="marginLeft:20px;fontSize:40px;color:yellowgreen">{{num}}</span></router-link>
                                                <p>如有其它问题，请立即与我们客服人员联系。</p>
                                            </div>
                                        </div>
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
export default {
  name: "paysuccess",
  data: function() {
    return {
      num: 5,
      itemID:0
    };
  },
  created() {
    this.itemID = setInterval(() => {
      this.num--;
      if (this.num == 0) {
        clearInterval( this.itemID);
        
        this.$router.push("/vipcenter/"+this.$route.params.id);
      }
    }, 1000);
  },
  destroyed() {
      clearInterval(this.itemID);
  },
};
</script>

<style>
</style>

