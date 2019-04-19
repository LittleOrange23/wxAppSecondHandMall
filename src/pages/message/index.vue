<template>
  <div>消息页面</div>
</template>

<script>
import * as Api from "../../utils/request.js";
export default {
  components: {},

  data() {
    return {};
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    async getMessage() {
      wx.connectSocket({
        url: "wss://1rf1cjrx.ws.qcloud.la",
        header: {
          "content-type": "application/json"
        },
        method: "GET",
        success: res => {
          console.log("res", res);
        },
        fail: res => {
          console.log("res", res);
        }
      });
    }
  }
};
</script>

<style>
</style>
