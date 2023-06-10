<template>
	<view class="container">
		<u-navbar title="添加工作交流" />
		
		<view class="item">
			<text>标题：</text>
			<u-input placeholder="请输入标题" v-model="form.title" :maxlength="25" type="text" :border="true" />
		</view>

		<view class="item">
			<text>内容：</text>
			<u-input placeholder="请输入标题" v-model="form.content" type="textarea" :height="100" :maxlength="3000"
				:auto-height="true" :border="true" />
		</view>

		<view class="item">
			<text>图片：</text>
			<view class="add-iamge" @click="handleClickUpload" v-if="!imgBlob">
				<u-icon name="plus" class="u-add-btn" size="40"></u-icon>
			</view>
			<view class="add-iamge" v-if="imgBlob">
				<img :src="imgBlob" alt="">
				<view
					class="u-delete-icon"
					@tap.stop="deleteItem"
				>
					<u-icon class="u-icon" name="close" size="20" :color="'#ffffff'"></u-icon>
				</view>
			</view>
			
		</view>

		<view class="btn">
			<view class="btn-c">
				<u-button type="primary" @click="handleSubmit">提交</u-button>
			</view>
			<view class="btn-c">
				<u-button type="primary" @click="handleClickBack">关闭</u-button>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					title: "",
					content: "",
					picture:""
				},
				fileList: [],
				imgBlob:"",
				uploadUrl:"",
				token:""
			};
		},
		onLoad() {
			this.token= this.vuex_token;
			this.uploadUrl = this.$u.baseUrl + '/topic/upload/picture'
		},
		methods: {
			async handleSubmit() {
				if (this.form.title.length == 0 || this.form.content.length == 0 || this.form.picture.length == 0) {
					uni.showToast({
						title: "请输入完整信息！",
						icon: 'error'
					})
					return;
				}
				console.log(this.form);
				const res = await this.$u.api.insertWork(this.form)
				if(res.success){
					uni.showToast({
						title:"新增成功!",
						
					})
					uni.$emit('updateWork');
					this.handleClickBack()
				}
				console.log(res);
			},
			handleClickBack() {
				this.$u.route({
					type: 'navigateBack',
					delta: 1
				})
			},
			handleClickUpload(){
				var _this = this;
				uni.chooseImage({
				  count: 1, //默认9
				  sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
				  sourceType: ["album"], //从相册选择
				  success: function (res) {
							uni.showLoading({
								title: '上传中……'
							});
							console.log(res);
							_this.imgBlob = res.tempFilePaths[0]
							
							uni.uploadFile({
								url:_this.uploadUrl,
								file:res.tempFiles[0],
								header:{
									token:_this.token
								},
								success(uploadRes) {
									const response = JSON.parse(uploadRes.data)
									if(response && response.success){
										uni.showToast({
											title:"上传成功"
										})
										_this.form.picture = response.body
									}else{
										uni.showToast({
											title:"上传成功",
											icon:'error'
										})
										_this.deleteItem()
									}
									console.log(uploadRes);
									uni.hideLoading()
								}
							})
				  },
				});
			},
			deleteItem(){
				this.imgBlob = ""
				this.form.file = ""
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 95vw;
		margin: 0 auto;

		.item {
			padding: 10px 0;
			font-size: 38rpx;
		}

		.btn {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-evenly;

			.btn-c {
				width: 40vw;
			}
		}

	}
	
	.add-iamge{
		width: 200upx;
		height: 200upx;
		overflow: hidden;
		margin: 10upx;
		background: rgb(244, 245, 246);
		position: relative;
		border-radius: 10upx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
		
		img{
			
		}
	}
	
	.u-delete-icon {
		position: absolute;
		top: 10upx;
		right: 10upx;
		z-index: 10;
		background-color: $u-type-error;
		border-radius: 100upx;
		width: 44upx;
		height: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.u-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
</style>