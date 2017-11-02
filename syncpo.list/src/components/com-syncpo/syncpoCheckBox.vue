<template>
  <div class="syncpo-default-checkbox">
    <span class="sd-checkbox">
      <label class="label-checkbox" @click="getCheck" :class="itemData &&itemData.checked ? 'is-checked' : null">
        <input type="checkbox" name="sd-checkbox" />
        <i class="icon"></i>
        <span></span>
      </label>
    </span>
  </div>
</template>

<script>
export default {
  props: ['checkboxData', 'itemData'],
  methods: {
    getCheck(event) {
      if (this.checkboxData && this.checkboxData.checkedFn) {
        this.checkboxData.checkedFn(event, this.itemData)
      }
    }
  }
}
</script>

<style scoped>
.syncpo-default-checkbox input[type='checkbox'] {
  opacity: 0;
  outline: none;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  left: -999px;
}
.syncpo-default-checkbox .sd-checkbox {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.syncpo-default-checkbox .label-checkbox {
  color: #515163;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.syncpo-default-checkbox .icon {
  display: inline-block;
  position: relative;
  border: 1px solid #dfe2ec;
  border-radius: 4px;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  background-color: #fff;
  z-index: 1;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
.syncpo-default-checkbox .icon:hover {
  border-color: #f57846;
}
.syncpo-default-checkbox .icon::after {
  box-sizing: content-box;
  content: '';
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 8px;
  left: 5px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 4px;
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
  transform-origin: center;
}
.syncpo-default-checkbox .is-checked .icon {
  background-color: #f57846;
  border-color: rgb(254, 95, 32);
}
.syncpo-default-checkbox .is-checked .icon::after {
  transform: rotate(45deg) scaleY(1);
}
</style>
