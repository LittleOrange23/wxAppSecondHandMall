<template>
  <div>
    <div>
      <ul>
        <li v-for="goodsItem in goods" :key="goodsItem.goodsid">
          <van-card :price="goodsItem.price" :desc="goodsItem.describe" :title="goodsItem.title" :thumb="goodsItem.picture[0].imgurl">
            <view slot="footer">
              <span @click="toUnder(goodsItem)">{{goodsItem.isput == 0 ? '已下架' : '下架'}}</span>
            </view>
          </van-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as Api from "../../utils/request.js";
export default {
  components: {
    
  },

  data() {
    return {
      goods: [],
      // isPut: ''
    };
  },

  mounted() {
    this.getMyPublish();
  },
  methods: {
    async getMyPublish() {
      const openId = wx.getStorageSync("userinfo").openId;
      const res = await Api.getRequest('/weapp/mypublish', {
        openId: openId
      })
      this.goods = res.data.list
      console.log('已发布', res);
    },
    // 下架商品
    async toUnder(goodsItem) {
      let that = this
      let openId = wx.getStorageSync("userinfo").openId;
      if (goodsItem.isput == 1) {
        const res = await Api.postRequest('/weapp/undergoods', {
          isPut: 0,
          openId: openId,
          goodsId: goodsItem.goodsid
        })
        if (res.code == 0) {
          this.getMyPublish()
        }
      }
    }
  }
};
</script>

<style>
</style>
