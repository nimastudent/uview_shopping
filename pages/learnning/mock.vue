<template>
	<view>
		<u-navbar  title="考试页面"></u-navbar>
		<view class="">
			<view id="top-box" class="top-box">
				<view class="action text-black">
					<!-- 题型判断 -->
					<text v-if="currentType===1">单选题</text>
					<text v-else-if="currentType===2">多选题</text>
					<text v-else-if="currentType===3">判断题</text>
				</view>
				<!-- 时间显示 -->
				<view id="time" v-if="hiddeBtnAndTime">
					<u-count-down 
						:timestamp="timestamp"
						separator="zh"
						@end="timeUp"
					></u-count-down>
				</view>
				<!-- 提交按钮 -->
				<view class="action" v-if="hiddeBtnAndTime">
					 <button type="primary" @click="openModal()" size="mini">提交</button>
					 <u-modal v-model="showModal" 
					 :content="content"
					 :show-cancel-button="true"
					 
					 ></u-modal>
				</view>	
			</view>
			<!-- 滑块视图  题目 -->
			<swiper
			:current="questionIndex"
			class="swiper-box"
			@change="swiperChange"
			:style="{'height':swiperHeight}"
			>
				
			</swiper>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hour:0,
				minute:30,
				second:0,
				hiddeBtnAndTime: true, //隐藏时间和提交按钮
				currentType: 1, //题型
				timestamp:10, //倒计时单位秒
				hiddeBtnAndTime:true, //隐藏时间和提交按钮
				totalQuestionNumber:1, //总题数
				showModal:false, //模态框
				questionIndex:0, //跳转问题索引
				swiperHeight:'850rpx'
			}
		},
		onReady() {
			var tempHeight = 800;
			var _me = this;
			uni.getSystemInfo({
				success(res) {
					tempHeight = res.windowHeight
					uni.createSelectorQuery().select("#top-box").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						// tempHeight -= data.height;
						// uni.createSelectorQuery().select("#foot-box").fields({
						// 	size: true,
						// 	scrollOffset: true
						// }, (data) => {
						// 	tempHeight -= data.height;
						// 	_me.swiperHeight = tempHeight + 'rpx';
						// }).exec();
					
					}).exec();
				}
			})
		},
		onLoad() {
			this.getMockQuestion()
		},
		computed:{
			content(){
				return '还有'+this.totalQuestionNumber+'题没做, 请确认是否提交'
			}
		},
		methods: {
			
			swiperChange(){ //滑动事件
				
			},
			timeUp(){
				console.log('时间到了')
			},
			openModal(){ //开启模态框
				this.showModal = true
			},
			async getMockQuestion(){//获取模拟考试题
				const res = await this.$u.api.getMockQuestion()
				console.log(res)
				if(res.code === 200){
					console.log(res.body)
				}
			}
		}
	}
</script>

<style>
.top-box{
	display: flex;
	justify-content: space-around;
}
</style>
