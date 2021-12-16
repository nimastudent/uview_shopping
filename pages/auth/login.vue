<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			
			
				<u-input clas<!-- s="username" v-model="form.username"  :border="border" placeholder="请输入用户名" />
				<u-input class="password" v-model="form.password" :type="type"  :border="border" placeholder="请输入密码" />
				 -->
				
				<u-form :model="form" ref="uForm">
							<u-form-item  prop="username">
								<u-input :border="border" v-model="form.username" placeholder="请输入用户名" />
							</u-form-item>
							<u-form-item  prop="password">
								<u-input :border="border" :type="type" v-model="form.password" placeholder="请输入密码" />
							</u-form-item>
						</u-form>
					
				<text>如密码遗忘，请联系管理员</text>
				<button class="loginButton" type="primary" @click="submit">登录</button>
			

		
			<!-- <u-button @click="submit">提交</u-button> -->
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			type:'password',
			border:true,
			form: {
							username: 'admin',
							password: '123456',
						},
			rules: {
							username: [
								{ 
									required: true, 
									message: '请输入用户名', 
									// 可以单个或者同时写两个触发验证方式 
									trigger: ['change','blur'],
								}
							],
							password: [
								{
									required: true,
									min: 5, 
									message: '请输入密码', 
									trigger: 'change'
								}
							]
						}
		}
	},
	onReady() {
			this.$refs.uForm.setRules(this.rules);
	},
	onLoad(){
		
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
				const res = await this.$u.api.authLogin(this.form)
				if(res.success){
					this.$u.vuex('vuex_token',res.body.token)
					// this.getHeader()
					// this.$u.vuex('vuex_cookies','123123');
					this.$u.route({
						type:'switchTab',
						url:'/pages/index/index'
					})
				}else{
					this.$refs.uToast.show({
						title:'用户名或密码错误',
						type: 'error',
					})
				}
		},
		test(){
			this.$u.api.authLogin(this.form).then( (res) => {
				console.log(res)
			})
		},
		getHeader(){
			this.$u.api.getUserheader().then((res) => {
				console.log(res)
			})
		},
		submit() {
			 this.$refs.uForm.validate(valid => {
					if (valid) {
						 this.login()
						} else {
							
						}
					});
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
