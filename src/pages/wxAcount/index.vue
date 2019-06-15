<template>
  <div class="wx_account">
    <div class="account_content">
      <h3>详聊请加微信</h3>
      <p>
        <span>卖家微信号：</span>
        <span>{{phone}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import * as Api from "../../utils/request.js";
export default {
  components: {},

  data() {
    return {
      goodsId: '',
      phone: ''
    };
  },

  mounted() {
    this.goodsId = this.$root.$mp.query.goodsId;
    console.log('hjd',this.goodsId);
    this.getAccount()
  },
  methods: {
    async getAccount() {
      console.log('进入');
      const res = await Api.postRequest('/weapp/goods/account', {
        goodsId: this.goodsId
      })
      this.phone = res.data.list[0].phone
      console.log('success', this.phone);
    }
  }
};
</script>

<style lang="less">
.wx_account {
  width: 700rpx;
  margin: 0 auto;
  .account_content {
    margin-top: 10px;
    height: 100px;
    width: 660rpx;
    border-radius: 10px;
    background: #b1ca88;
    overflow: hidden;
    padding:10px 10px ;
    color: #ffff;
    h3 {
      margin-top: 10px;
      
    }
  }
}
</style>
