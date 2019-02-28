<template>
  <div class="main">
    <div class="userinfo">
      <!-- <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>-->
        <open-data class="userinfo-avatar" type="userAvatarUrl"></open-data>
      <open-data class="userinfo-nickname" type="userNickName" lang="zh_CN"></open-data>
    </div>
    <!-- <div class="allorder">

      <div class="order"><img src="/static/images/my/allorder.png" /><span>全部订单</span></div>
      <div class="order"><img src="/static/images/my/nopay1.png" /><span>未支付</span></div>
      <div class="order"><img src="/static/images/my/nosend.png" /><span>未发货</span></div>
      <div class="order"><img src="/static/images/my/noget.png" /><span>未收货</span></div>
      <div class="order"><img src="/static/images/my/nocomment.png" /><span>未评论</span></div>

    </div> -->
    <div class="content">
      <ul>
        <li @click="toMyStar"><img src="/static/images/my/like.png" /> <span>我收藏的</span></li>
        <li @click="toMyPublish"><img src="/static/images/my/publish.png" /><span>我发布的</span></li>
        <li @click="toSoldOut"><img src="/static/images/my/Recieve.png" /><span>我卖出的</span></li>
        <li @click="toBought"><img src="/static/images/my/Send.png" /><span>我买到的</span></li>
        <li @click="toMyLove"><img src="/static/images/my/like1.png" /><span>我赞过的</span></li>
      </ul>
    </div>
    <div class="help-feedback" @click="toHelp">
      <img src="/static/images/my/light.png" alt=""><span>帮助与反馈</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },

  data () {
    return {

    }
  },
  methods: {
    toMyStar() {
      const url = "../mystar/main"
      wx.navigateTo({ url })
    },
    toMyPublish() {
      const url = "../mypublish/main"
      wx.navigateTo({ url })
    },
    toHelp() {
      const url = "../help/main"
      wx.navigateTo({ url })
    },
    toSoldOut() {
      const url = "../soldout/main"
      wx.navigateTo({ url })
    },
    toBought() {
      const url = "../bought/main"
      wx.navigateTo({ url })
    },
    toMyLove() {
      const url = "../mylove/main"
      wx.navigateTo({ url })
    }
  },
  created () {

  }
}
</script>

<style>
.main {
  position: fixed;
  height: 100%;
  background: #eee;
  margin: 0;
}
  .userinfo {
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffd95f;
  height: 260rpx;
}

.userinfo-avatar {
  width: 150rpx;
  height: 150rpx;
  margin: 20rpx;
  /* border-radius: 50%; */
}

.userinfo-nickname {
  color: #000;
}
.allorder {
  width: 750rpx;
  background: #fff;
  margin-top: 15px;
  height: 160rpx;
}
.allorder .order {
  float: left;
  width: 60px;
  height: 80px;
  padding-left: 14px;
  margin-top: 5px;
  font-size: 14px;
  color: #9c9c9c;
}
.allorder .order img {
  width: 50px;
  height: 50px;
}
.content {
  width: 750rpx;
  background: #fff;
  margin-top: 15px;
  height: 500rpx;
}
.content ul{
}
.content ul li {
  /* line-height: 100rpx; */
  list-style: none;
  border-bottom: 1px solid #eee;
  height: 100rpx;
  position: relative;
}
.content ul li img {
  width: 30px;
  height: 30px;
  margin: 10px;

}
.content ul li span {
  position: absolute;
  top: 13px;
  font-size: 16px;
  color: #9c9c9c;
}
.help-feedback {
  width: 750rpx;
  background: #fff;
  margin-top: 15px;
  height: 100px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.help-feedback img {
  /* display: inline; */
  width: 30px;
  height: 30px;
  margin: 10px;
}
.help-feedback span {
  position: absolute;
  top: 13px;
  font-size: 16px;
  color: #9c9c9c;
}
</style>
