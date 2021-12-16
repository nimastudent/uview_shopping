<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">昵称</view>
				<view class="u-font-14 u-tips-color">学员姓名:helang_uView</view>
			</view>
			
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view> -->
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="账号设置" @click="updateName"></u-cell-item>
				<u-cell-item icon="file-text" title="我的评论"></u-cell-item>
				<u-cell-item icon="star" title="我的收藏"></u-cell-item>
				<u-cell-item icon="order" title="我的错题集"></u-cell-item>
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
			this.getErrorBook()
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
				console.log(1)
				await this.$u.api.getAvatar().then((res) => {
					console.log(res)
				})
				
			},
			getErrorBook(){
				this.$u.api.getErrorBook().then((res) => {
					console.log(res)
				})
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
