<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone"> -->
        <input
          type="text"
          v-model="phone"
          placeholder="请输入你的手机号"
          name="phone"
          :class="{ invalid: errors.has('phone') }"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <!-- <input type="text" placeholder="请输入验证码" v-model="code"> -->
        <input
          type="text"
          v-model="code"
          placeholder="请输入验证码"
          name="code"
          :class="{ invalid: errors.has('code') }"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
        />
        <button style="height:38px;width:100px" @click="getCode">获取验证码</button>
        <!-- <span class="error-msg">错误提示信息</span> -->
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <!-- <input type="password" placeholder="请输入你的登录密码" v-model="password"> -->
        <input
          type="password"
          v-model="password"
          placeholder="请输入登录密码"
          name="password"
          :class="{ invalid: errors.has('password') }"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{6,20}$/ }"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <!-- <input type="password" placeholder="请输入确认密码" v-model="password1"> -->
        <input
          type="password"
          v-model="password1"
          placeholder="请输入登录密码"
          name="password1"
          :class="{ invalid: errors.has('password1') }"
          v-validate="{ required: true, is: password }"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <!-- <input name="m1" type="checkbox" :checked="agree"> -->
        <input
          v-validate="{ required: true, agree: true }"
          name="agree"
          :checked="agree"
          type="checkbox"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        phone:'',
        code:'',
        password:'',
        password1:'',
        // 是否同意协议
        agree:true
      } 
    },
    mounted() {
      
    },
    methods: {
      // 获取验证码
      async getCode(){
        // 获取到验证码
        try {
          this.phone && (await this.$store.dispatch('getCode',this.phone))
          // 记不住就这样写
          console.log(this.$store);
          this.code = this.$store.state.user.code
        } catch (error) {
          console.log(error);
        }
      },
      // 用户注册 
      async   userRegister(){
        // 全部表单验证成功才能跳转
        const success = await this.$validator.validateAll();
        if(success){
          // 如果成功，路由跳转
          try {
              // 有了这句话下面就不用写this了
              const {phone,code,password,password1} = this
              if(phone && code && password==password1){
                  await this.$store.dispatch('userRegister',{phone,code,password})
                  this.$router.push('/login')
             }
                } catch (error) {
              alert(error.message)
            }
        }
          }
    },
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>