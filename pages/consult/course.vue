<template>
	<view>
		<view class="video-continar">
			<video src="" controls></video>
		</view>
		<view class="introduce-continar">
			<text>{{introduce}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:{},
				introduce:'',
			}
		},
		onLoad(e) {
			this.item = e
			this.getCourseIntroduce()
		},
		methods: {
			async getCourseIntroduce(){
				const res = await this.$u.api.getCourseIntroduce(this.item.id)
				if(res.success){
					this.introduce = res.body
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.video-continar{
	width: 100%;
	margin: 0 auto;
	padding: 15rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
text{
}
.introduce-continar{
	text-align: center;
}
video{
	// margin-left: 100rpx;
}
</style>
