<template>
	<view>
		<text>这里是课程学习</text>
		<u-cell-group>
			<u-cell-item v-for="(item,id) in courseArry" :name="id" :title="item.name" :arrow="true" arrow-direction="right" ></u-cell-item>
		</u-cell-group>
		<button type="default" @click="getCourse()">test</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseArry:[],
			}
		},
		onLoad(){
			this.getCourse()
		},
		methods: {
			async getCourse(){
				var id = 1;
				var resSucc = true
				while(resSucc){
				     await this.$u.api.getCourse(id).then((res) => {
						if(res.success) this.courseArry.push(res.body)
						resSucc = res.success
					})
					id++;
				}
				console.log(this.courseArry)
			}
			
		}
	}
</script>

<style>
 
</style>
