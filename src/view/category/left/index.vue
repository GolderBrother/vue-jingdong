<template>
	<div id="cate_left">
		 <div class="category_left">
	            <ul class="childbox">
	                <li :class="{childboxli:item.flag}" :key="i" v-for="(item,i) in leftDatas" @click="categoryClass(item,i)">
	                	<router-link :to="'/catgory/'+item.category_id">
	                	{{item.category_name}}
	                	</router-link>
	                </li>
	               
	            </ul>
	        </div>
	</div>
</template>
<script>
export default{
	data() {
		return{
			leftDatas:[],
			childboxli:'childboxli'
		}
	},
	//生命周期
	mounted() {
		this.getLeftDatas();
	},
	methods:{
		getLeftDatas() {
			this.$http.get('/category').then((res)=>{
				//console.log(res);
				this.leftDatas = res.data;
				for(let i=0;i<this.leftDatas.length;i++){
					//this.leftDatas[i].flag=false;
					this.$set(this.leftDatas[i],'flag',false);
				}
			},(err)=>{
				console.log(err);
			})
		},
		categoryClass(item,ind){
			//$().addClass().siblings().removeClass();
			for(let i=0;i<this.leftDatas.length;i++){
				this.$set(this.leftDatas[i],'flag',false);
				if(ind == i){
					item.flag = true;
				}
			}
		}

	}
}
</script>
<style>
	#cate_left .category_left .childbox .childboxli{
		background:#f60;
	}
</style>