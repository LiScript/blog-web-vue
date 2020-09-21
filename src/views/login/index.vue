<template>
  <div id="loginContainer" class="login-container">
    <div class="login-form">
      <div class="login-form-title">
        Demo
      </div>
      <el-form ref="loginForm" :model="loginModel" auto-complete="on" label-position="left">
        <el-form-item prop="username">
          <span class="svg-container"><svg-icon icon-class="user" /></span>
          <el-input
            ref="username"
            v-model="loginModel.username"
            placeholder="账号"
            name="username"
            type="text"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container"><svg-icon icon-class="password" /></span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginModel.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            auto-complete="off"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginModel: {
        username: 'zhangsan',
        password: '123'
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginModel.username === '') {
      this.$refs.username.focus()
    } else if (this.loginModel.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    // 睁眼闭眼效果 查看/隐藏密码 show password/ hide password
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 提交用户名密码 login by password
    handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginModel)
        .then((res) => {
          this.loading = false
          if (res) {
            this.$router.push({ path: this.redirect || '/' })
          }
        })
    },
    // 页面跳转 page jump
    gotoRouter(path) {
      this.$router.push({ path: path })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.tab-pane{
  color: $cursor;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    .el-input__inner {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .el-tabs__item{
    color:#f4f4f4;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('../../assets/images/login/bg2.png');
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: relative;
    background:rgba(255, 255, 255, 0.2);
    width: 520px;
    max-width: 100%;
    padding: 30px 40px 50px 40px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 13%;
  }
  .login-form-title {
      font-size: 20px;
      text-align: center;
      color: #ffffff;
      margin-bottom:30px;
    }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .checkcode-btn{
    position: absolute;
    right: 10px;
    top: 7px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
