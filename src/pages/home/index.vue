<!--  -->
<template>
  <div class="main">
    <!-- 搜索框 -->
    <van-search placeholder="请输入搜索关键词"/>
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
        <goodslist></goodslist>
        <goodslist></goodslist>
        <goodslist></goodslist>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import goodslist from '@/components/goodslist'
import goodsort from "@/components/goodsort"
export default {
  data () {
    return {
      msg: '这是一个用户组件',
      value: 'search',
      imgUrls: [
        { url: '/static/images/home/swiper1.jpg' },
        { url: '/static/images/home/swiper2.jpg' },
        { url: '/static/images/home/swiper3.jpg' }
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      active: 0
    }
  },
  components: {
    goodslist,
    goodsort
  },
  created () {
    // this.getList()

  },
  methods: {
    toGoodList () {
      const url = '../goodslist/main'
      wx.navigateTo({ url })
    },
    getList () {
      wx.request({
        // url: 'static/mock/list.json',
        // method: 'GET',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        // success(res) {
        //   console.log(res)
        // }
      })
    }

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
.swiper-content {
  height: 370rpx;
}
.slide-image {
  width: 100%;
  height: 100%;
}
.nav {
  width: 100%;
  height: 170rpx;
  padding: 0 10px 10px 10px;
  background: #fff;
}
.nav ul {
  text-align: center;
}
.nav ul li {
  list-style: none;
  float: left;
  width: 178rpx;
  height: 170rpx;
}
.nav ul li img {
  width: 100rpx;
  height: 100rpx;
}
.nav ul li .list-title {
  font-size: 14px;
}

.goods {
  background: #fff;
  width: 100%;
}

</style>
