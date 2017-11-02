<template>
  <div class="body">
    <div class="login">
      <h1>Hello word</h1>
      <s-Input :inputData="memberInputData"></s-Input>
      <s-Input :inputData="passwordInputData"></s-Input>
      <router-link class="login-button" to="/list">登录</router-link>
    </div>
  </div>
</template>

<script>
import sInput from './com-syncpo/input2.mixin.js'
import { INPUT_MODE, GET_REGEX_MATCH } from '../util/locaData';
import { Tool } from '../util/tool';
export default {
  name: 'Login',
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
          btnText: '忘记密码？',
          btnFn: () => {
              console.log('跳转到忘记密码页面')
          },
          btnDisabled: false,
          regexFn: this.regexPassword,
          placeholder: '请输入密码'
      }
    }
  },
  methods:{
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
<style>
  .body {
    line-height: 1.6;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif;
    color: #333;   
    max-width: 640px;
    margin: 0 auto;  
    border: 1px solid #E1E1E1;
  }
  .login {
    min-width: 320px;
    background:#fff;
    padding:3.5rem;
  }
  .tab-contents {
    padding: 0;
  }
  .tab-contents .input-wrap .weui-cells:before {
    display: none;
  }
  .tab-contents .input-wrap .weui-cell {
    padding-left:0;
    padding-right: 0;    
  }
  .tab-contents .input-wrap .iconfont {
    color: #EAECEB;
    margin-right:.8rem;
  }
  .tab-contents .input-wrap .input-right-btn {
    font-size: 14/16rem;
    color: #EAECEB;
    border: none;
    background: none;
    box-shadow: none;
    outline: none;   
  }
  .tab-contents .input-wrap .input-right-btn:disabled {
    color:#aaa;
  }
  .tab-contents .text-center {
    font-size: 14/16rem;
  }
  .tab-contents .text-center span {
    margin-left: .6rem;
    color: #EAECEB;    
  }
  .login-button {
    display: inline-block;
    width: 100%;
    padding: 10px 0;
    color: #FFF;
    border: 1px solid #EAECEB;
    border-radius: 4px;
    font-size: 16px;
    background: #6866eb;
    cursor: pointer;
  }
</style>

