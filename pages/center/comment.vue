<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			this.getComment()
		},
		methods: {
			async getComment(){
				const res = await this.$u.api.getComment()
				console.log(res)
			}
		}
	}
</script>

<style>

</style>
