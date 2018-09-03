<template>
    <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model="user" placeholder="请输入用户名"></el-input>
                        <br>
                        <br>
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" @click="login" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      user: "admin",
      password: "123"
    };
  },
  //事件
  methods: {
    login() {
      this.$axios
        .post(`site/account/login`, {
          user_name: this.user,
          password: this.password
        })
        .then(response => {
          if (response.data.message == "登录成功") {
            this.$store.commit("changeLoginStatus", true);
            //跳回上级页面
            this.$router.push(this.$store.state.itemPath);
          } else {
            // 密码错误提示
            this.$Message.error(response.data.message);
          }
        });
    }
  }
};
</script>

<style>
</style>


