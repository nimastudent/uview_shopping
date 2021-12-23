<template>
	<view class="content">
		<u-navbar :is-back="false" title="主页" title-color="#000000"></u-navbar>	
		
		<view class="wrap">
				<u-swiper :list="swiperList" name="picture" :height="swiperHeight" @click="swiperTest"></u-swiper>
		</view>
			
		<!-- <view class="item u-border-bottom" v-for="(item,index) in consultList" :key="item.id">
						<view class="title-wrap" @click="goConsultContent(item.id)">
							<view class="title">
								{{ item.title }}
							</view>
							<view class="img-continar">
								<image :src="item.picture" mode=""></image>
							</view>
						</view>
		</view> -->
		
		<consult :consultList="consultList"></consult>
		
	</view>
</template>

<script>
	import consult from '../../components/consult'
	export default {
		data() {
			return {
				consultList:[],
				swiperList:[],
				swiperHeight:350,
				
			}
		},
		components:{
			consult
		},
		 onLoad() {
			const cookie = this.vuex_token;
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
			this.getSwiper()
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
				if(res.success){
					// console.log(res.body)
					res.body.forEach((item) => {
						item.picture = 'data:image/jpeg;base64,' + item.picture
						// console.log(item)
						this.consultList.push(item)
					})
					
					console.log(this.consultList)
				}
			},
			goConsultContent(id){
				console.log(id)
				this.$u.route({
					tyep:'navigateTo',
					url:'pages/index/consult',
					params:{
						id:id
					}
				})
			},
			async getSwiper(){
				const res = await this.$u.api.getIndexSwiper()
				if(res.success){
					res.body.forEach((item) => {
						item.picture = 'data:image/jpeg;base64,' + item.picture
					})
					this.swiperList = res.body
				}
			},
			swiperTest(e){
				let id = this.swiperList[e].id
				this.goConsultContent(id)
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
.wrap{
	margin: 30rpx;
}
.title-wrap{
	width: 95%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.title{
	width: 75%;
}
.img-continar{
	width: 20%;
}
</style>
