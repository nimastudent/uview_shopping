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
			<u-divider></u-divider>

			<swiper
			:current="questionIndex"
			class="swiper-box"
			@change="swiperChange"
			:style="{'height':swiperHeight}"
			>
				<swiper-item v-for="(question,index) in questionList" :key="index">
					<view class="">
						<view class="action">
							<text></text>{{index+1}}.{{question.problem}}
						</view>
					</view>
					<!-- 判断 -->
					
					
					<!-- 单选 -->
						
						<view class="u-m-t-20" v-if="currentType===1">
								<u-radio-group @change="radioGroupChange" :wrap="true">
									<u-radio 
										@change="radioChangeSingle"
										v-for="(item, index) in question.option" :key="index" 
										:name="item.content"
										:value="item.id"
									>
										{{item.id}}.{{item.content}}
									</u-radio>
								</u-radio-group>
							</view>
					
					<!-- 多选 -->
					
					<view class="u-m-t-20" v-else-if="currentType===2">
							<u-checkbox-group  :wrap="true">
								<u-checkbox 
									v-for="(item, index) in question.option" :key="index" 
									:name="item.id"
									@change="checkboxGroupChange"
								>{{item.id}} .{{item.content}}</u-checkbox>
							</u-checkbox-group>
							<!-- <u-button @click="checkedAll">全选</u-button> -->
						</view>
						
						<view class="u-m-t-20" v-else-if="currentType === 3" >
							<u-radio-group @change="judgmentRadioGroupChange" :wrap="true">
								<u-radio 
									@change="judgmentRadioChange"
									v-for="(item, index) in question.option" :key="index" 
									:name="item.content"
									:value="item.id"
								>
									{{item.id}}.{{item.content}}
								</u-radio>
							</u-radio-group>
						</view>
				</swiper-item>
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
				swiperHeight:'850rpx',
				questionList:[], //题目列表
				singleAnsList:[],
				judgmentAnsList:[],
				multipleAnsList:[],
				multiple:{},
				autoRadioNext: true, //单选题，自动移下一题
				
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
			// this.currentType = this.questionList[0].type;
			uni.hideLoading();
			
		},
		computed:{
			content(){
				return '还有'+this.totalQuestionNumber+'题没做, 请确认是否提交'
			}
		},
		methods: {
			radioChangeSingle(e){
				// console.log(e)
			},
			swiperChange(e){ //滑动事件
				let index = e.target.current;
				if (index != undefined) {
					this.questionIndex = index;
					this.currentType = this.questionList[index].type;
				}
				// console.log(this.questionList[index].type)
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
					// [this.questionList...,res.body.judgment...]
					this.questionList = []
					this.questionList = [...this.questionList,...res.body.judgment,...res.body.single,...res.body.multiple]
					console.log(this.questionList)
				}
			},
			radioGroupChange(e){//单选选中
				// e为选项内容
				//获取问题列表中当前元素
				var item = this.questionList[this.questionIndex]
				var singleAns = {id:item.id,answer:e}
				var flag = true
				for(let i = 0;i < this.singleAnsList.length;i++){
					if(this.singleAnsList[i].id == singleAns.id){
						this.singleAnsList[i].answer = e
						flag = false
						break
					}
				}
				if(flag){
					this.singleAnsList.push(singleAns)
				}
				if (this.autoRadioNext && this.questionIndex < this.questionList.length - 1) {
					this.questionIndex += 1;
				};
			},
			checkboxGroupChange(e){
				var item = this.questionList[this.questionIndex]
				var params = {id:1,answer:"A"}
				this.$u.pai.sendm
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
