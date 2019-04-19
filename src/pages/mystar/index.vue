<template>
  <div>
    <div>
      <ul>
        <li v-for="goodsItem in goods" :key="goodsItem.starid">
          <van-card
            :price="goodsItem.price"
            :desc="goodsItem.describe"
            :title="goodsItem.title"
            :thumb="goodsItem.picture[0].imgurl"
          >
            <view slot="footer">
              <span @click="deleteStar(goodsItem)">删除</span>
            </view>
          </van-card>
        </li>
      </ul>
    </div>
    <!-- <goods></goods> -->
  </div>
</template>

<script>
import * as Api from "../../utils/request.js";
export default {
  components: {
   
  },

  data () {
    return {
     goods: []
    }
  },
  mounted() {
    this.getStarByOpenId()
  },
  methods: {
    async getStarByOpenId() {
      const openId = wx.getStorageSync("userinfo").openId;
      console.log('身份证',openId);
      const res = await Api.getRequest('/weapp/selectstar',{
        openId: openId
      })
      console.log('ghfhgf',res.data.list);
      this.goods = res.data.list
    },
    async deleteStar(goodsItem) {
      const res = await Api.getRequest('/weapp/deletestar',{
        openId: wx.getStorageSync("userinfo").openId,
        starId: goodsItem.starid
      })
      this.getStarByOpenId()
    }
  },
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
