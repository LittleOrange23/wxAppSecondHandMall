<!--  -->
<template>
  <div class="main">
    <!-- 搜索框 -->
    <div class="top">
      <span class="icon iconfont icon-location curlocation">
        <span class="address">{{location}}</span>
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
          <li @click="toGoodList">
            <img src="/static/images/home/book.png"/>
            <div class="list-title">图书文学</div>
          </li>
          <li @click="toGoodList">
            <img src="/static/images/home/digital2.png"/>
            <div class="list-title">数码电子</div>
          </li>
          <li @click="toGoodList">
            <img src="/static/images/home/life.png"/>
            <div class="list-title">生活用品</div>
          </li>
          <li @click="toGoodList">
            <img src="/static/images/home/other.png"/>
            <div class="list-title">其他更多</div>
          </li>
        </ul>
      </div>
      <div class="goods">
        <goodsort></goodsort>
        <goodslist :location="location"></goodslist>
        <goodslist :location="location"></goodslist>
        <goodslist :location="location"></goodslist>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import goodslist from "@/components/goodslist";
import goodsort from "@/components/goodsort";
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
      location: null
    };
  },
  components: {
    goodslist,
    goodsort
  },
  created() {
    this.getGeo();
  },
  methods: {
    toGoodList() {
      const url = "../goodslist/main";
      wx.navigateTo({ url });
    },
    getList() {
      wx.request({
        // url: 'static/mock/list.json',
        // method: 'GET',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        // success(res) {
        //   console.log(res)
        // }
      });
    },
    getGeo() {
      wx.getLocation({
        type: "wgs84",
        success: geo => {
          console.log(geo);
          wx.request({
            url: `http://api.map.baidu.com/geocoder/v2/?location=${
              geo.latitude
            },${
              geo.longitude
            }&output=json&pois=1&ak=UoZlCMqkPaaxVeIVA30e35dVTmyGB26j`,
            success: res => {
              console.log(res);
              console.log(res.data.result);
              if (res.data.status === 0) {
                this.location = res.data.result.formatted_address;
              } else {
                this.location = "未知地点";
              }
            }
          });
        }
      });
    }
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
    }
  }
}
</style>
