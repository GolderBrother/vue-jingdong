<template>
  <div class="home_ban">
		<div class="m_banner clearfix" id="my_banner">
            <ul class="banner_box">
                <li v-for="(v,i) in imgDatas" :key="i">
                    <!-- <img :src="`../../assets/images/l${(i+1)}.jpg`" alt="" /> -->
                    <img :src="v" alt="" />
                </li>
            </ul>
            <ul class="point_box">
                <li v-for="(vv,i) in imgDatas" :key="i"></li>  
            </ul>
        </div>
	</div>
</template>
<script>
import {findNavDatas} from '../../../utils/findBannerDatas';
export default {
  data(){
    return {
        findNavDatas,
        imgDatas:[require('../../../assets/images/l8.jpg'),
                require('../../../assets/images/l1.jpg'),
                require('../../../assets/images/l2.jpg'),
                require('../../../assets/images/l3.jpg'),
                require('../../../assets/images/l4.jpg'),
                require('../../../assets/images/l5.jpg'),
                require('../../../assets/images/l6.jpg'),
                require('../../../assets/images/l7.jpg')]
    }
  },
  mounted(){
    console.log(this.findNavDatas);
  }
}
</script>
<style scoped>
.home_ban{
    position: relative;
    top: 45px;
}
</style>


