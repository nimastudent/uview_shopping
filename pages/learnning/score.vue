<template>
	<view>
		<u-cell-group>
			<u-cell-item :arrow="false" v-for="(item,index) in list" :key="index">
				<!-- <u-icon slot="icon" size="32" name="search"></u-icon> -->
				<view class="" slot="title">
					<view class="top">
						{{item.title}}
					</view>
					<view class="score"> 分数：{{Math.floor(item.score)}}</view>
				</view>
				<text slot="right-icon">{{item.date}}</text>
				<!-- <u-badge count="99" :absolute="false" slot="right-icon"></u-badge> -->
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getMyScore()
		},
		methods: {
			async getMyScore() {
				const res = await this.$u.api.getMyScore()
				if (res.success) {
					this.list = res.body
				}
			}
		}
	}
</script>

<style scoped>
	.top {
		font-size: 32rpx;
		letter-spacing: 2rpx;
		color: #000;
	}

	.score {
		width: 200rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
	}
</style>
