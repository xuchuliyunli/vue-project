<template>
  <div class="photoinfo-container">
    <vue-preview :slides="slide1" @close="handleClose" class="thumbs"></vue-preview>
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr>
    <!-- 缩略图区域 -->
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 放置一个现成的 评论子组件 -->
    <comment :id="id"></comment>
  </div>
</template>


<script>
import comment from '../subcomponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      slide1: []
    }
  },
  created () {
    this.getPhotoInfo();
    this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      })
    },
    handleClose () {
      console.log('close event')
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if(result.body.status === 0){
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src
          }) 
          this.slide1 =  result.body.message
        }
      })
    }  
  },
  components: {
    comment,
  }
}
</script>

<style lang="scss" scoped>
  .photoinfo-container {
    padding: 3px;
    h3 {
      color: #26a2ff;
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }
    .subtitle {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
    .content {
      font-size: 13px;
      line-height: 30px;
    }
  }
/deep/ .my-gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  figure {
    width: 33.33%;
    display: inline-block;
    margin: 0;
    padding: 10px;
    img {
      width: 100%;
      box-shadow: 0 0 8px #ccc; 
    }
  }
}
</style>
