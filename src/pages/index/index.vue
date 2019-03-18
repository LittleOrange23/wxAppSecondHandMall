<template>
  <div class="container">
    <div>
      <div class="userinfo" v-if="userInfo.nickName">
        <img class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover">
        <p>{{ userInfo.nickName }}</p>
      </div>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
    </div>
    <button @click="toHome" class="home">去往首页</button>
  </div>
</template>

<script>
import card from "@/components/card";
import { get } from "../../utils";
import qcloud from "wafer2-client-sdk";
import config from "../../config";
export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
    };
  },
  components: {
    card
  },
  created() {},
  methods: {
    toHome() {
      const url = "../home/main";
      wx.switchTab({ url });
    },
    clickHandle(msg, ev) {
      // console.log('clickHandle:', msg, ev)
    },
    // authSetUser(e) {
    //   this.userInfo = e.mp.detail.userInfo;
    // },
    doLogin() {
      const session = qcloud.Session.get();
      // const user = wx.getStorageSync('userinfo')
      // 设置登录地址
      
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          loginUrl: config.loginUrl,
          success: res => {
            this.userInfo = res;
            wx.showToast({
              title: "二次登录成功",
              icon: "success",
              duration: 2000
            });
            // util.showSuccess("登录成功");
          },
          fail: err => {
            console.error(err);
            wx.showModal({
              title: "提示",
              content: "二次登陆错误",
              success(err) {
                if (err.confirm) {
                  console.log("用户点击确定");
                } else if (err.cancel) {
                  console.log("用户点击取消");
                }
              }
            });
            // util.showModel("登录错误", err.message);
          }
        });
      } else {
        qcloud.setLoginUrl(config.loginUrl);
        qcloud.login({
          success: res => {
            this.userInfo = res;
            // wx.setStorageSync('userinfo', res)
            // this.setData({ userInfo: res, logged: true });
            wx.showToast({
              title: "首次登录成功",
              icon: "success",
              duration: 2000
            });
            // util.showSuccess("登录成功");
          },
          fail: err => {
            console.error(err);
            wx.showModal({
              title: "提示",
              content: "首次登陆错误",
              success(err) {
                if (err.confirm) {
                  console.log("用户点击确定");
                } else if (err.cancel) {
                  console.log("用户点击取消");
                }
              }
            });
            // util.showModel("登录错误", err.message);
          }
        });
      }
    }
  }
};
</script>

<style>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 200rpx;
  height: 200rpx;
  margin: 20rpx;
  border-radius: 50%;
  /* border-radius: 50%; */
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
