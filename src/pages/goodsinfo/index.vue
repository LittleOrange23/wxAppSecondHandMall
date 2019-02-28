<template>
  <div class="goodsinfo">
    <div class="goods-main">
      <div class="goods-publisher">
        <div class="avatar">
          <img src="/static/images/index/me-selected.png">
        </div>
        <div class="publisher">
          <div class="nickname">神装小丸子</div>
          <div class="time">2019-1-28</div>
        </div>
        <div class="rt">
          
          <div class="star">
            <img src="/static/images/goodsinfo/star.png" alt="">
            <p>收藏</p>
          </div>
        </div>
      </div>
      <div class="goods-content">
        <div class="price">￥50</div>
        <div class="goods-pic">
          <img src="/static/images/home/life.png">
        </div>
        <div class="goods-describe">
          <p>
            内容丰富，讲解很透彻
            基于微信小程序轻快的特点，我们拟定了小程序界面设计指南和建议。 设计指南建立在充分尊重用户知情权与操作权的基础之上。旨在微信生态体系内，建立友好、高效、一致的用户体验，同时最大程度适应和支持不同需求，实现用户与小程序服务方的共赢。
            友好礼貌
            为了避免用户在微信中使用小程序服务时，注意力被周围复杂环境干扰，小程序在设计时应该注意减少无关的设计元素对用户目标的干扰，礼貌地向用户展示程序提供的服务，友好地引导用户进行操作。
            重点突出
            每个页面都应有明确的重点，以便于用户每进入一个新页面的时候都能快速地理解页面内容。在确定了重点的前提下，应尽量避免页面上出现其它与用户的决策和操作无关的干扰因素。
            案例示意1
          </p>
        </div>
      </div>
      <div class="comments">
        <comment></comment>
      </div>
    </div>

    <div class="bottom">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服"/>
        <van-goods-action-icon icon="cart-o" text="购物车" info="5" @click="toShopCar"/>
        <van-goods-action-button text="加入购物车" type="warning"/>
        <van-goods-action-button text="立即购买"/>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import comment from "@/components/comment";
export default {
  components: {
    comment
  },

  data() {
    return {};
  },

  created() {},
  methods: {
    toShopCar() {
      const url = '../shopcar/main'
      wx.navigateTo({ url })
    }
  },
};
</script>

<style lang="less" scope>
.goodsinfo {
  // height: 100%;
  // background: #eee;
  // margin: 0;
  .goods-main {
    // height: 80%;
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
      .rt {
        float: right;
        color: #ff6a6a;
        .star {
          font-size: 14px;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .goods-content {
      padding: 10px;
      .price {
        color: #ff6a6a;
      }
    }
  }
  .bottom {
    height: 55px;
  }
}
</style>
