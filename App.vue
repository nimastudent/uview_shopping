<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	
	
	.uni-tabbar__bd{
		height: 60px !important;
	}
	
	//导航栏字体
		.uni-tabbar__bd .uni-page-head__title{
			font-size: 30upx !important;
		}
		// tab图标
		.uni-tabbar__bd .uni-tabbar__icon{
			width: 25px !important;
	        height: 25px !important;
		}
	/*每个页面公共css */
</style>
