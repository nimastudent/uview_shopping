<template>
	<view>
		<u-navbar back-text="返回" title="法律目录"></u-navbar>
		<u-cell-group>
			<u-cell-item 
			v-for="(item,index) in titleArr"
			 :name="index" 
			 :title="item.name" 
			 :arrow="true" 
			 arrow-direction="right"
			 @click="goLawContent(item.name)"
			 ></u-cell-item>
		</u-cell-group>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lawtype:'',
				titleArr:[],
			}
		},
		onLoad(e){
			if(e.lawtype!=''){
				this.lawtype = e.lawtype
				this.getLawCatalogue()
			}
		},
		methods: {
			async getLawCatalogue(){
				const res = await this.$u.api.getLawCatalogue(this.lawtype)
				console.log(res)
				if(res.success){
					this.titleArr = res.body.title
				}
				console.log(this.titleArr)
			},
			goLawContent(e){
				this.$u.route({
					type:'navigateTo',
					url:'pages/action/lawContent',
					params:{
						title:e
					}
				})
			},
			
		}
	}
</script>

<style>

</style>
