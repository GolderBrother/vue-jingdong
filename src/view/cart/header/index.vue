<template>
		<div id="carttp">
			<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="top_bar_name">购物车</h3>
		    <a href="#" class="icon_menu" @click="goHome($event)"></a>
		</header>
		</div>

</template>
<script>
export default{
	methods:{
		goHome(event){
			event.preventDefault();
			this.$router.push('/home');
		}
	}
}
</script>