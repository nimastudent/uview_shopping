<template>
	<view>
		<view class="item-comtinar" v-for="(comment,index) in comment" :key="index">
			<view class="top-item" >
				<u-avatar class="u-m-r-20" size="60" :src="avatar"></u-avatar>
				<view class="text"> {{username}}
				<view class="date">
					{{comment.date}}
				</view>
				</view>
				
			</view>
			<view class="mid-content">
				{{comment.content}}
			</view>
			
			<view class="mid-title u-line-1">
				{{comment.title}}
				
			</view>
			
			<view class="bottom-icon">
				<u-icon name="chat" size="40">分享</u-icon>
				<u-icon name="chat" size="40">评论</u-icon>
				<u-icon name="star" size="40">点赞</u-icon>
			</view>
			<!-- <u-line color="blur" /> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comment:[]
			}
		},
		computed:{
			avatar(){
				return this.vuex_avatar
			},
			username(){
				return '用户名'
			}
		},
		onLoad(){
			this.getComment()
		},
		methods: {
			async getComment(){
				const res = await this.$u.api.getComment()
				if(res != null){
					this.comment = res.comment
					console.log(this.comment)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.item-comtinar{
	background-color: #fff;
	padding: 25rpx;
	border-radius: 24rpx;
	margin: 10rpx;
	// border: 1rpx solid black;
	box-shadow: #848484 2rpx 1rpx 2rpx 0rpx;
		.top-item{
			display: flex;
			.text{
				line-height: 40rpx;
				font-weight: 600;
				font-size: 35rpx;
			}
			.date{
				line-height: 25rpx;
				color: #A4A4A4;
				font-size: 24rpx;
			}
		}
}
.mid-content{
	margin: 15rpx 0;
}
.mid-title{
	background-color: #F2F2F2;
	line-height: 100rpx;
	font-size: 30rpx;
	padding: 0 10rpx;
	text-wrap: none;
	border-radius: 8rpx;
}
.bottom-icon{
	padding: 8rpx;
	display: flex;
	justify-content: space-between;
}
</style>
