<template>
  <div class="m_r">
      <header class="top_bar">
				<a onclick="window.history.go(-1)" class="icon_back"></a>
        <h3 class="top_bar_name">更改密码</h3>
      </header>
      <main class="user_login_box">
			<div class="login_dialog">
		        <div class="_username">
		            <input type="text" ref="userName" name="userName" placeholder="用户名/邮箱/手机号" class="user_input" v-model="userName">
		        </div>
						<div class="_username u_passwd">
		            <input type="password" ref="oldpasswd" name="oldpasswd" placeholder="请输入原密码" class="user_input" v-model="oldpasswd">
		        </div>
		        <div class="_username u_passwd">
		            <input type="password" ref="newpasswd" name="newpasswd" placeholder="请输入新密码" class="user_input" v-model="newpasswd">
		        </div>
		        <div class="_username u_passwd">
		            <input type="password" ref="newpasswd_ag" name="newpasswd_ag" placeholder="请再次输入新密码" class="user_input" v-model="newpasswd_ag">
		        </div>
		        <div class="login_box">
		            <a @click="changePwd()" class="btn_login">确定</a>
		        </div>
		    </div>
		</main>
  </div>
</template>
<script>
export default {
	data(){
		return {
			userName:'',
			oldpasswd:'',
			newpasswd:'',
			newpasswd_ag:''
		}
	},
	methods:{
		changePwd(){
			let _this = this;
			if(_this.userName == ''){
				_this.prompt('请输入用户名！',_this.$refs.userName);
				return;
			};
			if(_this.oldpasswd == ''){
				_this.prompt('请输入原密码！',_this.$refs.oldpasswd);
				return;
			};
			if(_this.newpasswd == '' || _this.newpasswd_ag == ''){
				_this.prompt('请输入新密码！',_this.$refs.newpasswd);
				return;
			}else if(_this.newpasswd_ag !=_this.newpasswd ){
				_this.prompt('两次密码输入不一致！',_this.$refs.newpasswd_ag);
				return
			}else {
				// 验证完毕后将用户名和密码重新插入
				_this.$http.post('/changePwd',{
					userName:_this.userName,
					password:_this.oldpasswd,
					newPassword:_this.newpasswd
				}).then((res) => {
					console.log(res.data);
					// 查询原密码是否正确
					if(res.data.status == 0){
						// 服务器出错
						_this.prompt(res.data.msg,_this.$refs.oldpasswd);
						return;
					}else if(res.data.status == -1){
						// 用户名或者密码错误
						_this.prompt(res.data.msg,_this.$refs.oldpasswd);
						return;
					}else if(res.data.status == -2){
						// 更改失败，请重新输入新密码
						_this.prompt(res.data.msg,_this.$refs.newpasswd);
					}else{
						// 更改成功
						_this.$message({
							type:'success',
							message:res.data.msg,
							onClose(){
								_this.$router.push('/login')
							}
						})
					}
				},(err) => {
					console.log(err);
				})
			}
		},
		prompt(msg,field){
			this.$message({
				type:'error',
				showClose: true,
				message:msg,
				onClose(){
					field.focus();
				}
			});
		}
	}
}
</script>
<style>
@import '../../assets/css/reg.css';
</style>


