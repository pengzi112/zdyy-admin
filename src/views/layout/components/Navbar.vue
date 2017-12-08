<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logoBox">
      后台管理
    </div>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="user-name">{{name}}</div>
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data () {
    return {
      name: '孙文朋'
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()  // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  background-color: #20a0ff;
  z-index: 1001;
  .logoBox{
    width: 180px;
    border-right: 1px solid rgba(238, 241, 146, 0.3);
    float: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
  .hamburger-container {
    line-height: 70px;
    height: 60px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 60px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      margin-top: 10px;
      position: relative;
      overflow: hidden;
      padding-right: 20px;
      .user-name{
        color: #fff;
        float: left;
        height: 60px;
        line-height: 45px;
        margin-right: 20px;
      }
      .user-avatar {
        cursor: pointer;
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

