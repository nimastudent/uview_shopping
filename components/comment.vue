<template>
	<view class="comment-contianer">
		<view class="comment-title">
			<text class="comment-area">评论区</text>
			<text class="edit-comment" @click="showPop()">写留言</text>
		</view>
		<view class="comment" v-for="(res, index) in list" :key="index">
			<view class="left">
				<image src="../static/center-avatar.png" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.comment.id }}</view>
					<!-- <view class="like" :class="{ highlight: res.isLike }">
   					<view class="num">{{ res.likeNum }}</view>
   					<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
   					<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
   				</view> -->
				</view>
				<view class="content">{{ res.comment.content }}</view>
				<view class="reply-box" v-if="res.secondComment.length > 0">
					<view class="item" v-for="item in res.secondComment" :key="item.id">
						<view class="username">{{ item.id }}</view>
						<view class="text">{{ item.content }}</view>
					</view>
					<!-- <view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
   					共{{ res.allReply }}条回复
   					<u-icon class="more" name="arrow-right" :size="26"></u-icon>
   				</view> -->
				</view>
				<view class="bottom">
					{{ res.comment.date }}
					<view class="reply" @click="reply(res.comment.id,res.comment.hostId)">回复</view>
				</view>
			</view>
		</view>
		<!-- <view class="bottomText" @click="test()">添加评论</view> -->

		<u-popup v-model="show" mode="bottom">
			<u-field label-width="0" v-model="data.content" type="textarea" placeholder="请填写评论" focus>
				<button size="mini" type="primary" slot="right" @click="submintComment">提交</button>
			</u-field>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: ['commentList', 'consultId','isConsult'],
		data() {
			return {
				show: false,
				data: {
					parentId: null,
					content: "",
					hostId: 0
				}
			}
		},
		computed: {
			list() {
				return this.commentList
			},
			testId(){
				return this.consultId
			},
			isConsultComment(){
				return this.isConsult
			}
		},
		methods: {
			showPop() {
				this.data.parentId = null;
				this.data.hostId = this.testId;
				this.show = true;
				console.log(this.data)
			},
			reply(userId, consultId) {
				this.data.parentId = userId;
				this.data.hostId = consultId;
				this.show = true;
			},
			async submintComment() {
				
				console.log(this.data)
				
				// 资讯评论
				// if(this.isConsultComment){
				// 	const res = await this.$u.api.commentConsult(this.data)
				// 	if (res.success) {
				// 		this.$u.toast('评论成功！');
				// 		this.show = false;
				// 	}
				// }else{
				// 新规评论
				// 	this.$u.api.commentNewRule(this.data).then(res => {
				// 		if (res.success) {
				// 			this.$u.toast('评论成功！');
				// 			this.show = false;
				// 		}
				// 	})
				// }
				
			},
			test(){
				console.log(this.testId);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-contianer {

		border-radius: 6rpx;
		background-color: #e7e7e7;

		.comment-title {
			padding: 10rpx;
			display: flex;
			justify-content: space-between;

			.comment-area {
				color: #74777e;
			}

			.edit-comment {
				color: #2979FF;
			}
		}
	}

	.comment {
		display: flex;
		padding: 30rpx;


		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}

		}
	}

	.bottomText {
		color: #1c27fc;
		text-align: center;
		height: 60rpx;
	}
</style>
