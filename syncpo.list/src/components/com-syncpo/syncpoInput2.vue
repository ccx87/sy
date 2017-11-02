<template>
    <div :class="['syncpo-input-wrap',{'syncpo-input-focus':isFocus}, {'syncpo-input-error': isError}]" ref="syncpoInput">
        <div class="syncpo-input-left">
            <span :class="iconClass"></span>
            <slot name="left"></slot>
        </div>
        <div class="syncpo-input">
            <input :type="inputType" @focus="focusEv()" @blur="blurEv()" 
                @input="updateValue($event.target.value)" 
                :placeholder="inputData && inputData.placeholder" required>
        </div>
        <div :class="['syncpo-input-right', {'disabled': inputData && inputData.btnDisabled}]" @click="inputData && !inputData.btnDisabled && inputData.btnFn()">
            <slot name="right">{{this.inputData && this.inputData.btnText}}</slot>
        </div>   
    </div>

</template>
<script>
export default {
    name: 'syncpo-input',
    props:['inputData'],
    data(){
        return{
            isFocus: false,
            isVaild: true,
            isError: false
        }
    },
    mounted(){
        console.log(this, this.value);
    },
    computed: {
        iconClass() {
            return {
                'iconfont icon-password': this.inputData && this.inputData.mode === 'password',
                'iconfont icon-member': this.inputData && this.inputData.mode === 'member'
            }
        },
        inputType() {
            return this.inputData ? this.inputData.type === 'password' ? 'password' : this.type === 'number' ? 'number' : 'text' : 'text'
        }
    },
    methods:{
        focusEv(){
            this.isFocus = true;
        },
        blurEv(){
            this.isFocus = false;
        },
        updateValue(value){
            console.log(value);
            if( this.inputData && this.inputData.regexFn ) {
               const isBool = this.inputData.regexFn(value);
               console.log("组件里的正则判断返回值：",isBool)
               if (!isBool) {
                   this.isError = true
               }else {
                   this.isError = false
               }
            }
        }
        
    }
}
</script>
<style scoped>
    input {
        border: none;
    }
    .syncpo-input-wrap {
        margin-bottom: 18px;
        height: 48/16rem;
        background: #fff;
        font-size:18/16rem;
        display: flex;
        align-items:center;
        border-bottom: 1px solid #ececec;        
    }
    .syncpo-input-wrap.syncpo-input-focus {
        border-color: #6866eb;
    }
    .syncpo-input-wrap.syncpo-input-error {
        border-color: #D61D1D;
    }
    .syncpo-input-wrap .syncpo-input-left {
        width: 30/16rem;
        color: #c1c1c1;        
    }
    .syncpo-input-wrap .iconfont {
        font-size:18/16rem;
    }
    .syncpo-input-wrap .syncpo-input {
        width: 1rem;
        font-size:18/16rem;
        padding-left: 12/16rem;
        flex: 1;
    }
    .syncpo-input-wrap .syncpo-input input {
        width: 100%;
    }
    .syncpo-input-wrap .syncpo-input input:focus {
        font-size:inherit;
        color: #333;
        line-height: 24/16rem;
        border: none;
        outline: none;
        box-shadow: none;
        caret-color:#6866eb;      
    }
    .syncpo-input-wrap .syncpo-input-right {
        flex: 0 0 auto;
        white-space: nowrap;
        font-size: .8rem;        
    }
    .syncpo-input-wrap .syncpo-input-right:not(.disabled) {
        cursor: pointer;
    }
</style>