<template>
	<view>
		<u-navbar :is-back="false" title="大练兵" title-color="#000000"></u-navbar>
		<view class="swiper">
			<u-swiper :list="swiperList" name="picture"  @click="swiperClick"></u-swiper>
		</view>
				
		<u-divider type="priamry">练习模式</u-divider>

		<view class="main-contianer" >
			
			<view class="container" @click="goOrder">
				<view class="left">
					<span class="title">选择练习</span>
					<span class="content">{{finishedCount}}/{{allCount}}</span>
				</view>
				<view class="right">
					<img src="../../static/img/shunxu.png" alt="">
				</view>
			</view>
			
			
			<view class="container" @click="goExam">
				<view class="left">
					<span class="title">学法考试</span>
					<span class="content">开始考试！</span>
				</view>
				<view class="right">
					<img src="../../static/img/exam.png" alt="">
				</view>
			</view>
			
			<view class="container" @click="goMock">
				<view class="left">
					<span class="title">模拟考</span>
					<span class="content">这里有题库</span>
				</view>
				<view class="right">
					<img src="../../static/img/mockExam.png" alt="">
				</view>
			</view>
			
			<view class="container" @click="goErrorBook">
				<view class="left">
					<span class="title">错题集</span>
					<span class="content">所有错题在这看</span>
				</view>
				<view class="right">
					<img src="../../static/img/cuoti.png" alt="">
				</view>
			</view>
			
			<view class="container" @click="goScore">
				<view class="left">
					<span class="title">我的成绩</span>
					<span class="content">查看您的成绩</span>
				</view>
				<view class="right">
					<img src="../../static/img/score.png" alt="">
				</view>
			</view>
			
			<view class="container" style="background-color: #fff;">
				
			</view>
			
			<!-- <view class="block-contianer" @click="goErrorBook">
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
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				progressList:[]
			}
		},
		onLoad(){
			this.getSwiper()
			this.getOrderProgress()
		},
		computed:{
			finishedCount(){
				const list = this.progressList
				let finished = 0
					for(let item of Object.entries(list)){
						finished += item[1].finished
					}
				return finished
			},
			allCount(){
				const list = this.progressList
				let all = 0
					for(let item of Object.entries(list)){
						all += item[1].all
					}
				return all
			}
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
			//获取考试进度
			getOrderProgress(){
				this.$u.api.getOrderProgress().then(res => {
					this.progressList = res.body
				})
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
					url:'/pages/learnning/mock',
					params:{
						type:'mock'
					}
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
				
			},
			goOrder(){
				this.$u.route({
					type:'navigateTo',
					url:'/pages/learnning/order/order'
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
	justify-content: space-evenly;
	flex-wrap: wrap;
	gap: 20upx;
	padding: 20upx;
	
	.container{
		width: 45vw;
		height: 120upx;
		background-color: rgb(239, 248, 255);
		border-radius: 15upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16upx 20upx;
		
		.left{
			
			display: flex;
			flex-direction: column;
			
			.title{
				font-size: 28upx;
				font-weight: 600;
			}
			
			.content{
				color: rgb(157, 162, 166);
				font-size: 20upx;
			}
		}
		
		.right{
			img{
				width: 50upx;
				
			}
		}
		
		
	}
}
// .block-contianer{
// 	width: 320rpx;
// 	height: 180rpx;
// 	margin: 15rpx 25rpx;
// 	background-color: #ececec;
// 	display: flex;
// 	justify-content: center;	
// 	align-items: center;
// }
// .block-contianer img{
// 	width: 60rpx;
// 	height: 70rpx;
// }
// .right-contianer{
// 	margin-left: 10rpx;
// }
// .right-title{
// 	font-size: 36rpx;
	
// }
// .right-content{
// 	color: #999999;
// }
</style>
