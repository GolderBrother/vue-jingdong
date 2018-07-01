<template>
	<div class="find">
		<div class="m_layout">
            <!-- 头部区 -->
           <FindHeaderView></FindHeaderView>
            <!--导航-->
            <FindNavView></FindNavView>
            <!-- 轮播图-->
            <FindBannerView></FindBannerView>
            <!--内容区-->
            <FindContentView></FindContentView>  
        </div>
	</div>
</template>
<script>
import FindHeader from './header/index.vue';
import FindNav from './nav/index.vue';
import FindBanner from './banner/index.vue';
import FindContent from './content/index.vue';
import {scrollPic} from '../../assets/js/index'
export default {
  components:{
    FindHeaderView:FindHeader,
    FindNavView:FindNav,
    FindBannerView:FindBanner,
    FindContentView:FindContent
  },
  mounted(){
    scrollPic()
  }
}
</script>

