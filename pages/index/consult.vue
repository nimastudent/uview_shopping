<template>
	<view class="container">
		<view class="title">
			{{consultRes.title}}
		</view>
		<view class="date">
			{{consultRes.date}}
		</view>
		<view class="img" v-if="this.picShow">
			<image :src="consultRes.picture" mode=""></image>
		</view>
		<view class="content">
			<u-parse :html="consultRes.content"></u-parse>
			<view class="collect-contianer">
				<collect :collectType="collectType" :curentId="curentId"></collect>
			</view>
		</view>

		<u-toast ref="uToast" />


		<comment :commentList="commentList" :consultId="consultId" :isConsult="isConsult" @update="getConsultInfo"></comment>

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
				isConsult: true,
				consultId: 0,
				picShow: true,
				consultRes: {},
				commentList: [],
				collectType:1,
				curentId:0,
			}
		},
		onLoad(e) {
			if (e) {
				this.consultId = e.id;
				this.curentId = e.id;
				console.log(e)
				this.getConsultContent()
				this.getConsultInfo()
			}

		},
		methods: {
			async getConsultContent() {
				const res = await this.$u.api.getConsultContent(this.consultId)
				console.log(res)
				if (res.success) {
					res.body.picture = 'data:image/jpeg;base64,' + res.body.picture
					if (res.body.picture.length < 50) {
						this.picShow = false
					}
					this.consultRes = res.body
				}
			},
			// 获取资讯评论
			async getConsultInfo() {
				const res = await this.$u.api.getConsultInf(this.consultId)
				console.log(res)
				if (res.success) {
					this.commentList = res.body;
					console.log(this.commentList)
				}
			},
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
		float: right;
		height: 40rpx;
		color: #676767;
		right: 20rpx;
	}

	image {
		padding: 20rpx;
	}

	.content {
		// text-indent: 1rem;
		margin: 40rpx 0;
		line-height: 40rpx;
		letter-spacing: 1.5rpx;

	}
</style>
