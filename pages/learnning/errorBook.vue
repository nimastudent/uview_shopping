<template>
	<view class="mockContinar"> 
	<u-navbar title="我的成绩" />
		<!-- <u-navbar title="模拟考"></u-navbar> -->
		<view class="container">
			



			<swiper :current="questionIndex" class="swiper-box" :disable-touch="true" >
				<swiper-item class="u-m-10" v-for="(question,index) in questionList" :key="index">

					<!-- 题目 -->
					<view class="problem">
						<view class="action qusetion">
							<u-tag :text="tagText" type="primary" size="mini" />
							<text>{{index+1}}.{{question.problem}}</text>
						</view>
					</view>
					<!-- 判断 -->

					<!-- 单选 -->
					<view class="u-m-t-20" v-if="currentType===2">
						<u-radio-group @change="radioGroupChange" :wrap="true">
							<u-radio class="u-p-20" v-for="(item, index) in question.option" :key="index" :name="item.id"
								:disabled="question.checked">
								{{item.id}}.{{item.content}}
							</u-radio>
						</u-radio-group>
					</view>

					<!-- 多选 -->

					<view class="u-m-t-20" v-else-if="currentType===3">
						<u-checkbox-group :wrap="true" @change="checkboxGroupChange"  >

							<u-checkbox class="u-p-20" v-for="(item, index) in question.option" :key="index" :name="item.id"
								:disabled="question.checked" v-model="item.check">{{item.id}} .{{item.content}}
							</u-checkbox>

						</u-checkbox-group>
					</view>

					<!-- 判断题 -->
					<view class="u-m-t-20" v-else-if="currentType === 1">
						<u-radio-group :wrap="true">
							<u-radio class="u-p-20" @change="judgmentRadioChange(item)" v-for="(item, index) in question.option"
								:key="index" :name="item.content" :value="item.id" :disabled="question.checked">
								{{item.id}}.{{item.content}}
							</u-radio>
						</u-radio-group>
					</view>

					<view class="questionAnswer" v-show="question.checked" v-if="currentType === 1">
						正确答案：{{question.answer === 0 ? 'A' : 'B'}}
					</view>
					<view class="questionAnswer" v-show="question.checked" v-else>
						正确答案：{{question.answer}}
					</view>
				</swiper-item>
			</swiper>
		</view>
		

		<view id="foot-box" class="foot-box">
			<view class="left foot-btn" @click="moveQuestion(-1)">
				<view>
					<u-icon name="arrow-left" color="#2979ff" size="50"></u-icon>
				</view>
				<text>上一题</text>
			</view>
			<view class="right foot-btn" @click="moveQuestion(1)">
				<view>
					<u-icon name="arrow-right" color="#2979ff" size="50"></u-icon>
				</view>
				<text>下一题</text>
			</view>
			<view class="">
				<!-- <u-button @click="collectQuestion">收藏</u-button> -->
			</view>
			<!-- 多选题 确定按钮 -->
			<view><u-button type="primary" v-show="currentType===3"  @click="confirmMutiplid">确定</u-button></view>
			
			<view class="qusetionCard">
				<u-button type="success" @click="showTika">题卡</u-button>
				<Tika
				 :tikaModalShow.sync = "tikaModalShow"
				 :questionList="questionList"
				 :isErroBook="true"
				 @goIndex = "goIndexQuestion"
				 />
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import Tika from '../../components/Tika.vue'
	export default {
		components:{
			Tika
		},
		data() {
			return {
				hour: 0,
				minute: 30,
				second: 0,
				hiddeBtnAndTime: true, //隐藏时间和提交按钮
				timestamp: 2700, //倒计时单位秒
				hiddeBtnAndTime: true, //隐藏时间和提交按钮
				totalQuestionNumber: 1, //总题数
				showModal: false, //模态框
				tikaModalShow: false,
				questionIndex: 0, //跳转问题索引
				swiperHeight: '800',
				questionList: [], //题目列表
				singleAnsList: [],
				judgmentAnsList: [],
				multipleAnsList: [],
				multiple: {},
				autoRadioNext: true, //单选题，自动移下一题
				fengexian: '50%',
				customStyle: {
					borderRadius: '50%'
				},
				scroe: 0,
				multipleAnswer: '',
				currentType:1
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
							_me.swiperHeight = tempHeight + 'upx';
						}).exec();

					}).exec();
				}
			})
		},
		onLoad() {
			this.getErrorBook()
		},
		computed: {
			content() {
				let num = this.questionList.length - (this.judgmentAnsList.length + this.multipleAnsList.length + this
					.singleAnsList.length)
				if (num == 0) {
					return '请确认是否提交'
				} else {
					return '还有' + num + '题没做, 请确认是否提交'
				}
			},
			tagText() {
				let res = "";
				switch (this.currentType) {
					case 1:
						res = '判断题'
						break;
					case 2:
						res = '单选题'
						break;
					case 3:
						res = '多选题'
						break;
					default:
						break;
				}
				return res
			}
		},
		methods: {
			// 获取错题本
			async getErrorBook(){
				const res = await this.$u.api.getErrorBook()
				if(res.success){
					let {judgment,single,multiple} =res.body
					let list = [...res.body.judgement,...res.body.single,...res.body.multiple]
					list = list.map(item => Object.assign({},item,{checked:false}))
					this.questionList = list
					console.log(this.questionList);
				}
			},
			typeAdd(arr,type){
				arr.forEach((item,index) => {
					if(type == 1){
						item.option = [{id:'A',content:item.optionTrue},{id:'B',content:item.optionFalse}]
					}else if(type == 2 || type == 3){
						item.option = [{id:'A',content:item.optionA},{id:'B',content:item.optionB},{id:'C',content:item.optionC},{id:'D',content:item.optionD}]
					}
					item.type = type
					item.checked = false
				})
				return arr
			},
			async getMockQuestion() { //获取模拟考试题
				const res = await this.$u.api.getErrorBook()
				console.log(res)	
				if (res.code === 200) {
					// [this.questionList...,res.body.judgment...]
					this.questionList = []
					this.questionList = [ ...res.body.judgment, ...res.body.single, ...res.body.multiple
					]
					for (var i = 0; i < this.questionList.length; i++) {
						this.$set(this.questionList[i], 'checked', false)
					}
			
				}
				console.log(this.questionList)
			},
			async submit() {
				var ansList = [...this.singleAnsList, ...this.multipleAnsList, ...this.judgmentAnsList]
				const res = await this.$u.api.computedScore({
					"infos": ansList
				})
				if (res.success) {
					this.scroe = res.body.total
				}
			},
			
			swiperChange(e) { //滑动事件
				let index = e.target.current;
				
				if (index != undefined) {

					this.questionIndex = index;
					this.currentType = this.questionList[index].type;
					let currentItem = this.questionList[index];
					// 判断题
					// if(currentItem.type == 1){
					// 	let hasChecked = false;
					// 	for(let i =0; i < this.judgmentAnsList.length;i++){
					// 		if(currentItem.id === this.judgmentAnsList[i].id){
					// 			hasChecked = true
					// 			break;
					// 		}
					// 	}
					// 	if(!hasChecked){
					// 		this.$refs.uToast.show({
					// 			title: `第${index + 1}题未做！`,
					// 			type: 'info',
					// 		})
					// 	}
					// }else if(currentItem.type == 2)  { //单选题
						
					// }else if(currentItem.type == 3){  //多选题
						
					// }
					
					// 判断是否为判断题
					// if (this.questionList[index].type == 3) {
					// 	console.log(1);
					// 	// 判断多选题答案是否为0 0的话直接返回
					// 	if (this.multipleAnsList.length == 0) {
					// 		return
					// 		// 多选题答案长度大于0 
					// 	} else if (this.multipleAnsList.length > 0) {
					// 		// 当前问题id
					// 		let id = this.questionList[index].id;
					// 		// 在多选题答案列表中 对比是否有当前问题 id
					// 		for (var i = 0; i < this.multipleAnsList.length; i++) {
					// 			if (this.multipleAnsList[i].id == id) {
					// 				// 滑动 将改问题checked改为 true
					// 				this.questionList[index].checked = true;
					// 				break
					// 			}
					// 		}
					// 	}

					// }
				}
				// console.log(this.questionList[index].type)
			},
			collectQuestion() {
				let item = this.questionList[this.questionIndex]
				console.log(item)
				let obj = {
					type: item.type,
					questionId: item.id
				}
				this.$u.api.colllectQuestion(obj).then(res => {
					if(res.success){
						this.$refs.uToast.show({
							title: '收藏成功',
							type: 'success',
						})
					}else if(res.body === 'exist'){
						this.$refs.uToast.show({
							title:'已收藏',
							type:'error'
						})
					}
					
				})

			},
			timeUp() {
				console.log('时间到了')
			},
			openModal() { //开启模态框
				this.showModal = true
			},
			
			judgmentRadioChange(item) { //判断选中
				// 在题目列表中找到该题
				var problem = this.questionList[this.questionIndex]
				// 题目checked 改为true 表示答了题目
				problem.checked = true
				var ans = "1"
				if (item.id == 'B') {
					ans = "0"
				}
				console.log(item);
				item.isTrue = true;
				console.log(problem);
				let judegment = {
					id: problem.id,
					answer: ans,
					type: 1
				}

				if (item.answer = judegment.answer) {

				}
				console.log(judegment)
				// 题目判断
				// this.$u.api.sendJudgmentAns()

				// 在判断题列表中找到该题 flag 改为true 
				var flag = true
				for (let i = 0; i < this.judgmentAnsList.length; i++) {
					if (this.judgmentAnsList[i].id == judegment.id) {
						this.judgmentAnsList[i].userAnswer = ans
						flag = false
						break
					}
				}
				if (flag) {
					this.judgmentAnsList.push(judegment)
				}


				// 自动下一题
				// if (this.autoRadioNext && this.questionIndex < this.questionList.length - 1) {
				// 	this.questionIndex += 1;
				// };
			},
			radioGroupChange(e) { //单选选中
				// e为选项内容
				//获取问题列表中当前元素
				// let aa = e
				// console.log(e)
				// return
				var item = this.questionList[this.questionIndex]
				item.checked = true
				var singleAns = {
					id: item.id,
					userAnswer: e,
					type: 2
				}
				var flag = true
				for (let i = 0; i < this.singleAnsList.length; i++) {
					if (this.singleAnsList[i].id == singleAns.id) {
						this.singleAnsList[i].userAnswer = e
						flag = false
						break
					}
				}
				if (flag) {
					this.singleAnsList.push(singleAns)
				}
				// if (this.autoRadioNext && this.questionIndex < this.questionList.length - 1) {
				// 	this.questionIndex += 1;
				// };
			},
			checkboxGroupChange(e) { //多选选中
				var item = this.questionList[this.questionIndex];
				var ans = e.toString().replace(/,/g, "");
				// ans.length == 0 ? item.checked = false : item.checked = true
				var flag = true
				this.multipleAnswer = ans;
				for (var i = 0; i < this.multipleAnsList.length; i++) {
					if (this.multipleAnsList[i].id == item.id) {
						this.multipleAnsList[i].userAnswer = ans
						flag = false
						break
					}
				}
				if (flag) {
					this.multipleAnsList.push({
						id: item.id,
						answer: ans,
						type: 3
					})
				}
			},
			moveQuestion(e) {
				if (e === -1) {
			        if(this.questionIndex != 0) {this.questionIndex -= 1;}
					else{ 
			            uni.showToast({
					    title:'这是第一题！',
			            duration: 2000
			            })
			        }              
			    }else if (e === 1) {
					if(this.questionIndex < this.questionList.length - 1) {this.questionIndex += 1;}
			        else { 
			            uni.showToast({
					    title:'这是最后一题！',
			            duration: 2000
			            })
			        }
				}
				this.currentType = this.questionList[this.questionIndex].type
			},
			showTika() { //题卡
				this.tikaModalShow = true
			},
			goIndexQuestion(index) {
				this.tikaModalShow = false
				this.questionIndex = index
				this.currentType = this.questionList[this.questionIndex].type
			},
			async sendSingleQuestion() {
				const res = await this.$u.api.sendMultipleAns(this.multipleAnsList[0])
				console.log(res)
			},
			// 多选题确定
			confirmMutiplid(){
				console.log(this.questionList[this.questionIndex])
				let ques = this.questionList[this.questionIndex]
				ques.checked = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		letter-spacing: 4upx;
	}
	
	.swiper-box {
		height: 80vh;
		overflow: auto;
	}

	.top-box {
		min-height: 90upx;
		display: flex;
		justify-content: space-around;
	}

	.foot-box {
		min-height: 90upx;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	#foot-box {
		position: fixed;
		bottom: 20upx;
	}

	.qusetion {
		padding: 10upx;
		font-weight: 600;
		font-size: 30upx;
	}

	.foot-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tikaContinar {
		min-height: 800upx;
		margin: 50upx;
	}

	.tikaTitle {
		margin: 10upx;
		text-align: center;
	}

	.tika-btn-continar {
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
	}

	.tika-butoon {
		width: 18%;
	}

	.abtn {
		margin: 10upx;
		border-radius: 60%;
	}

	.questionAnswer {
		margin-top: 20px;
	}
</style>
