<template>
<div>
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
                                <li class="active">
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
                    <div class="cart-box">

                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <!-- 表单 -->
                                  <el-form-item label="收货人姓名"  prop="accept_name">
                                        <el-input v-model="ruleForm.accept_name" style="width:500px" ></el-input>
                                  </el-form-item>
                                   <el-form-item label="所属地区"  prop="accept_name">
                                       <!-- 省区联动 -->
                                       <v-distpicker :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址"  prop="address">
                                        <el-input v-model="ruleForm.address" style="width:500px" ></el-input>
                                  </el-form-item>
                                   <el-form-item label="手机号码"  prop="mobile">
                                        <el-input v-model="ruleForm.mobile" style="width:500px" ></el-input>
                                  </el-form-item>
                                  <el-form-item label="联系电话"  prop="phone">
                                        <el-input v-model="phone" style="width:500px" ></el-input>
                                  </el-form-item>
                                  <el-form-item label="电子邮箱"  prop="email">
                                        <el-input v-model="ruleForm.email" style="width:500px" ></el-input>
                                  </el-form-item>
                                  <el-form-item label="邮政编码"  prop="post_code">
                                        <el-input v-model="ruleForm.post_code" style="width:150px" ></el-input>
                                  </el-form-item>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                     <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                        <el-radio v-model="ruleForm.express_id" @change="expressChange(20)" :label="1">顺丰</el-radio>
                                        <el-radio v-model="ruleForm.express_id" @change="expressChange(10)" :label="2">圆通</el-radio>
                                        <el-radio v-model="ruleForm.express_id" @change="expressChange(8)" :label="3">韵达</el-radio>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodslist" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price * item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <el-input type="textarea" resize="none" style="width:500px"  v-model="ruleForm.massage"   placeholder="请输入内容"></el-input>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{goodsNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{this.ruleForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{this.ruleForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{this.ruleForm.goodsAmount + this.ruleForm.expressMoment}}</label>
                                    </p>
                                    <p class="btn-box">
                                        
                                        <router-link to="/order"><a class="btn button">返回购物车</a></router-link>
                                        <a id="btnSubmit" class="btn submit" @click="orderby">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                         </el-form>

                    </div>
                </div>
            </div>
        </div>


</div>
</template>

<script>
//导入省市联动
import VDistpicker from "v-distpicker";

export default {
  //初始省市联动模版
  components: { VDistpicker },
  name: "order",

  //数据
  data: function() {
    var checkMobile = (rule, value, callback) => {
      setTimeout(() => {
        let zz = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (zz.test(value) == true) {
          callback();
        } else {
          callback(new Error("手机号码不存在"));
        }
      }, 1000);
    };
    var checkEmail = (rule, value, callback) => {
      setTimeout(() => {
        let zz = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (zz.test(value) == true || value == "") {
          callback();
        } else {
          callback(new Error("邮箱格式不正确"));
        }
      }, 1000);
    };
    return {
      ruleForm: {
        //总金额
        goodsAmount: 0,
        //运费
        expressMoment: 20,
        accept_name: "炸阿萨法", //收货人姓名
        //省市联动
        area: {
          province: { code: "140000", value: "山西省" },
          city: { code: "140100", value: "太原市" },
          area: { code: "140106", value: "迎泽区" }
        },
        address: "快回家客户", //详细地区
        mobile: "18888881234", //手机号码
        email: "12345@qq.com", //电子邮箱
        post_code: "445566", //邮政编码
        //支付方式
        payment_id: "6",
        //运输方式
        express_id: 1,
        //备注
        massage: "你是煞笔",
        //商品id
        goodsids: "",
        //商品内容
        cargoodsobj: ""
      },
      //购买商品
      goodslist: [],
      phone: "7211111", //联系电话
      rules: {
        //收货人姓名
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        //详细地区
        address: [
          { required: true, message: "请输入详细地区", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ],
        //手机号码
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        //电话号码
        phone: [{ required: false, trigger: "blur" }],
        //电子邮箱
        email: [
          { required: false, trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        //邮政编码
        post_code: [{ required: false, trigger: "blur" }]
      }
    };
  },
  //生命函数
  created() {
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
        this.ruleForm.cargoodsobj = this.$store.state.cartCount;
        response.data.message.forEach((v, i) => {
          //数量
          v.buycount = this.$store.state.cartCount[v.id];
          //总金额
          v.totalamount = v.buycount * v.sell_price;

          this.ruleForm.goodsAmount += v.totalamount;
        });
        this.ruleForm.goodsids = this.$route.params.ids;

        this.goodslist = response.data.message;
        // console.log(this.ruleForm.goodsAmount);
      });
  },
  //计算属性
  computed: {
    goodsNum() {
      let goodsNum = 0;
      this.goodslist.forEach(v => {
        goodsNum += v.buycount;
      });
      return goodsNum;
    }
  },
  methods: {
    //提交订单
    orderby() {
      this.$axios
        .post(`site/validate/order/setorder`, this.ruleForm)
        .then(response => {
          if (response.data.status == 0) {
            this.goodslist.forEach(v => {
              this.$store.commit("deletecomment",v.id);
            });
            //提交成功
            this.$router.push(`/payorder/` + response.data.message.orderid);
          } else {
            //支付失败
          }
        });
    },
    expressChange(value) {
      this.ruleForm.expressMoment = value;
    }
  }
};
</script>

<style>
</style>


