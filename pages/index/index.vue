<template>
	<view class="content">
	 这里是主页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		async onLoad() {
			// this.$u.get('/api/index').then(res => {
			// 	console.log(res)
			// }).catch(e => {
			// 	// console.log(e)
			// })
			
			//集中管理api
			// const  data = {
			// 	email:'test@a.com',
			// 	password:'123123'
			// }
			// const res = await this.$u.api.authLogin(data)
			// console.log(res)
			
			console.log(this.vuex_version)
			console.log(this.vuex_user.name)
			// this.$u.vuex('vuex_user.name', '史诗')
			// console.log(this.vuex_user.name)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
