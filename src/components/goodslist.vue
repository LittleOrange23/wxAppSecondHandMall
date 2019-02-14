<!-- 商品列表组件 -->
<template>
  <div class="goods">
    <div class="goods-list">
      <div class="goods-info" @click="toGoodsInfo">
        <div class="goods-top">
          <div class="lt">
            <img src="/static/images/index/me-selected.png">
          </div>
          <div class="ct">
            <div class="nickname">神装小丸子</div>
            <div class="time">2019-1-28</div>
          </div>
          <div class="rt">￥50</div>
        </div>
        <div class="goods-bottom">
          <img src="/static/images/home/life.png">
          <p>这个一个描述</p>
        </div>
      </div>
      <div class="publish-info">
        <div class="publish-info-left">
          <span class="icon iconfont icon-location">合肥</span>
        </div>
        <div class="publish-info-right">
          <span class="icon iconfont icon-hand-like" @click="addLike">
            <span>{{ like }}</span>
          </span>
          <span class="icon iconfont icon-cc-message">
            <span>{{ comment }}</span>
          </span>
          <span class="icon iconfont icon-eye">
            <span>{{ eye }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      like: 0,
      comment: 0,
      eye: 0,
    };
  },

  components: {

  },

  computed: {},

  methods: {
    toGoodsInfo() {
      const url = "../goodsinfo/main"
      wx.navigateTo({ url })
    },
    addLike() {
      this.like = this.like + 1
    }
  }
}

</script>
<style lang='less' scoped>
.goods {

  .goods-list {
    margin: 10px;
    .goods-info {
      padding: 10px;
      border-radius: 10px;
      background: #eee;
      .goods-top {
        .lt {
          float: left;
          img {
            width: 50px;
            height: 50px;
          }
        }
        .ct {
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
        .rt {
          float: right;
          color: #ff6a6a;
        }
      }
      .goods-bottom {
        border-bottom: 1px solid #eee;
      }
    }
    .publish-info {
      height: 50rpx;
      padding-top: 10px;
      color: #9c9c9c;
      .publish-info-left {
        float: left;
      }
      .publish-info-right {
        float: right;
        span {
          padding-left: 5px;
        }
      }
    }
  }
}
</style>
