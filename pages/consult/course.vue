<template>
	<view class="">
		<u-navbar title="课程内容" />
		<view class="main-contianer">
			<!-- 
		<u-navbar :title="title">
		
		</u-navbar> -->


			<progress v-if="!isFinished" :percent="proPercent" :duration="proDuration" stroke-width="3" />

			<u-parse :content="html" style="padding-top: 20upx;">
			</u-parse>

			<view class="bottom-btn">
				<button style="width:30vw" type="primary" @click="handleFinished" v-show="!isFinished">我已完成</button>
				<button style="width:30vw" type="info" @click="handleClickClose">关闭</button>
			</view>
			<u-toast ref="uToast" />


			<u-popup v-model="popVisible" mode="center" width="80%" :mask-close-able="false">
				<view class="ques-container">
					<view class="title">
						请答题：
					</view>
					<swiper class="swiper" :autoplay="false" :disable-touch="true" :duration="500"
						:current="currentIndex">
						<swiper-item v-for="item in quesList">
							<view class="ques">问题:{{item.question}}</view>
							<view class="btn">
								<button @click="handleCheckedBtn(item,true)"> 正确</button>
								<button @click="handleCheckedBtn(item,false)"> 错误</button>
							</view>
						</swiper-item>

					</swiper>
				</view>
			</u-popup>



			<u-mask :show="loading">
				<view class="warp">
					<view class="rect">
						<u-loading :show="loading" mode="circle" @tap.stop></u-loading>
					</view>
				</view>
			</u-mask>

		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				content: "",
				introduce: "",
				loading: true,
				courseId: 0,
				contentId: 0,
				title: "",
				isFinished: false,
				quesList: [],
				popVisible: false,
				currentIndex: 0,
				ansList: [],
				proPercent: 0,
				planTime: 100,
				timer: null,
				proDuration: 1000
			};
		},
		components: {
			uParse
		},
		computed: {
			html() {
				console.log(this.introduce);
				return this.introduce + this.content
			}
		},
		onLoad(e) {
			if (this.timer) {
				clearInterval(this.timer)
			}
			console.log(e);
			this.courseId = parseInt(e.courseId)
			this.contentId = parseInt(e.id)
			this.title = e.title
			this.getCourseByid(e.id)
			this.getCourseIntroduce(e.courseId)
			this.checkCourse(this.courseId, this.contentId)
			this.getQues()
		},
		onBackPress() {
			clearInterval(this.timer);
		},
		methods: {
			async getCourseIntroduce(id) {
				const res = await this.$u.api.getCourseIntroduce(id);

				if (res.success) {
					if (res.body !== null) {
						this.introduce = `<h2>课程介绍：${res.body}</h2>`
					}
				}
			},
			async getCourseByid(id) {
				this.proPercent = 0
				const res = await this.$u.api.getCourseById(id)
				if (res) {
					let str = res.body.content
					this.planTime = res.body.planTime
					this.content = str
					this.loading = false
				}
			},
			async checkCourse(courseId, contentId) {
				const res = await this.$u.api.checkCourseIsFinished({
					contentId
				})
				this.isFinished = res.body
				if (!this.isFinished) {
					this.startTime()
				}
			},

			async getQues() {
				const res = await this.$u.api.getQuesById({
					contentId: this.contentId
				})
				this.quesList = res.body
			},
			show() {
				this.$refs.uToast.show({
					title: '该课程暂无视频',
					type: 'default',

				})
			},
			submitCourse() {


			},
			handleFinished() {
				if (this.proPercent >= 100) {
					this.$u.api.submitUserTime({
						courseId: this.courseId,
						contentId: this.contentId,
						learnTime: this.planTime + 100
					}).then(res => {
						if (res.success) {
							uni.showToast({
								title: "已完成学习！",
								icon: "success"
							})
							this.isFinished = true
							if (this.quesList.length === 0) {
								uni.showToast({
									title: "暂无题目！"
								})
								this.handleClickClose();
								return;
							} else {
								this.popVisible = true
							}
						}
						console.log(res);
					})


				} else {
					uni.showToast({
						title: "学习时长不足！",
						icon: "error"
					})
				}
				// this.popVisible = true
			},
			handleCheckedBtn(item, checked) {
				// if(item.)
				this.ansList.push(checked)
				this.currentIndex++;
				if (item.answer === checked) {
					uni.showToast({
						title: "正确！",
						icon: "success"
					})
				} else {
					uni.showToast({
						title: "错误！",
						icon: "error"
					})
				}
				if (this.ansList.length === this.quesList.length) {
					const form = new FormData()
					form.append('contentId', parseInt(this.contentId))
					form.append('inputs', this.ansList)
					this.$u.api.submitUserQues({
						contentId: parseInt(this.contentId),
						inputs: this.ansList
					}).then(res => {
						console.log(res);
					})
					this.popVisible = false;
				}
			},
			handleClickClose() {
				const _this = this
				if (this.isFinished) {
					this.$u.route({
						type: 'navigateBack',
						delta: 1
					})
				} else {
					uni.showModal({
						title: '提示',
						content: "您暂未完成当前学习任务，是否继续关闭?",
						success(res) {
							if (res.confirm) {
								_this.$u.route({
									type: 'navigateBack',
									delta: 1
								})
							}
						}
					})
				}
			},
			startTime() {
				const _this = this
				const time = setInterval(() => {
					if (this.proPercent <= 100) {
						this.proPercent += 1;
						if (this.proPercent === 50) {
							clearInterval(time);
							uni.showModal({
								content: "请点击确认或取消！",
								success() {
									_this.startTime();
								}
							})
						}
					} else {

						clearInterval(time);
					}


				}, this.planTime * 10);
				this.timer = time;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.main-contianer {
		margin: 0 10px;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.bottom-btn {
		margin: 30upx 30upx;
		display: flex;
	}


	.ques-container {
		width: 100%;

		.swiper {
			height: 400upx;
			position: relative;
		}

		.ques {
			padding: 20upx;
			font-size: 38upx;
			font-weight: 500;
			letter-spacing: 4upx;
			margin-bottom: 40upx;
		}

		.btn {
			width: 100%;
			position: absolute;
			bottom: 30upx;
			display: flex;
		}

		.title {
			padding: 10upx;
			letter-spacing: 4upx;
			background-color: #007aff;
			font-weight: 600;
			font-size: 32upx;
			color: #fff;
		}
	}
</style>