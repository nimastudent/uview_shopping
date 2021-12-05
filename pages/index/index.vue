<template>
	<view class="content">
		<u-navbar :is-back="false" title="主页" title-color="#000000"></u-navbar>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		async onLoad() {
			const cookie = this.vuex_cookies;
			console.log(cookie)
			if(!cookie){
				this.$u.toast('请登录！')
				setTimeout(() => {
					this.$u.route({
						type:'redirect',
						url:'pages/auth/login'
					})
				})
			}
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
			
			// console.log(this.vuex_version)
			// console.log(this.vuex_user.name)
			// this.$u.vuex('vuex_user.name', '史诗')
			// console.log(this.vuex_user.name)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
