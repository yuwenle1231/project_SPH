<template>
  <div>
    <Header></Header>
    <!-- 路由组件 -->
    <router-view ></router-view>
    <!-- Footer在登录和注册时不需要展示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
  export default {
    name: "App",
    components: {Header,Footer},
  };
</script>

<style>
</style>
