<template>
  <div>
    <div>
      <ul>
        <li>
          <van-card
            num="2"
            tag="标签"
            price="10.00"
            desc="描述信息"
            title="商品标题"
            thumb="/static/images/home/book.png"
          >
            <view slot="footer">
              <van-button size="mini">+</van-button>
              <van-button size="mini">-</van-button>
              <span>删除</span>
            </view>
          </van-card>
        </li>
        <li>
          <van-card
            num="6"
            price="10.00"
            desc="描述信息"
            title="商品标题"
            thumb="/static/images/home/book.png"
          >
            <view slot="footer">
              <van-button size="mini">+</van-button>
              <van-button size="mini">-</van-button>
              <span>删除</span>
            </view>
          </van-card>
        </li>
      </ul>
    </div>
    <div>
      <van-submit-bar
        price="30.5"
        button-text="提交订单"
        bind:submit="onClickButton"
        tip="true"
      >
        <van-tag type="primary">
          <van-checkbox :value="checked" @change="onChange">全选</van-checkbox>
        </van-tag>
        <view slot="tip">您的收货地址不支持同校送,
          <text>修改地址</text>
        </view>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      imageURL: "/static/images/home/book.png",
      checked: true,
    };
  },
  methods: {
    onChange(event) {
      this.checked = event.mp.detail
      console.log(event.mp.detail)
  }
  },
  created() {}
};
</script>

<style>
</style>
