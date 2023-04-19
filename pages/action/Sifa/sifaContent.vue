<template>
	<view class="container">
		<view class="title">
			{{sifaDetail.title}}
		</view>
		<view class="date">
			{{sifaDetail.date}}
		</view>
		
		<view class="content">
			<u-parse :html="sifaDetail.content"></u-parse>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sifaDetail:{}
			};
		},
		onLoad(e){
			console.log(e);
			uni.setNavigationBarTitle({
				title:e.title
			})
			this.getDetail(parseInt(e.id))
		},
		methods:{
			async getDetail(id){
				const  res = await this.$u.api.getSifaById({id})
				this.sifaDetail = res.body
				console.log(res);
			}
		}
		
	}
</script>


<style lang="scss" scoped>
	.container {
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 0 20upx;
		position: absolute;
		
		.img{
			width: 100%;
		}
	}

	.title {
		margin: 15upx;
		font-weight: 800;
		font-size: 40upx;
		text-align: center;
	}

	.date {
		float: right;
		height: 40upx;
		color: #676767;
		right: 20upx;
	}

	image{
		width: 100%;
	}

	.content {
		// text-indent: 1rem;
		margin: 40upx 0;
		line-height: 40upx;
		letter-spacing: 1.5upx;
		border-bottom: 1px solid #dbdbdb;
		
			.collect-contianer{
				margin-top: 10upx;
			}
	}
</style>
