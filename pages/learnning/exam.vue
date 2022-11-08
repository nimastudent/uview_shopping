<template>
	<view class="mockContinar">
		<!-- :custom-back="handleCustomBack" -->
		<u-navbar title="学法考试" title-color="#000000" ></u-navbar>
		<view class="container">
			<view id="top-box" class="top-box">
				<!-- 题型判断 -->
				<view class="action text-black u-flex">
					<!-- <text v-if="currentType===1">判断题</text>
					<text v-else-if="currentType===2">单选题</text>
					<text v-else-if="currentType===3">多选题</text> -->
				</view>
				<!-- 时间显示 -->
				<view id="time" v-if="hiddeBtnAndTime" class="u-flex">
					<u-count-down :timestamp="timestamp" separator="zh" @end="timeUp"></u-count-down>
				</view>
				<!-- 提交按钮 -->
				<view class="action u-flex" v-if="hiddeBtnAndTime">
					<button type="primary" @click="openModal()" size="mini">提交</button>
					<u-modal v-model="showModal" :content="content" :show-cancel-button="true" :async-close="true"
						@confirm="submit"></u-modal>

					<u-modal v-model="showSocreModal" :content="scoreContent" @confirm="routerGo"></u-modal>
				</view>
			</view>

			<swiper :current="questionIndex" class="swiper-box" :style="{'height':'850rpx'}" :disable-touch="true">
				<swiper-item class="u-m-10" v-for="(question,index) in questionList" :key="index">

					<view class="problem">
						<view class="action qusetion">
							<u-tag :text="tagText" type="primary" size="mini" />
							<text class="u-m-l-15">{{index+1}}.{{question.problem}}</text>
						</view>
					</view>
					<!-- 判断 -->


					<!-- 单选 -->
					<view class="u-m-t-20" v-if="currentType===2">
						<u-radio-group @change="radioGroupChange" :wrap="true">
							<u-radio class="u-p-20" v-for="(item, index) in question.option" :key="index" :name="item.id">
								{{item.id}}.{{item.content}}
							</u-radio>
						</u-radio-group>
					</view>

					<!-- 多选 -->

					<view class="u-m-t-20" v-else-if="currentType===3">
						<u-checkbox-group :wrap="true" @change="checkboxGroupChange">
							<u-checkbox class="u-p-20" v-for="(item, index) in question.option" :key="index" :name="item.id"
								v-model="item.check">{{item.id}} .{{item.content}}</u-checkbox>
						</u-checkbox-group>
					</view>

					<!-- 判断 -->
					<view class="u-m-t-20" v-else-if="currentType === 1">
						<u-radio-group :wrap="true">
							<u-radio class="u-p-20" @change="judgmentRadioChange(item)" v-for="(item, index) in question.option"
								:key="index" :name="item.content" :value="item.id">
								{{item.id}}.{{item.content}}
							</u-radio>
						</u-radio-group>
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
			<view class="qusetionCard">
				<u-button type="success" @click="showTika">题卡</u-button>
				<Tika :tikaModalShow.sync="tikaModalShow" :questionList="questionList" @goIndex="goIndexQuestion" />
				<!-- <u-modal v-model="tikaModalShow" width="85%" :show-title="false" :mask-close-able="true"
					:show-confirm-button="false">

					<view class="tikaContinar">
						<view class="tikaTitle">
							题卡
						</view>
						<u-divider :half-width="fengexian" :use-slot="false"></u-divider>
						<view class="tika-btn-continar">
							<view class="tika-butoon" v-for="(item,index) in this.questionList" :key="index">
								<button class="abtn" :type="item.checked?'primary':'default'"
									:custom-style="customStyle" @click="goIndexQuestion(index)">{{index+1}}</button>
							</view>
						</view>
					</view>
				</u-modal> -->
			</view>
		</view>
		
		<u-modal v-model="backModalShow" :content="backContent" show-cancel-button @confirm="handleBackModalConfirm" @cancel="handleBackModalCancel"></u-modal>

<u-toast ref="uToast" />

	</view>
</template>

<script>
	import Tika from '../../components/Tika.vue'
	export default {
		components: {
			Tika
		},
		data() {
			return {
				hour: 0,
				minute: 30,
				second: 0,
				currentType: 1, //题型
				timestamp: 2700, //倒计时单位秒
				hiddeBtnAndTime: true, //隐藏时间和提交按钮
				totalQuestionNumber: 1, //总题数
				showModal: false, //模态框
				showSocreModal: false, //分数模态框
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
				scoreContent: '',
				examId: undefined, //试卷ID
				backModalShow:false, //返回试卷模态框 
				backContent:"您还有题目没有做完，请确认是否返回？" //返回试卷列表 模态框内容 
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
		onLoad(options) {
			this.getExamById(options.id)
			this.examId = options.id
		},
		computed: {
			finishNum(){
				return this.questionList.length - (this.judgmentAnsList.length + this.multipleAnsList.length + this.singleAnsList.length)
			},
			content() {
				let num = this.finishNum
				if (num == 0) {
					return '请确认是否提交'
				} else {
					return '还有' + num + '题没做, 无法提交'
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
			async submit() {
				// 判断是否做完所有题目
				if(this.finishNum > 0){
					this.showModal = false
					return
				}
				let username = this.vuex_userName;
				var ansList = [...this.singleAnsList, ...this.multipleAnsList, ...this.judgmentAnsList]
				ansList.sort((a, b) => a.index - b.index) //根据index 排序
				let finalPostList = []
				ansList.forEach(item => finalPostList.push(item.userAnswer)) //加到 list中
				// 上传题目
				const res = await this.$u.api.submitExamById({
					"inputs": finalPostList,
					"paper_id": this.examId
				})
				if (res.success) {
					if (res.body === 'user already finished exam') { //用户已经做过该试卷
						this.scoreContent = "您已完成该试卷！无法再次提交"
						this.showSocreModal = true
						setTimeout(() => {
							this.routerGo()
						}, 2000)
					} else {
						this.addErrorBook(ansList);
						this.scroe = res.body
						this.scoreContent = "您的分数为" + parseInt(this.scroe);
						this.showSocreModal = true;
						setTimeout(() => {
							this.routerGo()
						}, 2000)
					}
				}
			},
			// 添加错题
			async addErrorBook(errorList){
				await this.$u.api.addErrorBook(errorList)
			},
			findErrorQues(arr){
				let res = []
				arr.forEach(item => {
					if(!item.isRight){
						res.push({
							type:item.type,
						questionId:item.id})
					}
				})
				return res;
			},
			// 路由跳转回主页
			routerGo() {
				uni.redirectTo({
					url: '/pages/learnning/examList'
				});
			},
			timeUp() {
				this.submit()
			},
			openModal() { //开启模态框
				this.showModal = true
			},
			async getExamById(id) { //需要id 后的 考试列表方法
				const res = await this.$u.api.getExamById(id)
				console.log(res);
				const {
					question
				} = res.body
				if (res.success) {
					// [this.questionList...,res.body.judgment...]
					this.questionList = []
					console.log(question);
					this.addType(question.j, 1)
					this.addType(question.s, 2)
					this.addType(question.m, 3)
					this.questionList = [...this.questionList, ...question.j, ...question.s, ...question
						.m
					]
					for (var i = 0; i < this.questionList.length; i++) {
						this.$set(this.questionList[i], 'checked', false)
					}

					console.log(this.questionList)
				}
			},
			addType(arr, type) {
				arr.forEach(item => {
					item.type = type
				})
			},
			judgmentRadioChange(item) { //判断选中
				var problem = this.questionList[this.questionIndex]
				problem.checked = true
				var ans = "1"
				if (item.id == 'B') {
					ans = "0"
				}
				let judegment = {
					id: problem.id,
					userAnswer: ans,
					index: problem.index,
					type: 1
				}
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
					index: item.index,
					type: 2
				}
				var flag = true
				// 更改单选答案
				for (let i = 0; i < this.singleAnsList.length; i++) {
					if (this.singleAnsList[i].id == singleAns.id) {
						this.singleAnsList[i].userAnswer = e
						flag = false
						break
					}
				}
				// 添加到单选答案
				if (flag) {
					this.singleAnsList.push(singleAns)
				}
				// if (this.autoRadioNext && this.questionIndex < this.questionList.length - 1) {
				// 	this.questionIndex += 1;
				// };
			},
			checkboxGroupChange(e) { //多选选中
			// 获取当前题目
				var item = this.questionList[this.questionIndex]
				// 获取选择
				var ans = e.toString().replace(/,/g, "");
				
				ans.length == 0 ? item.checked = false : item.checked = true
				var flag = true
				// 首次答题 加入答案
				for (var i = 0; i < this.multipleAnsList.length; i++) {
					if (this.multipleAnsList[i].id == item.id) {
						this.multipleAnsList[i].userAnswer = ans
						flag = false
						break
					}
				}
				// 修改选择
				if (flag) {
					this.multipleAnsList.push({
						id: item.id,
						userAnswer: ans,
						index: item.index,
						type: 3
					})
				}
			},
			// 上一题 下一题
			moveQuestion(e) {
				// 上一题
				if (e === -1 ) {
                    if(this.questionIndex != 0){
                        this.questionIndex -= 1;
                    }else{
                        uni.showToast({
                        title:'这是第一题！',
                        duration: 2000
                        })
                    }
				}else if(e === 1){
                    if(this.questionIndex < this.questionList.length - 1){
                        if(this.questionList[this.questionIndex].checked){
                        	this.questionIndex += 1;
                        }else{
                        	this.$refs.uToast.show({
                        						title: '请答题',
                        						type: 'warning',
                        						
                        					})
                        }
                    }else{
                        uni.showToast({
                        title:'这是最后一题！',
                        duration: 2000
                        })
                    }
                }
				// 下一题
				if (e === 1 ) {
					// 判断用户是否答题
					
				}
				console.log(this.questionList[this.questionIndex]);
				this.currentType = this.questionList[this.questionIndex].type
			},
			showTika() { //题卡
				this.tikaModalShow = true
			},
			// 题卡跳转题目
			goIndexQuestion(index) {
				this.tikaModalShow = false
				this.questionIndex = index
			},
			// 处理单击右上角返回图标
			handleCustomBack(){
				// /pages/learnning/examList
				console.log(this.finishNum);
				if(this.finishNum > 0){
					this.backModalShow = true
				}else{
					this.$u.route('/pages/learnning/examList');
				}
				// this.$u.route('/pages/learnning/examList');
			},
			handleBackModalCancel(){
				this.backModalShow = false
			},
			handleBackModalConfirm(){
				this.$u.route('/pages/learnning/examList');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		letter-spacing: 4rpx;
	}

	.top-box {
		min-height: 90rpx;
		display: flex;
		justify-content: space-around;
	}

	.foot-box {
		min-height: 90rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	#foot-box {
		position: fixed;
		bottom: 20rpx;
	}

	.qusetion {
		padding: 10rpx;
		font-weight: 600;
		font-size: 30rpx;
	}

	.foot-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tikaContinar {
		min-height: 800rpx;
		margin: 50rpx;
	}

	.tikaTitle {
		margin: 10rpx;
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
		margin: 10rpx;
		border-radius: 60%;
	}
</style>
