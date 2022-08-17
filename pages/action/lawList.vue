<template>
	<view>
		<u-navbar back-text="返回" title="法律条目"></u-navbar>
		<u-cell-group>
			
			<u-cell-item 
			v-for="(item,index) in lawArray"
			 :name="index" 
			 :title="item.lawtype" 
			 :arrow="true" 
			 arrow-direction="right"
			 @click="goLaw(item.lawtype)"
			 ></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lawArray:[],
			}
		},
		created() {
		this.getLaw()	
		},
		methods: {
			async getLaw(){
				const res = await this.$u.api.getLaw()
				this.lawArray = res.body.lawTypes
				console.log(this.lawArray)
			},
			goLaw(item){
				this.$u.route({
					type:'navigateTo',
					url:'pages/action/law',
					params:{
						lawtype:item
					}
				})
			},
		}
	}
</script>

<style>

</style>
