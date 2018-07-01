<template>
	<div>
		<CategoryHeadView></CategoryHeadView>
		<CategoryMainView></CategoryMainView>
	</div>
</template>
<script>
	import CategoryHeadView from './header/index.vue';
	import CategoryMainView from './main/index.vue';
	export default {
		components:{
			CategoryHeadView, 
			CategoryMainView
		}
	}
</script>
<style> 
@import '../../assets/css/category.css';
</style>