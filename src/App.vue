<template>
  <div id="app">
  <loading v-show="loading"></loading>
  <router-view></router-view> 
  <NavBottomView v-show="shownav"></NavBottomView> 
  </div>
</template>

<script>
import NavBottomView from './components/navBottom/NavBottom.vue';
//import BottomView from './components/Bottom.vue';
import {mapGetters,mapActions} from 'vuex';
export default {
  name: 'app',
  computed:mapGetters(['loading','shownav']),
  components:{
    NavBottomView
   // BottomView
  }
}
</script>

<style>
@import './assets/css/index.css';
</style>
