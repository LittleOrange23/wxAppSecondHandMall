<!--  -->
<template>
  <div class="main">
    <!-- 搜索框 -->
    <div class="search">
      <div>
        <span class="icon iconfont icon-location curlocation">{{locationNow}}</span>
      </div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
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
            <image :src="item.imgUrl" class="slide-image" width="355" height="150"/>
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
      imgUrls: [],
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
  onShow() {
    this.getAds();
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
              // console.log(res.data.result);
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
    },
    async getAds() {
      const res = await Api.getRequest("/weapp/selectads");
      console.log("图片", res);
      if (res.code == 0) {
        this.imgUrls = res.data.list;
        console.log("this.imgUrls", this.imgUrls);
      }
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
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
  // .top {
  //   .curlocation {
  //     float: left;
  //     line-height: 85rpx;
  //     width: 150rpx;
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     white-space: nowrap;
  //   }
  //   .search {
  //     float: right;
  //     width: 600rpx;
  //   }
  // }
  .search {
    width: 100%;
    box-sizing: border-box;
    padding: 0 25rpx 0 10rpx;
    position: fixed;
    top: 0;
    z-index: 99;
    height: 80rpx;
    display: flex;
    align-items: center;
    background: #fff;

    div:nth-child(1) {
      width: 115rpx;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 20rpx;
      padding-right: 15rpx;
    }

    div:nth-child(2) {
      flex: 1;
      position: relative;

      input {
        width: 100%;
        height: 56rpx;
        border-radius: 8rpx;
        background: #ededed;
        box-sizing: border-box;
        padding-left: 40rpx;
      }

      .icon {
        position: absolute;
        top: 15rpx;
        left: 10rpx;
        background: url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png")
          center no-repeat;
        background-size: 100%;
        width: 28rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
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
