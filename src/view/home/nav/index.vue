<template>
	<div class="home_n">
		<nav class="m_nav">
            <ul>
                <li class="nav_item" :key="item.itemImgUrl" v-for="item in navItem">
                    <a href="#" class="nav_item_link">
                        <img :src="item.itemImgUrl" alt="">                   
                        <span>{{item.itemText}}</span>
                    </a>
                </li>
            </ul>
        </nav>
	</div>
</template>
<script>
import { navItems } from "./navItem";
export default {
  data() {
    return {
      navItem: []
    };
  },
  methods: {
    getDatas() {
      let _this = this;
    //   for in 循环第一个值为索引
    //   for(var item in navItems){
    //       console.log(navItems[item]);
    //       navItems[item].itemImgUrl = navItems[item].itemImgUrl.replace('../../','/src/');
    //       _this.navItem.push(navItems[item]);
    //   };
    //   for in循环第一个值为每一项
      for(var item of navItems){
          item.itemImgUrl = item.itemImgUrl.replace('../../','/src/');
          _this.navItem.push(item);
      };
    }
  },
  mounted() {
    this.getDatas();
  }
};
</script>
