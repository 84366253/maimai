<template>
    <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="tmpl routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <a href="/index.html">首页</a> &gt;
                                    <a href="#/site/member/center" class="">会员中心</a>&gt;
                                    <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
                                </div>
                            </div>
                            <div class="section clearfix">
                                <div class="left-260">
                                    <div class="bg-wrap">
                                        <div class="avatar-box">
                                            <a href="/user/center/avatar.html" class="img-box">
                                                <img src="../assets/img/logdingDog.gif" alt="">
                                            </a>
                                            <h3>

                                                ivanyb

                                            </h3>
                                            <p>
                                                <b>注册会员</b>
                                            </p>
                                        </div>
                                        <div class="center-nav">
                                            <ul>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-order"></i>
                                                        <span>订单管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <!-- <a href="#/site/member/orderlist" class="router-link-exact-active "> -->
                                                               <router-link :to="`/tradingorder/`+$route.params.id">
                                                        <i class="iconfont icon-arrow-right"></i>交易订单</router-link>
                                                                <!-- </a> -->
                                                        </p>
                                                        
                                                    </div>
                                                </li>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-user"></i>
                                                        <span>账户管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                        </p>
                                                        <p>
                                                            <a href="javascript:void(0)">
                                                                <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-auto">
                                    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <ul>
                                                <li class="selected">
                                                    <a href="/user/order-list.html">交易订单</a>
                                                </li>
                                                <li>   
                                                    <el-pagination
                                                    @size-change="SizeChange"
                                                    @current-change="IndexChange"
                                                    :page-sizes="[4, 8, 12, 16]"
                                                    :page-size="100"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="400">
                                                    </el-pagination>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th width="16%" align="left">订单号</th>
                                                        <th width="10%">姓名</th>
                                                        <th width="12%">订单金额</th>
                                                        <th width="11%">下单时间</th>
                                                        <th width="10%">状态</th>
                                                        <th width="12%">操作</th>
                                                    </tr>
                                                    <tr v-for="item in message" :key="item.id">
                                                        <td>{{item.order_no}}</td>
                                                        <td align="left">{{item.accept_name}}</td>
                                                        <td align="left">
                                                            <strong style="color: red;">￥{{item.order_amount}}</strong>
                                                            <br> 在线支付
                                                        </td>
                                                        <td align="left">{{item.express_time | capitalize("YYYY:MM:DD")}}</td>
                                                        <td align="left">
                                                            {{item.statusName}}
                                                        </td>
                                                        <td align="left" style="display: flex;flex-direction: column;alingn-items:centen">
                                                            <router-link :to="`/orderdetails/`+item.id">查看订单{{message.status}} </router-link>
                                                            <!-- <a href="#/site/member/orderinfo/12" class=""></a> -->
                                                           
                                                            <!-- <a v-if="item.status ==1" href="#/site/goods/payment/12" class="">去付款</a> -->
                                                            <router-link v-if="item.status == 1 " :to="`/payorder/`+item.id">去付款</router-link>
                                                            
                                                             <br>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="page-foot">
                                                
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
  name: "tradingorder",
  data: function() {
    return {
      //分页首索引
      pageIndex: 1,
      //分页数量
      pageSize: 10,
      //我的交易订单
      message: []
    };
  },
  //方法
  methods: {
    SizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getGoodslist();
    },
    IndexChange(pageIndex) {
      this.pageIndex = pageIndex;
      //    this.pageIndex = 1;
      this.getGoodslist();
    },
    //获取交易订单
    getGoodslist() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          
          this.message = response.data.message;
        });
    }
  },
  //生命周期函数
  created() {
    this.getGoodslist();
  }
};
</script>

<style>
.el-pagination {
  position: absolute;
  top: 5px;
}
</style>


