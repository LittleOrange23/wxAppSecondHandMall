<template>
  <div class="content">
    <van-tabs :active="active" swipeable animated @change="toChange">
      <van-tab title="图书文学">
        <div class="top">
          <goodslist
            :locationPublish="goodsitem.location"
            v-for="goodsitem in book"
            :key="goodsitem.openid"
            :goods="goodsitem"
            @click="toGoodsInfo"
          ></goodslist>
        </div>
      </van-tab>
      <van-tab title="数码电子">
        <div>
          <goodslist
            :locationPublish="goodsitem.location"
            v-for="goodsitem in electron"
            :key="goodsitem.openid"
            :goods="goodsitem"
            @click="toGoodsInfo"
          ></goodslist>
        </div>
      </van-tab>
      <van-tab title="生活用品">
        <div>
          <goodslist
            :locationPublish="goodsitem.location"
            v-for="goodsitem in life"
            :key="goodsitem.openid"
            :goods="goodsitem"
            @click="toGoodsInfo"
          ></goodslist>
        </div>
      </van-tab>
      <van-tab title="其他更多">
        <div>
          <goodslist
            :locationPublish="goodsitem.location"
            v-for="goodsitem in other"
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
      book: [],
      electron: [],
      life: [],
      other: []
    };
  },
  created() {
    this.getAll();
  },
  mounted() {
    this.goodsKind = this.$root.$mp.query.kindId;
    // console.log(this.$root.$mp.query);
    this.getGoodsByKind();
    // this.getAll();
  },
  methods: {
    async getGoodsByKind() {
      if (this.goodsKind == "图书文学") {
        this.active = 0;
      }
      if (this.goodsKind == "数码电子") {
        this.active = 1;
      }
      if (this.goodsKind == "生活用品") {
        this.active = 2;
      }
      if (this.goodsKind == "其他更多") {
        this.active = 3;
      }
      // console.log("res", res);
      // console.log("goods", this.goods);
    },
    toChange(event) {
      // console.log("ddd", event.mp.detail.index);
      this.active = event.mp.detail.index;
    },
    async getAll() {
      // console.log("xxx", this.goodsKind);
      const res = await Api.getRequest("/weapp/goodskind", {
        kindId: "图书文学"
      });
      this.book = res.data.list;
      // console.log("book", this.book);
      const res1 = await Api.getRequest("/weapp/goodskind", {
        kindId: "数码电子"
      });
      this.electron = res1.data.list;
      const res2 = await Api.getRequest("/weapp/goodskind", {
        kindId: "生活用品"
      });
      this.life = res2.data.list;
      const res3 = await Api.getRequest("/weapp/goodskind", {
        kindId: "其他更多"
      });
      this.other = res3.data.list;
    }
  }
};
</script>

<style lang="less">
.content {
  .top {
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
  }
}
</style>
