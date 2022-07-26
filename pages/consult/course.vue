<template>
	<view >
		<u-parse :content="content" >
		</u-parse>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				content:""
			};
		},
		components:{
			uParse
		},
		onLoad(e) {
			console.log(e);
			this.getCourseByid(e.id)
		},
		methods: {
			async getCourseIntroduce() {
				const res = await this.$u.api.getCourseIntroduce(this.item.id);
				if (res.success) {
					this.introduce = res.body;
				}
			},
			async getCourseByid(id){
				const res = await this.$u.api.getCourseById(id)
				if(res){
					console.log(res);
					this.content = res.body.content
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
	
</style>
