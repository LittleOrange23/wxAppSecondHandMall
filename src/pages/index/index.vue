<template>
  <div class="container">
    <!-- <div class="userinfo">
      <open-data class="userinfo-avatar" type="userAvatarUrl"></open-data>
      <open-data class="userinfo-nickname" type="userNickName" lang="zh_CN"></open-data>
    </div>-->
    <div>
      <div class="userinfo" v-if="userInfo.nickName">
        <img class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover">
        <p>{{ userInfo.nickName }}</p>
      </div>
      <button v-if="!userInfo.nickName" open-type="getUserInfo" @getuserinfo="authSetUser">授权登录</button>
    </div>
    <button @click="toHome" class="home">去往首页</button>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data() {
    return {
      motto: 'Hello World',
      userInfo: {},
    }
  },
  components: {
    card
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    toHome() {
      const url = '../home/main'
      wx.switchTab({ url })
    },
    clickHandle(msg, ev) {
      // console.log('clickHandle:', msg, ev)
    },
    authSetUser(e) {
      this.userInfo = e.mp.detail.userInfo;
    },
    getUserInfo() {
      // 调用登录接口
      var _this = this;
      wx.getUserInfo({//当已授权getUserInfo时
        success(res) {
          console.log(res);
          _this.userInfo = res.userInfo
        },
        fail(err) {
          console.log(err);
        }
      })
    }
  },

created() {
  // 调用应用实例的方法获取全局数据
  this.getUserInfo()
}
}
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
