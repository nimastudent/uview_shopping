<template>
	<view>
		<u-navbar title="选择练习" />
		<view class="check">
			<text class="checktext">本次考试题数：</text>
			<u-number-box :step='5' :input-height="70" :min="1" :max="45" v-model="value" @change="valChange">
			</u-number-box>
		</view>
		<u-cell-group>
			<u-cell-item title="判断题" @click="handleClick('jud')"
				:value="`${progressList['j'].finished}/${progressList['j'].all}`"></u-cell-item>
			<u-cell-item title="单选题" @click="handleClick('sin')"
				:value="`${progressList['s'].finished}/${progressList['s'].all}`"></u-cell-item>
			<u-cell-item title="多选题" @click="handleClick('mul')"
				:value="`${progressList['m'].finished}/${progressList['m'].all}`"></u-cell-item>
			<u-cell-item title="顺序练习" @click="handleClick('all')" :value="allValue"></u-cell-item>
			<u-cell-item title="点我重置题库" @click="modalShow=true"></u-cell-item>
		</u-cell-group>
		<u-modal v-model="modalShow" :show-cancel-button="true" :async-close="true" @confirm="handleConfirm">
			<view class="title-contianer">
				<h3>请确认是否重置所有题目？</h3>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 20,
				modalShow: false,
				form: {
					j: true,
					s: true,
					m: true
				},
				disabled: false
			};
		},
		computed: {
			allValue() {
				const list = this.progressList
				let all = 0
				let finished = 0
				for (let item of Object.entries(list)) {
					all += item[1].all
					finished += item[1].finished
				}
				return `${finished}/${all}`
			},
			progressList(){
				return this.vuex_orderProgress
			}
		},
		methods: {
			getOrderProgress(){
				this.$u.api.getOrderProgress().then(res => {
					this.$u.vuex('vuex_orderProgress',res.body)
				})
			},
			handleClick(type) {
				setTimeout(()=>{
					this.getOrderProgress()
				},2000)
				this.$u.route({
					url: 'pages/learnning/mock',
					params: {
						type,
						count: this.value
					}
				})
			},
			valChange({
				value
			}) {},
			switchChangeJ(e) {
				this.form.j = e.detail.value
			},
			switchChangeS(e) {
				this.form.s = e.detail.value
			},
			switchChangeM(e) {
				this.form.m = e.detail.value
			},
			async handleConfirm() {
				const res = await this.$u.api.resSetOrder(this.form)
				if (res.success) {
					this.getOrderProgress()
					this.modalShow = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx;

		.checktext {
			font-weight: 600;
			letter-spacing: 3upx;
			margin-right: 40upx;
		}
	}


	.title-contianer {
		padding: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
