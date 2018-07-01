<template>
	<div class="home_ban">
		<div class="m_banner clearfix" id="my_banner">
                <!-- <ul class="banner_box">
                      <li v-for="(v,i) in imgDatas" :key="i"><img :src="v" alt="" /></li>  
                </ul>
                <ul class="point_box">
                     <li v-for="(vv,i) in imgDatas" :key="i"></li>  
                </ul> -->
            <swiper class="swiper" :options="swiperOption" ref="mySwiper">
                <swiper-slide class="swiper-slide" v-for="(item,index) in imgDatas" :key="index">
                    <!-- slide: {{item}} -->
                    <img :src="item" alt="" width="100%"/>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
	</div>
</template>
<script>
    import "swiper/dist/css/swiper.css";
    import { swiper,swiperSlide } from 'vue-awesome-swiper';
    export default {
        components:{
            swiper,
            swiperSlide
        },
        data(){
            return {
                imgDatas : [require('../../../assets/images/l8.jpg'),
                require('../../../assets/images/l1.jpg'),
                require('../../../assets/images/l2.jpg'),
                require('../../../assets/images/l3.jpg'),
                require('../../../assets/images/l4.jpg'),
                require('../../../assets/images/l5.jpg'),
                require('../../../assets/images/l6.jpg'),
                require('../../../assets/images/l7.jpg')],
                swiperOption:{
                    //无线循环滚动
                    loop:true,
                    // 显示方向：竖屏
                    // direction:'vertical',
                    autoplay:3000,
                    autoHeight: true,
                    // 滑动时只滑动一格，并自动贴合wrapper
                    freeMode:false,
                    // 分页
                    pagination:{
                        el:'.swiper-pagination'
                    },
                    paginationClickable:true,
                    //设置同屏显示的数量，默认为1，这里使用auto是随意的意思  
                    slidesPerview:'auto',
                    //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值
                    mousewheel:true,
                }
            }
        },
    }
</script>