<template>
	<view>
		<view class="item u-border-bottom" v-for="(item,index) in list" :key="item.id">
						<view class="title-wrap" @click="goConsultContent(item.id)">
							<view class="title">
								{{ item.title }}
							</view>
						<view class="img-continar">
							<image :src="item.picture" mode=""></image>
						</view>
					</view>
					
		</view>
	</view>
</template>

<script>
	export default {
		name:"consult",
		props:['consultList'],
		data() {
			return {
				list:this.consultList
			};
		},
		methods:{
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
