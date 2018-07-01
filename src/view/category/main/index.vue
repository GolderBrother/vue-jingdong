<template>
	<main class="category_content">
		<CategoryLeftView></CategoryLeftView>
		<CategoryRightView></CategoryRightView>
	</main>
</template> 
<script>
	import CategoryLeftView from '../left/index.vue';
	import CategoryRightView from '../right/index.vue';
	export default{
		components:{
			CategoryLeftView,
			CategoryRightView
		}
	}
</script>