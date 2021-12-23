<template>
	<view>
		<u-navbar :is-back="false" title="课程学习" title-color="#000000"></u-navbar>
		<!-- <u-cell-group>
			<u-cell-item v-for="(item,id) in courseArry" :key="id" :title="item.name" :arrow="true" arrow-direction="right" ></u-cell-item>
		</u-cell-group>
		 -->
		<u-collapse :item-style="style">
				<u-collapse-item class="cell" :title="item.name" v-for="(item, id) in courseArry" :key="id" :open="item.open">
					<u-cell-group>
						<u-cell-item v-for="(name,index) in item.catalogue" :key="index" :title="name.name" :arrow="true" arrow-direction="right" @click="goCourse(item)"></u-cell-item>
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
				courseArry:[],
				style:{
					'font-weight':600,
					'line-heght':'60rpx',
				},
			}
		},
		onLoad(){
			this.getCourse()
		},
		methods: {
			async getCourse(){
				var id = 1;
				var resSucc = true
				const temp = {open:false}
				while(resSucc){
				     await this.$u.api.getCourse(id).then((res) => {
						if(res.success) this.courseArry.push(res.body)
						resSucc = res.success
					})
					id++;
				}
				for (let item in this.courseArry) {
					
					this.courseArry[item] = {...this.courseArry[item],...temp}
				}
				console.log(this.courseArry)
			},
			goCourse(item){
				console.log(item)
				// this.$u.api.getVideo(1).then((res) => {
				// 	console.log(res)
				// })
				// this.$u.route({
				// 	url:'pages/consult/course',
				// 	params:item
				// })
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.cell{
		width: 95%;
		// height: 100rpx;
		margin: 0 auto;
		padding: 5rpx;
	}
</style>
