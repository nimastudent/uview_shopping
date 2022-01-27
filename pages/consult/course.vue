<template>
	<view>
		<view class="video-continar">
			<video :src="url" controls></video>
		</view>
		<view class="introduce-continar">
			<text>{{ introduce }}</text>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {},
				introduce: "",
			};
		},
		computed: {
			url() {
				let id = this.item.courseId;
				let url = `http://ldqc.xyz:5880/course/video?id=${id}`
				return url
			}
		},
		onLoad(e) {
			this.item = e;

			this.getCourseIntroduce();
		},
		mounted() {
			if(!this.item.courseId){
				this.show()
			}
		},
		methods: {
			async getCourseIntroduce() {
				const res = await this.$u.api.getCourseIntroduce(this.item.id);
				if (res.success) {
					this.introduce = res.body;
				}
			},
			show() {
				this.$refs.uToast.show({
					title: '该课程暂无视频',
					type: 'default',
					
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.video-continar {
		width: 100%;
		margin: 0 auto;
		padding: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	text {}

	.introduce-continar {
		text-align: center;
	}

	video {
		// margin-left: 100rpx;
	}
</style>
