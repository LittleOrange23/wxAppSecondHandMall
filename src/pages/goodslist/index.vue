<template>
  <div>
    <van-tabs :active="active" swipeable animated>
      <van-tab title="图书文学" @click="toBook">
        <div>
          <goodsort></goodsort>
          <goodslist
            :locationPublish="goodsitem.location"
            v-for="goodsitem in goods"
            :key="goodsitem.openid"
            :goods="goodsitem"
            @click="toGoodsInfo"
          ></goodslist>
        </div>
      </van-tab>
      <van-tab title="数码电子" @click="toElectron">
        <div>
          <goodsort></goodsort>
          <goodslist
            :locationPublish="goodsitem.location"
            v-for="goodsitem in goods"
            :key="goodsitem.openid"
            :goods="goodsitem"
            @click="toGoodsInfo"
          ></goodslist>
        </div>
      </van-tab>
      <van-tab title="生活用品" @click="toLife">
        <div>
          <goodsort></goodsort>
          <goodslist
            :locationPublish="goodsitem.location"
            v-for="goodsitem in goods"
            :key="goodsitem.openid"
            :goods="goodsitem"
            @click="toGoodsInfo"
          ></goodslist>
        </div>
      </van-tab>
      <van-tab title="其他更多" @click="toOther">
        <div>
          <goodsort></goodsort>
          <goodslist
            :locationPublish="goodsitem.location"
            v-for="goodsitem in goods"
            :key="goodsitem.openid"
            :goods="goodsitem"
            @click="toGoodsInfo"
          ></goodslist>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import goodslist from "@/components/goodslist";
import goodsort from "@/components/goodsort";
import * as Api from "../../utils/request.js";
export default {
  components: {
    goodslist,
    goodsort
  },

  data() {
    return {
      location: null,
      goods: [],
      goodsKind: "",
      active: null,
    };
  },
  mounted() {
    this.goodsKind = this.$root.$mp.query.kindId;
    console.log(this.$root.$mp.query);
    this.getGoodsByKind();
  },
  methods: {
    async getGoodsByKind() {
      console.log("xxx", this.goodsKind);
      if (this.goodsKind == '图书文学') {
        this.active = 0
      }
      if (this.goodsKind == '数码电子') {
        this.active = 1
      }
      if (this.goodsKind == '生活用品') {
        this.active = 2
      }
      if (this.goodsKind == '其他更多') {
        this.active = 3
      }
      // return false
      const res = await Api.getRequest("/weapp/goodskind", {
        kindId: this.goodsKind
      });
      this.goods = res.data.list;
      console.log("res", res);
      console.log("goods", this.goods);
    },
    async toBook() {
      console.log("xxx", this.goodsKind);
        this.active = 0
      
      // return false
      const res = await Api.getRequest("/weapp/goodskind", {
        kindId: '图书文学'
      });
      this.goods = res.data.list;
      console.log("res", res);
      console.log("goods", this.goods);
    },
    async toElectron() {
      console.log("xxx", this.goodsKind);
        this.active = 1
      
      // return false
      const res = await Api.getRequest("/weapp/goodskind", {
        kindId: '数码电子'
      });
      this.goods = res.data.list;
      console.log("res", res);
      console.log("goods", this.goods);
    },
    async toLife() {
      console.log("xxx", this.goodsKind);
        this.active = 2
      
      // return false
      const res = await Api.getRequest("/weapp/goodskind", {
        kindId: '生活用品'
      });
      this.goods = res.data.list;
      console.log("res", res);
      console.log("goods", this.goods);
    },
    async toOther() {
      console.log("xxx", this.goodsKind);
        this.active = 3
      
      // return false
      const res = await Api.getRequest("/weapp/goodskind", {
        kindId: '其他更多'
      });
      this.goods = res.data.list;
      console.log("res", res);
      console.log("goods", this.goods);
    }
  }
};
</script>

<style>
</style>
