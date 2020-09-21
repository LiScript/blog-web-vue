<template>
  <div class="navtop">
    <div class="left-title">
      李方洲</div>
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- 全屏幕 -->
        <screenfull class="right-menu-item hover-effect" />
        <!-- 语言切换 -->
      </template>
      <!-- 头像区域 -->
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <svg-icon
            icon-class="user"
            class="user-avatar"
          />
          <!-- <img src="@/assets/img/user.png" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              返回首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/modifyPwd">
            <el-dropdown-item divided>
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span
              style="display:block;"
              @click="logout"
            >
              退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull' // 全屏幕
export default {
  components: {
    Screenfull
  },
  computed: {
    ...mapGetters([
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/')
    }
  }
}
</script>
