<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- //放大镜 -->
                                <ProductZoomer 
                                v-if="images.normal_size.length!=0" 
                                :base-images = "images" 
                                :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                           <el-input-number v-model="num1" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字" size="mini"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                          <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
        
                            <div class="tab-content entry" v-show="!showDiscuss" v-html="goodsinfo.content">
        
                            </div>
                            <div class="tab-content" v-show="showDiscuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" v-model.trim="commentinfo" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <!-- 提交评论 -->
                                                <input id="btnSubmit" @click="Submit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="goodscomments.lenght==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);" >暂无评论，快来抢沙发吧！</p>
                                        
                                        <li v-for="item in goodscomments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | capitalize}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                           
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="total" show-sizer show-elevator placement="top" 
                                        @on-change="pagechange"
                                        @on-page-size-change="sizechange"
                                        :page-size-opts="[1, 2, 3, 4]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/Detail/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                                 <router-link :to="`/Detail/`+item.id">{{item.title}}</router-link>
                                            <span>{{ item.add_time | capitalize}}</span>
                                        </div>
                                    </li>
        
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop></BackTop>
        <img class="moveImg" v-if="imglist.length !=0" :src="imglist[0].original_path" alt="">
    </div>
</template>

<script>
//导入jquery
import $ from 'jquery';

export default {
  name: "Detail",
  data: function() {
    return {
      detailID: undefined,
      goodsinfo: {}, //商品详情
      hotgoodslist: [], //推荐商品
      imglist: [], //商品图片
      showDiscuss: false,
      page: 1,
      size: 5,
      total: 1,
      num1: 0,//购买商品数量
      commentinfo: undefined,
      goodscomments: [], //评论信息
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "＃ff3d00"
      },
      //放大镜
      images: {
        normal_size: []
      }
    };
  },
  methods: {
    handleChange() {},
    //抽取商品属性this.$axios
    getgoodscomments() {
      this.detailID = this.$route.params.id;
      this.$axios
        .get(
          `site/goods/getgoodsinfo/${this.detailID}`
        )
        .then(response => {
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          let itemArr = [];
          this.imglist.forEach(v => {
            itemArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          this.images.normal_size = itemArr;
        });
    },
    //获取用户评论this.$axios
    getcomments() {
      //获取用户评论
      this.$axios
        .get(
          `site/comment/getbypage/goods/${
            this.detailID
          }?pageIndex=${this.page}&pageSize=${this.size}`
        )
        .then(response => {
          this.goodscomments = response.data.message;

          this.total = response.data.totalcount;
        });
    },
    pagechange(page) {
      this.page = page;

      this.getcomments();
    },
    sizechange(size) {
      this.size = size;
      if (this.page == 1) {
        this.getcomments();
      }
      //  this.getcomments();
    },
    Submit() {  
      if (this.commentinfo == "") {
        this.$Message.error("哥们写点东西");
      }
      this.$axios.post(
        `site/validate/comment/post/goods/${this.detailID}`,
        {
          commenttxt:this.commentinfo
        }
      ).then(response=>{
          this.$Message.success(response.data.message);
           this.getcomments();
           this.commentinfo = '';
          
      });
    },
    //购物商品小图片
    cartAdd(){
        if(this.num1 == 0){
            this.$message.error('哥们买点东西!');
            return;
        }
        //加入购物车
        let addOffset = $('.add').offset();
        //购物车
        let iconCart = $('.icon-cart').offset();
        //动画效果
        $('.moveImg').css(addOffset).stop().show().animate(iconCart,1000,function(){
            $(this).stop().hide();
        })
        
        //测试vuex
        // this.$store.commit('increment',10)
        this.$store.commit('addcomment',{
            goodId:this.detailID,
            goodNum:this.num1
        })
    }
  },
  created() {
    //获取商品信息
    this.getgoodscomments();
    //获取用户评论
    this.getcomments();
  },
  //监听
  watch: {
    //监听id 可传参数 val oldval
    $route() {
      this.images.normal_size = [];
      this.getgoodscomments();
    }
  }
};
</script>

<style lang="less">
.tab-content img {
  display: block;
  width: 100%;
}
/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}
//购买商品小图片
.moveImg {
    position: absolute;
    width: 30px;
    border-radius: 30%; 
}


</style>


