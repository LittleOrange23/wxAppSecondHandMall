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
          <li>
            <img src="/static/images/home/book.png"/>
            <div class="list-title">图书文学</div>
          </li>
          <li>
            <img src="/static/images/home/digital2.png"/>
            <div class="list-title">数码电子</div>
          </li>
          <li>
            <img src="/static/images/home/life.png"/>
            <div class="list-title">生活用品</div>
          </li>
          <li>
            <img src="/static/images/home/other.png"/>
            <div class="list-title">其他更多</div>
          </li>
        </ul>
      </div>
      <div class="goods">
        <div class="goods-sort">
          <ul>
            <li>默认排序</li>
            <li>价格最低</li>
            <li>人气最高</li>
          </ul>
        </div>
        <div class="goods-list">
          <div class="goods-info">
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
              <img src="/static/images/home/life.png"/>
              <p>这个一个描述</p>
            </div>
          </div>
          <div class="publish-info">
            <div class="publish-info-left">
              <span class="icon iconfont icon-location">合肥</span>
            </div>
            <div class="publish-info-right">
              <span class="icon iconfont icon-hand-like">
                <span>1</span>
              </span>
              <span class="icon iconfont icon-cc-message">
                <span>3</span>
              </span>
              <span class="icon iconfont icon-eye">
                <span>3</span>
              </span>
            </div>
          </div>
        </div>
        <div class="goods-list">
          <div class="goods-info">
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
              <img src="/static/images/home/life.png"/>
              <p>这个一个描述</p>
            </div>
          </div>
          <div class="publish-info">
            <div class="publish-info-left">
              <span class="icon iconfont icon-location">合肥</span>
            </div>
            <div class="publish-info-right">
              <span class="icon iconfont icon-hand-like">
                <span>1</span>
              </span>
              <span class="icon iconfont icon-cc-message">
                <span>3</span>
              </span>
              <span class="icon iconfont icon-eye">
                <span>3</span>
              </span>
            </div>
          </div>
        </div>
        <div class="goods-list">
          <div class="goods-info">
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
              <img src="/static/images/home/life.png"/>
              <p>这个一个描述</p>
            </div>
          </div>
          <div class="publish-info">
            <div class="publish-info-left">
              <span class="icon iconfont icon-location">合肥</span>
            </div>
            <div class="publish-info-right">
              <span class="icon iconfont icon-hand-like">
                <span>1</span>
              </span>
              <span class="icon iconfont icon-cc-message">
                <span>3</span>
              </span>
              <span class="icon iconfont icon-eye">
                <span>3</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
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
      active: 0,
    }  },
  created() {
    // this.getList()

  },
  methods: {
    toNews() {
      const url = "../news/main"
      wx.navigateTo({ url })
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
      })
    },

  },

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
.goods-sort {
  width: 100%;
  height: 50rpx;
  margin-top: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.goods-sort ul li {
  width: 230rpx;
  height: 50rpx;
  float: left;
  list-style: none;
  text-align: center;
  font-size: 16px;
}
.goods-list {
  margin: 10px;
}
.goods-info {
  padding: 10px;
  border-radius: 10px;
  background: #eee;
}
.goods-top .lt {
  float: left;
}
.goods-top .lt img {
  width: 50px;
  height: 50px;
}
.goods-top .ct {
  float: left;
  padding-left: 10px;
  margin-top: 5px;
}
.goods-top .ct .nickname {
  color: #9c9c9c;
  font-size: 16px;
}
.goods-top .ct .time {
  color: #ccc;
  font-size: 14px;
}
.goods-top .rt {
  float: right;
  color: #ff6a6a;
}
.goods-bottom {
  border-bottom: 1px solid #eee;
}
.publish-info {
  height: 50rpx;
  padding-top: 10px;
  color: #9c9c9c;
}
.publish-info-left {
  float: left;
}
.publish-info-right {
  float: right;
}
.publish-info-right span {
  padding-left: 5px;
}
</style>
