<template>
	<view>
		<u-navbar :is-back="false" title="课程学习" title-color="#000000"></u-navbar>
		<!-- <u-cell-group>
			<u-cell-item v-for="(item,id) in courseArry" :key="id" :title="item.name" :arrow="true" arrow-direction="right" ></u-cell-item>
		</u-cell-group>
		 -->
		 <u-loading mode="flower" :show="loading"></u-loading>
		
		<u-collapse :item-style="style" v-show="!loading">
			<u-collapse-item class="cell" :title="item.name" v-for="(item, id) in courseArry" :key="id"
				:open="item.open">
				<u-cell-group>
					<u-cell-item v-for="(name,index) in item.catalogue" :key="index" :title="name.name" :arrow="true"
						arrow-direction="right" @click="goCourse(name,item)"></u-cell-item>
				</u-cell-group>
			</u-collapse-item>
		</u-collapse>
		<!-- <button type="default" @click="getCourse()">test</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseArry: [],
				style: {
					'font-weight': 600,
					'line-heght': '60rpx',
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
				this.$u.route({
					url: 'pages/consult/course',
					params: {
						id:item.id,
						title:item.name,
						courseId:course.id
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.cell {
		width: 95%;
		// height: 100rpx;
		margin: 0 auto;
		padding: 5rpx;
	}
</style>
