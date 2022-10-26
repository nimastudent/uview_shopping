<template>
	<view>
		<view class="check">
			<text class="checktext">选择题目数量</text>
			<u-number-box :step='5' :input-height="70" :min="1" :max="45" v-model="value" @change="valChange">
			</u-number-box>
		</view>
		<u-cell-group>
			<u-cell-item title="判断题" @click="handleClick('jud')" :value="`${progressList['j'].finished}/${progressList['j'].all}`"></u-cell-item>
			<u-cell-item title="单选题" @click="handleClick('sin')" :value="`${progressList['s'].finished}/${progressList['s'].all}`"></u-cell-item>
			<u-cell-item title="多选题" @click="handleClick('mul')" :value="`${progressList['m'].finished}/${progressList['m'].all}`"></u-cell-item>
			<u-cell-item title="顺序练习" @click="handleClick('all')" :value="allValue"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 20,
				progressList:[]
			};
		},
		computed: {
			allValue(){
				const list = this.progressList
				let all = 0
				let finished = 0
					for(let item of Object.entries(list)){
						all += item[1].all
						finished += item[1].finished
					}
				return `${finished}/${all}`
			}
		},
		onLoad() {
			this.$u.api.getOrderProgress().then(res => {
				this.progressList = res.body
				console.log(this.progressList);
			})
		},
		methods: {
			handleClick(type) {
				this.$u.route({
					url: 'pages/learnning/mock',
					params: {
						type,
						count:this.value
					}
				})
			},
			valChange({value}) {
				console.log(value)
				
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
</style>
