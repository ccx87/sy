<template>
  <div class="syncpo-default-slideBar" style="width: 200px; overflow: auto;">
    <div class="slidebar-menu">
      <div class="logo-con"><img src="../../assets/logo.min.png"></div>
      <ul class="menu-list">
        <li class="menu-item" v-for="item in options" :class="{'active': $route.path === item.path}">
          <router-link class="menu-item-link" :to="{path: item.name}">{{item.text}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options'],
  mounted() {
    console.log(this.$route)
  },
  methods: {

  }
}
</script>

<style scoped>
.syncpo-default-slideBar {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 21;
  transition: width .3s;  
}
.slidebar-menu {
  width: 100%;
  height: 100%;
  background: rgb(73, 80, 96);
}
.logo-con {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.menu-list {
  width: auto;
  display: block;
  margin: 0;
  padding: 0;
  outline: 0;
  list-style: none;
  color: #495060;
  font-size: 14px;
  position: relative;
  z-index: 900;
  background: #495060;
}
.menu-item {
  display: block;
  outline: 0;
  padding: 14px 24px;
  list-style: none;
  font-size: 14px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: all .2s ease-in-out;
  color: hsla(0,0%,100%,.7);
  text-align: left;
}
.menu-item-link {
  color: hsla(0,0%,100%,.7);
}
.menu-item:hover, .menu-item:hover .menu-item-link {
  color: #fff;
  background: #495060;
}
.menu-item.active {
  color: #2d8cf0;
  border-right: 2px solid #2d8cf0; 
  background: #363e4f; 
}
.menu-item.active .menu-item-link {
  color: #2d8cf0;
}
</style>
