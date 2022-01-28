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
			<collect :collectType="collectType" :curentId="consultId"></collect>
			<comment :commentList="commentList" :consultId="consultId" :isConsult="isConsult"></comment>
		</view>

	</view>
</template>

<script>
	import collect from '../../components/collect.vue'
	import comment from '../../components/comment.vue'
	export default {
		components: {
			comment,collect
		},
		data() {
			return {
				collectType: 3,
				consultId: 0,
				isConsult: false,
				ruleContent: [],
				commentList: [],
			}
		},
		onLoad(e) {
			if (e.id != '') {
				this.consultId = e.id;
				this.getNewRuleContent(e.id);
				this.getNewRuleComment(e.id);
			}
		},
		methods: {
			async getNewRuleContent(id) {
				const res = await this.$u.api.getNewRuleContent(id)
				if (res.success) {
					this.ruleContent = res.body
				}
			},
			async getNewRuleComment(id) {
				const res = await this.$u.api.fetchNewRuleComment(id)
				if (res.success) {
					this.commentList = res.body;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 90%;
		margin: 0 auto;
		position: relative;
	}

	.title {
		margin: 15rpx;
		font-weight: 800;
		font-size: 30rpx;
		text-align: center;
	}

	.date {
		color: #676767;
		position: absolute;
		right: 20rpx;
	}

	.content {
		margin: 50rpx 0 ;
		text-indent: 1rem;
		line-height: 45rpx;
		letter-spacing: 1.5rpx;
	}
</style>
