<template>
	<view class="content">
		{{title}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.$u.get('/api/index').then(res => {
				console.log(res)
			}).catch(e => {
				// console.log(e)
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
