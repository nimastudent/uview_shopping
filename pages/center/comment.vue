<template>
	<view>
		<view v-if="comment.length === 0">
			暂无内容
		</view>
		<view class="item-comtinar" v-for="(comment,index) in comment" :key="index">
			<view class="top-item" >
				<u-avatar class="u-m-r-20" size="60" :src="avatar"></u-avatar>
				<view class="text"> {{username}}
				<view class="date">
					{{comment.date}}
				</view>
				</view>
				
			</view>
			
			<view class="mid-content" v-if="comment.parentNickName">
				{{comment.toReplyContent}}
			</view>
			
			<view class="mid-content" v-else>
				{{comment.content}}
			</view>
			
			<view class="mid-title u-line-1" v-if="comment.parentNickName">
				<text>{{comment.parentNickName}}&nbsp;:&nbsp;{{comment.content}}</text>
				
			</view>
			
			<view class="mid-title u-line-1" v-else>
				{{comment.title}}
				
			</view>
			
			
			<!-- <view class="bottom-icon">
				<u-icon name="chat" size="40">分享</u-icon>
				<u-icon name="chat" size="40">评论</u-icon>
				<u-icon name="star" size="40">点赞</u-icon>
			</view> -->
			<!-- <u-line color="blur" /> -->
		</view>
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comment:[],
				reply:[]
			}
		},
		computed:{
			avatar(){
				return this.vuex_avatar
			},
			username(){
				return this.vuex_nickName
			}
		},
		onLoad(){
			this.getComment()
		},
		methods: {
			async getComment(){
				this.comment = []
				const res = await this.$u.api.getComment()
				if(res != null){
					this.comment = res.comment
					this.comment= [...this.comment,...res.reply]
					console.log(this.comment)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.item-comtinar{
	background-color: #fff;
	padding: 25upx;
	border-radius: 24upx;
	margin: 10upx;
	border: 1upx solid #606266;
	// box-shadow: #848484 2upx 1upx 2upx 0upx;
		.top-item{
			display: flex;
			.text{
				line-height: 40upx;
				font-weight: 600;
				font-size: 35upx;
			}
			.date{
				line-height: 25upx;
				color: #A4A4A4;
				font-size: 24upx;
			}
		}
}
.mid-content{
	margin: 15upx 0;
}
.mid-title{
	background-color: #F2F2F2;
	line-height: 100upx;
	font-size: 30upx;
	padding: 0 10upx;
	text-wrap: none;
	border-radius: 8upx;
}
.bottom-icon{
	padding: 8upx;
	display: flex;
	justify-content: space-between;
}
</style>
