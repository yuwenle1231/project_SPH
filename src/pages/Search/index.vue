<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}} <i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}} <i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}} <i @click="removeTradeMark" >×</i></li>
            <!-- 售卖属性的面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(':')[1]}} <i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-packup':isAsc,'icon-down':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-packup':isAsc,'icon-down':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 记住带id  params参数 route里面有占位 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页列表 父传子 props -->  
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Search的子组件
  import SearchSelector from './SearchSelector/SearchSelector'
  import { mapGetters, mapState } from 'vuex';
  export default {
    name: 'Search',
    components: {SearchSelector},
    data() {
      return {
        searchParams:
        {   
          category1Id: "",
          category2Id: "",
          category3Id: "",
          categoryName: "",
          keyword: "",//搜索关键字
          order: "1:desc ",//排序 初始值：综合&降序    1：综合 2：价格  asc：升序  desc：降序  合并最多四种情况  1:asc  1:desc 2:asc 2:desc
          pageNo: 1,//第几页
          pageSize: 10,//每页展示几条
          props: [],//商品属性
          trademark: ""//品牌
        }
      }
    },
    beforeMount() {
      // 复杂的写法
      // this.searchParams.category1Id = this.$route.query.category1Id,
      // this.searchParams.category2Id = this.$route.query.category2Id,
      // this.searchParams.category3Id = this.$route.query.category3Id

      // 使用Object.assign  ES6新语法，合并对象 到第一个参数
      // 发请求时，把接口需要传递的参数进行合并整理，
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      console.log("发请求之前，",this.searchParams);
    },
    mounted() {
      this.getData()
    },
    computed:{
      // 此时的mapGetters里面的写法：传递的数组，因为getter计算是没有划分模块的【home,search】
      ...mapGetters(['goodsList']),
      // 排序结构 计算出是 综合1/价格2  升序asc/降序desc
      isOne(){
        return this.searchParams.order.indexOf('1') != -1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2') != -1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') != -1
      },
      // 
      ...mapState({
      total: (state) => state.search.searchList.total,
      }),
    },
    methods: {
      // 向服务器发送请求时，根据参数不同返回不同的数据进行展示，  所以将发送请求封装为一个函数，需要的时候用就可以了
      getData(){
        this.$store.dispatch('getSaerchList',this.searchParams)
      },
      // 移除面包屑
      removeCategoryName(){
        // 这些参数都是可有可无的，置空 不如 赋值为undefined，优化  为undefined的话，发请求时不会带给服务器，为空的话也要带给服务器
        this.searchParams.categoryName = undefined
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.getData()
        // 点击过后，地址栏的query参数也得去掉 , params参数时keyword，点击面包屑不代表keyword也没了，所以要判断下是否有params参数，有的话地址栏也得带上
        if(this.$route.params){
          this.$router.push({name:'search',params:this.$route.params})
        }
      },
      // 删除搜说关键字 和 其对应的面包屑
      removeKeyword(){
        this.searchParams.keyword = undefined
        this.getData()
        // 通知Header兄弟组件 删除关键字  这里用的全局事件总线
        this.$bus.$emit('clear')
        if(this.$route.query){
          this.$router.push({name:'search',query:this.$route.query})
        }
      },
      // 自定义属性回调函数   接收子组件传的参数   点击品牌传递参数发起请求
      trademarkInfo(trademark){
        // 接收到过后整理参数，“品牌ID:品牌名称”
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        // 整理好后再次向服务器发起请求
        this.getData()
      },
      // 删除品牌信息
      removeTradeMark(){
        // 先置空  然后发起请求
        this.searchParams.trademark = undefined
        this.getData()
      },
      // 自定义属性回调函数   接收子组件传的参数   点击售卖属性参数发起请求  ['属性Id：属性值：属性名']
      attrInfo(attr,attrValue){
        // 整理参数 发起请求
        let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
        // 数组去重  判断数组是否有这个props  indexOf（） 不存在，则返回-1。
        if(this.searchParams.props.indexOf(props) == -1){
          this.searchParams.props.push(props)
        }
        this.getData() 
      },
      // 删除售卖属性
      removeAttr(index){
        // 整理参数，发起请求
        this.searchParams.props.splice(index,1)
        this.getData() 
      },
      //排序是升序还是降序   综合|价格   形参flag:表示是用户点击的综合(1)还是价格(2)
      changeOrder(flag){
        // 获取最开始的状态   点击过后值也会变
        let originFlag = this.searchParams.order.split(':')[0]
        let originSort = this.searchParams.order.split(':')[1]
        // 准备一个新的order
        let newOrder = ''
        // 点击的是综合  判断的是多次点击是否是同一个按钮
        if(flag == originFlag){
          newOrder = `${originFlag}:${originSort == 'desc'?'asc':'desc'}`
        }else{
          // 点击的是价格 点击的不是同一个按钮
          newOrder = `${flag}:${'desc'}`
        }
        this.searchParams.order = newOrder
        this.getData() 
      },
      // 自定义事件 获取当前第几页   从子组件传递过来
      getPageNo(pageNo){
        console.log(pageNo);
        this.searchParams.pageNo = pageNo
        this.getData()
      }
    },
    // 数据监听：监听组件实例身上的属性值的变化   这里监听参数里的 keyword 发生变化 
    watch:{
      $route(newValue,oldValue){
        // 再次发请求时应该再次整理参数 Object.assign  因为它在beforeMount只执行了一次
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        // 再次发送请求
        this.getData()
        // 发送请求过后需要将1、2、3级分类的id置空，让其接受下一次请求的1、2、3级分类的id
        // keyword 不用清空 因为每次搜索一定会重新赋值给keyword的       变为undefined的效果比置空更好
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>