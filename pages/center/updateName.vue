<template>
	<view>
		<u-cell-group>
			<u-cell-item :title-style="style" title="头像" :arrow="true" arrow-direction="right" @click="uploadtest">
				<image :src="imgUrl" mode=""></image>
			</u-cell-item>
			<u-cell-item :title-style="style" title="昵称" :arrow="true" :value="nickName" ></u-cell-item>
			
		</u-cell-group>
		
				<u-toast ref="uToast" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				style:{
					'color':'#000000',
				},
				imgUrl:'',
			}
		},
		computed:{
			nickName(){
				return this.vuex_nickName
			}
		},
		onLoad() {
			this.getImgUrl()
		},
		methods: {
			async getImgUrl(){
				await this.$u.api.getAvatar().then((res) => {
					if(res.success){
						let arrayBuffer = res.body
						this.imgUrl = 'data:image/jpeg;base64,' + arrayBuffer
					}
				})
			},
			uploadtest(){
				var a = this.vuex_token
				var _this = this
				 uni.chooseImage({
					  count: 1, //默认9
					    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					    sourceType: ['album'], //从相册选择
					    success: function (res) {
					        // console.log(JSON.stringify(res.tempFilePaths));
							// var a = this.$u.vuex_token
							console.log(res.tempFiles[0].type)
							if(res.tempFiles[0].type == 'image/jpeg'){
								// console.log('yes')
								uni.uploadFile({
									url:'http://ldqc.xyz:5880/user/headPortrait/upload',
									file:res.tempFiles[0],
									header:{
										'token':a,
									},
									success:(res) => {
										console.log(res)
										var test = JSON.stringify(res.body)
									}
								})
							}else{
								_this.$u.toast("请上传文件格式为jpg/jpeg的图片")
							}
							
					    },
						
				})
			}
		}
	}
</script>

<style lang="scss" scoped> 
image{
	height: 90rpx;
	width: 90rpx;
}
</style>
