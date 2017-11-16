<template>
  <div class="syncpo-default-list"> 
    <div class="list-title flex flex-a-c">
      <div class="col-1 col-line">
        <div class="cell">
          <syncpo-check-box :checkbox-data="checkboxAllData" :item-data="allCheckStatus"></syncpo-check-box>
        </div>
      </div>
      <div class="col-2 col-line left"><div class="cell">商品/原物料编号</div></div>
      <div class="col-3 col-line left"><div class="cell">商品/原物料名称</div></div>
      <div class="col-4 col-line right"><div class="cell">结算价</div></div>
      <div class="col-5 col-line center"><div class="cell">标准单位</div></div>
      <div class="col-6 col-line center"><div class="cell">数量</div></div>
      <div class="col-7 col-line right"><div class="cell">金额合计</div></div>
      <div class="col-8 col-line center"><div class="cell">原因类别</div></div>
      <div class="col-9 col-line center"><div class="cell">原因</div></div>                                                           
    </div>
    <div class="list-content">
      <div v-for="item in listData" class="list-item" :key="item.ouid">
        <div class="flex flex-a-c">
          <div class="col-1 col-line">
            <div class="cell">
              <syncpo-check-box :checkbox-data="checkItemData" :item-data="item"></syncpo-check-box>
            </div>
          </div>
          <div class="col-2 col-line left"><div class="cell">{{item.skuId}}</div></div>
          <div class="col-3 col-line left"><div class="cell">{{item.skuName}}</div></div>
          <div class="col-4 col-line right"><div class="cell">{{item.settlePrice}}</div></div>
          <div class="col-5 col-line center"><div class="cell">{{item.uomName}}</div></div>
          <div class="col-6 col-line center">
            <div class="cell">
              <div class="default-item">
                <div class="item-input-panel" :class="item.count && item.count > 0 ? null : 'is-error' ">
                  <span class="required">*</span>
                  <syncpo-input :input-data="inputData" :init-val="item.count > 0 ? item.count : null" :item-data="item"></syncpo-input>
                </div>
                <div class="item-error-msg">请填写正确数值</div>
              </div>              
            </div>
          </div>
          <div class="col-7 col-line right"><div class="cell">{{item.price}}</div></div>
          <div class="col-8 col-line center">
            <div class="cell">
              <div class="default-item">
                <div class="item-input-panel" :class="!item.reasonCateOuid || item.reasonCateOuid === '' ? 'is-error' : null ">
                  <span class="required">*</span>              
                  <syncpo-select :select-data="selectData1" :key="item.reasonCateOuid" :init-val="itemReasonCateOuidVal(item)" :options="reasonTypeList" :item-data="item"></syncpo-select>
                </div>
                <div class="item-error-msg">请填写原因类别</div>
              </div>              
            </div>
          </div>
          <div class="col-9 col-line center">
            <div class="cell">
              <div class="default-item">
                <div class="item-input-panel" :class="!item.reasonOuid || item.reasonOuid === '' ? 'is-error' : null ">
                  <span class="required">*</span>               
                  <syncpo-select :select-data="selectData2" :key="item.reasonOuid" :init-val="itemReasonOuidVal(item)" :options="item.reasonList" :item-data="item"></syncpo-select>
                </div>
                <div class="item-error-msg">请选择原因</div>
              </div>               
            </div>             
          </div>
        </div>
      </div>
      <div v-if="!listData || listData.length === 0" slot='empty' class="empty-list-data">
        <div class="empty-content">
          <div>
            没有找到相关数据
          </div>
        </div>
      </div>      
    </div>
    <router-link class="back-button" to="/signIn">返回</router-link>
  </div>
</template>

<script>
import SyncpoCheckBox from './com-syncpo/checkBox.mixin.js'
import SyncpoSelect from './com-syncpo/select.mixin.js'
import SyncpoInput from './com-syncpo/input.mixin.js'

// 合并数组且去除重复
// import _union from 'lodash/union'
// 移除数组array中所有和 values 相等的元素
// import _pull from 'lodash/pull'

export default {
  name: 'List',
  mixins: [SyncpoCheckBox, SyncpoSelect, SyncpoInput],
  // props: ['listData', 'reasonList', 'reasonTypeList'],
  data() {
    return {
      listData: [{ cateName: '酒水', checked: false, count: '', error: true, price: 0, reasonCateOuid: '', reasonList: [], reasonOuid: '', settlePrice: 1, skuCateName: '菜品/酒水', skuId: '0000', skuName: '芬达', skuOuid: '_n5spDW3QGWchexZ16rsJA', stock: -16, stockType: '预制品', uomName: '升' },
        { cateName: '酒水', checked: false, count: '', error: true, price: 0, reasonCateOuid: '', reasonList: [], reasonOuid: '', settlePrice: 1, skuCateName: '菜品/酒水', skuId: '0000', skuName: '芬达', skuOuid: '_n4spDW3QGWchexZ16rsJA', stock: -16, stockType: '预制品', uomName: '升' },{ cateName: '酒水', checked: false, count: '', error: true, price: 0, reasonCateOuid: '', reasonList: [], reasonOuid: '', settlePrice: 1, skuCateName: '菜品/酒水', skuId: '0000', skuName: '芬达', skuOuid: '_n5spDW3QGWchexZ16rsJA', stock: -16, stockType: '预制品', uomName: '升' },
        { cateName: '酒水', checked: false, count: '', error: true, price: 0, reasonCateOuid: '', reasonList: [], reasonOuid: '', settlePrice: 1, skuCateName: '菜品/酒水', skuId: '0000', skuName: '芬达', skuOuid: '_n4spDW3QGWchexZ16rsJA', stock: -16, stockType: '预制品', uomName: '升' },{ cateName: '酒水', checked: false, count: '', error: true, price: 0, reasonCateOuid: '', reasonList: [], reasonOuid: '', settlePrice: 1, skuCateName: '菜品/酒水', skuId: '0000', skuName: '芬达', skuOuid: '_n5spDW3QGWchexZ16rsJA', stock: -16, stockType: '预制品', uomName: '升' }], //props
      reasonList: [{name: "商品过期", ouid: "VKWMorAiTbW763E2I7LA0g", reasonCateOuid: "zcD_yGttRIm4SRd5SQw4nw"}], //props
      reasonTypeList: [{name: "报废", ouid: "zcD_yGttRIm4SRd5SQw4nw"}], //props
      QuidArray: [],
      allCheckStatus: { checked: false },
      checkboxAllData: {
        checkedFn: this.checkAllFn
      },
      checkItemData: {
        checkedFn: this.checkItemFn
      },
      inputData: {
        type: 'number',
        classes: 'default-input',
        inputFn: this.getCountData
      },
      selectData1: {
        mode: 'select1',
        placeholder: '请选择原因类别',
        options: [],
        selectFn: this.getSelect1Data
      },
      selectData2: {
        mode: 'select2',
        placeholder: '请选择原因',
        selectFn: this.getSelect2Data
      }
    }
  },
  computed: {},
  methods: {
    itemReasonCateOuidVal(item) {
      // 初始化原因类别
      if (item && !item.checked) {
        // 更新全选按扭状态
        this.allCheckStatus.checked = false
      }
      if (
        !item ||
        !item.reasonCateOuid ||
        item.reasonCateOuid === '' ||
        !this.reasonTypeList ||
        this.reasonTypeList.length === 0
      ) {
        return null
      }
      const findObj = this.reasonTypeList.find(
        it => it.ouid === item.reasonCateOuid
      )
      return findObj ? findObj.name : null
    },
    itemReasonOuidVal(item) {
      // 初始化原因
      if (
        !item ||
        !item.reasonOuid ||
        item.reasonOuid === '' ||
        !this.reasonList ||
        this.reasonList.length === 0
      ) {
        return null
      }
      const findObj = this.reasonList.find(it => it.ouid === item.reasonOuid)
      if (findObj && item.reasonList && item.reasonList.length === 0) {
        // 下拉原因列表
        const s2list = this.reasonList.filter(
          it => it.reasonCateOuid === item.reasonCateOuid
        )
        this.$set(item, 'reasonList', s2list)
      }
      return findObj ? findObj.name : null
    },
    checkAllFn(event) {
      // 全选
      if (!event) return
      event.stopPropagation()
      event.preventDefault()
      this.allCheckStatus.checked = !this.allCheckStatus.checked
      this.listData.forEach(item => {
        item.checked = this.allCheckStatus.checked
      })
    },
    checkItemFn(event, item) {
      // 单选
      if (!event || !item) return
      event.stopPropagation()
      event.preventDefault()
      item.checked = !item.checked
      if (this.listData.some(item => item.checked === false)) {
        this.allCheckStatus.checked = false
      } else {
        this.allCheckStatus.checked = true
      }
    },
    getCountData(event, item) {
      // 数量框处理
      if (!event || !item) return
      event.stopPropagation()
      event.preventDefault()
      // const reg = /^\+?[1-9]\d*$/
      const reg = /(^(\d{1,6}|\d{1,6}\.\d{1,3})$)/
      const val = event.target.value
      const setCountFn = num => {
        item.count = num
        if (num === 0) {
          item.error = true
          item.price = num
        } else {
          item.error = false
          item.price = this.toFixed ? this.toFixed(num * item.settlePrice, 2) : parseFloat(num * item.settlePrice).toFixed(2)
        }
      }
      if (val.indexOf('e') > -1) {
        setCountFn(0)
        return
      }
      if (reg.test(val)) {
        setCountFn(parseInt(val, 10))
      } else {
        setCountFn(0)
      }
      this.$emit('compute-total')
    },
    getSelect1Data(target, item, passData) {
      // 原因类别选择
      if (!target || !item || !passData || !passData.defaultValue) return
      item.reasonCateOuid = passData.defaultValue.ouid
      item.reasonList = this.reasonList.filter(
        it => it.reasonCateOuid === passData.defaultValue.ouid
      )
    },
    getSelect2Data(target, item, passData) {
      // 原因选择
      if (!target || !item || !passData || !passData.defaultValue) return
      item.reasonOuid = passData.defaultValue.ouid
    },
    oneBodyClick() {
      // 页面任意点击，关闭列表原因下拉框
      const selectDom = document.querySelector(
        '.syncpo-default-select.is-select'
      )
      if (selectDom) {
        selectDom.classList.remove('is-select')
      }
    }
  },
  mounted() {
    document.body.addEventListener('click', this.oneBodyClick)
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.oneBodyClick)
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .flex-0 {
    flex: 0 0 auto;
  }
  .flex-1 {
    flex: 1 1 auto;
  }
  .flex-a-c {
    align-items: center;
  }
  .flex-j-c {
    justify-content: center;
  } 
  .empty-list-data div {
      padding: 5px 0;
      color: #dde2ef;
      font-size: 16px;
  }   
  .syncpo-default-list {
    position: relative;
    /*overflow: hidden;*/
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    height: calc(100% - 40px);
    background-color: #fff;
    border: 1px solid rgb(223, 226, 236);
    font-size: 14px;
    color: #515163;
  }
  .list-item-panel {
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    transition: all .2s ease-in-out;
    border-color: #e9eaec;    
  }
  .syncpo-default-list .left {
    text-align: left;
  }
  .syncpo-default-list .center {
    text-align: center;
  }
  .syncpo-default-list .right {
    text-align: right;
  }
  .syncpo-default-list input[type='number'] {
    width: 100%;
  }
  .syncpo-default-list .col-line {
    padding: 4px 0;
    line-height: 36px;
  }
  .syncpo-default-list .cell {
    text-align: inherit;
    padding: 0 10px;
    box-sizing: border-box;    
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  .syncpo-default-list .list-title .cell {
    overflow: hidden;
  }
  .list-content {
    overflow: auto;
    height: calc(100% - 45px);
  }
  .list-title,
  .list-item {
    border-bottom: 1px solid #dde2ef;
  }
  .list-title > div:not(:last-child) {
    border-right: 1px solid #dde2ef;
  }
  .list-title {
    font-weight: bold;
    background-color: #f8f8f9;
  }
  .list-title .col-1,
  .list-item .col-1 {
    width: 3%;
    min-width: 38px;
  }
  .list-title .col-2,
  .list-item .col-2 {
    width: 15%;
  }
  .list-title .col-3,
  .list-item .col-3 {
    width: 15%;
  }
  .list-title .col-4,
  .list-item .col-4 {
    width: 9%;
  }
  .list-title .col-5,
  .list-item .col-5 {
    width: 10%;
  }
  .list-title .col-6,
  .list-item .col-6 {
    width: 12%;
  }
  .list-title .col-7,
  .list-item .col-7 {
    width: 10%;
  }
  .list-title .col-8,
  .list-item .col-8 {
    width: 13%;
  }
  .list-title .col-9,
  .list-item .col-9 {
    width: 13%;
  }
  .syncpo-default-list .default-item {
    position: relative;
    margin-bottom: 15px;
  }
  .syncpo-default-list .required {
    position: absolute;
    left: -10px;
    top: 5px;
    color: rgb(244, 67, 54);
  }
  .syncpo-default-list .item-error-msg {
    display: none;
    color: rgb(244, 67, 54);
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    text-align: left;    
  }
  .syncpo-default-list .is-error + .item-error-msg {
    display: block;
  }
  .syncpo-default-list .empty-table-data {
    display: flex;
    height: 100%;
    margin: 0;
    > .empty-content {
      margin: auto;
      text-align: center;
    }
  }
  .back-button {
    display: inline-block;
    width: 100%;
    padding: 10px 0;
    color: #666;
    border: 1px solid #EAECEB;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    background: #f0f1f4; 
  }
</style>

