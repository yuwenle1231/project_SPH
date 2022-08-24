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
    mounted() {
      // 考虑到性能优化，放在app.vue里面，只执行一次
    // 通知vuex发送请求，获取数据，存储于仓库中
    this.$store.dispatch("categoryList");
    },
  };
</script>

<style>
</style>
