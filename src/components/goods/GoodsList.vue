<template>
  <div class="goods-list">
    <!-- 方法1 -->
    <!-- <router-link :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id" tag="div">
          <img :src="item.img_url" alt="">
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
            <p class="price">
            <span class="now">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
            </p>
            <p class="sell">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
            </p>
        </div>
    </router-link> -->
    <!-- 方法2 -->
    <!-- <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
          <img :src="item.img_url" alt="">
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
            <p class="price">
            <span class="now">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
            </p>
            <p class="sell">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
            </p>
        </div>
    </div> -->
    <!-- <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button> -->
    <!-- 方法3 -->
    <mt-loadmore :autoFill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="goods-list">
          <div class="goods-item" v-for="(item,index) in goodslist" :key="index" @click="goDetail(item.id)">
              <img :src="item.img_url" alt="">
              <h1 class="title">{{ item.title }}</h1>
              <div class="info">
                  <p class="price">
                      <span class="now">￥{{ item.sell_price }}</span>
                      <span class="old">￥{{ item.market_price }}</span>
                  </p>
                  <p class="sell">
                      <span>热卖中</span>
                      <span>剩{{ item.stock_quantity }}件</span>
                  </p>
              </div>
          </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodslist:[],
      allLoaded: false
    }
  },
  created () {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
    // 获取商品列表
    this.$http
      .get("api/getgoods?pageindex=" + this.pageindex)
      .then(result => {
        if (result.body.status != 0) {
          Toast(result.body.message);
          return;
        }
        if (this.pageindex == 1) {
          // 重置下拉状态
          this.$refs.loadmore.onTopLoaded();
          // 直接赋值第一页的数据
          this.goodslist = result.body.message;
        } else {
          // 重置上拉状态
          if (result.body.message.length == 0) {
            this.allLoaded = true;
          }
          // 重置上拉状态
          this.$refs.loadmore.onBottomLoaded();
          this.goodslist = this.goodslist.concat(result.body.message);
        }
      });
    },
    // 下拉时触发 请求最新数据
    loadTop() {
      console.log("下拉");
      this.pageindex = 1;
      this.getGoodsList();
    },
    //上拉
    loadBottom() {
      console.log("上拉");
      this.pageindex++;
      this.getGoodsList();
    },
    // 方法2采用下面方法
    // getMore() {
    //   this.pageindex++;
    //   this.getGoodsList();
    // },
    goDetail(id) {
      this.$router.push("/home/goodsinfo/" + id)
      this.$router.push({path:'/home/goodsinfo/' + id})
      this.$router.push({name: 'goodsinfo',params: {id : id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img{
      width: 100%;
    }
    .title{
      font-size: 14px;
    }
    .info{
      background-color: #eee;
      p{
        margin: 0;
        padding: 5px;
      }
      .price{
        .now{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old{
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
