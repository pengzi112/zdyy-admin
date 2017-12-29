<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logoBox">
      后台管理
    </div>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container">
      <div class="avatar-wrapper">
        <div class="user-name">{{name}}</div>
        <el-badge is-dot>
          <img class="user-avatar" :src="head">
        </el-badge>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/setting/index">
          <el-dropdown-item>
            <span class="news">
              <el-badge is-dot>
                消息
              </el-badge>
            </span>
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
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'head'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$confirm('确认要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()  // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  width: 100%;
  position: fixed;
  left: 0;
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
      position: relative;
      overflow: hidden;
      padding-right: 20px;
      .user-name{
        color: #fff;
        float: left;
        height: 60px;
        line-height: 45px;
        margin: 10px 20px 0 0;
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
        top: 35px;
        font-size: 12px;
      }
    }
  }
}
.news{
  display: block;
  line-height: 16px;
  padding: 10px 0;
}
</style>

