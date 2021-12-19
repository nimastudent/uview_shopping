<template>
	<view class="mockContinar">
		<u-navbar  title="考试页面"></u-navbar>
		<view class="container">
			<view id="top-box" class="top-box">
				<view class="action text-black u-flex">
					<!-- 题型判断 -->
					<text v-if="currentType===1">判断题</text>
					<text v-else-if="currentType===2">单选题</text>
					<text v-else-if="currentType===3">多选题</text>
				</view>
				<!-- 时间显示 -->
				<view id="time" v-if="hiddeBtnAndTime" class="u-flex">
					<u-count-down 
						:timestamp="timestamp"
						separator="zh"
						@end="timeUp"
					></u-count-down>
				</view>
				<!-- 提交按钮 -->
				<view class="action u-flex" v-if="hiddeBtnAndTime">
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
			:style="{'height':'850rpx'}"
			>
				<swiper-item class="u-m-10" v-for="(question,index) in questionList" :key="index">
					
					<view class="problem">
						<view class="action qusetion">
							<text></text>{{index+1}}.{{question.problem}}
						</view>
					</view>
					<!-- 判断 -->
					
					
					<!-- 单选 -->
						<view class="u-m-t-20" v-if="currentType===2">
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
					
					<view class="u-m-t-20" v-else-if="currentType===3">
							<u-checkbox-group  :wrap="true" @change="checkboxGroupChange">
								<u-checkbox 
									v-for="(item, index) in question.option" :key="index" 
									:name="item.id"
									v-model="item.check"
									
								>{{item.id}} .{{item.content}}</u-checkbox>
							</u-checkbox-group>
							<!-- <u-button @click="checkedAll">全选</u-button> -->
						</view>
						
						<view class="u-m-t-20" v-else-if="currentType === 1" >
							<u-radio-group :wrap="true">
								<u-radio 
									@change="judgmentRadioChange(item)"
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
	
		<view id="foot-box" class="foot-box">
			<view class="left foot-btn" @click="moveQuestion(-1)">
				<view >
					<u-icon name="arrow-left" color="#2979ff" size="50"></u-icon>
				</view>
				<text>上一题</text>
			</view>
			<view class="right foot-btn" @click="moveQuestion(1)">
				<view >
					<u-icon name="arrow-right" color="#2979ff" size="50"></u-icon>
				</view>
				<text>下一题</text>
			</view>
			<view class="qusetionCard">
				<u-button type="success" @click="showTika">题卡</u-button>
				<u-modal v-model="tikaModalShow"
				 width="85%"
				:show-title="false" 
				:mask-close-able="true"
				:show-confirm-button="false">
				
						<view class="tikaContinar">
							<view class="tikaTitle">
								题卡
							</view>
							<u-divider :half-width="fengexian" :use-slot="false"></u-divider>
							<view class="tika-btn-continar">
								<view class="tika-butoon" v-for="(item,index) in this.questionList" :key="index">
									<button 
									class="abtn"
									:type="item.checked?'primary':'default'"
									:custom-style="customStyle"
									@click="goIndexQuestion(index)"
									>{{index+1}}</button>
								</view>
							</view>
						</view>
				</u-modal>
			</view>
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
				tikaModalShow:false,
				questionIndex:0, //跳转问题索引
				swiperHeight:'800',
				questionList:[], //题目列表
				singleAnsList:[],
				judgmentAnsList:[],
				multipleAnsList:[],
				multiple:{},
				autoRadioNext: true, //单选题，自动移下一题
				fengexian:'50%',
				customStyle:{
					borderRadius:'50%'
				}
			}
		},
		onReady() {
			var tempHeight = 800;
			var _me = this;
			uni.getSystemInfo({
				success(res) {
					tempHeight = res.windowHeight
					_me = this
					uni.createSelectorQuery().select("#top-box").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						tempHeight -= data.height;
						uni.createSelectorQuery().select("#foot-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							_me.swiperHeight = tempHeight + 'rpx';
						}).exec();
					
					}).exec();
				}
			})
		},
		onLoad() {
			this.getMockQuestion()
			
		},
		computed:{
			content(){
				let num = this.questionList.length - (this.judgmentAnsList.length+this.multipleAnsList.length+this.singleAnsList.length)
				if(num == 0){
					return '请确认是否提交'
				}else{
					return '还有'+num+'题没做, 请确认是否提交'
				}
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
					for (var i = 0; i < this.questionList.length; i++) {
						this.$set(this.questionList[i],'checked',false)
					}
		
					console.log(this.questionList)
				}
			},
			judgmentRadioChange(item){//判断选中
				var problem = this.questionList[this.questionIndex]
				problem.checked = true
				let judegment = {id:problem.id,answer:item.id}
				var flag = true
				for(let i = 0;i < this.judgmentAnsList.length;i++){
					if(this.judgmentAnsList[i].id == judegment.id){
						this.judgmentAnsList[i].answer = item.id
						flag = false
						break
					}
				}
				if(flag){
					this.judgmentAnsList.push(judegment)
				}
				if (this.autoRadioNext && this.questionIndex < this.questionList.length - 1) {
					this.questionIndex += 1;
				};
			},
			radioGroupChange(e){//单选选中
				// e为选项内容
				//获取问题列表中当前元素
				var item = this.questionList[this.questionIndex]
				item.checked = true
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
			checkboxGroupChange(e){ //多选选中
				var item = this.questionList[this.questionIndex]
				var ans = e.toString().replace(/,/g, "");
				ans.length == 0 ? item.checked = false : item.checked = true
				var flag = true
				for (var i = 0; i < this.multipleAnsList.length; i++) {
					if(this.multipleAnsList[i].id == item.id){
						this.multipleAnsList[i].answer = ans
						flag = false
						break
					}
				}
				if(flag){
					this.multipleAnsList.push({
						id:item.id,
						answer:ans
					})
				}
			},
			moveQuestion(e) {
				if (e === -1 && this.questionIndex != 0) {
					this.questionIndex -= 1;
				}
				if (e === 1 && this.questionIndex < this.questionList.length - 1) {
					this.questionIndex += 1;
				}
			},
			showTika(){//题卡
				this.tikaModalShow = true
			},
			goIndexQuestion(index){
				this.tikaModalShow = false
				this.questionIndex = index
			},
			async sendSingleQuestion(){
				
				const res = await this.$u.api.sendMultipleAns(this.multipleAnsList[0])
				console.log(res)
			},
			sendJudgementQuestion(){
				
			},
			sendMutipledQuestion(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: relative;
		letter-spacing: 4rpx;
	}
.top-box{
	min-height: 90rpx;
	display: flex;
	justify-content: space-around;
}
.foot-box{
	min-height: 90rpx;
	width: 100%;
	display: flex;
	justify-content: space-around;
}
#foot-box{
	position: fixed;
	bottom: 20rpx;
}
.qusetion{
	padding: 10rpx;
	font-weight: 600;
	font-size: 0.8rem;
}
.foot-btn{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.tikaContinar{
	min-height: 800rpx;
	margin: 50rpx;
}
.tikaTitle{
	margin: 10rpx;
	text-align: center;
}
.tika-btn-continar{
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
}
.tika-butoon{
	width: 18%;
}
.abtn{
	margin: 10rpx;
	border-radius: 60%;
}

</style>
