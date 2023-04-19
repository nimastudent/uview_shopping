<template>
	<view>
		<u-navbar :is-back="false" title="课程学习" title-color="#000000"></u-navbar>
		
		 <u-loading mode="flower" :show="loading"></u-loading>
		
		<u-collapse :item-style="style" v-show="!loading">
			<u-collapse-item class="cell" :title="item.name" v-for="(item, id) in courseArry" :key="id"
				:open="item.open">
				<u-cell-group>
					<u-cell-item v-for="(name,index) in item.content" :key="index" :title="name.name" :arrow="true"
						arrow-direction="right" @click="goCourse(name,item)"></u-cell-item>
				</u-cell-group>
			</u-collapse-item>
		</u-collapse>
		<tab-bar />
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue'
	import { isTimeOut} from '@/common/utils.js'
	export default {
		components:{
			TabBar
		},
		data() {
			return {
				courseArry: [],
				style: {
					'font-weight': 600,
					'line-heght': '60upx',
				},
				loading:true
			}
		},
		onLoad() {
			this.getCourse()
		},
		methods: {
			async getCourse() {
				this.loading = true
				var id = 1;
				var resSucc = false
				const temp = {
					open: false
				}
				this.$u.api.getAllCourseId().then(res => {
					console.log(res);
					this.courseArry = res.body
					this.loading = false
				})
				
			},
			goCourse(item,course) {
				console.log(item);
				if(isTimeOut(item.beginTime,item.endTime)){
					this.$u.route({
						url: 'pages/consult/course',
						params: {
							id:item.id,
							title:item.name,
							courseId:course.id
						}
					})
				}else{
					uni.showToast({
						title:"不在学习期限!",
						icon:'error'
					})
				}
				
			}

		}
	}
</script>

<style lang="scss" scoped>
	.cell {
		width: 95%;
		// height: 100upx;
		margin: 0 auto;
		padding: 5upx;
	}
</style>
