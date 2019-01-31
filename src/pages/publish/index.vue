<template>
  <div class="content">
    <scroll-view scroll-y style="height: 93%;" scroll-top="100">
      <form method="get" class="publish-form">
        <input class="goods-title" type="text" placeholder="标题" required>
        <textarea name id cols="30" rows="10" placeholder="请描述下您要做的事……" required></textarea>
        <div class="price">
          <input class="goods-price" type="number" placeholder="开个价" required>
          <span>元</span>
        </div>
        <div class="price">
          <input class="old-price" type="number" placeholder="原价(选填)">
          <span>元</span>
        </div>
        <view class="section goods-kind">
          <span>物品分类:</span>
          <picker class="goods-kind-info" @change="bindPickerChange" :value="index" :range="array">
            <view class="picker">{{array[index]}}</view>
          </picker>
        </view>
        <div class="link">
          <span>联系人:</span>
          <input class="link-name" type="text" placeholder="请输入联系人(选填)">
        </div>
        <div class="link">
          <span>联系电话:</span>
          <input class="link-tel" type="number" placeholder="请输入联系电话(选填)">
        </div>
        <textarea class="remark" cols="30" rows="5" placeholder="请输入备注(选填)……" required></textarea>
        <p class="rule">
          <input type="checkbox">
          <span>我已阅读并同意《物品发布公约》</span>
        </p>
        <button type="primary" size="default" plain="false" disabled="false" bindtap="primary">发布</button>
      </form>
    </scroll-view>
  </div>
</template>

<script>

export default {
  components: {

  },

  data() {
    return {
      array: ['请选择分类 >', '图书文学', '数码电子', '生活用品', '其他'],
      index: 0,
    }
  },
  methods: {
    bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.index = e.mp.detail.value    //与小程序的e.detail.value不同，注意！
    },
  },
  created() {

  }
}
</script>

<style>
.content {
  width: 700rpx;
  padding: 0 20rpx;
}
.publish-form {
  /* width: 700rpx;
  padding: 0 10px; */
}
.goods-title {
  border-bottom: 1px solid #ccc;
  height: 50px;
}
.goods-price {
  width: 600rpx;
  border-bottom: 1px solid #ccc;
  height: 50px;
}
.price {
  position: relative;
}
.price span {
  position: absolute;
  bottom: 0;
  right: 0;
  color: #9c9c9c;
}
.old-price {
  width: 600rpx;
  border-bottom: 1px solid #ccc;
  height: 50px;
}
textarea {
  font-style: 14px;
}
.goods-kind {
  width: 700rpx;
  position: relative;
  height: 50px;
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  color: #9c9c9c;
}
.goods-kind span {
  position: absolute;
  left: 0;
  top: 8px;
  color: #9c9c9c;
}
.goods-kind-info {
  width: 700rpx;
  /* float: right; */
  position: absolute;
  right: 0;
  top: 8px;
  color: #9c9c9c;
}
.link {
  width: 700rpx;
  position: relative;
  height: 50px;
  border-bottom: 1px solid #ccc;
}
.link span {
  position: absolute;
  top: 8px;
  left: 0;
}
.link-name {
  position: absolute;
  width: 450rpx;
  top: 8px;
  right: 0;
}
.link-tel {
  position: absolute;
  width: 450rpx;
  top: 8px;
  right: 0;
}
.remark {
  height: 100px;
}
.rule {
  color: #9c9c9c;
  font-size: 14px;
  padding-bottom: 10px;
}
.rule input {
  zoom: 80%;
}
button {
  width: 700rpx;
  margin: 0 auto;
  /* float: left; */
  margin-bottom: 20px;
  background: #ffd95f !important;
  color: #fff !important;
}
</style>
