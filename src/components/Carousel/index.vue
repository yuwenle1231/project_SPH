<template>
  <div class="swiper-container" id="floor1Swiper">
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
import Swiper from 'swiper'
export default {
    name:'Carousel',
    props:['list'],
    watch:{
            list:{
                // 立即监听：不管数据有没有变化，上来就先执行一遍
                // 为什么监听不到list的数据变化？因为数据是父组件给的，没有变化过
                immediate:true,
                handler(newValue,oldValue){
                    this.$nextTick(() => {
                    var mySwiper = new Swiper(".swiper-container", {
                    loop: true, // 循环模式选项
                    // 如果需要分页器
                    pagination: {
                    el: ".swiper-pagination",
                    clickable: true, //可以点击分页器换图
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                    },
                });
                })
                }
            }
        }
};
</script>

<style>
</style>