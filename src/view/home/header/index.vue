<template>
	<div class="home_h">
		 <header class="m_header">
                <div class="m_header_box" id="my_search">
                    <a href="#" @click="goIndex" class="icon_logo"></a>
                    <form action="#">
                        <span class="icon_search" @click="goSearch($event)"></span>
                        <input type="search" ref="search" @focus="goSearch($event)" class="search" placeholder="点击搜索">
                    </form>
                    <router-link to="/login" class="logo_btn">登录</router-link>
                </div>
            </header>
	</div>
</template>
<script>
    export default {
        methods:{
            goSearch(event){
                const _this = this;
                this.$router.push('/search');
                let val = this.$refs.search.value;
                _this.$http.get('/search',{
                    params:{
                        kw:val
                    }
                }).then((data)=>{
                    console.log(data)
                    this.$router.push('/search');
                },(err)=>{
                    console.log(err)
                });
                
                // this.axios.get('/search',(data)=>{
                //     console.log(data);
                // })
                // window.event? window.event.returnValue = false : event.preventDefault();
            },
            goIndex(){
                this.$router.push('/');
            }
        },
    }
</script>