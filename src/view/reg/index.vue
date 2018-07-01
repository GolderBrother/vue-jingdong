<template>
	<div class="m_r">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="top_bar_name">京东注册</h3>
		</header>
		<main class="user_login_box">
		    <div class="login_dialog">
		        <div class="_username">
		            <input type="text" ref="regname" name="regname" placeholder="用户名/邮箱/手机号" class="user_input" v-model="regname">
		        </div>
		        <div class="_username u_passwd">
		            <input type="password" ref="regpasswd" name="regpasswd" placeholder="请输入密码" class="user_input" v-model="regpasswd">
		        </div>
		        <div class="_username u_passwd">
		            <input type="password" ref="regpasswd_ag" name="regpasswd_ag" placeholder="请再次输入密码" class="user_input" v-model="regpasswd_ag">
		        </div>
		        <div class="login_box">
		            <a @click="register()" class="btn_login">注册</a>
		        </div>
		    </div>
		</main>
	</div>
</template>
<script>
	import { Message } from 'element-ui';
	export default{
		data(){
			return{
				regname:'',
				regpasswd:'',
				regpasswd_ag:'',
				regInfo:{}
			}
		},
		methods:{
			register(){
				let _this = this;
				let reg = /^1[34578][0-9]{9}$/;
				if(_this.regname ==''){
					_this.prompt('请输入手机号',_this.$refs.regname);
				}else if(!reg.test(_this.regname)){
					_this.prompt('手机号格式不正确',_this.$refs.regname);
				}else {
					_this.$http.post('/regVerify',{
						regName:_this.regname,
					}).then((res)=>{
						if(res.status == 200 ){
							console.log(res.data);
							if(res.data.status == 0){
								console.log(res.data);
								_this.prompt('用户名(手机号)已注册！',_this.$refs.regname);
								_this.$refs.regname.value = '';
							}else{
								if(_this.regpasswd == '' || _this.regpasswd_ag == ''){
									_this.prompt('请输入密码',_this.$refs.regpasswd);
								}else if(_this.regpasswd!==_this.regpasswd_ag){
									_this.prompt('两次输入的密码不一致',_this.$refs.regpasswd_ag);
								}else{
									_this.$http.post('/reg',{
										regName:_this.regname,
										regPasswd:_this.regpasswd
								}).then((res)=>{
									if(res.status == 200){
										_this.regInfo = res.data;
										if(_this.regInfo.status == 1){
											//reg success, go to this login page
											_this.regSuccess();
											// window.history.go(-1);
										}else{
											alert('注册失败');
										}
									}else{
										alert('出现错误');
									}
									console.log(res);
								},(err)=>{
									console.log(err);
								});
								}
							}
						}
					},(err) => {
						console.log(err);
					});
				}; 
			},
			regSuccess() {
				let _this = this;
				this.$message({
					showClose: true,
					message: '恭喜你，注册成功！',
					type: 'success',
					onClose(){
						_this.$router.push('/login');
					}
				});
			},
			prompt(msg,field) {
				let _this = this;
				this.$alert(msg, 'err', {
					confirmButtonText: '确定',
					callback: action => {
						// this.$message({
						// type: 'info',
						// message: `action: ${ action }`
						// });
						field.focus();
						// field.parentNode.style.borderColor='red';
					}
				});
			}
		}
	}
</script>
<style>
@import '../../assets/css/reg.css';
</style>