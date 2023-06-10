<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			getApp().globalData.rootFontSize = '20px';
			uni.hideTabBar()
		},
		onShow: function() {
			console.log('App Show')
			uni.hideTabBar()
		},
		onHide: function() {
			//清空cookie
			this.$u.vuex('vuex_cookies','');
			//页面跳转
			this.$u.route({
				type:'redirect',
				url:'pages/auth/login'
			})
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	
	uni-toast .uni-toast {
		font-size: 38rpx;
	
	}
	
	
	.uni-page-head{
		height: 60px;
	}
	
	.uni-page-head__title{
		font-size: 28rpx;
	}
	
	// .uni-page-head{
	// 	height: 100rpx;
	// }
	
	uni-modal{
		
		
		.uni-modal{
			max-width:400rpx;
		}
		
		.uni-modal__title{
			font-size:24rpx;
		}
		
		.uni-modal__bd{
			font-size:32rpx;
		}
		
		.uni-modal__ft{
			font-size:24rpx;
			padding:5rpx;
		}
	}
	
	.u-collapse-title{
		font-size: 58px;
		
		.u-cell_title{
			font-size: 38px;
		}
	}
	
	

	/*每个页面公共css */
</style>
