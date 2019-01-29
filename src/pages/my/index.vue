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
    <div class="allorder">

    </div>
    <div class="content">
      <ul>
        <li>我收藏的</li>
        <li>我发布的</li>
        <li>我卖出的</li>
        <li>我买到的</li>
        <li>我赞过的</li>
      </ul>
    </div>
    <div class="help-feedback"></div>
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
.content {
  width: 750rpx;
  background: #fff;
  margin-top: 15px;
  height: 500rpx;
}
.content ul{
}
.content ul li {
  line-height: 100rpx;
  list-style: none;
  border-bottom: 1px solid #eee;
  height: 100rpx;
}
.help-feedback {
  width: 750rpx;
  background: #fff;
  margin-top: 15px;
  height: 100px;
  border-bottom: 1px solid #eee
}
</style>
