<template>
	<view>
		<u-navbar :is-back="false" title="大练兵" title-color="#000000"></u-navbar>
		
				
		<!-- <view class="u-flex u-m-t-30">
			<button class="button-class u-flex" type="default" @click="goMock">模拟考</button>
			<button class="button-class u-flex" type="default" @click="goExam">学法考试</button>
		</view> -->
		<view class="main-contianer" @click="goErrorBook">
			<view class="block-contianer">
				<img src="../../static/img/cuoti.png" alt="">
				<view class="right-contianer">
					<view class="right-title">错题集</view>
					<view class="right-content">
						所有错题在这看
					</view>
				</view>
			</view>
			<view class="block-contianer" @click="goExam">
				<img src="../../static/img/exam.png" alt="">
				<view class="right-contianer">
					<view class="right-title">学法考试</view>
					<view class="right-content">
						开始考试！
					</view>
				</view>
			</view>
			<view class="block-contianer" @click="goMock">
				<img src="../../static/img/mockExam.png" alt="">
				<view class="right-contianer">
					<view class="right-title">模拟考</view>
					<view class="right-content">
						这里有题库
					</view>
				</view>
			</view>
			<view class="block-contianer" @click="goScore">
				<img src="../../static/img/score.png" alt="">
				<view class="right-contianer">
					<view class="right-title">我的成绩</view>
					<view class="right-content">
						查看您的成绩
					</view>
				</view>
			</view>
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
					type:'navigateTo',
					url:'/pages/learnning/mock'
				})
			},
			goExam(){
				this.$u.route({
					type:'navigateTo',
					url:'/pages/learnning/examList'
				})
			},
			goScore(){
				
			},
			goErrorBook(){
				
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
.main-contianer{
	display: flex;
	flex-wrap: wrap;
}
.block-contianer{
	width: 320rpx;
	height: 180rpx;
	margin: 15rpx 25rpx;
	background-color: #ececec;
	display: flex;
	justify-content: center;	
	align-items: center;
}
.block-contianer img{
	width: 60rpx;
	height: 70rpx;
}
.right-contianer{
	margin-left: 10rpx;
}
.right-title{
	font-size: 36rpx;
	
}
.right-content{
	color: #999999;
}
</style>
