<template>
  <view class="goodcard-wrap">
    <van-card
      :price="goodprice"
      :desc="cart.describe"
      :title="cart.title"
      :thumb="goodsimage"
      :num="cart.num"
    >
      <view slot="footer"></view>
    </van-card>
    <wux-dialog id="wux-dialog"/>
  </view>
</template>

<script>
import { getRequest, postRequest } from '@/utils/request.js'
import { $wuxDialog } from '../../static/wux/index.js'
export default {
  data () {
    return {
    }
  },
  props: ['cart'],
  computed: {
    goodprice () {
      return this.cart.price.toFixed(2)
    },
    goodsimage() {
      return this.cart.picture[0].imgurl 
    }
  },
  methods: {
    onClickButton () {
      console.log('点击按钮')
    },
    onClickLink () {
      console.log('修改地址')
    },
    onChange (e) {
      // 当要改变数量的时候就发送请求---->成功后 的到反馈在改变？
      if (e.mp.detail.value === 0) {
        // 提示是否删除该商品
        $wuxDialog().confirm({
          resetOnClose: true,
          closable: true,
          title: '删除该商品',
          content: '减少将删除该商品',
          onConfirm: (e) => {
            postRequest('/cart/update', {
              goodnum: 0,
              goodprice: this.cart.goodprice,
              cart_id: this.cart.cart_id
            }).then(res => {
              this.$parent.getCartlist()
            })
          },
          onCancel: (e) => {
            return false
          }
        })
      } else {
        this.cart.goodnum = e.mp.detail.value
        this.$parent.compentedCountPrice()
        postRequest('/cart/update', {
          goodnum: e.mp.detail.value,
          goodprice: this.cart.goodprice,
          cart_id: this.cart.cart_id
        }).then(res => {
        })
      }
    }
  }
}
</script>
<style lang="less" >
.van-submit-bar {
  bottom: 0px;
}
.edit-address {
  color: #1989fa;
}
.van-tag {
  margin-left: 15px;
}
.goodcard-wrap {
  .slot-tags {
    display: flex;
    justify-content: flex-end;
    .numberinput {
      width: 230rpx;
    }
  }
}
</style>

