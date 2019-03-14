<template>
  <div>
    <van-tabs swipeable animated>
      <van-tab title="图书文学">
        <div>
          <goodsort></goodsort>
          <goodslist :location="location"></goodslist>
        </div>
      </van-tab>
      <van-tab title="数码电子">
        <div>
          <goodsort></goodsort>
          <goodslist :location="location"></goodslist>
        </div>
      </van-tab>
      <van-tab title="生活用品">
        <div>
          <goodsort></goodsort>
          <goodslist :location="location"></goodslist>
        </div>
      </van-tab>
      <van-tab title="其他更多">
        <div>
          <goodsort></goodsort>
          <goodslist :location="location"></goodslist>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import goodslist from '@/components/goodslist'
import goodsort from "@/components/goodsort"

export default {
  components: {
    goodslist,
    goodsort
  },

  data() {
    return {
      location: null
    }
  },
  methods: {
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
  },
  created() {
    this.getGeo()
  }
}
</script>

<style>
</style>
