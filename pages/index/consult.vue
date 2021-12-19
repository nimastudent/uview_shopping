<template>
	<view class="container">
		<view class="title">
			{{consultRes.title}}
		</view>
		<view class="date">
			{{consultRes.date}}
		</view>
		<view class="img">
			<image :src="consultRes.picture" mode=""></image>
		</view>
		<view class="content">
			<u-parse :html="consultRes.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				consultId:0,
				consultRes:{},
			}
		},
		onLoad(e){
			this.consultId = e.id
			this.getConsultContent()
		},
		methods: {
			async getConsultContent(){
				const res = await this.$u.api.getConsultContent(this.consultId)
				console.log(res)
				if(res.success){
					res.body.picture = 'data:image/jpeg;base64,' + res.body.picture
					this.consultRes = res.body
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 90%;
		margin: 0 auto;
		position: relative;
	}
.title{
	margin: 15rpx;
	font-weight: 800;
	font-size: 30rpx;
	text-align: center;
}
.date{
	float: right;
	height: 40rpx;
	color: #676767;
	right: 20rpx;
}
image{
	padding: 20rpx;
}
.content{
	text-indent: 1rem;
	line-height: 45rpx;
	letter-spacing: 1.5rpx;
}
</style>
