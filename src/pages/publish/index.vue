<template>
  <div class="content">
    <!-- <form method="get" class="publish-form">
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
    </form>-->
    <form submit="formSubmit">
      <wux-cell-group title="描述 >">
        <wux-cell hover-class="none">
          <wux-input placeholder="标题"/>
        </wux-cell>
        <wux-cell>
          <textarea name id cols="30" rows="10" placeholder="请描述下您要做的事……" required></textarea>
        </wux-cell>
      </wux-cell-group>
      <wux-cell>
        <wux-upload listType="picture-card" max="4" url="https://www.skyvow.cn/api/common/file">
          <text>上传照片</text>
        </wux-upload>
      </wux-cell>

      <wux-cell-group title="标价 >">
        <wux-cell hover-class="none">
          <wux-input type="number" label="开个价" defaultValue="1024" extra="￥"/>
        </wux-cell>
        <wux-cell hover-class="none">
          <wux-input type="number" label="原价" defaultValue="1024" extra="￥"/>
        </wux-cell>
      </wux-cell-group>
      <wux-cell>
        <view class="section goods-kind">
          <span>物品分类:</span>
          <picker class="goods-kind-info" @change="bindPickerChange" :value="index" :range="kind">
            <view class="picker">{{kind[index]}}</view>
          </picker>
        </view>
      </wux-cell>

      <wux-cell-group title="联系方式">
        <wux-cell hover-class="none">
          <wux-input clear label="联系人" placeholder="请输入联系人(选填)"/>
        </wux-cell>
        <wux-cell hover-class="none">
          <wux-input clear label="联系电话" placeholder="请输入联系电话(选填)" type="number"/>
        </wux-cell>
      </wux-cell-group>
      <wux-cell>
        <textarea class="remark" cols="30" rows="5" placeholder="请输入备注(选填)……" required></textarea>
      </wux-cell>

      <wux-cell class="rule" title="我已阅读《物品发布规则》">
        <wux-selectable slot="header" wux-class="checkbox" value="1"/>
      </wux-cell>
      <wux-button block outline type="energized">发布</wux-button>
    </form>
  </div>
</template>

<script>

export default {
  components: {

  },

  data() {
    return {
      kind: ['请选择分类 >', '图书文学', '数码电子', '生活用品', '其他'],
      index: 0,
      title1: '',
      value1: '',
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

<style lang="less" scope>
.content {
  width: 700rpx;
  padding: 0 20rpx;
  textarea {
    background: #fff;
    font-style: 14px;
  }
  .goods-kind {
    width: 700rpx;
    position: relative;
    height: 50px;
    margin-top: 10px;
    text-align: center;
    color: #9c9c9c;
    span {
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
  }
  .rule {
    color: #9c9c9c;
    font-size: 14px;
    padding-bottom: 10px;
  }
}
</style>
