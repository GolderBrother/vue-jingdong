<template>
  <div class="footer">
  	<footer class="fixBottomBox">
        <ul>
            <li :key="i" v-for="(nav,i) in navDatas" @click="changeTab(nav)" ref="tab" :class="i">
								<router-link tag="div" :to="nav.path" class="tabItem">
										<a href="javascript:;" class="tab-item-link">
												<img :src="nav.imgSrc" alt="" class="tab-item-icon" ref="tabImg">
										</a>
								</router-link>
            </li>
        </ul>
    </footer>
  </div>
</template>
<script>
import { navDatas } from "../../utils/navBottom";
export default {
  data() {
    return {
      navDatas: navDatas,
      imgSrcPrefix : '../src/assets/images/navBottom/'
    };
  },
  methods:{
    changeTab(nav){
      const _this = this;
      let tabImg = _this.$refs.tabImg;
      let imgName = nav.path.replace('/','');
      let imgNameArr = [];
      tabImg.forEach(function(item,index){
        _this.$refs.tabImg[index].setAttribute("src",_this.navDatas[index].imgSrc);
      });
      nav.imgSrc = _this.imgSrcPrefix + imgName + '-active.png';
    }
  },
  mounted() {
    let _this = this;
    let currentPath = _this.$router.history.current.path.replace('/','');
    let currentPathIndex = currentPath.indexOf("/");
    if(currentPathIndex !== -1){
      currentPath = currentPath.substring(0,currentPathIndex);
    }
    const activeIcon = _this.imgSrcPrefix + currentPath + '-active.png';
    _this.navDatas.map(function(item,index){
      if(item.imgSrc.indexOf(currentPath) !== -1 ){
        _this.$refs.tabImg[index].setAttribute("src",activeIcon)
      }
    })
  }
};
</script>
