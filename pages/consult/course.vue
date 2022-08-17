<template>
	<view class="main-contianer">
		<u-parse :content="html" style="padding-top: 20rpx;">
		</u-parse>
		<u-toast ref="uToast" />
		<u-mask :show="loading" >
			
				<view class="warp">
				
						<view class="rect" >
							<u-loading :show="loading" mode="circle" @tap.stop></u-loading>
						</view>
					</view>
			</u-mask>
		
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				content:"",
				introduce:"",
				loading:true
			};
		},
		components:{
			uParse
		},
		computed:{
			html(){
				console.log(this.introduce);
				return this.introduce + this.content
			}
		},
		onLoad(e) {
			console.log(e);
			uni.setNavigationBarTitle({
				title:e.title
			})
			this.getCourseByid(e.id)
			this.getCourseIntroduce(e.courseId)
		},
		methods: {
			async getCourseIntroduce(id) {
				const res = await this.$u.api.getCourseIntroduce(id);
				if (res.success) {
					this.introduce = `<h2>课程介绍：${res.body}</h2>`
				}
			},
			async getCourseByid(id){
				const res = await this.$u.api.getCourseById(id)
				if(res){
					console.log(res);
					let str = res.body.content
					this.content = str
					this.loading = false
					// this.content = res.body.content
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

<style scoped>
	.main-contianer{
		margin: 0 10px;
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

</style>
