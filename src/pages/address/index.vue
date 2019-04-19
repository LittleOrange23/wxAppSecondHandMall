<template>
  <div class="address">
    <scroll-view :scroll-y="scrollflag" class="addcont" style="height: 100%;">
      <!-- <div class="addcont"> -->
      <div v-if="listData.length!=0" class="item">
        <div
          class="list"
          @touchstart="startMove"
          :data-index="index"
          @touchmove="deleteGoods"
          @touchend="endMove"
          v-for="(item, index) in listData"
          :key="index"
          @click="selectAddress(item.addresss_id)"
        >
          <div class="addresslist" :style="item.textStyle">
            <div>
              <span>{{item.name}}</span>
              <div v-if="item.is_default" class="moren">默认</div>
            </div>
            <div class="info">
              <p>{{item.mobile}}</p>
              <p>{{item.address+item.address_detail}}</p>
            </div>
            <div @click="toDetail(item.addresss_id)"></div>
          </div>
          <div @click="delAddress(item.addresss_id)" class="delete" :style="item.textStyle1">
            <div>删除</div>
          </div>
        </div>
      </div>

      <div v-else class="center">
        <p>收货地址在哪里?</p>
      </div>
    </scroll-view>

    <div class="bottom">
      <div @click="wxaddress">+新建地址</div>
    </div>
  </div>
</template>

<script>
import { getRequest, postRequest } from "../../utils/request.js";
export default {
  onShow() {
    this.orderToken = this.$root.$mp.query.orderToken;
    this.openId = wx.getStorageSync("userinfo").openId;
    this.getAddressList();
  },
  created() {},
  computed: {
    tranX() {},
    tranX1() {}
  },
  data() {
    return {
      scrollflag: true,
      nowIndex: 0,
      userInfo: {},
      imgUrl: "",
      listData: [],
      tranX: 0,
      tranX1: 0,
      startX: "",
      startY: "",
      moveX: "",
      moveY: "",
      moveEndX: "",
      moveEndY: "",
      X: 0,
      Y: "",
      flag: false
    };
  },
  components: {},
  methods: {
    selectAddress(id) {
      if (!this.orderToken) {
        return false;
      }
      wx.setStorageSync("addressId", id);
      wx.navigateBack({
        delta: 1
      });
    },
    initTextStyle() {
      //滑动之前先初始化数据
      for (var i = 0; i < this.listData.length; i++) {
        this.listData[i].textStyle = "";
        this.listData[i].textStyle1 = "";
      }
    },
    startMove(e) {
      this.initTextStyle();
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    },
    async delAddress(id) {
      var _this = this;
      wx.showModal({
        title: "",
        content: "是否要删除该收货地址",
        success: function(res) {
          if (res.confirm) {
            const data = getRequest("/weapp/address/deleteAction", {
              addressId: id
            }).then(() => {
              _this.getAddressList();
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
            //滑动之前先初始化样式数据
            _this.initTextStyle();
          }
        }
      });
    },
    deleteGoods(e) {
      //滑动之前先初始化样式数据
      this.initTextStyle();
      var index = e.currentTarget.dataset.index;
      console.log(this.X);
      if (this.X <= -100) {
        this.flag = true;
      }
      if (!this.flag) {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;
        this.listData[index].textStyle = `transform:translateX(${
          this.tranX
        }rpx);`;
        if (this.X >= 100) {
          this.X = 0;
        }
        this.tranX = this.X;
        if (this.X <= -100) {
          this.X = -100;
        }
        this.tranX1 = this.X;
        this.listData[index].textStyle1 = `transform:translateX(${
          this.tranX1
        }rpx);`;
      } else {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;

        this.tranX = this.X - 100;
        this.listData[index].textStyle = `transform:translateX(${
          this.tranX
        }rpx);`;
        // transform:'translateX(' + tranX + 'rpx)'
        console.log("heyushuo");

        console.log(this.listData[index].textStyle);

        if (this.X + -100 > -100) {
          this.flag = false;
        }
        this.tranX1 = -100;
        this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
        console.log(this.listData[index].textStyle1);
        // this.listData = this.listData;
      }
    },
    endMove(e) {
      var index = e.currentTarget.dataset.index;
      if (this.X > -50) {
        this.tranX1 = 0;
        this.tranX = 0;
        this.listData[index].textStyle = `transform:translateX(${
          this.tranX
        }rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${
          this.tranX1
        }rpx);`;
      } else if (this.X <= -50) {
        this.tranX1 = -100;
        this.tranX = -100;
        this.listData[index].textStyle = `transform:translateX(${
          this.tranX
        }rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${
          this.tranX1
        }rpx);`;
      }
    },
    toDetail(id) {
      wx.navigateTo({
        url: "/pages/addaddress/main?id=" + id
      });
    },
    async getAddressList() {
      var _this = this;
      const res = await getRequest("/weapp/address/getListAction", {
        openId: _this.openId
      });
      for (var i = 0; i < res.data.list.length; i++) {
        res.data.list[i].textStyle = "";
        res.data.list[i].textStyle1 = "";
      }
      this.listData = res.data.list;
      console.log(this.listData);
    },
    wxaddress() {
      wx.navigateTo({
        url: "/pages/addaddress/main"
      });
    }
  }
};
</script>

<style lang='less' scoped>
.address {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding-bottom: 110rpx;
  box-sizing: border-box; // overflow-x: hidden;
  font-size: 28rpx;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  .addcont {
    height: 100%; // padding-bottom: 110rpx;
    // box-sizing: border-box;
    // overflow-x: hidden;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
    .item {
      padding: 0 20rpx;
      .list {
        position: relative;
        padding: 30rpx 0;
        border-bottom: 1rpx solid #d9d9d9;
        .delete {
          position: absolute;
          width: 100rpx;
          top: 0;
          right: -120rpx;
          text-align: center;
          height: 100%;
          line-height: 100%;
          background: #b4282d;
          color: #fff;
          transition: all 200ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            color: #fff;
          }
        }
      }
    }
  }
  .addresslist {
    width: 100%;
    position: relative;
    transition: all 300ms ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div:nth-child(1) {
      width: 100rpx;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      align-self: flex-start;
      .moren {
        width: 60rpx;
        height: 30rpx;
        border: 1rpx solid #b4282d;
        text-align: center;
        line-height: 30rpx;
        color: #b4282d;
        margin: 10rpx auto 0 auto;
      }
    }
    .info {
      padding: 0 20rpx;
      flex: 1; // p:nth-child(1) {}
      p:nth-child(2) {
        margin-top: 5rpx;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    div:nth-child(3) {
      width: 50rpx;
      height: 50rpx;
      margin: 0 20rpx;
      background: url("../../../static/images/my/edit.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .center {
    width: 248rpx;
    height: 248rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -80%, 0);
    background: url("http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noAddress-26d570cefa.png")
      no-repeat;
    background-size: 100% 100%;
    p {
      position: absolute;
      bottom: -20rpx;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 30rpx 30rpx;
    display: flex;
    justify-content: space-between;
    background: #fff;
    div {
      width: 330rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      border: 1rpx solid #b4282d;
      color: #b4282d;
    }
    div:nth-child(2) {
      border: 1rpx solid green;
      color: green;
    }
  }
}
</style>
