<template>
	<view>
		<u-navbar title="我的收藏" />
		<view class="">
			<u-tabs-swiper ref="tabs" :list="list" :is-scroll="false" :current="current" @change="tabsChange">
			</u-tabs-swiper>
		</view>

		<swiper class="my-swiper" :current="swiperCurrent" :indicator-dots="false" :autoplay="false"
			@change="swiperChange">

			<swiper-item>
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view class="swiper-item">
						<consult :consultList="consultArr" ></consult>
						
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<u-cell-group>
						<u-cell-item  v-for="(item,index) in newRuleArr" :key="item.id" :title="item.title" :arrow="true"
							arrow-direction="right" @click="goNewRuleContent(item.id)"></u-cell-item>
					</u-cell-group>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<u-cell-group>
						<u-cell-item class="cell-item" v-for="(item,index) in lawArr" :name="index" :title="item.title"
							:arrow="true" arrow-direction="right" @click="goLawContent(item.title)"></u-cell-item>
					</u-cell-group>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import consult from '../../components/consult.vue'
	export default {
		components: {
			consult
		},
		data() {
			return {
				list: [{
						name: '资讯收藏',
					},
					{
						name: '新规收藏',
					},
					{
						name: '法律收藏',
					},
				],
				current: 0,
				swiperCurrent: 0,
				lawArr: [],
				consultArr: [],
				newRuleArr: [],
				swiperHeight: '800upx'
			}
		},
		onLoad() {
				this.getConsult(),
				this.getNewRule(),
				this.getLaw()
				const _this = this
							
							uni.addInterceptor('navigateBack', {//监听返回
								success(e) {
									_this.getConsult(),
									_this.getNewRule(),
									_this.getLaw()
								}
							})
				
		},
		onLaunch() {
			
		},
		methods: {
			test(){
				console.log('test');
			},
			tabsChange(index) {
				console.log(index)
				this.current = index
				this.swiperCurrent = index
			},
			async getConsult() {
				this.consultArr = []
				const res = await this.$u.api.getColleCunsult()
				console.log("资讯")
				console.log(res)
				if (res.success) {
					res.body.forEach((item) => {
						item.picture = 'data:image/jpeg;base64,' + item.picture
						this.consultArr.push(item)
					})
				}
			},
			async getNewRule() {
				this.newRuleArr = []
				const res = await this.$u.api.getColleNewRule()
				console.log("新规")
				console.log(res)
				if (res.success) {
					this.newRuleArr = res.body
				}
			},
			async getLaw() {
				this.lawArr = []
				const res = await this.$u.api.getColleLaw()
				console.log("法律")
				console.log(res)
				if (res.success) {
					this.lawArr = res.body
				}
			},
			goLawContent(e) {
				this.$u.route({
					type: 'navigateTo',
					url: 'pages/action/lawContent',
					params: {
						title: e,
						isCollection: true
					}
				})
			},
			goNewRuleContent(id) {
				this.$u.route({
					type: 'navigateTo',
					url: 'pages/action/newRuleContent',
					params: {
						id: id
					}
				})
			},
			swiperChange(e) {
				console.log(e)
				this.current = e.detail.current;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-item {}

	.my-swiper {
		height: 1200upx;
		flex: 1;
	}
</style>
