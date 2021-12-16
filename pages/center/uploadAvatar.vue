<template>
	<view>
		<u-upload ref="uUpload" :action="action" :before-upload="beforeUpload" :auto-upload="false"  max-count="1" :header="header"></u-upload>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action:'http://ldqc.xyz:5880/user/headPortrait/upload',
				header:{'Content-Type':'multipart/form-data',},
				file:{},
				token:'',
			}
		},
		onLoad() {
			let token = 'token'
			let atoken = this.vuex_token
			 this.header[token] = atoken
		},
		methods: {
			beforeUpload(index,list){
				this.file = list[0].file
				console.log(list[0].file)
			},
			
			submit() {
				this.$refs.uUpload.upload();

						// this.$u.api.uploadAvatar(this.file).then((res) => {
						// 	console.log(res)
						// })
				},
		}
	}
</script>

<style>

</style>
