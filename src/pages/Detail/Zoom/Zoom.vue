<template>
  <div class="spec-preview">
    <img :src="ingUrl.imgUrl" />
    <!-- 放事件的地方 -->
    <!-- 这只mousemove 鼠标移动事件 -->
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img ref="big" :src="ingUrl.imgUrl" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        // 添加一个响应式数据
        currentIndex:0
      }
    },
    mounted() {
      // 触发全局事件总线，接受ImageList组件传递的参数
      this.$bus.$on('changeImage',(index) => {
        this.currentIndex = index
      })
    },
    computed:{
      ingUrl(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    methods: {
      handler(event){
        let mask = this.$refs.mask
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        // 设置遮罩层的边界
        if(left<=0){
          left = 0
        }
        if(left >= mask.offsetWidth){
          left = mask.offsetWidth
        }
        if(top <= 0){
          top = 0
        }
        if(top >= mask.offsetHeight){
          top = mask.offsetHeight
        }
        // 更改mask的css样式
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'

        // 让big图片，跟着一起动
        let big = this.$refs.big
        big.style.left = -2*left +'px'
        big.style.top = -2*top +'px'

      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>