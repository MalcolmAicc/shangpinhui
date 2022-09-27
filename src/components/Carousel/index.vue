<template>
  <div class="swiper-container" id="mySwiper" ref="list">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper包，轮播图的实现
import Swiper from "swiper";
// 引入swiper 的样式文件
import "swiper/css/swiper.css";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
        // 因为floor组件里的轮播图的数据是floor的父组件home传过去的
        // 开启立即监听
      immediate: true,
      handler() {
        this.$nextTick(function () {
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper(this.$refs.list, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>