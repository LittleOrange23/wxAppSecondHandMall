<template>
  <div>
    <!-- <div>
      <ul>
        <li>
          <van-card
            price="10.00"
            desc="描述信息"
            title="商品标题"
            thumb="/static/images/home/book.png"
          >
            <view slot="footer">
              <span>删除</span>
            </view>
          </van-card>
        </li>
        <li>
          <van-card 
            price="10.00"
            desc="描述信息"
            title="商品标题"
            thumb="/static/images/home/book.png"
          >
            <view slot="footer">
              <span>删除</span>
            </view>
          </van-card>
        </li>
      </ul>
    </div> -->
    <goods></goods>
  </div>
</template>

<script>
import goods from '@/components/goods'
export default {
  components: {
    goods
  },

  data () {
    return {
     
    }
  },

  created () {
    
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
