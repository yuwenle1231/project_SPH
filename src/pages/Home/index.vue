<template>
  <div>
    <!-- 全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- 父子通信   数据在父，需要传给子组件Floor 用props -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
    export default {
      name:'Home',
      components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
      // 获取floor数据
      mounted() {
            this.$store.dispatch('getFloorList')
            // 获取用户信息
            // this.$store.dispatch('getUserInfo')
        },
      computed:{
        ...mapState({
          floorList:state => state.home.floorList 
        })
      }
    }
</script>

<style lang="less" scoped>

</style>