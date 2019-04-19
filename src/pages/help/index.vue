<template>
  <div>
    <form>
      <wux-cell>
        <wux-textarea rows="3" placeholder="请描述您要反馈的内容……" @change="changeDescribe"/>
      </wux-cell>
      <wux-button block outline type="energized" @click="addHelp">提交</wux-button>
    </form>
  </div>
</template>

<script>
import * as Api from "../../utils/request.js";
import * as Util from "../../utils/index.js";
export default {
  data() {
    return {
      suggest: ""
    };
  },

  created() {},
  methods: {
    changeDescribe(e) {
      console.log("fdsfsdg", e);
      this.suggest = e.mp.detail.value;
      console.log(this.suggest);
    },
    async addHelp() {
      const time = Util.formatTime(new Date());
      const openId = wx.getStorageSync("userinfo").openId;
      if (this.suggest !== "") {
        const res = await Api.postRequest("/weapp/addhelp", {
          openId: openId,
          suggest: this.suggest,
          time: time
        });
        if (res.code == 0) {
          wx.showToast({
            title: "反馈成功",
            icon: "success",
            duration: 2000
          });
        }
      }else {
        wx.showToast({
            title: "反馈内容不能为空",
            duration: 2000
          });
      }
    }
  }
};
</script>

<style>
</style>
