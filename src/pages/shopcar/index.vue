<template>
  <div>
    <div>
      <ul>
        <li v-for="goodsItem in goodList" :key="goodsItem.goodsid">
          <van-card
            :num="goodsItem.num"
            :price="goodsItem.price"
            :desc="goodsItem.describe"
            :title="goodsItem.title"
            :thumb="goodsItem.picture[0].imgurl"
          >
            <view slot="footer">
              <van-button size="mini" @click="addNum(goodsItem)">+</van-button>
              <van-button size="mini" @click="reduceNum(goodsItem)">-</van-button>
              <span @click="deleteGoods(goodsItem)">删除</span>
            </view>
          </van-card>
        </li>
      </ul>
    </div>
    <div>
      <van-submit-bar
        :price="countPrice"
        button-text="提交订单"
        @submit="onClickButton"
        :tip="true"
      >
        <van-tag type="primary">
          <van-checkbox :value="checked" @change="onChange">全选</van-checkbox>
        </van-tag>
      </van-submit-bar>
    </div>

    <wux-dialog id="wux-dialog"/>
  </div>
</template>

<script>
import * as Util from "../../utils/index.js";
import * as Api from "../../utils/request.js";
import { $wuxDialog } from "../../../static/wux/index.js";
export default {
  components: {},

  data() {
    return {
      imageURL: "/static/images/home/book.png",
      checked: true,
      num: "",
      price: "",
      desc: "",
      title: "",
      goodList: [],
      editTemp: 0
    };
  },
  computed: {
    countPrice() {
      // 计算
      let count = 0;
      this.goodList.map(item => {
        count = count + item.num * item.price;
      });
      return count * 100;
    }
  },
  methods: {
    async getGoodsList() {
      const openId = wx.getStorageSync("userinfo").openId;
      const res = await Api.getRequest("/weapp/selectshopcar", {
        openId: openId
      });
      // console.log("购物车列表", res);
      this.goodList = res.data.list;
      // console.log("goodList", this.goodList);
    },
    async setCountPrice() {
      // 计算
      let count = 0;
      this.goodList.map(item => {
        count = count + item.num * item.price;
      });
      this.countPrice = count * 100;
    },
    onChange(event) {
      this.checked = event.mp.detail;
      console.log(event.mp.detail);
    },
    async addNum(goodsItem) {
      const res = await Api.postRequest("/weapp/updateshopcar", {
        shopCarId: goodsItem.shopcarid,
        num: goodsItem.num + 1
      });
      if (res.code == 0) {
        goodsItem.num++;
      } else {
        wx.showToast({
          title: "未知错误，失败"
        });
      }
      // this.setCountPrice()
    },
    async reduceNum(goodsItem) {
      // console.log('jsdfh', goodsItem);
      if (goodsItem.num != 1) {
        const res = await Api.postRequest("/weapp/updateshopcar", {
          shopCarId: goodsItem.shopcarid,
          num: goodsItem.num - 1
        });
        if (res.code == 0) {
          goodsItem.num--;
        } else {
          wx.showToast({
            title: "未知错误，失败"
          });
        }
      } else {
        const openId = wx.getStorageSync("userinfo").openId;
        $wuxDialog().confirm({
          resetOnClose: true,
          closable: true,
          title: "是否继续",
          content: "继续减少将删除这个商品",
          onConfirm: async e => {
            // 调接口 删除这这个商品
            const res = await Api.postRequest("/weapp/updateshopcar", {
              shopCarId: goodsItem.shopcarid,
              num: goodsItem.num - 1
            });
            // console.log("删除", res);

            this.getGoodsList();
          },
          onCancel(e) {
            console.log("取消删除");
          }
        });
      }
    },
    async deleteGoods(goodsItem) {
      const res = await Api.postRequest("/weapp/deleteshopcar", {
        shopCarId: goodsItem.shopcarid
      });
      // console.log('delete', res);
      this.getGoodsList()
    },
    onClickButton() {
      // 结算生成订单
      wx.navigateTo({
        url: '/pages/order/main'
      })
    }
  },
  mounted() {
    this.getGoodsList();
  }
};
</script>

<style>
</style>
