<template>
	<view class="u-p-20">
		<view class="">
			<text class="problem-type">判断题</text>
			<u-line class="u-m-b-20" color="#e4e7ed" />
			<view class="problem-continar" v-for="(item,index) in judgement.judgement" :key="index">
				<view class="problem">{{item.problem}}</view>
				<view class="option">
					1.{{item.option_true}}
				</view>
				<view class="option">
					0.{{item.option_false}}
				</view>
				<view class="answer">
					正确答案：{{item.answer}}
				</view>
			</view>

		</view>
		<view class="">
			<text class="problem-type">单选题</text>
			<u-line class="u-m-b-20" color="#e4e7ed" />
			<view class="problem-continar" v-for="(item,index) in single.singleChoice" :key="index">
				<view class="problem">{{item.id}}{{item.problem}}</view>
				<view class="option">
					A.{{item.option_a}}
				</view>
				<view class="option">
					B.{{item.option_b}}
				</view>
				<view class="option">
					C.{{item.option_c}}
				</view>
				<view class="option">
					D.{{item.option_d}}
				</view>
				
				
				<view class="answer">
					正确答案：{{item.answer}}
				</view>
			</view>
		</view>
		<view class="">
			<text class="problem-type">多选题</text>
			<u-line class="u-m-b-20" color="#e4e7ed" />
			<view class="problem-continar" v-for="(item,index) in mutiple.multipleChoice" :key="index">
				<view  class="problem">{{item.id}}{{item.problem}}</view>
				<view class="option">
					A.{{item.option_a}}
				</view>
				<view class="option">
					B.{{item.option_b}}
				</view>
				<view class="option">
					C.{{item.option_c}}
				</view>
				<view class="option">
					D.{{item.option_d}}
				</view>
				
				
				<view class="answer">
					正确答案：{{item.answer}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				judgement:{},
				single:[],
				mutiple:[]
			}
		},
		onLoad() {
			this.getErrorBook()
		},
		methods: {
			async getErrorBook(){
				const res = await this.$u.api.getErrorBook()
				if(res.success){
					console.log(res)
					this.judgement = res.body[0]
					this.single = res.body[1]
					this.mutiple = res.body[2]
					console.log(this.mutiple)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.problem-continar{
	
	
	.problem{
		font-weight: 600;
		font-size: 35rpx;
		letter-spacing: 3rpx;
		padding: 5rpx;
	}
	.option{
		letter-spacing: 2rpx;
	}
}
.problem-type{
	letter-spacing: 6rpx;
	font-size: 1.2rem;
	font-weight: 700;
	color: #000000;
}

.answer{
	font-weight: 400;
	color: #0055ff;
}

</style>
