<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			
			
				<u-input class="username" v-model="form.username"  :border="border" placeholder="请输入用户名" />
				<u-input class="password" v-model="form.password" :type="type"  :border="border" placeholder="请输入密码" />
				
					
				<text>如密码遗忘，请联系管理员</text>
				<button class="loginButton" type="primary" @click="login">登录</button>
			
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				username:'',
				password:'',
				},
			type:'password',
			border:true
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		async login(){
			//保存cookie
			// let password = this.$u.
			if(this.form.username === 'admin' && this.form.password === '123456'){
				const res = await this.$u.api.authLogin(this.form)
				if(res.success){
					this.$u.vuex('vuex_cookies','123123');
					this.$u.route({
						type:'switchTab',
						url:'/pages/index/index'
					})
				}else{
					this.$refs.uToast.show({
										title: '用户名密码不合法',
										type: 'error',
									})
				}
			}
			
			//uni-app首次跳转到tabbar页面需要用switchTab
			// uni.switchTab({
			// })
			
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
	}
	
}
.username{
	margin-top: 40rpx;
}
.password{
	margin-top: 20rpx;
}
.loginButton{
	margin-top: 40rpx;
	width: 300rpx;
}
</style>
