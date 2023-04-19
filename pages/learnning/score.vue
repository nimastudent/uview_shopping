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
		
		<u-cell-group>
			<u-cell-item :arrow="false" v-for="(item,index) in mockList" :key="index">
				<!-- <u-icon slot="icon" size="32" name="search"></u-icon> -->
				<view class="" slot="title">
					<view class="top">
						分数：{{item.score}}
					</view>
					<view class="score"> </view>
				</view>
				<text slot="right-icon">{{item.date}}&nbsp;&nbsp;{{item.time}}</text>
				<!-- <u-badge count="99" :absolute="false" slot="right-icon"></u-badge> -->
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				mockList:[]
			}
		},
		onLoad(e) {
			this.list = []
			this.mockList = []
			if(e.type === 'mock'){
				uni.setNavigationBarTitle({
					title:'模拟考记录'
				})
				this.getMock()
			}else{
				this.getMyScore()
			}
		},
		methods: {
			async getMyScore() {
				const res = await this.$u.api.getMyScore()
				if (res.success) {
					this.list = res.body
				}
			},
			async getMock(){
				const res = await this.$u.api.getMockRecord()
				
				if (res.success) {
					this.mockList = res.body
				}
			}
		}
	}
</script>

<style scoped>
	.top {
		font-size: 32upx;
		letter-spacing: 2upx;
		color: #000;
	}

	.score {
		width: 200upx;
		font-size: 24upx;
		display: flex;
		justify-content: center;
	}
</style>
