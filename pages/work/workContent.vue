<template>
	<view class="container">
		<view class="title">
			{{workContent.title}}
		</view>
		<view class="date">
			{{workContent.date}}
		</view>
		<view class="img">
			<image :src="workContent.picture" mode=""></image>
		</view>
		<view class="content">
			<u-parse :html="workContent.content"></u-parse>
		</view>
		<work-comment ref="comment" :commentList="workContent.comment" :tid="workContent.id" @update="getContent" :isMine="isMine" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import workComment from './workComment.vue'
	export default {
		components:{
			workComment
		},
		data() {
			return {
				workContent: {},
				commentList:[],
				id:0,
				isMine:false
			};
		},
		onLoad(e) {
			this.id = parseInt(e.id)
			console.log(e);
			this.isMine = e.isMine === 'true' ? true : false
			// this.$refs['comment'].isMine = this.isMine
			this.getContent()
		},
		methods: {
			async getContent() {
				const res = await this.$u.api.getWorkContentById({
					id:this.id
				})
				this.workContent = res
				this.commentList = res.comment
			}
		}
	}
</script>


<style lang="scss" scoped>
	.container {
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 0 20upx;
		position: absolute;
		
		.img{
			width: 100%;
		}
	}

	.title {
		margin: 15upx;
		font-weight: 800;
		font-size: 40upx;
		text-align: center;
	}

	.date {
		float: right;
		height: 40upx;
		color: #676767;
		right: 20upx;
	}

	image{
		width: 100%;
	}

	.content {
		// text-indent: 1rem;
		margin: 40upx 0;
		line-height: 40upx;
		letter-spacing: 1.5upx;
		border-bottom: 1px solid #dbdbdb;
		word-wrap: break-word;
		    word-break: break-all;
		
			.collect-contianer{
				margin-top: 10upx;
			}
	}
</style>
