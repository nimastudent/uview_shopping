<template>
	<view class="comment-contianer">
		
		<view class="comment-title">
			<text class="comment-area">评论区</text>
			<u-tag text="写留言" @click="showPop()" size="mini" />
		</view>
		<view class="comment" :class="{'isAccpet':res.accept}" v-for="(res, index) in list" :key="index">
			<view class="left">
				<image src="@/static/user.png" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.realName }}</view>
						<u-tag text="已采纳" :closeable="false" type="success" v-if="res.accept"
							@click="handleClickCancle(res)" />
						<u-tag text="采纳它" :closeable="false" type="primary" v-if="isMy && !res.accept" @click="handleClickAccept(res)" />
				</view>
				<view class="content">{{ res.replay }}</view>
			</view>
		</view>
		<view class="" v-if="!list.length">
			评论区为空！
		</view>


		<u-popup v-model="show" mode="bottom">
			<u-field maxlength='150' label-width="0" v-model="data.replay" type="textarea" placeholder="请填写评论" focus>
				<button size="mini" type="primary" slot="right" @click="submintComment">提交</button>
			</u-field>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			commentList: {
				type: Array,
				require: true,
				default: () => []
			},
			tid: {
				type: Number,
				require: true,
				default: 0
			},
			isMine:{
				type:Boolean
			}
		},
		data() {
			return {
				show: false,
				data: {
					tid: 0,
					replay: "",
				},
			}
		},
		computed: {
			list() {
				return this.commentList
			},
			isMy(){
				console.log(this.isMine);
				return this.isMine
			}
		},
		methods: {
			showPop() {
				this.data.replay = "";
				this.data.tid = this.tid
				this.show = true;
				console.log(this.data)
			},
			async submintComment() {
				const res = await this.$u.api.commetWork(this.data)
				if (res.success) {
					this.$u.toast('评论成功！');
					this.show = false;
					this.$emit("update")
				}
				console.log(res);
			},
			handleClickCancle(item) {
				const _this = this
				if(this.isMy){
					uni.showModal({
						content: "请确认是否取消采纳该评论？",
						success(res) {
							console.log(res);
							if (res.confirm) {
								_this.$u.api.cancleComment({
									id: item.id
								}).then(res => {
									if (res.success) {
										uni.showToast({
											title: "取消采纳成功！",
										})
										_this.$emit("update")
									}
								})
							}
						}
					})
				}
			},
			handleClickAccept(item) {
				const _this = this
				uni.showModal({
					content: "请确认是否采纳该评论？",
					success(res) {
						if (res.confirm) {
							_this.$u.api.acceptComment({
								id: item.id
							}).then(res => {
								if (res.success) {
									uni.showToast({
										title: "采纳成功！",

									})
									_this.$emit("update")
								}
							})
						}
					}
				})
			},

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

	.isAccpet {
		background-color: #dbf1e1;
		color: #19be6b;
		border: 1px solid #71d5a1;
		border-radius: 30upx;
	}

	.comment {
		display: flex;
		padding: 15upx;
		margin: 10upx 0;



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


					.text {
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