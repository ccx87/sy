<template>
  <div class="syncpo-default-scrollnav">
    <div class="scroller-demo plus-transition" ref="scrollerDemo" :style="{'left': 2 * width + 'px'}">
      <div class="nav-item" :style="{'width': width + 'px'}" v-for="(item, index) in menuData" :key="item.path" :class="item.path===$route.path ? 'selected': null" @click="handlePath(index, $event)">{{item.text}}</div> 
    </div>
    <div class="tabline plus-transition" :style="{'left': 2 * width + 'px', 'width': width + 'px'}" ref="tabLine"></div>
  </div>
</template>

<script>
export default {
  props: ['options', 'width'],
  data() {
    return {
      drawing: false, // 是否在滑动
      startX: 0, // 开始滑动时的偏移量
      moveX: 0, // 滑动时的偏移量
      resultX: 0, // 时时偏移量
      diffX: 0, // 每次end后滑动的值
      lineX: 0, // 每次end后横块的值
      tabIndex: 0, // 下标
      dir: 0 // 方向 >=0为向左滑动，<0为向右滑动
    }
  },
  created() {
    this.initMenu()
  },
  mounted() {
    if (
      !this.$router ||
      !this.$router.history ||
      !this.$router.history.current
    ) {
      return
    }
    this.initTabLeft(
      // 初始化定位当前菜单
      this.menuData.findIndex(
        item => item.path === this.$router.history.current.path
      )
    )
    this.scrollDom = this.$refs.scrollerDemo
    this.lineDom = this.$refs.tabLine
    if (this.scrollDom) {
      // Firefox 和 Chrome支持passive
      this.scrollDom.addEventListener('touchstart', this.touchStartDemo, {
        passive: true
      })
    }
  },
  destroyed() {
    if (this.scrollDom) {
      this.scrollDom.removeEventListener('touchstart', this.touchStartDemo)
    }
  },
  methods: {
    initMenu() {
      // 初始化参数
      if (!this.menuData) {
        this.menuData = this.options // 菜单数组
        this.tabWidth = this.width // 单块菜单宽度
        this.virtualMenu = Object.assign([], this.menuData)
      }
      const len = this.menuData.length
      this.tabRange = (i => {
        const tRarray = []
        while (i--) {
          tRarray.push(parseInt(-i * this.tabWidth, 10))
        }
        return tRarray
      })(len).reverse() // 滑动的区间值
      this.range = [0, -this.tabWidth * (len - 1)] // 滑动的最大最小区间
      this.maxRange = this.tabWidth // 最大超出值
      this.minRange = -(this.tabWidth * len) // 最小超出值
    },
    tabLeft(index) {
      index = index >= 0 ? index : 0
      const lv = index * this.tabWidth
      // 初始化时和点击菜单时-定位在最中间
      if (this.scrollDom && this.lineDom) {
        this.lineX = this.memorize(() => lv)(lv)
        this.diffX = this.memorize(() => -lv)(-lv)
        this.setStyleDom(-lv, 0)
        this.tabIndex = index
      }
    },
    initTabLeft(index) {
      this.$nextTick(() => {
        this.tabLeft(index)
      })
    },
    handlePath(idx, event) {
      if (event) {
        event.stopPropagation()
        event.preventDefault()
        if (this.drawing) return
        if (idx === this.tabIndex) return
        console.log('点击：', idx)
      }
      this.tabLeft(idx)
      // 延时后tab栏不会抖动
      setTimeout(() => {
        this.$router.push({ path: this.menuData[idx].path })
      }, 100)
    },
    memorize(f, ...args) {
      // 记忆函数
      const cache = {} // 将值保存在闭包内
      return function() {
        // 对应选中的菜单在中间显示
        const key = args.length + Array.join.call(args, ',')
        if (key in cache) return cache[key]
        else return cache[key] = f.apply(this, args)
      }
    },
    setStyleDom(sval, lval) {
      const s_rx = arguments.length === 0 ? this.resultX : sval
      const l_rx = arguments.length === 0 ? this.resultX + this.lineX : lval
      this.scrollDom.style.webkitTransform = this.scrollDom.style.transform =
        'translate3d(' + s_rx + 'px, 0px, 0px)'
      this.lineDom.style.webkitTransform = this.lineDom.style.transform =
        'translate3d(' + l_rx + 'px, 0px, 0px)'
    },
    rafThrottle(fn, ...args) {
      // touchmove节流
      let ticking = false
      const update = function() {
        ticking = false
        if (fn) {
          fn.apply(this, args)
        }
      }
      const requestTick = () => {
        if (!ticking) {
          this.raf = requestAnimationFrame(update)
        }
        ticking = true
      }
      requestTick()
    },
    touchStartDemo(event) {
      const e = event || window.event
      this.startX = e.touches[0].pageX
      document.addEventListener('touchmove', this.touchMoveDemo, {
        passive: true
      })
      document.addEventListener('touchend', this.touchEndDemo, {
        passive: true
      })
    },
    touchMoveDemo(event) {
      const e = event || window.event
      if (e.touches.length > 1 || (e.scale && e.scale !== 1)) return
      this.moveX = e.changedTouches[0].pageX
      this.resultX = this.moveX - this.startX
      this.resultX += this.diffX
      if (this.resultX > this.maxRange) {
        this.resultX = this.maxRange
      }
      if (this.resultX < this.minRange) {
        this.resultX = this.minRange
      }
      this.dir = this.resultX
      // 性能优化 16.6ms
      this.drawing = true
      this.rafThrottle(this.setStyleDom)
    },
    touchEndDemo() {
      document.removeEventListener('touchmove', this.touchMoveDemo)
      document.removeEventListener('touchend', this.touchEndDemo)
      if (this.drawing) {
        this.drawing = false
        // 超出了则设置相应头尾值
        // if (this.resultX > this.range[0] || this.resultX < this.range[1]) {
        //   if (this.resultX > this.range[0]) {
        //     this.resultX = this.range[0]
        //   } else {
        //     this.resultX = this.range[1]
        //   }
        // }
        // 计算相应滑动范围
        let i = this.tabRange.length
        this.tR = Object.assign([], this.tabRange)
        while (i--) {
          this.tR[i] = Math.abs(this.tR[i] - this.resultX)
        }
        // 获取最接近区间值的下标
        const idx = this.tR.findIndex(r => r === Math.min(...this.tR))
        this.resultX = this.tabRange[idx]
        this.handlePath(idx)
        cancelAnimationFrame(this.raf)
      }
    }
  }
}
</script>

<style scoped>
.syncpo-default-scrollnav {
  position: relative;
  height: 35px;
  margin: 10px 0;
  overflow: hidden;
}
.scroller-demo {
  z-index: 100;
  position: absolute;
  overflow: visible;
  white-space: nowrap;
  border: none;
  outline: none;
  top: 0;
  width: 1000%;
  display: flex;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.plus-transition {
  transition: all 0.33s cubic-bezier(0, 0, 0.58, 1);
}
.scroller-demo .nav-item {
  display: inline-block;
  line-height: 28px;
  text-align: center;
  flex: 0 0 auto;
  color: #495060;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
}
.scroller-demo .nav-item.selected {
  color: #fdb434;
/*  font-size: 22px;*/
}
.tabline {
  position: absolute;
  bottom: 0;
  height: 3px;
  background: #fdb434;
}
</style>
