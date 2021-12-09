<template>
	<view>
		<u-navbar :is-back="false" title="办案大全" title-color="#000000"></u-navbar>
		<u-cell-group>
			<u-cell-item 
			v-for="(item,index) in lawArray"
			 :name="index" 
			 :title="item" 
			 :arrow="true" 
			 arrow-direction="right"
			 @click="goLaw(item)"
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
		onLoad(){
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
			}
		}
	}
</script>

<style>

</style>
