<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
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
				<!-- <svg t="1647412313253" @click="pkiLogin" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4066"><path d="M418.133333 499.2c-21.333333-34.133333-29.866667-72.533333-29.866666-115.2 0-119.466667 93.866667-213.333333 213.333333-213.333333s213.333333 93.866667 213.333333 213.333333-93.866667 213.333333-213.333333 213.333333c-46.933333 0-85.333333-12.8-123.733333-38.4l-98.133334 98.133334 46.933334 46.933333-59.733334 59.733333-46.933333-46.933333-29.866667 29.866667 46.933334 46.933333L277.333333 853.333333 170.666667 746.666667l247.466666-247.466667zM601.6 256c-72.533333 0-128 55.466667-128 128s55.466667 128 128 128 128-55.466667 128-128-59.733333-128-128-128z" fill="#444444" p-id="4067"></path></svg>
				
				
				<p style="margin-left:250rpx;">PKI登录</p>
				
				<svg t="1647412313253" @click="dcloudLogin" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4066"><path d="M418.133333 499.2c-21.333333-34.133333-29.866667-72.533333-29.866666-115.2 0-119.466667 93.866667-213.333333 213.333333-213.333333s213.333333 93.866667 213.333333 213.333333-93.866667 213.333333-213.333333 213.333333c-46.933333 0-85.333333-12.8-123.733333-38.4l-98.133334 98.133334 46.933334 46.933333-59.733334 59.733333-46.933333-46.933333-29.866667 29.866667 46.933334 46.933333L277.333333 853.333333 170.666667 746.666667l247.466666-247.466667zM601.6 256c-72.533333 0-128 55.466667-128 128s55.466667 128 128 128 128-55.466667 128-128-59.733333-128-128-128z" fill="#444444" p-id="4067"></path></svg>
				
				<p style="margin-left:250rpx;">直接登录</p> -->
				
				<!-- <button type="default" @click="pkiLogin">pki</button> -->
				
				<button type="default" @click="getUserInfor">i闽警直接登录</button>
				
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>

export default {
	data() {
		return {
			content:{},
			show:false,
			webUrl:'',
			type:'password',
			border:true,
			form: {
							username: '',
							password: '',
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
	onShow() {

	},
	methods: {
		async login(){
			//保存cookie
				const res = await this.$u.api.authLogin(this.form)
				if(res.success){
					this.$u.vuex('vuex_token',res.body.token)
					this.$u.vuex('vuex_userName',res.body.userName)
					this.$u.vuex('vuex_nickName',res.body.nickName)
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
		submit() {
			 this.$refs.uForm.validate(valid => {
					if (valid) {
						 this.login()
						} else {
						}
					});
		},
		pkiLogin() {
			// http://localhost:8080/pages/auth/pki
			let redirect_uri = 'http://localhost:8080/pages/auth/pki'
			let test_redirect_url = 'test://'
			let response_type = 'code id_token'
			let client_id = 'clientId'
			let ssoServerUrl = 'http://110.90.116.74:8088/sso'
			let loginUrl = ssoServerUrl + "/oauth2/authorize?response_type="+response_type+"&client_id="+client_id+"&redirect_uri="+redirect_uri
			let testUrl = `${ssoServerUrl}/oauth2/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${test_redirect_url}`
			 // h5
			window.location.href = loginUrl
			// app端
			// plus.runtime.openURL(testUrl)
		},
		getUserInfor(){
			window.app.link.getLoginInfo(function(result){
				uni.setStorage({
					key:"userInfo",
					data:result,
					success: function(){
						console.log("信息存储成功")
						uni.reLaunch({
										url:'/pages/auth/step'
									})
					}
				})
			});
		},
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

.icon {
	width: 100rpx;
	height: 100rpx;
	border: 3px solid gray;
	border-radius: 50px;
	margin-top: 120rpx;
	margin-left:  250rpx;
}
</style>
