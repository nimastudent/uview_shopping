<template>
	<view>
		<u-navbar back-text="返回" title="新规内容"  ></u-navbar>
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
			<collect :collectType="collectType" :curentId="consultId" :isCollect="ruleContent.isCollect" @update="getNewRuleContent" ></collect>
			<comment  :commentList="commentList" :consultId="consultId" :isConsult="isConsult" @update="getNewRuleComment"></comment>
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
				this.getNewRuleContent();
				this.getNewRuleComment();
			}
		},
		methods: {
			async getNewRuleContent() {
				const res = await this.$u.api.getNewRuleContent(this.consultId)
				if (res.success) {
					this.ruleContent = res.body
				}
			},
			async getNewRuleComment() {
				
				const res = await this.$u.api.fetchNewRuleComment(this.consultId)
				if (res.success) {
					this.commentList = res.body;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		margin: 0 auto;
		padding: 0 20upx;
		position: relative;
	}

	.title {
		margin: 15upx;
		font-weight: 800;
		font-size: 30upx;
		text-align: center;
	}

	.date {
		color: #676767;
		position: absolute;
		right: 20upx;
	}

	.content {
		margin: 50upx 0 20upx 0 ;
		text-indent: 1rem;
		line-height: 45upx;
		letter-spacing: 1.5upx;
	}
</style>
