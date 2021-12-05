<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			
				<u-input class="username"  :type="username" :border="border" placeholder="请输入用户名" />
				<u-input class="password" :type="password" :border="border" placeholder="请输入密码" />
				<text>如密码遗忘，请联系管理员</text>
				<button class="loginButton" type="primary" @click="login">登录</button>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username:'',
			password:'',
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
		login(){
			//保存cookie
			this.$u.vuex('vuex_cookies','123123');
			//uni-app首次跳转到tabbar页面需要用switchTab
			// uni.switchTab({
			// })
			this.$u.route({
				type:'switchTab',
				url:'/pages/index/index'
			})
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
