<template>
	<view>
		<u-navbar back-text="返回" title="新规目录"></u-navbar>
		<u-cell-group>
			<u-cell-item 
			v-for="(item,index) in ruleList"
			 :key="item.id" 
			 :title="item.title" 
			 :arrow="true" 
			 arrow-direction="right"
			 @click="goNewRuleContent(item.id)"
			 ></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ruleList:[]
			}
		},
		onLoad() {
				this.getNewRule()
		},
		methods: {
			async getNewRule(){
				const res = await this.$u.api.getNewRule()
				if(res.success){
					this.ruleList = res.body.rule;
				}
				console.log(res)
			},
			goNewRuleContent(id){
				this.$u.route({
					type:'navigateTo',
					url:'pages/action/newRuleContent',
					params:{
						id:id
					}
				})
			},
			
		}
	}
</script>

<style>

</style>
