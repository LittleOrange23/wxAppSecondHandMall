<template>
  <div class="goodsinfo">
    <div class="goods-main">
      <div class="goods-publisher">
        <div class="avatar">
          <img :src="userInfo.avatarUrl">
        </div>
        <div class="publisher">
          <div class="nickname">{{userInfo.nickName}}</div>
          <div class="time">{{goods.publishtime}}</div>
        </div>
        <div class="rt">
          
          <div class="star">
            <img src="/static/images/goodsinfo/star.png" alt="">
            <p>收藏</p>
          </div>
        </div>
      </div>
      <div class="goods-content">
        <div class="price">￥{{goods.price}}</div>
        <div class="goods-pic">
          <img :src="picture.imgurl">
        </div>
        <div class="goods-describe">
          <p>
            {{goods.describe}}
          </p>
          <hr>
          <p>备注:{{goods.remark}}</p>
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
import { getRequest } from '../../utils/request';
export default {
  components: {
    comment
  },

  data() {
    return {
      goodsId: '',
      goods: {},
      userInfo:{},
      picture: []
    };
  },
  mounted () {
    this.goodsId = this.$root.$mp.query.goodsId
    this.getGoodsInfoById()
  },
  methods: {
    toShopCar() {
      const url = '../shopcar/main'
      wx.navigateTo({ url })
    },
    async getGoodsInfoById() {
      console.log('xxx', this.goodsId);
      // return false
      const res = await getRequest('/weapp/goodsinfo', {
        'goodsId': this.goodsId
      })
      this.goods = res.data.list[0]
      this.userInfo = res.data.list[0].user_info
      this.picture = res.data.list[0].picture[0]
      console.log('res', res);
      console.log('goods', this.goods);
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
