<template>
  <div class="syncpo-default-select">
    <div class="sd-select" @click="dropDownSelect">      
      <syncpo-input :input-data="inputData" :item-data="itemData" :init-val="initVal"></syncpo-input>
      <i class="select-icon"></i>
      <span></span>
    </div>
    <div class="select-dropdown bd">
      <ul class="dropdown__list" v-if="options && options.length > 0">
        <li class="dropdown__list-item" v-for="item in options" :key="item.ouid" @click="selectOption(item, $event)">{{item.name}}</li>
      </ul>
      <p v-else class="sd__empty">无数据</p>
    </div>    
  </div>
</template>

<script>
import SyncpoInput from './input.mixin.js'
export default {
  mixins: [SyncpoInput],
  props: ['selectData', 'initVal', 'options', 'itemData'],
  data() {
    return {
      inputData: {
        classes: 'select-input',
        readonly: true,
        placeholder: this.selectData && this.selectData.placeholder,
        defaultValue: null,
        inputFn: this.selectData && this.selectData.selectFn
      }
    }
  },
  methods: {
    dropDownSelect(event) {
      // 触发下拉框
      event.stopPropagation()
      event.preventDefault()
      const targetDom = event.currentTarget && event.currentTarget.parentNode
      const selectDom = document.querySelector(
        '.syncpo-default-select.is-select'
      )
      if (selectDom && !targetDom.classList.contains('is-select')) {
        selectDom.classList.remove('is-select')
      }
      if (targetDom) {
        targetDom.classList.toggle('is-select')
      }
    },
    selectOption(item) {
      // 下拉列表选择
      if (!item) return
      this.inputData = {
        classes: 'select-input',
        readonly: true,
        placeholder: this.selectData && this.selectData.placeholder,
        defaultValue: item,
        inputFn: this.selectData && this.selectData.selectFn
      }
    }
  }
}
</script>

<style scoped>
.syncpo-default-select {
  position: relative;
  overflow: hidden;
}
.syncpo-default-select .sd-select {
  position: relative;
}
.syncpo-default-select .select-icon {
  position: absolute;
  width: 35px;
  height: 100%;
  right: 0;
  text-align: center;
  color: #f4f5f9;
  font-size: 12px;
  transition: transform 0.3s;
  transform: translateY(-50%) rotateZ(180deg);
  line-height: 16px;
  top: 50%;
  cursor: pointer;
  font-family: 'element-icons' !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
.syncpo-default-select.is-select .select-icon {
  transform: translateY(-50%);
}
.syncpo-default-select .select-icon::before {
  content: '\E603';
  font-size: 12px;
  color: #a2a7b4;
}
.syncpo-default-select .select-icon::after {
  content: '';
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
.syncpo-default-select .select-dropdown {
  position: absolute;
  width: 100%;
  z-index: 1001;
  border-radius: 2px;
  background-color: #fff;
  box-sizing: border-box;
  margin: 10px 0 5px;
  border: solid 1px #2a80f0;
  box-shadow: 0 0 0 3px rgba(42, 128, 240, 0.2);
}
.syncpo-default-select .bd {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s;
}
.syncpo-default-select.is-select {
  overflow: visible;
}
.syncpo-default-select.is-select .bd {
  max-height: 600px;
  transition-timing-function: ease-in;
}
.syncpo-default-select .sd__empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.dropdown__list {
  list-style: none;
  padding: 3px 5px;
  margin: 0;
  box-sizing: border-box;
}
.dropdown__list-item {
  font-size: 14px;
  padding: 8px 10px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #515163;
  height: 34px;
  line-height: 1.5;
  box-sizing: border-box;
  cursor: pointer;
}
.dropdown__list-item:hover {
  background-color: #f4f5f9;
}
</style>
