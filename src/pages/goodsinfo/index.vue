<template>
  <div class="goodsinfo">
    <div class="goods-publisher">
      <div class="avatar">
        <img src="/static/images/index/me-selected.png">
      </div>
      <div class="publisher">
        <div class="nickname">神装小丸子</div>
        <div class="time">2019-1-28</div>
      </div>
    </div>
    <div class="goods-content">

    </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data() {
    return {
    }
  },

  created() {

  }
}
</script>

<style lang="less" scope>
.goodsinfo {
  // height: 100%;
  // background: #eee;
  // margin: 0;
  .goods-publisher {
    margin: 10px;
    height: 60px;
    border-bottom: 1px solid #eee;
    .avatar {
      float: left;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .publisher {
      float: left;
      padding-left: 10px;
      margin-top: 5px;
      .nickname {
        color: #9c9c9c;
        font-size: 16px;
      }
      .time {
        color: #ccc;
        font-size: 14px;
      }
    }
  }
}
</style>
