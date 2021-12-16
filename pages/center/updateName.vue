<template>
	<view>
		<u-cell-group>
			<u-cell-item :title-style="style" title="头像" :arrow="true" arrow-direction="right" @click="goUploadAvatar">
				<image src="../../static/center-avatar.png" mode=""></image>
			</u-cell-item>
			<u-cell-item :title-style="style" title="昵称" :arrow="true" :value="nickName" @click="uploadtest"></u-cell-item>
			
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
				nickName:'lalala',				
			}
		},
		methods: {
			goUploadAvatar(){
				this.$u.route({
					tyep:'navigateTo',
					url:'pages/center/uploadAvatar',
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
								console.log(_this.$u.toast("lalalalla"))
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
