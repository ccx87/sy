<template>
  <div class="body index">
    <syncpo-slidebar :options="tab"></syncpo-slidebar>
    <div class="syncpo-panel">
      <div class="panel-page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SyncpoSlidebar from './com-syncpo/slideBar.mixin.js'
import { SLIDEBAR_MENU } from '../util/locaData';
export default {
  name: 'Home',
  mixins: [SyncpoSlidebar],
  data(){
    return{
      tab: SLIDEBAR_MENU
    }
  }
}
</script>
<style scoped>
  .body {
    line-height: 1.6;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif;
    color: #333;
  }
  .index {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;    
  }
  .syncpo-panel {
    position: absolute;
    top: 0;
    left: 200px;
    bottom: 0;
    width: calc(100% - 200px);
    overflow: auto;
    background-color: #f0f0f0;
    z-index: 1;
    transition: left .3s;    
  }
  .panel-page {
    margin: 10px;
    height: calc(100% - 20px);
  }
</style>

