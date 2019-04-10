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
    <form>
      <wux-cell-group title="描述 >">
        <wux-cell hover-class="none">
          <wux-input placeholder="标题" @change="changeTitle"/>
        </wux-cell>
        <wux-cell>
          <textarea
            name
            id
            cols="30"
            rows="10"
            placeholder="请描述下您要做的事……"
            required
            @change="changeDescribe"
          ></textarea>
        </wux-cell>
      </wux-cell-group>
      <wux-cell>
        <wux-upload
          listType="picture-card"
          max="4"
          url="http://127.0.0.1:5757/weapp/upload"
          @success="onSuccess"
          @remove="onDelete"
        >
          <text>上传照片</text>
        </wux-upload>
      </wux-cell>

      <wux-cell-group title="标价 >">
        <wux-cell hover-class="none">
          <wux-input type="number" label="开个价" extra="￥" @change="changePrice"/>
        </wux-cell>
        <wux-cell hover-class="none">
          <wux-input type="number" label="原价" extra="￥" @change="changeOldPrice"/>
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
          <wux-input clear label="联系人" placeholder="请输入联系人(选填)" @change="changeName"/>
        </wux-cell>
        <wux-cell hover-class="none">
          <wux-input clear label="联系电话" placeholder="请输入联系电话(选填)" type="number" @change="changeTel"/>
        </wux-cell>
      </wux-cell-group>
      <wux-cell>
        <textarea
          class="remark"
          cols="30"
          rows="5"
          placeholder="请输入备注(选填)……"
          required
          @change="changeRemark"
        ></textarea>
      </wux-cell>

      <wux-cell class="rule" title="我已阅读《物品发布规则》">
        <wux-selectable slot="header" wux-class="checkbox" value="1" @change="changeRead" />
      </wux-cell>
      <wux-button block outline type="energized" @click="addGoods">发布</wux-button>
    </form>
  </div>
</template>

<script>
import * as Api from "../../utils/request.js";
import * as Util from "../../utils/index.js"
export default {
  components: {},

  data() {
    return {
      kind: ["请选择分类 >", "图书文学", "数码电子", "生活用品", "其他"],
      index: 0,
      picKind: "",
      title1: "",
      value1: "",
      title: "",
      describe: "",
      picture: [],
      price: "",
      oldprice: "",
      name: "",
      tel: "",
      remark: "",
      flag: 0,
      time: "",
      location: "未知地点"
    };
  },
  methods: {
    bindPickerChange(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.index = e.mp.detail.value
      this.picKind = this.kind[this.index]  //与小程序的e.detail.value不同，注意！
      console.log(this.picKind);
      
    },
    async addGoods() {
      this.time = Util.formatTime(new Date())
      const openId = wx.getStorageSync("userinfo").openId;
      console.log(
        'openId'+openId,
        'title'+this.title,
        'picture'+this.picture,
        'price'+this.price,
        'oldprice'+this.oldprice,
        'pickind'+this.picKind,
        'name'+this.name,
        'tel'+this.tel,
        'remark'+this.remark,
        'time' + this.time,
        'location'+ this.location
      );
      
      // 判断是否勾选
      if (this.flag==0 || this.picture.length==0) {
          wx.showToast({
          title: "请填写必填项",
          duration: 2000
        });
      }
      else {
        const res = await Api.postRequest("/weapp/addgoods", {
          'openId': openId,
          'title': this.title,
          'describe': this.describe,
          'picture': this.picture,
          'price': this.price,
          'oldprice': this.oldprice,
          'pickind': this.picKind,
          'name': this.name,
          'tel': this.tel,
          'remark': this.remark,
          'time':  this.time,
          'location': this.location
        });
        if (res.code == 0) {
        
        wx.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/home/main'
        })
      }
      } 
      
    },
    changeTitle(e) {
      this.title = e.mp.detail.value;
    },
    changeDescribe(e) {
      this.describe = e.mp.detail.value;
    },
    changePrice(e) {
      this.price = e.mp.detail.value
    },
    changeOldPrice(e) {
      this.oldprice = e.mp.detail.value
    },
    changeName(e) {
      this.name = e.mp.detail.value
    },
    changeTel(e) {
      this.tel = e.mp.detail.value
    },
    changeRemark(e) {
      this.remark = e.mp.detail.value
    },
    changeRead(e) {
      console.log(e.mp.detail.checked);
      if (e.mp.detail.checked) {
        this.flag = 1
      }
    },
    onSuccess(e) {
      let picList = e.mp.detail.fileList;
      console.log(picList);
      this.picture = this.picture.splice();
      for (let index = 0; index < picList.length; index++) {
        this.picture.push({
          imgurl: JSON.parse(picList[index].res.data).data.imgUrl,
          name: JSON.parse(picList[index].res.data).data.name,
          uid: picList[index].uid
        });
      }
      // 方法二
      // if(picList.length == 1){
      //   this.picture.push(
      //     {
      //       'imgurl': JSON.parse(picList[0].res.data).data.imgUrl,
      //       'name': JSON.parse(picList[0].res.data).data.name
      //     })
      // }
      // else{
      //   this.picture.push(
      //     {
      //       'imgurl': JSON.parse(picList[picList.length-1].res.data).data.imgUrl,
      //       'name': JSON.parse(picList[picList.length-1].res.data).data.name
      //     })

      // }
      console.log("pic", this.picture);
      console.log(e.mp.detail.fileList[0].res.data);
      console.log(
        "解析" + JSON.parse(e.mp.detail.fileList[0].res.data).data.imgUrl
      );
    },
    onDelete(e) {
      const {file} = e.mp.detail
      this.picture = this.picture.filter(
        (n)=> n.uid !== file.uid
      )
      console.log(this.picture);
    }
  },
  created() {
    // 获取地理位置
    wx.getLocation({
        type: "wgs84",
        success: geo => {
          console.log(geo);
          wx.request({
            url: `http://api.map.baidu.com/geocoder/v2/?location=${
              geo.latitude
            },${
              geo.longitude
            }&output=json&pois=1&ak=UoZlCMqkPaaxVeIVA30e35dVTmyGB26j`,
            success: res => {
              console.log(res);
              console.log(res.data.result);
              if (res.data.status === 0) {
                this.location = res.data.result.formatted_address;
              } else {
                this.location = "未知地点";
              }
            }
          });
        }
      });
  }
};
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
