<template>
	<view class="content">
		<view class="item u-border-bottom" v-for="(item,index) in list" :key="item.id">
						<view class="title-wrap" @click="goWorkContent(item.id)" >
							<view class="title">
								<text>
									{{ item.title }}
								</text>
								<text class="author">
									<br/> {{ item.realName }}
								</text>
							</view>
							
						<view class="img-continar">
							<image :src="item.picture" mode=""></image>
						</view>
						<view
						v-if="isMine"
							class="u-delete-icon"
							@tap.stop="handleDelete(item)"
						>
							<u-icon class="u-icon" name="close" size="20" :color="'#ffffff'" ></u-icon>
						</view>
					</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"consult",
		props:['consultList','isMine'],
		data() {
			return {
				list:this.consultList
			};
		},
		methods:{
			goWorkContent(id){
				this.$u.route({
					tyep:'navigateTo',
					url:'pages/work/workContent',
					params:{
						id:id,
						isMine:this.isMine
					}
				})
			},
			handleDelete(item){
				console.log(item);
				this.$u.api.userDeleteWork({id:item.id}).then(res => {
					uni.showToast({
						title:"删除成功！"
					})
					uni.$emit("updateWork")
				})
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
	position: relative;
	margin: 30upx;
}
.title-wrap{
	width: 95%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.title{
	width: 100%;
	font-size: 32upx;
	font-weight: bold;
	
	.author{
		font-size: 26upx;
		font-weight: normal;
	}
}
.img-continar{
	width: 20%;
}

.u-delete-icon {
		position: absolute;
		top: 10upx;
		right: 10upx;
		z-index: 10;
		background-color: $u-type-error;
		border-radius: 100upx;
		width: 44upx;
		height: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.u-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
