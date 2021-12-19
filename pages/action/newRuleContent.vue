<template>
	<view>
		<u-navbar back-text="返回" title="新规内容"></u-navbar>
		<view class="container">
			<view class="title">
				{{ruleContent.title}}
			</view>
			<view class="date">
				{{ruleContent.date}}
			</view>
			<view class="content">
				<u-parse :html="ruleContent.content"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ruleContent:[]
			}
		},
		onLoad(e){
			if(e.id != ''){
				this.getNewRuleContent(e.id)
			}
		},
		methods: {
			async getNewRuleContent(id){
				const res = await this.$u.api.getNewRuleContent(id)
				if(res.success){
					this.ruleContent = res.body
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
		width: 90%;
		margin: 0 auto;
		position: relative;
	}
.title{
	margin: 15rpx;
	font-weight: 800;
	font-size: 30rpx;
	text-align: center;
}
.date{
	color: #676767;
	position: absolute;
	right: 20rpx;
}
.content{
	margin-top: 50rpx;
	text-indent: 1rem;
	line-height: 45rpx;
	letter-spacing: 1.5rpx;
}
</style>
