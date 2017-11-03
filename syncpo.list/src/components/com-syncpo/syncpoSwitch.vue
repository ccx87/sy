<template>
  <div class="syncpo-default-switch">
    <div class="switch-item" :class="$route.path === item.path ? 'active' : null" v-for="item in options">
      <router-link class="switch-link" :to="{path: item.name}">{{item.text}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options']
}
</script>

<style scoped>
  .syncpo-default-switch {
    display: flex;
    align-items: center;
    justify-content: space-around;  
    background: rgb(240, 241, 244);
    height: 60px;
    position: relative;
    overflow: hidden;
  }
  .switch-item {
    width: 100%;   
    font-weight: bold;
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;    
  }
  .switch-link {
    color: rgb(197, 197, 197);
    text-decoration: none;
    line-height: 60px;
  }
  .active .switch-link{
    color: rgb(103, 97 ,239);
  }
  .active::before {
    content: '';
    position: absolute;
    bottom: -8px;
    width: 16px;
    height: 16px;
    background: rgb(255, 255, 255);
    transform: rotate(45deg);
  }
</style>
