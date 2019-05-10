<template>
  <section>
    <wux-button block type="assertive" @click="send">连接</wux-button>
  </section>
</template>

<script>
import * as Api from "../../utils/request.js";
export default {
  components: {},

  data() {
    return {};
  },
  onLoad: function() {
    wx.connectSocket({
      url: "wss://1rf1cjrx.ws.qcloud.la/weapp/tunnel" // 这里是服务器的地址
    }),
      wx.onSocketOpen(function(res) {
        // callback
        console.log("WebSocket连接已打开！"); // 打开WebSocket连接，在进行通信之前必须先打开一个连接
      }),
      wx.onSocketError(function(res) {
        // WebSocket错误监听
        console.log("WebSocket连接打开失败，请检查！");
      }),
      wx.onSocketMessage(function(msg) {
        // WebSocket数据接收监听
        // CallBack
        console.log("onSocketMessage", msg);
      }),
      wx.onSocketClose(function() {
        // WebSocket关闭监听
        // callback
        console.log("WebSocket服务器已经关闭！");
      });
  },
  methods: {
    send() {
      wx.sendSocketMessage({
        // 向服务器发送数据，注意这个方法之必须在调用wx.connectSocket和wx.onSocketOpen回调之后
        data: "string" // 官方文档里data可以是string或者ArrayBuffer，但是注意这个ArrayBuffer并不是Array
      });
    }
  }
};
</script>

<style>
</style>
