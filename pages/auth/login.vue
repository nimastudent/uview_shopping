<template>
	<!-- 	<view class="wrap">
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
				<button class="loginButton" type="primary" @click="submit" :loading="btnLoading" :disabled="btnDisabled">登录</button>
				
				<view class="pki-btn-contianer">
					<u-button type="success" @click="getUserInfor">i闽警直接登录</u-button>
				</view>
				
		</view>
		
		<u-toast ref="uToast" />
	</view>
 -->

	<view>
		<view class="img-a">
			<view class="t-b">
				您好，
				<br />
				欢迎使用学习强警！
			</view>
		</view>
		<view class="login-view" style="">
			<view class="t-login">
				<u-form :model="form" ref="uForm" class="cl">

					<u-form-item prop="username">
						<view class="t-a">
							<text class="txt">用户名</text>
							<u-input type="text" name="phone" placeholder="请输入您的用户名" maxlength="15"
								v-model="form.username" />
						</view>
					</u-form-item>

					<u-form-item prop="password">
						<view class="t-a">
							<text class="txt">密码</text>
							<u-input type="password" name="code" maxlength="18" placeholder="请输入您的密码"
								v-model="form.password" />
						</view>
					</u-form-item>
					<text>如密码遗忘，请联系管理员</text>


					<button style="margin-top: 30rpx;" @tap="submit()">登 录</button>
					<view class="reg" @tap="getUserInfor()">pki登录</view>
				</u-form>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				content: {},
				show: false,
				webUrl: '',
				type: 'password',
				border: true,
				btnLoading: false,
				form: {
					username: '',
					password: '',
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					password: [{
						required: true,
						min: 5,
						message: '请输入密码',
						trigger: 'change'
					}]
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {},
		computed: {
			inputStyle() {
				let style = {};
				if (this.password) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			},
			btnDisabled() {
				if (this.form.password.length > 3) {
					return false
				} else {
					return true
				}
			}
		},
		onShow() {

		},
		methods: {
			async login() {
				this.btnLoading = true
				//保存cookie
				const res = await this.$u.api.authLogin(this.form)
				if (res.success) {
					this.$u.vuex('vuex_token', res.body.token)
					this.$u.vuex('vuex_userName', res.body.userName)
					this.$u.vuex('vuex_nickName', res.body.nickName)
					this.$u.route({
						type: 'switchTab',
						url: '/pages/index/index'
					})
				} else {
					this.$refs.uToast.show({
						title: '用户名或密码错误',
						type: 'error',
					})
				}
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.login()
					} else {}
				});
			},
			pkiLogin() {
				// http://localhost:8080/pages/auth/pki
				let redirect_uri = 'http://localhost:8080/pages/auth/pki'
				let test_redirect_url = 'test://'
				let response_type = 'code id_token'
				let client_id = 'clientId'
				let ssoServerUrl = 'http://110.90.116.74:8088/sso'
				let loginUrl = ssoServerUrl + "/oauth2/authorize?response_type=" + response_type + "&client_id=" +
					client_id + "&redirect_uri=" + redirect_uri
				let testUrl =
					`${ssoServerUrl}/oauth2/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${test_redirect_url}`
				// h5
				window.location.href = loginUrl
				// app端
				// plus.runtime.openURL(testUrl)
			},
			getUserInfor() {
				window.app.link.getLoginInfo(function(result) {
					uni.setStorage({
						key: "userInfo",
						data: result,
						success: function() {
							console.log("信息存储成功")
							uni.reLaunch({
								url: '/pages/auth/step'
							})
						}
					})
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.txt {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.img-a {
		width: 100%;
		height: 450rpx;
		background-image: url(@/static/img/head.png);
		background-size: 100%;
	}

	.reg {
		font-size: 28rpx;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
		background: #f5f6fa;
		color: #000000;
		text-align: center;
		margin-top: 30rpx;
	}

	.login-view {
		width: 100%;
		position: relative;
		margin-top: -120rpx;
		background-color: #ffffff;
		border-radius: 8% 8% 0% 0;
	}

	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		padding-top: 80rpx;
	}

	.t-login button {
		font-size: 28rpx;
		background: #2796f2;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
	}

	.t-login input {
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		border-bottom: 1px solid #e9e9e9;
		font-size: 28rpx;
	}

	.t-login .t-a {
		position: relative;
	}

	.t-b {
		text-align: left;
		font-size: 42rpx;
		color: #ffffff;
		padding: 130rpx 0 0 70rpx;
		font-weight: bold;
		line-height: 70rpx;
	}

	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}

	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 50%;
	}

	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx;
	}

	.t-login .t-f {
		text-align: center;
		margin: 150rpx 0 0 0;
		color: #666;
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}

	.t-login .uni-input-placeholder {
		color: #aeaeae;
	}

	.cl {
		zoom: 1;
	}

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
</style>
