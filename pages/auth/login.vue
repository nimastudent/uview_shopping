<template>

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


					<button style="margin-top: 30upx;" @tap="submit()">登 录</button>
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
					username: 'admin',
					password: '123456',
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
		onLoad() {
			// this.getUserInfor();
		},
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
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
	}

	.img-a {
		width: 100%;
		height: 450upx;
		background-image: url(@/static/img/head.png);
		background-size: 100%;
	}

	.reg {
		font-size: 28upx;
		color: #fff;
		height: 90upx;
		line-height: 90upx;
		border-radius: 50upx;
		font-weight: bold;
		background: #f5f6fa;
		color: #000000;
		text-align: center;
		margin-top: 30upx;
	}

	.login-view {
		width: 100%;
		position: relative;
		margin-top: -120upx;
		background-color: #ffffff;
		border-radius: 8% 8% 0% 0;
	}

	.t-login {
		width: 600upx;
		margin: 0 auto;
		font-size: 28upx;
		padding-top: 80upx;
	}

	.t-login button {
		font-size: 28upx;
		background: #2796f2;
		color: #fff;
		height: 90upx;
		line-height: 90upx;
		border-radius: 50upx;
		font-weight: bold;
	}

	.t-login input {
		height: 90upx;
		line-height: 90upx;
		margin-bottom: 50upx;
		border-bottom: 1px solid #e9e9e9;
		font-size: 28upx;
	}

	.t-login .t-a {
		position: relative;
	}

	.t-b {
		text-align: left;
		font-size: 42upx;
		color: #ffffff;
		padding: 130upx 0 0 70upx;
		font-weight: bold;
		line-height: 70upx;
	}

	.t-login .t-c {
		position: absolute;
		right: 22upx;
		top: 22upx;
		background: #5677fc;
		color: #fff;
		font-size: 24upx;
		border-radius: 50upx;
		height: 50upx;
		line-height: 50upx;
		padding: 0 25upx;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80upx 0;
	}

	.t-login .t-e {
		text-align: center;
		width: 250upx;
		margin: 80upx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 50%;
	}

	.t-login .t-e image {
		width: 50upx;
		height: 50upx;
	}

	.t-login .t-f {
		text-align: center;
		margin: 150upx 0 0 0;
		color: #666;
	}

	.t-login .t-f text {
		margin-left: 20upx;
		color: #aaaaaa;
		font-size: 27upx;
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
