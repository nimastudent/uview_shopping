<template>
	<view>
		<u-navbar :is-back="false" title="大练兵" title-color="#000000"></u-navbar>
		
				
		<view class="u-flex u-m-t-30">
			<button class="button-class u-flex" type="default" @click="goMock()">模拟考</button>
			<button class="button-class u-flex" type="default">大练兵</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(){
			
		},
		methods: {
			goMock(){
				this.$u.route({
					type:'redirect',
					url:'/pages/learnning/mock'
				})
				console.log(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
.button-class{
	height: 320rpx;
	width: 320rpx;
	justify-content: center;
	background-color: #009deb;
	color: #FFFFFF;
	border-radius: 30rpx;
	font-size: 40rpx;
}
</style>
