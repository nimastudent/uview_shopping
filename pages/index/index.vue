<template>
	<view class="content">
		<u-navbar :is-back="false" title="主页" title-color="#000000"></u-navbar>	
		
		<view class="wrap">
				<u-swiper :list="swiperList" name="picture" :height="swiperHeight" @click="swiperClick"></u-swiper>
		</view>
		
		<consult :consultList="consultList"></consult>
		
		<tab-bar />
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue'
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
			consult,
			TabBar
		},
		 onLoad() {
			 console.log(this.$u.baseUrl)
			var cookie = this.vuex_token;
			if(!cookie){
				this.$u.toast('请登录！')
				setTimeout(() => {
					this.$u.route({
						type:'redirect',
						url:'/pages/auth/login'
					})
				})
			}
			this.indexGetConsult()
			this.getSwiper()
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
			swiperClick(e){
				let id = this.swiperList[e].id
				this.goConsultContent(id)
			}
		}
	}
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	padding: 20upx;
}

image {
	width: 120upx;
	flex: 0 0 120upx;
	height: 120upx;
	margin-right: 20upx;
	border-radius: 12upx;
}
.wrap{
	margin: 30upx;
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
