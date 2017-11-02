<template>
  <input class="syncpo-text__input"
    :type="inputData && inputData.type ? inputData.type: 'text'"  
    :class="inputData && inputData.classes"
    :placeholder="inputData && inputData.placeholder"
    :value="inputVal"
    :readonly="inputData && inputData.readonly ? true : false"
    @keyup="getKeyUp"
    @mousewheel="getWheel"/>
</template>

<script>
export default {
  props: ['inputData', 'initVal', 'itemData'],
  data() {
    return {
      inputVal: ''
    }
  },
  mounted() {
    this.initValueData()
  },
  beforeUpdate() {
    this.initValueData()
  },
  methods: {
    initValueData() {
      // 初始化input框
      if (
        this.inputData &&
        this.inputData.defaultValue &&
        this.inputData.inputFn
      ) {
        this.inputVal = this.inputData.defaultValue.name
        setTimeout(() => {
          this.inputData.inputFn(this.$el, this.itemData, this.inputData)
        }, 0)
        return this.inputData.defaultValue.name
      } else {
        if (this.initVal) {
          this.inputVal = this.initVal
        }
      }
    },
    getWheel(event) {
      // 鼠标中间滚轮事件
      setTimeout(() => {
        if (this.inputData && this.inputData.inputFn) {
          this.inputData.inputFn(event, this.itemData, this.inputData)
        }
      }, 0)
    },
    getKeyUp(event) {
      // 键盘按下后离开事件
      if (
        this.inputData &&
        this.inputData.type === 'number' &&
        this.inputData.inputFn
      ) {
        this.inputData.inputFn(event, this.itemData, this.inputData)
      }
    }
  }
}
</script>

<style scoped>
.syncpo-text__input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dde2ef;
  box-sizing: border-box;
  color: #515163;
  display: inline-block;
  font-size: inherit;
  height: 34px;
  line-height: 1;
  outline: none;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  cursor: pointer;
}
.syncpo-text__input.select-input {
  padding-right: 35px;
}
.syncpo-text__input.select-input:hover:not(:focus) {
  border-color: #c0c7da;
}
.syncpo-text__input.default-input:hover:not(:focus) {
  border-color: #2a80f0;
}
.syncpo-text__input:focus {
  border-color: #2a80f0;
  box-shadow: 0 0 0 3px #ccdef7;
}
.is-error .syncpo-text__input {
  border-color: #f44336 !important;
}
</style>
