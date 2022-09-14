// vee-validate 插件表单验证区域
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is: (filed) => `${filed}必须与密码相同`
    },
    attributes:{
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        isCheck:'协议'
    }
})
//自定义校验规则
VeeValidate.Validator.extend("协议", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
});