<template>
  <section class="order-wrap">
    <wux-popup position="bottom" :visible="visible" @close="closePopup">
      <wux-cell-group title="Your fathers">
        <wux-cell hover-class="none" title="Jack Ma"></wux-cell>
        <wux-cell hover-class="none" title="Pony"></wux-cell>
        <wux-cell hover-class="none">
          <wux-button block type="balanced" @tap="closePopup">Yes</wux-button>
        </wux-cell>
      </wux-cell-group>
    </wux-popup>
    <div class="address-box">
      <van-cell
        custom-class="flex-center"
        :title="address.name"
        :value="address.mobile"
        size="large"
        :label="address.address+address.address_detail"
        is-link
        url="/pages/address/main?orderToken=true"
        icon="location-o"
      />
    </div>
    <div class="goods-box">
      <GoodsCart v-for="(cart, cartIndex) in carts" :key="cartIndex" :cart="cart"></GoodsCart>
    </div>
    <div class="order-info-box">
      <van-cell-group>
        <van-cell title="单元格" value="内容"/>
        <van-cell title="单元格" value="内容"/>
        <van-cell title="单元格" value="内容"/>
        <van-cell title="单元格" value="内容"/>
      </van-cell-group>
    </div>
    <van-submit-bar
      :price="countPrice"
      button-text="提交订单"
      @submit="onClickButton"
      custom-class="van-submit-bar"
      safe-area-inset-bottom="false"
    />
    <wux-loading id="wux-loading"/>
  </section>
</template>
<script>
import { getRequest, postRequest } from '@/utils/request.js'
import { $wuxLoading } from '../../../static/wux/index.js'
import GoodsCart from '../../components/GoodsCart'
export default {
  components: {
    GoodsCart
  },
  data () {
    return {
      carts: [],
      countPrice: '',
      openid: '',
      visible: false,
      addressId:'',
      address: {}
    }
  },
  created() {
    this.openid = wx.getStorageSync('userinfo').openId
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '确认订单'
    })
    this.getCartlist()
    this.getAddress(false)
  },
  onShow(){
    this.addressId = wx.getStorageSync('addressId')
    wx.removeStorageSync('addressId')
    if(this.addressId) {
      this.getAddress(this.addressId)
    }
  },
  methods: {
    async getAddress(id){
      if(!id){
        // 默认加载
        const res = await getRequest('/weapp/address/getListAction', {
          openId: this.openid,
          is_default: 1
        })
        this.address = res.data.address
      }else{
        // 根据id加载
        const res = await getRequest('/weapp/address/detailAction',{
          id: this.addressId
        })
        this.address = res.data.list[0]
      }
    },
    closePopup(){
      this.visible = false
    },
    showLoading () {
      this.$wuxLoading = $wuxLoading()
      this.$wuxLoading.show({
        text: '订单生成中',
      })
    },
    hideLoading () {
      this.$wuxLoading.hide()
    },
    test () {
      this.countPrice = 1000
    },
    onClickButton () {
      // this.showLoading()
      // 生成订单 付款
      this.createOrder()
    },
    compentedCountPrice () {
      let count = 0
      this.carts.forEach(v => {
        count += v.price * v.num
      })
      this.countPrice = count * 100
    },
    async getCartlist () {
      getRequest('/weapp/selectshopcar', {
        openId: wx.getStorageSync('userinfo').openId
      }).then(res => {
        this.carts = res.data.list
        this.compentedCountPrice()
      })
    },
    // 生成订单
    async createOrder () {
      // 临时解决方案，传送 openid把购物车的商品全部提交，暂时不支持勾选商品
      this.showLoading()
      const res = await postRequest('/weapp/order/create', {
        openid: this.openid,
        addressId: this.address.addressId
      })
      // 失败
      if (!res.data.message === 'SUCCESS') {
        this.hideLoading()
        wx.showToast({
          title: "失败，发生未知错误",
          icon: "none",
          duration: 2000
        })
      } else {
        // 成功
        this.hideLoading()
        this.toPay()
      }
    },
    // 弹出支付接口
    async toPay() {
      this.visible = true
    }

  }
}
</script>
<style lang="less">
.order-wrap {
  background-color: #cccccc;
  .address-box {
    background-color: #fff;
    height: 176rpx;
    width: 100%;
    .flex-center {
      align-items: center;
    }
  }
  .goods-box {
    padding-top: 20rpx;
    background: url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png")
      0 0 repeat-x #fff;
    width: 100%;
    background-color: rgb(100, 240, 119);
  }
  .order-info-box {
    padding: 20rpx 0;
    height: 300rpx;
    width: 100%;
    // background-color: rgb(95, 209, 230);
  }
}
</style>
