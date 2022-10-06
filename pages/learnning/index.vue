<template>
	<view>
		<u-navbar :is-back="false" title="大练兵" title-color="#000000"></u-navbar>
		<view class="swiper">
			<u-swiper :list="swiperList" name="picture" :height="swiperHeight" @click="swiperClick"></u-swiper>
		</view>
				
		<u-divider type="priamry"></u-divider>

		<view class="main-contianer" >
			<view class="block-contianer" @click="goErrorBook">
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
				swiperList:[]
			}
		},
		onLoad(){
			this.getSwiper()
		},
		methods: {
			async getSwiper(){
				const res = await this.$u.api.getIndexSwiper()
				if(res.success){
					res.body.forEach((item) => {
						item.picture = 'data:image/jpeg;base64,' + item.picture
					})
					this.swiperList = res.body
				}
			},
			swiperClick(e){
				let id = this.swiperList[e].id
				this.goConsultContent(id)
			},
			goConsultContent(id){
				this.$u.route({
					tyep:'navigateTo',
					url:'pages/index/consult',
					params:{
						id:id
					}
				})
			},
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
				this.$u.route({
					type:'navigateTo',
					url:'/pages/learnning/score'
				})
			},
			goErrorBook(){
				this.$u.route({
					type:'navigateTo',
					url:'/pages/learnning/errorBook'
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		margin: 30rpx;
	}
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
	justify-content: center;
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
