<template>
  <div class="nav-panel">
    <syncpo-scrollnav :options="tab" :width="70"></syncpo-scrollnav>
    <router-view></router-view>
  </div>
</template>

<script>
import SyncpoScrollnav from './com-syncpo/scrollNav.mixin.js'
import { SCROLL_NAV } from '../util/locaData';
export default {
  name: 'nav',
  mixins: [SyncpoScrollnav],
  data(){
    return{
      tab: SCROLL_NAV
    }
  }
}
</script>
<style scoped>
  .nav-panel {
    height: 100%;
  }
  .page {
    height: calc(100% - 55px);
    background: #FFF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

