<template>
	<view class="container">
		<view class="title">
			{{consultRes.title}}
		</view>
		<view class="date">
			{{consultRes.date}}
		</view>
		
		<view class="content">
			{{consultRes.content}}
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
	color: #676767;
	position: absolute;
	right: 20rpx;
}
.content{
	
	margin-top: 50rpx;
	text-indent: 1.5rem;
}
</style>
