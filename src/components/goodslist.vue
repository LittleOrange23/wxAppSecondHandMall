<!-- 商品列表组件 -->
<template>
  <div class="goods">
    <div class="goods-list">
      <div class="goods-info" @click="toGoodsInfo">
        <div class="goods-top">
          <div class="lt">
            <img :src="goods.user_info.avatarUrl">
          </div>
          <div class="ct">
            <div class="nickname">{{ goods.user_info.nickName }}</div>
            <div class="time">{{goods.publishtime}}</div>
          </div>
          <div class="rt">￥{{goods.price}}</div>
        </div>
        <div class="goods-bottom">
          <!-- <img v-for="(picItem, picIndex) in goods.picture" :key="picIndex" :src="picItem.imgurl"> -->
          <img :src="goodsImage">
          <p>{{goods.describe}}</p>
        </div>
      </div>
      <div class="publish-info">
        <div class="publish-info-left">
          <span class="icon iconfont icon-location">{{ locationPublish }}</span>
        </div>
        <div class="publish-info-right">
          <span @click="toComment" class="icon iconfont icon-cc-message">
            <span>{{ comment }}</span>
          </span>
          <span class="icon iconfont icon-eye">
            <span>{{ goods.eye }}</span>
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
      comment: 0,
      eye: 0,
      avatarUrl: ""
    };
  },
  props: {
    locationPublish: {
      type: String
    },
    goods: {
      type: Object
    }
  },
  computed: {
    goodsImage() {
      return this.goods.picture[0] == undefined
        ? ""
        : this.goods.picture[0].imgurl;
    }
  },
  methods: {
    toGoodsInfo() {
      wx.navigateTo({
        url: '../goodsinfo/main?goodsId=' +this.goods.goodsid})
    },
    toComment() {
      const url = "../goodsinfo/main";
      wx.navigateTo({ url });
    }
  }
};
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
        img {
          width: 400rpx;
          height: 400rpx;
          text-align: center;
        }
      }
    }
    .publish-info {
      height: 50rpx;
      padding-top: 10px;
      color: #9c9c9c;
      .publish-info-left {
        float: left;
        width: 300rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
