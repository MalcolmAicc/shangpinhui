<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- 这里遍历用index，是因为要判断currrentIndex和index的值来动态的添加class="active" -->
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="index"
      >
        <img
          :src="slide.imgUrl"
          :class="{ active: currentIndex == index }"
          @click="changeActive(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Swiper from "swiper";
// 引入swiper 的样式文件
import "swiper/css/swiper.css";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["skuImageList"],
  watch: {
    skuImageList: {
      handler() {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper(".swiper-container", {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView: 3,
            grid: {
              fill: "column",
              rows: 1,
            },
          });
        });
      },
    },
  },
  methods: {
    // 点击图片时，动态添加类名，并且将索引值传递给兄弟组件ZOOM，更改放大镜的图片
    changeActive(index) {
      this.currentIndex = index;
      // 定义全局事件总线，给兄弟组件ZOOM传参
      this.$bus.$emit('changeImage',index)
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>