<template>
	<div id="cate_right">
		<div class="category_right">
			<div class="category_banner">
				<a href="#">
					<img src="../../../assets/images/banner_1.png" alt="">
				</a>
			</div>
			<div class="category_detail">
				<h3 class="category_n">热门分类商品</h3>
				<ul class="clearfix">
					<li class="category_detail_item" :key="item.product_id" v-for="item in RightDatas">
						<router-link :to="'/detail/'+item.product_id" class="category_detail_item_link">
							<img v-lazy="item.product_img_url" alt="" class="category_detail_item_pic">
							<p class="category_detail_item_name">{{item.product_name}}</p>
						</router-link>
					</li>
				
				</ul>
			</div>
		</div> 
	</div>
</template>
<script>
export default {
  data() {
    return {
      RightDatas: []
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      this.getRightDatas(this.$route.params.id);
    }
  },
  watch: {
    $route(to) {
      //console.log(to);
      var reg = /catgory\/\d+/; //catgory/32
      if (reg.test(to.path)) {
        var categotyId = this.$route.params.id || 0;
        this.getRightDatas(categotyId);
      }
    }
  },
  methods: {
    getRightDatas(id) {
      let _this = this;
      _this.$http
        .get("/categorygoods", {
          params: {
            mId: id
          }
        })
        .then(
          res => {
            _this.RightDatas = res.data;
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>