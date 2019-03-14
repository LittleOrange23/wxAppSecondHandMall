<script>
// import config from './config.js'
import { get } from "./utils";
import qcloud from "wafer2-client-sdk";
import config from "./config";

export default {
  async created() {
    // 设置登录地址
    qcloud.setLoginUrl(config.loginUrl);
    qcloud.login({
      success: function(userInfo) {
        console.log("登录成功", userInfo);
      },
      fail: function(err) {
        console.log("登录失败", err);
      }
    });

    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // const res = await get('/weapp/demo')
    // console.log(res)
    // wx.request({
    //   url: config.host + '/weapp/demo',
    //   success: function(res) {
    //     console.log(res)
    //   }
    // })
    console.log("app created and cache logs by setStorageSync");
    console.log("小程序启动了");
  }
};
</script>

<style>
@import "./../static/fonts/iconfont.css";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
