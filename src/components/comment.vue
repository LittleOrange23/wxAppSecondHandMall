<!--  -->
<template>
  <div class="comment">
    <div class="cmt-container">
      <div class="cmt-list">
        <div class="cmt-item">
          <div class="cmt-title">用户：{{userinfo.nickName}}&nbsp;&nbsp;发表时间：{{allComments.time}}</div>
          <div class="cmt-body">{{ commentBody }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Api from "../utils/request.js";
import * as Util from "../utils/index.js";
export default {
  props: ["allComments"],
  data() {
    return {
      // allComments: []
      userInfo: []
    };
  },
  mounted() {},
  computed: {
    userinfo() {
      return this.allComments.user_info || {};
    },
    commentBody() {
      return this.allComments.comment
    }
  },
  methods: {}
};
</script>
<style lang="less">
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    margin: 0;
    height: 90px !important;
  }
  .commentArea {
    height: 90px !important;
  }

  .comment-btn {
    margin: 10px;
    width: 700rpx;
    text-align: center;
    background: #ffd95f !important;
    color: #fff !important;
    border-radius: 10px;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
