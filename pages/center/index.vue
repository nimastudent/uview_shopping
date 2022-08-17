<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
			
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="avatar" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{nickName}}</view>
				<view class="u-font-14 u-tips-color">用户名:{{userName}}</view>
			</view>
			
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view> -->
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="账号设置" @click="updateName"></u-cell-item>
				<u-cell-item icon="file-text" title="我的评论" @click="goComment"></u-cell-item>
				<u-cell-item icon="star" title="我的收藏"@click="goCollection"></u-cell-item>
				<u-cell-item icon="order" title="我的错题集"@click="goErrorBook"></u-cell-item>
				<u-cell-item  title="关于我们"@click="goAboutUs"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-button class="exitButton" type="error" @click="exit">退出登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true
			}
		},
		onLoad() {
			this.getAvatar()
			const _this = this
						uni.addInterceptor('navigateBack', {//监听返回
							success(e) {
								console.log(e);
								console.log(4);
							}
						})
			
		},
		computed:{
			userName(){
				return this.vuex_userName
			},
			nickName(){
				return this.vuex_nickName
			},
			avatar(){
				return this.vuex_avatar
			}
		},
		methods: {
			updateName(){
				this.$u.route('pages/center/updateName')
			},
			//退出登录
			exit(){
				//清空cookie
				this.$u.vuex('vuex_cookies','');
				//页面跳转
				this.$u.route({
					type:'redirect',
					url:'pages/auth/login'
				})
				
			},
			//获取用户头像
			async getAvatar(){
				await this.$u.api.getAvatar().then((res) => {
					console.log(res)
					if(res.success){
						let arrayBuffer = res.body
						this.pic = 'data:image/jpeg;base64,' + arrayBuffer
						this.$u.vuex('vuex_avatar',this.pic)
					}
				})
				
			},
			getErrorBook(){
				this.$u.api.getErrorBook().then((res) => {
					console.log(res)
				})
			},
			goComment(){
				this.$u.route('pages/center/comment')
			},
			goCollection(){
				this.$u.route('pages/center/collection')
			},
			goErrorBook(){
				this.$u.route('pages/center/errorBool')
			},
			goAboutUs(){
				this.$u.route('pages/center/aboutUs')
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
.exitButton{
	width: 300rpx;
}
.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
