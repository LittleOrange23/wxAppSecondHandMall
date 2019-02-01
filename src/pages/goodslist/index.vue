<template>
  <div>
    <van-tabs swipeable animated>
      <van-tab title="图书文学">
        <div>
          <goodsort></goodsort>
          <goodslist></goodslist>
        </div>
      </van-tab>
      <van-tab title="数码电子">
        <div>
          <goodsort></goodsort>
          <goodslist></goodslist>
        </div>
      </van-tab>
      <van-tab title="生活用品">
        <div>
          <goodsort></goodsort>
          <goodslist></goodslist>
        </div>
      </van-tab>
      <van-tab title="其他更多">
        <div>
          <goodsort></goodsort>
          <goodslist></goodslist>
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

    }
  },

  created() {

  }
}
</script>

<style>
</style>
