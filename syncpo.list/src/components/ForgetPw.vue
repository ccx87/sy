<template>
  <div class="body">
    <div class="signUp">
      <s-Input :inputData="memberInputData"></s-Input>
      <s-Input :inputData="passwordInputData"></s-Input>
      <button class="signUp-button" @click="submitNewPw">提交</button>
      <div class="div-link"><router-link class="link" to="/signIn">返回登录</router-link></div>
    </div>
  </div>
</template>

<script>
import sInput from './com-syncpo/input2.mixin.js'
import { INPUT_MODE, GET_REGEX_MATCH } from '../util/locaData';
import { Tool } from '../util/tool';
export default {
  name: 'signIn',
  mixins: [sInput],
  data(){
    return{
      memberInputData: {
          mode: 'member',
          value: '', //正式时此值只能在用户输入后返回
          type: 'text',
          btnText: '获取验证码',
          btnFn: this.getCode,  
          btnDisabled: false,
          regexFn: this.regexPhone,
          placeholder: '请输入会员名称'
      },
      passwordInputData: {
          mode: 'password',
          value: '',
          type: 'password',
          regexFn: this.regexPassword,
          placeholder: '请输入新密码'
      }
    }
  },
  methods:{
    submitNewPw() {
      alert('新密码提交成功, 将跳转到登录页面')
      this.$router.push('signIn')
    },
    regexPhone(value) {
        console.log('正在进行正则判定：', value)
        const isBool = Tool.regexBoolean(value, GET_REGEX_MATCH.mobile)
        console.log('正则判断返回值：', isBool)
        return isBool
    },
    regexPassword(value) {
        console.log('正在进行正则判定：', value)
        const isBool = Tool.regexBoolean(value, GET_REGEX_MATCH.password_six)
        console.log('正则判断返回值：', isBool)
        return isBool
    },
    getCode() {
        console.log('正在获取验证码')
        const code = 12345;
        let timer = null;
        const updateFn = (str, disd) => {
            this.memberInputData.btnText = str
            this.memberInputData.btnDisabled = disd                    
        }
        const timerFn = time => {
            updateFn('重新获取('+ time +'s)', true)
            timer = setTimeout(() => {
                if (time <= 0) {
                    clearTimeout(timer)
                    updateFn('重新获取', false)
                    return
                }
                time--
                updateFn('重新获取('+ time +'s)', true)
                timerFn(time)
            }, 1000)
        }
        timerFn(10)
    }
  }
}
</script>
<style scoped>
  .signUp {
    min-width: 320px;
    background:#fff;
    padding:3.5rem;
  }
  .signUp-button {
    display: inline-block;
    width: 100%;
    padding: 12px 0;
    color: #FFF;
    border: 1px solid #EAECEB;
    border-radius: 5px;
    font-size: 16px;
    background: #6866eb;
    cursor: pointer;
    margin-top: 50px;
  }
  .div-link {
    margin-top: 40px;
    font-size: 1.125rem;
    color: #333;
  }
  .div-link .link {
    text-decoration: none;
    color: rgb(103, 97 ,239);
  }  
</style>

