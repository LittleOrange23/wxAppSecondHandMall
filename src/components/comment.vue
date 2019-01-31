<!--  -->
<template>
  <div class="comment">
    <div class="cmt-container">
      <h3>发表评论</h3>
      <hr>
      <textarea placeholder="请输入要评论的内容（做多吐槽120字）" maxlength="120"></textarea>

      <button
        class="comment-btn"
        type="primary"
        size="default"
        plain="false"
        disabled="false"
        bindtap="primary"
      >发表评论</button>

      <div class="cmt-list">
        <div class="cmt-item">
          <div class="cmt-title">第1楼&nbsp;&nbsp;用户：小丸子&nbsp;&nbsp;发表时间：2019-1-31</div>
          <div class="cmt-body">哈哈哈哈，真不错！</div>
        </div>
      </div>

      <button type="default" size="default" plain="true" disabled="false" bindtap="default">加载更多</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .comment-btn {
    background: #ffd95f !important;
    color: #fff !important;
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
