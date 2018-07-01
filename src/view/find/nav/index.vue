<template>
  <div class="find-nav">
      <nav class="find-nav-box">
          <ul class="clearfix">
              <li v-for="(nav,i) in findNavDatas" :key="i" class="tabItem pull-left">
                  <router-link tag="div" to="nav.path">
                      <a href="#">
                          <img :src="nav.imgSrc" alt="">
                      </a>
                      <!-- <span>{{nav.text}}</span> -->
                  </router-link>
              </li>
          </ul>
      </nav>
  </div>
</template>
<script>
import {findNavDatas} from '../../../utils/findNavDatas'
import '../../../assets/css/find/find-nav.css';
export default {
  data(){
      return {
          findNavDatas:findNavDatas
      }
  }
}
</script>

