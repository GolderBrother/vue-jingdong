<template>
	<div class="cart_fo">
		<footer class="cart_footer">
		    <div class="all_check_box">
		        <div class="check_box">

		        </div>
		        <span>全选</span>
		    </div>
		    <div class="count_money_box">
		        <div class="heji">
		            <strong>合计:</strong> 
		            <strong>￥</strong>
		            <strong>{{total}}</strong>
		        </div>
		        <div class="total_money clearfix">
		            <span>总额:</span>
		            <i>￥</i>
		            <span>{{total}}</span>
		            <span>立减:</span>
		            <i>￥</i>
		            <span>0.00</span>
		        </div>>
		            <a href="#" class="go_pay" @click="go_pay">
		                <span>去计算(1)</span>
		            </a>
		    </div>
		</footer>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default {
		computed:{
	      ...mapGetters(['total'])
		},
		methods:{
			go_pay(){
				console.log(123)
				this.$router.push('/count');
			}
		}
	}
</script>