<template>
	<div class="user_i">
	<MineHeaderView></MineHeaderView>
	<MineMainView></MineMainView>
	</div>
</template>
<script>
	import MineHeaderView from './header/index.vue';
	import MineMainView from './main/index.vue';
	export default{
		components:{
			MineMainView,
			MineHeaderView
		}
	}
</script>
<style>
@import '../../assets/css/mine.css';
</style>