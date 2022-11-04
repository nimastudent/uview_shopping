<template>
	<view class="mockContinar">
		<u-navbar :title="navbarTitle" :is-back="!showSubmit">
		</u-navbar>
		<view class="container">
			<view id="top-box" class="top-box">
				<!-- 题型判断 -->
				<!-- <view class="action text-black u-flex">
					<text v-if="currentType===1">判断题</text>
					<text v-else-if="currentType===2">单选题</text>
					<text v-else-if="currentType===3">多选题 </text>
				</view> -->
				<!-- 时间显示 -->
				<view id="time" v-if="hiddeBtnAndTime" class="u-flex" v-show="showSubmit">
					<u-count-down :timestamp="timestamp" separator="zh" @end="timeUp"></u-count-down>
				</view>
				<!-- 提交按钮 -->
				<view class="action u-flex" v-if="hiddeBtnAndTime" v-show="showSubmit">
					<button type="primary" @click="openModal()" size="mini">提交</button>
					<u-modal v-model="showModal" :content="content" :show-cancel-button="true" :async-close="true"
						@confirm="submit"></u-modal>
				</view>
			</view>

			<swiper :current="questionIndex" class="swiper-box" :disable-touch="true">
				<swiper-item class="u-m-10" v-for="(question,index) in questionList" :key="index">
					<!-- 题目 -->
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
							<u-radio class="u-p-10" v-for="(item, index) in question.option" :key="index"
								:name="item.id" :disabled="question.checked">
								{{item.id}}.{{item.content}}
							</u-radio>
						</u-radio-group>
					</view>
					<!-- 多选 -->
					<view class="u-m-t-20" v-else-if="currentType===3">
						<u-checkbox-group :wrap="true" @change="checkboxGroupChange">

							<u-checkbox class="u-p-10" v-for="(item, index) in question.option" :key="index"
								:name="item.id" :disabled="question.checked" v-model="item.check">{{item.id}}
								.{{item.content}}
							</u-checkbox>

						</u-checkbox-group>
					</view>

					<!-- 判断题 -->
					<view class="u-m-t-20" v-else-if="currentType === 1">
						<u-radio-group :wrap="true">
							<u-radio class="u-p-10" @change="judgmentRadioChange(item)"
								v-for="(item, index) in question.option" :key="index" :name="item.content"
								:value="item.id" :disabled="question.checked">
								{{item.id}}.{{item.content}}
							</u-radio>
						</u-radio-group>
					</view>

					<view class="questionAnswer" v-show="question.checked" v-if="currentType === 1">
						正确答案：{{question.answer === '1' ? 'A' : 'B'}}
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
			<view>
				<u-button @click="collectQuestion">收藏</u-button>
			</view>
			<view>
				<u-button type="primary" v-show="currentType===3" @click="confirmMutiplid">确定</u-button>
			</view>
			<view class="qusetionCard">
				<u-button type="success" @click="showTika">题卡</u-button>
				<Tika :tikaModalShow.sync="tikaModalShow" :questionList="questionList" @goIndex="goIndexQuestion"
					:hasType="tikaType" />
			</view>
		</view>

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
				navbarTitle: '模拟考', // 页面标题
				showSubmit: false, // 展示提交按钮
				hour: 0,
				minute: 30,
				second: 0,
				hiddeBtnAndTime: true, //隐藏时间和提交按钮
				timestamp: 2700, //倒计时单位秒
				hiddeBtnAndTime: true, //隐藏时间和提交按钮
				totalQuestionNumber: 1, //总题数
				showModal: false, //模态框
				tikaModalShow: false, //题卡是否显示
				tikaType: {
					jud: true,
					single: true,
					mutil: true
				}, // 题卡里是否有 单选 判断 多选 
				questionIndex: 0, //跳转问题索引
				swiperHeight: '800',
				questionList: [], //题目列表
				singleAnsList: [],
				judgmentAnsList: [],
				multipleAnsList: [],
				autoRadioNext: true, //单选题，自动移下一题
				fengexian: '50%',
				customStyle: {
					borderRadius: '50%'
				},
				scroeSetting: {}, // 后台题型分数
				scroe: 0,
				currentType: 1
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
		onLoad(e) {
			if (e.type === 'mock') {
				this.showSubmit = true
				this.getScore()
				this.getMockQuestion()
			} else {
				this.navbarTitle = '选择练习'
				this.getOrderQuestion(e.type, parseInt(e.count))
			}
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
			btnDisabled() {
				console.log(this.questionList);
				return true
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
			//  获取题型分数
			async getScore() {
				const res = await this.$u.api.getMockTypeScore()
				if (res.success) {
					this.scroeSetting = res.body
				}
			},
			async getMockQuestion() { //获取模拟考试题
				const res = await this.$u.api.getMockQuestion()
				window.localStorage.setItem('question', JSON.stringify(res.body))
				if (res.code === 200) {
					// [this.questionList...,res.body.judgment...]
					this.questionList = []
					this.questionList = [...res.body.judgment, ...res.body.single, ...res.body.multiple]
					for (var i = 0; i < this.questionList.length; i++) {
						this.$set(this.questionList[i], 'checked', false)
					}

				}
			},
			//选择练习  
			async getOrderQuestion(type, count) {

				// 设定选择参数
				let postData = {
					mul: 0,
					jud: 0,
					sin: 0
				}
				switch (type) {
					case 'sin':
						postData.sin = count
						this.tikaType.jud = false
						this.tikaType.mutil = false
						break;
					case 'jud':
						postData.jud = count
						this.tikaType.single = false
						this.tikaType.mutil = false
						break;
					case 'mul':
						postData.mul = count
						this.tikaType.jud = false
						this.tikaType.single = false
						break;
					default:
						postData = {
							mul: count,
							jud: count,
							sin: count
						}
						break;
				}
				//发送请求
				this.$u.api.getOrderQusetion(postData).then(res => {
					//获取列表
					let list = JSON.parse(JSON.stringify(res.body.question))
					list = [...list['j'], ...list['s'], ...list['m']]
					//给列表添加 checked字段
					list = list.map(item => Object.assign({}, item, {
						checked: false
					}))
					this.questionList = list
					//设定currentType
					this.currentType = list[0].type
				})

			},
			async submit() {
				//计算分数
				const rigthSingle = this.singleAnsList.filter((item) => item.isRight).length
				const rightMul = this.multipleAnsList.filter(item => item.isRight).length
				const rightJud = this.judgmentAnsList.filter(item => item.isRight).length
				const {
					mul_score,
					jud_score,
					sin_score
				} = this.scroeSetting
				const score = rigthSingle * sin_score + rightMul * mul_score + rightJud * jud_score
				console.log(score);
				this.$u.api.sendMockScore({
					score
				}).then(res => {
					if (res.success) {
						this.showModal = false
						uni.showModal({
							title: '',
							content: '您的分数是' + score,
							success: function(res) {
								uni.navigateBack()
							}
						})
					} else {
						uni.navigateBack()
					}
				})
			},
			//收藏题目
			collectQuestion() {
				let item = this.questionList[this.questionIndex]
				let obj = {
					type: item.type,
					questionId: item.id
				}
				this.$u.api.colllectQuestion(obj).then(res => {
					if (res.success) {
						this.$refs.uToast.show({
							title: '收藏成功',
							type: 'success',
						})
					} else if (res.body === 'exist') {
						this.$refs.uToast.show({
							title: '已收藏',
							type: 'error'
						})
					}

				})

			},
			// 计时器
			timeUp() {
				console.log('时间到了')
				this.submit()
			},
			// 单击提交按钮
			openModal() { //开启模态框
				this.showModal = true
			},
			judgmentRadioChange(item) { //判断选中
				// 在题目列表中找到该题
				var problem = this.questionList[this.questionIndex]
				// 题目checked 改为true 表示答了题目
				problem.checked = true
				let ans = "1"
				if (item.id == 'B') {
					ans = "0"
				}
				item.isTrue = true;
				let isRight = false;
				if (problem.answer === ans) {
					isRight = true
				}
				let judegment = {
					id: problem.id,
					answer: ans,
					type: 1,
					isRight
				}
				var flag = true
				for (let i = 0; i < this.judgmentAnsList.length; i++) {
					if (this.judgmentAnsList[i].id == judegment.id) {
						this.judgmentAnsList[i].userAnswer = ans
						this.judgmentAnsList[i].isRight = isRight
						flag = false
						break
					}
				}
				if (flag) {
					this.judgmentAnsList.push(judegment)
				}
				console.log(this.judgmentAnsList);
				// 自动下一题
				// if (this.autoRadioNext && this.questionIndex < this.questionList.length - 1) {
				// 	this.questionIndex += 1;
				// };
			},
			radioGroupChange(e) { //单选选中
				// e为选项内容
				//获取问题列表中当前元素
				var item = this.questionList[this.questionIndex]
				console.log(e);
				console.log(item);
				item.checked = true
				var singleAns = {
					id: item.id,
					userAnswer: e,
					type: 2,
					isRight: e === item.answer ? true : false
				}
				var flag = true
				// 更改单选答案
				for (let i = 0; i < this.singleAnsList.length; i++) {
					if (this.singleAnsList[i].id == singleAns.id) {
						this.singleAnsList[i].userAnswer = e
						this.singleAnsList[i].isRight = e === item.answer ? true : false
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
				var item = this.questionList[this.questionIndex];
				var ans = e.toString().replace(/,/g, "");
				// ans.length == 0 ? item.checked = false : item.checked = true
				var flag = true
				for (var i = 0; i < this.multipleAnsList.length; i++) {
					if (this.multipleAnsList[i].id == item.id) {
						this.multipleAnsList[i].userAnswer = ans
						this.multipleAnsList[i].isRight = ans === item.answer ? true : false
						flag = false
						break
					}
				}
				if (flag) {
					this.multipleAnsList.push({
						id: item.id,
						answer: ans,
						type: 3,
						isRight: ans === item.answer ? true : false
					})
				}
			},
			moveQuestion(e) {
				if (e === -1) {
					if (this.questionIndex != 0) {
						this.questionIndex -= 1;
					} else {
						uni.showToast({
							title: '这是第一题！',
							duration: 2000
						})
					}
				} else if (e === 1) {
					if (this.questionIndex < this.questionList.length - 1) {
						this.questionIndex += 1;
					} else {
						uni.showToast({
							title: '这是最后一题！',
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
			// 多选题确定
			confirmMutiplid() {
				let ques = this.questionList[this.questionIndex]
				ques.checked = true
			},

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
		justify-content: space-between;
		margin: 0 20upx;
	}

	.swiper-box {
		height: 80vh;
		overflow: auto;
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


	.questionAnswer {
		margin-top: 20px;
	}
</style>
