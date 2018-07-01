<template>
	<div class="home">
		<div class="m_layout">
            <!-- 头部区 -->
           <HomeHeaderView></HomeHeaderView>
            <!-- 轮播图-->
            <HomeBannerView></HomeBannerView>
            <!--导航-->
            <HomeNavView></HomeNavView>
            <!--商品区-->
            <HomeMainView></HomeMainView>  
        </div>
	</div>
</template>
 <script>
    
    import HomeHeaderView from './header/index';
    import HomeBannerView from './banner/index';
    import HomeNavView from './nav/index';
    import HomeMainView from './main/index';
    // import {bindEvent,scrollPic} from '../assets/js/index.js'
    import {scrollPic} from '../../assets/js/index.js'
    export default{
       components:{
        HomeHeaderView,
        HomeBannerView,
        HomeNavView,
        HomeMainView
       },
       mounted(){
        //bindEvent();
        scrollPic();
       }
    }
</script>
<style>
@import '../../assets/css/index.css';
</style>