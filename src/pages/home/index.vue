<!--  -->
<template>
  <div class="main">
    <!-- 搜索框 -->
    <div class="top">
      <span class="icon iconfont icon-location curlocation">
        <span class="address">{{locationNow}}</span>
      </span>
      <van-search class="search" placeholder="请输入搜索关键词"/>
    </div>

    <scroll-view scroll-y style="height: 93%;" scroll-top="100" class="content">
      <!-- 滚动图片 -->
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        class="swiper-content"
      >
        <block v-for="item in imgUrls" :key="item">
          <swiper-item>
            <image :src="item.url" class="slide-image" width="355" height="150"/>
          </swiper-item>
        </block>
      </swiper>

      <!-- 导航 -->
      <div class="nav">
        <ul>
          <li @click="toGoodList('图书文学')">
            <img src="/static/images/home/book.png"/>
            <div class="list-title">图书文学</div>
          </li>
          <li @click="toGoodList('数码电子')">
            <img src="/static/images/home/digital2.png"/>
            <div class="list-title">数码电子</div>
          </li>
          <li @click="toGoodList('生活用品')">
            <img src="/static/images/home/life.png"/>
            <div class="list-title">生活用品</div>
          </li>
          <li @click="toGoodList('其他更多')">
            <img src="/static/images/home/other.png"/>
            <div class="list-title">其他更多</div>
          </li>
        </ul>
      </div>
      <div class="goods">
        <div class="goods-sort">
          <ul>
            <li @click="getList">默认排序</li>
            <li @click="toLowPrice">价格最低</li>
            <li @click="toHotSee">人气最高</li>
          </ul>
        </div>
        <goodslist
          :locationPublish="goodsitem.location"
          v-for="goodsitem in goods"
          :key="goodsitem.openid"
          :goods="goodsitem"
          @click="toGoodsInfo"
        ></goodslist>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import * as Api from "../../utils/request.js";
import goodslist from "@/components/goodslist";
// import goodsort from "@/components/goodsort";
export default {
  data() {
    return {
      msg: "这是一个用户组件",
      value: "search",
      imgUrls: [
        { url: "/static/images/home/swiper1.jpg" },
        { url: "/static/images/home/swiper2.jpg" },
        { url: "/static/images/home/swiper3.jpg" }
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      active: 0,
      locationNow: null,
      goods: [],
      page: 0,
      userInfo: []
    };
  },
  components: {
    goodslist
    // goodsort
  },
  created() {
    this.getGeo();
    this.getList();
  },
  methods: {
    toGoodList(kind) {
      const url = "../goodslist/main?kindId=" + kind;
      wx.navigateTo({ url });
      console.log(kind);
    },
    async getList(init) {
      wx.showNavigationBarLoading();

      const result = await Api.getRequest("/weapp/selectgoods");
      // console.log("远程接口 is running", result);
      if (result.code == 0) {
        this.goods = result.data.list;
        console.log("this.goods", this.goods);
      }

      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    },
    getGeo() {
      wx.getLocation({
        type: "wgs84",
        success: geo => {
          wx.request({
            url: `http://api.map.baidu.com/geocoder/v2/?location=${
              geo.latitude
            },${
              geo.longitude
            }&output=json&pois=1&ak=UoZlCMqkPaaxVeIVA30e35dVTmyGB26j`,
            success: res => {
              console.log(res.data.result);
              if (res.data.status === 0) {
                this.locationNow = res.data.result.formatted_address;
              } else {
                this.locationNow = "未知地点";
              }
            }
          });
        }
      });
    },
    async toLowPrice() {
      wx.showNavigationBarLoading();

      const result = await Api.getRequest("/weapp/lowprice");
      // console.log("远程接口 is running", result);
      if (result.code == 0) {
        this.goods = result.data.list;
        // console.log("this.goods", this.goods);
      }

      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    },
    async toHotSee() {
      wx.showNavigationBarLoading();

      const result = await Api.getRequest("/weapp/hotsee");
      // console.log("远程接口 is running", result);
      if (result.code == 0) {
        this.goods = result.data.list;
        // console.log("this.goods", this.goods);
      }

      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    }
  },
  onPullDownRefresh() {
    this.getList();
  }
};
</script>
<style lang='less' scoped>
.main {
  position: fixed;
  height: 100%;
  background: #eee;
  margin: 0;
  .top {
    .curlocation {
      float: left;
      line-height: 85rpx;
      width: 150rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .search {
      float: right;
      width: 600rpx;
    }
  }
  .content {
    .swiper-content {
      height: 370rpx;
      .slide-image {
        width: 100%;
        height: 100%;
      }
    }
    .nav {
      width: 100%;
      height: 170rpx;
      padding: 0 10px 10px 10px;
      background: #fff;
      ul {
        text-align: center;
        li {
          list-style: none;
          float: left;
          width: 178rpx;
          height: 170rpx;
          img {
            width: 100rpx;
            height: 100rpx;
          }
          .list-title {
            font-size: 14px;
          }
        }
      }
    }
    .goods {
      background: #fff;
      width: 100%;
      .goods-sort {
        width: 100%;
        height: 50rpx;
        margin-top: 10px;
        padding: 10px;
        border-bottom: 1px solid #eee;
        ul {
          li {
            width: 230rpx;
            height: 50rpx;
            float: left;
            list-style: none;
            text-align: center;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
