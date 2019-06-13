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
          <div v-if="isStar==0" class="star" @click="addToStar(1)">
            <img src="/static/images/goodsinfo/star.png" alt>
            <p>收藏</p>
          </div>
          <div v-if="isStar!=0" class="star" @click="addToStar(0)">
            <img src="/static/images/goodsinfo/pre-star.png" alt>
            <p>已收藏</p>
          </div>
        </div>
      </div>
      <div class="goods-content">
        <div class="price">￥{{goods.price}}</div>
        <div class="goods-pic">
          <img :src="picture.imgurl">
        </div>
        <div class="goods-describe">
          <p class="g-des">{{goods.describe}}</p>
          <p class="g-rem">备注:{{goods.remark}}</p>
        </div>
      </div>
      <div class="comments">
        <h3>发表留言</h3>
        <hr>
        <van-cell-group>
          <van-field
            type="textarea"
            placeholder="请输入要留言的内容（最多吐槽120字）"
            maxlength="120"
            autosize="true"
            @change="onChange"
            input-class="commentArea"
          />
        </van-cell-group>

        <van-button type="default" @click="addCooments" custom-class="comment-btn">发表评论</van-button>
        <comment
          v-for="commentItem in allComments"
          :key="commentItem.commentsid"
          :allComments="commentItem"
        ></comment>

        <!-- <button type="default" size="default" plain="true" disabled="false" bindtap="default">加载更多</button> -->
      </div>
    </div>

    <div class="bottom">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服"/>
        <van-goods-action-icon icon="cart-o" text="购物车" @click="toShopCar"/>
        <van-goods-action-button text="加入购物车" type="warning" @click="addToShopCar"/>
        <van-goods-action-button text="立即购买" @click="toCreateOrder"/>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import comment from "@/components/comment";
import * as Util from "../../utils/index.js";
import * as Api from "../../utils/request.js";
export default {
  components: {
    comment
  },

  data() {
    return {
      goodsId: "",
      goods: {},
      userInfo: {},
      picture: [],
      allComments: [],
      commentUser: {},
      comment: "",
      time: "",
      isStar: 0,
      openId: ""
    };
  },
  mounted() {
    this.goodsId = this.$root.$mp.query.goodsId;
    this.getGoodsInfoById();
    this.getCommentsByGoodsId();
  },
  methods: {
    toShopCar() {
      console.log('点击购物车');
      wx.switchTab({url: '../shopcar/main'})
    },
    async getGoodsInfoById() {
      this.openId = wx.getStorageSync("userinfo").openId;
      console.log("xxx", this.goodsId);
      console.log("身份证", this.openId);
      // return false
      const res = await Api.getRequest("/weapp/goodsinfo", {
        goodsId: this.goodsId,
        openId: this.openId
      });
      this.goods = res.data.list[0];
      this.isStar = res.data.isStar;
      this.userInfo = res.data.list[0].user_info;
      this.picture = res.data.list[0].picture[0];
      console.log("res商品详情", res);
      console.log("goods", this.goods);
    },
    async getCommentsByGoodsId() {
      wx.showNavigationBarLoading();
      console.log("评论", this.goodsId);
      const comment = await Api.getRequest("/weapp/selectcomments", {
        goodsId: this.goodsId
      });
      this.allComments = comment.data.list;
      console.log(this.allComments);
      // this.commentUser = comment.data.list.user_info
      // this.picture = res.data.list[0].picture[0]
      // console.log("comment", this.commentUser);
      // console.log('goods', this.goods);
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    },
    async addCooments() {
      const openId = wx.getStorageSync("userinfo").openId;
      this.time = Util.formatTime(new Date());
      // console.log(openId);
      // console.log("comment", this.comment);
      if (this.comment == "") {
        wx.showToast({
          title: "留言内容不能为空",
          duration: 2000
        });
      } else {
        // console.log(openId, this.comment, this.goodsId);
        const res = await Api.postRequest("/weapp/addcomments", {
          openId: openId,
          goodsId: this.goodsId,
          comment: this.comment,
          time: this.time
        });
        if (res.code == 0) {
          wx.showToast({
            title: "添加成功",
            icon: "success",
            duration: 2000
          });
          const res = await Api.getRequest("/weapp/selectcomments", {
            goodsId: this.goodsId
          });
          this.allComments = res.data.list;
          console.log(this.allComments);
        }
      }
    },
    onChange(event) {
      console.log(event.mp.detail);
      this.comment = event.mp.detail;
    },
    onPullDownRefresh() {
      this.getCommentsByGoodsId();
    },
    async addToShopCar() {
      console.log("加入购物车");
      var openId = wx.getStorageSync("userinfo").openId;
      const res = await Api.postRequest("/weapp/addshopcar", {
        openId: openId,
        goodsId: this.goodsId,
        price: this.goods.price,
        num: 1
      });
      console.log("hhhh", res);
      if (res.code == 0) {
        wx.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2000
        });
      }
    },
    async addToStar(flag) {
      const res = await Api.postRequest("/weapp/addstar", {
        isStar: flag,
        openId: wx.getStorageSync("userinfo").openId,
        goodsId: this.goodsId
      });
      this.isStar = flag;
      // if (res.code.message == "SUCCESS") {
      //   this.book.isCollect = iscollect;
      // } else {
      //   wx.showToast({
      //     title: "失败"
      //   });
      // }
    },
    toCreateOrder() {
      wx.navigateTo({url: '../order/main'})
    }
  }
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
          border-radius: 50%;
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
          text-align: center;
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
      .goods-pic {
        img {
          min-width: 350px;
          max-width: 400px;
          margin-top: 20px;
        }
      }
      .goods-describe {
        .g-des {
          border-bottom: 1px solid #dfdfdf;
          // font-size: 12px;
          padding: 10px 0;
        }
        .g-rem {
          border-bottom: 1px solid #dfdfdf;
          padding: 10px 0;
          color: brown
        }
      }
      .price {
        color: #ff6a6a;
      }
    }
    .comments {
      h3 {
        font-size: 18px;
      }
      textarea {
        font-size: 14px;
        margin: 0;
        height: 90px !important;
      }
      .commentArea {
        height: 90px !important;
      }
      .comment-btn {
        margin: 10px;
        width: 700rpx;
        text-align: center;
        background: #ffd95f !important;
        color: #fff !important;
        border-radius: 10px;
      }
    }
  }
  .bottom {
    height: 55px;
  }
}
</style>
