<template>
  <div class="main">
    <div class="userinfo">
      <div class="user-avatar">
        <!-- <open-data v-if="!userInfo.avatarUrl" type="userAvatarUrl"></open-data> -->
        <img v-if="!userInfo.avatarUrl" src="/static/images/home/life.png" alt="">
        <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt>
      </div>
      <div class="user-nickname">
        <!-- <open-data type="userNickName"></open-data> -->
        <p v-if="!userInfo.nickName">匿名用户</p>
        <p v-if="userInfo.nickName">{{userInfo.nickName}}</p>
      </div>
      <div class="user-qita">
        <button v-show="!getIsLogin" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">请登录</button>
      </div>
    </div>
    <div class="allorder">
      <div class="order" @click="toAllOrder">
        <img src="/static/images/my/allorder.png">
        <span>全部订单</span>
      </div>
      <div class="order">
        <img src="/static/images/my/nosend.png">
        <span>待发货</span>
      </div>
      <div class="order">
        <img src="/static/images/my/noget.png">
        <span>待收货</span>
      </div>
      
    </div>
    <div class="content">
      <ul>
        <li @click="toMyStar">
          <img src="/static/images/my/like.png">
          <span>我收藏的</span>
        </li>
        <li @click="toMyPublish">
          <img src="/static/images/my/publish.png">
          <span>我发布的</span>
        </li>
        <li @click="toSoldOut">
          <img src="/static/images/my/Recieve.png">
          <span>我卖出的</span>
        </li>
        <li @click="toBought">
          <img src="/static/images/my/Send.png">
          <span>我买到的</span>
        </li>
        <li @click="toAddress">
          <img src="/static/images/my/address.png">
          <span>地址管理</span>
        </li>
      </ul>
    </div>
    <div class="help-feedback" @click="toHelp">
      <img src="/static/images/my/light.png" alt>
      <span>帮助与反馈</span>
    </div>
  </div>
</template>

<script>
import qcloud from "wafer2-client-sdk"
import config from '../../config.js'
import * as Api from '../../utils/request.js'
import { mapMutations, mapGetters  } from 'vuex'
export default {
  components: {},

  data() {
    return {
      isLogin: false,
      userInfo: {}
    };
  },
  methods: {
    doLogin() {
      console.log('config.loginUrl', config.loginUrl)
      qcloud.setLoginUrl(config.loginUrl)
      const _this = this
      qcloud.login({
        success: function (userinfo) {
          wx.setStorageSync('userinfo', userinfo)
          // _this.isLogin = true
          _this.$store.dispatch('setIsLogin', true)
          _this.$store.dispatch('setOpenId', userinfo.openId)
          _this.userInfo = userinfo
          console.log('LoginSuccess', userinfo)
          wx.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    },
    toMyStar() {
      const url = "../mystar/main";
      wx.navigateTo({ url });
    },
    toMyPublish() {
      const url = "../mypublish/main";
      wx.navigateTo({ url });
    },
    toHelp() {
      const url = "../help/main";
      wx.navigateTo({ url });
    },
    toSoldOut() {
      const url = "../soldout/main";
      wx.navigateTo({ url });
    },
    toBought() {
      const url = "../bought/main";
      wx.navigateTo({ url });
    },
    toAddress() {
      const url = "../address/main"
      wx.navigateTo({ url })
    },
    toAllOrder() {
      const url = "../myorder/main"
      wx.navigateTo({ url })
    }
  },
  computed: {
    ...mapGetters(['getIsLogin'])
  },
  created() {
    this.userInfo = wx.getStorageSync('userinfo')
    console.log('me-userinfo', this.userInfo)
    // 判断用户是否的相关缓存
    if (wx.getStorageSync('userinfo')) {
      // 发生过授权
      this.isLogin = false

      // wx.switchTab({
      //   url: '/pages/me/main'
      // })
    } else {
       this.$store.dispatch('setIsLogin', false)
    }
  },
  mounted() {
    console.log('mounted')
    this.userInfo = wx.getStorageSync('userinfo')
  },
};
</script>

<style lang="less" scope>
.main {
  position: fixed;
  // height: 100%;
  background: #eee;
  margin: 0;
  .userinfo {
    height: 220rpx;
    width: 100%;
    background-color: #ffd95f;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .user-avatar {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      // background: #000;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-nickname {
      // background: rgb(126, 113, 113);
    }
    .user-qita {
      min-width: 240rpx;
      height: 100%;
      
      margin-top: 50px;
      // background-color: aqua;
      button {
        background: brown;
        color: #fff;
      }
    }
  }
  .allorder {
    width: 750rpx;
    background: #fff;
    margin-top: 15px;
    height: 160rpx;
    .order {
      float: left;
      width: 60px;
      height: 80px;
      padding-left: 50px;
      margin-top: 5px;
      font-size: 14px;
      color: #9c9c9c;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .content {
    width: 750rpx;
    background: #fff;
    margin-top: 15px;
    height: 500rpx;
    ul {
      li {
        /* line-height: 100rpx; */
        list-style: none;
        border-bottom: 1px solid #eee;
        height: 100rpx;
        position: relative;
        img {
          width: 30px;
          height: 30px;
          margin: 10px;
        }
        span {
          position: absolute;
          top: 13px;
          font-size: 16px;
          color: #9c9c9c;
        }
      }
    }
  }
  .help-feedback {
    width: 750rpx;
    background: #fff;
    margin-top: 15px;
    height: 100px;
    border-bottom: 1px solid #eee;
    position: relative;
    img {
      /* display: inline; */
      width: 30px;
      height: 30px;
      margin: 10px;
    }
    span {
      position: absolute;
      top: 13px;
      font-size: 16px;
      color: #9c9c9c;
    }
  }
}
</style>
