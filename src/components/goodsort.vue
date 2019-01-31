<!-- 商品排序组件 -->
<template>
  <div class="goods-sort">
    <ul>
      <li>默认排序</li>
      <li>价格最低</li>
      <li>人气最高</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='less' scoped>
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
</style>
