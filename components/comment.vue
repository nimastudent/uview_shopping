<template>
	<view class="comment-contianer">
		<view class="comment-title">
			<text class="comment-area">评论区</text>
			<u-tag text="写留言" @click="showPop()" size="mini" />
		</view>
		<view class="comment" v-for="(res, index) in list" :key="index">
			<view class="left">
				<image src="../static/user.png" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.comment.nickName }}</view>
				</view>
				<view class="content">{{ res.comment.content }}</view>
				<view class="reply-box" v-if="res.secondComment.length > 0">
					<view class="item" v-for="item in res.secondComment" :key="item.id">
						<view class="username">{{ item.nickName }}</view>
						<view class="text">{{ item.content }}</view>
					</view>
				</view>
				<view class="bottom">
					{{ res.comment.date }}
					<view class="reply" @click="reply(res.comment)">回复</view>
				</view>
			</view>
		</view>
		<view class="" v-if="!list.length">
			评论区为空！
		</view>
	

		<u-popup v-model="show" mode="bottom">

			<u-field maxlength='50'  label-width="0" v-model="data.content" type="textarea" placeholder="请填写评论" focus>
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
				this.data.content = "";
				this.data.parentId = null;
				this.data.hostId = this.testId;
				this.show = true;
				console.log(this.data)
			},
			reply(data) {
				this.data.content = "";
				this.data.parentId = data.id;
				this.data.hostId = data.hostId;
				this.show = true;
				console.log(data)
			},
			async submintComment() {
				// 资讯评论
				if(this.isConsultComment){
					const res = await this.$u.api.commentConsult(this.data)
					if (res.success) {
						this.$u.toast('评论成功！');
						this.show = false;
						this.$emit("update")
					}
				}else{
				// 新规评论
					this.$u.api.commentNewRule(this.data).then(res => {
						if (res.success) {
							this.$u.toast('评论成功！');
							this.show = false;
							this.$emit("update")
						}
					})
				}
				
			},
			test(){
				console.log(this.testId);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-contianer {
		border-radius: 6upx;

		.comment-title {
			padding: 10upx;
			display: flex;
			justify-content: space-between;

			.comment-area {
				color: #212224;
				font-weight: 600;
			}

			.edit-comment {
				color: #2979FF;
			}
		}
	}

	.comment {
		display: flex;
		padding: 15upx;


		.left {
			image {
				width: 64upx;
				height: 64upx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20upx;
			font-size: 30upx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 5upx;

				.name {
					font-size: 28upx;
					color: #3f3f3f;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26upx;

					.num {
						margin-right: 4upx;
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
				margin-bottom: 5upx;
				font-size: 34upx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12upx;
				width: 100%;

				.item {
					padding: 20upx;
					border-bottom: solid 2upx $u-border-color;

					.username {
						font-size: 24upx;
						color: #999999;
					}
					
                    
                    .text{
                        word-break: break-all;
						color: #17181a;
                    }
				}

				.all-reply {
					padding: 20upx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6upx;
					}
				}
			}

			.bottom {
				margin-top: 15upx;
				display: flex;
				font-size: 24upx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10upx;
				}
			}

		}
	}

	.bottomText {
		color: #1c27fc;
		text-align: center;
		height: 60upx;
	}
</style>
