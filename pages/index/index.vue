<template>
	<view class="content">
		<u-navbar :is-back="false" title="主页" title-color="#000000"></u-navbar>	
		
		<view class="wrap">
				<u-swiper ></u-swiper>
		</view>
			
		<view class="item u-border-bottom" v-for="(item,index) in consultList" :key="item.id">
						<!-- <image mode="aspectFill" :src="item.images" /> -->
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap" @click="goConsultContent(item.id)">
							<text class="title u-line-2">{{ item.title }}</text>
						</view>
					</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				consultList:[],
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
			this.indexGetConsult()
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
			async indexGetConsult(){
				const res = await this.$u.api.getConsult()
				console.log(res)
				if(res.success){
					this.consultList = res.body
				}
			},
			goConsultContent(id){
				console.log(id)
			}
		}
	}
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	padding: 20rpx;
}

image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	margin-right: 20rpx;
	border-radius: 12rpx;
}

.title {
	text-align: left;
	font-size: 28rpx;
	color: $u-content-color;
	margin-top: 20rpx;
}
</style>
