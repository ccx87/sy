<template>
  <div class="body">
    <syncpo-Switch :options="tab"></syncpo-Switch>
    <router-view></router-view>
  </div>
</template>

<script>
import SyncpoSwitch from './com-syncpo/switch.mixin.js'
import { SWITCH_TAB } from '../util/locaData';
export default {
  name: 'Home',
  mixins: [SyncpoSwitch],
  data(){
    return{
      tab: SWITCH_TAB
    }
  }
}
</script>
<style scoped>
  .body {
    line-height: 1.6;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif;
    color: #333;   
    max-width: 450px;
    margin: 0 auto;
  }
</style>

