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
		onLoad() {
		var data = {}
			uni.getStorage({
				key:'userInfo',
				success:function(res){
					console.log(res)
					data.username = res.data.loginId
					data.nickname = res.data.userName
					data.phone = res.data.telephone
					data.sex = res.data.sex
				}
			})
			
			this.$u.api.iLogin(data).then(res => {
				if(res.success){
					this.$u.vuex('vuex_token',res.body.token)
					this.$u.vuex('vuex_userName',res.body.userName)
					this.$u.vuex('vuex_nickName',res.body.nickName)
				}
				if(res.body.first_login){
					uni.reLaunch({
						url: '/pages/auth/firstLogin'
					})
				}else{
					uni.switchTab({
						url:"/pages/index/index"
					})
				}
				
			})
		},
		methods: {
		}
	}
</script>

<style>

</style>
