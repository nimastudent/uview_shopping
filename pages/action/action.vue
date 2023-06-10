<template>
	<view>
		<u-navbar :is-back="false"  title-color="#000000" height="100"></u-navbar>

		<view class="item-container">
			<view class="item" v-for="item in typeArr" :key="item.id" @click="handleClick(item)">
				<view class="left">
					<span>{{item.name.slice(0,1)}}</span>
					{{item.name.slice(1,2)}}
				</view>
				<view class="right">
					{{item.name}}
				</view>
			</view>
		</view>

		<tab-bar />
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				lawArray: [],
				typeArr: [{
					id: 'falv',
					name: '法律'
				}, {
					id: 'xingui',
					name: '新规'
				}]
			}
		},
		onLoad() {
			this.getType()
		},
		methods: {
			async getType() {
				const res = await this.$u.api.getAllType()
				res.body.forEach(item => {
					this.typeArr.push(item)
				})
				// this.lawArray = res.body.lawTypes
				// console.log(this.lawArray)
			},
			handleClick(item) {
				switch (item.id) {
					case 'falv':
						this.goRuleList();
						break;
					case 'xingui':
						this.goNewRule();
						break;
					default:
						this.goType(item);
						break;
				}
			},
			goNewRule() {
				this.$u.route({
					type: 'navigateTo',
					url: 'pages/action/newRule',
				})
			},
			goRuleList() {
				this.$u.route({
					type: 'navigateTo',
					url: 'pages/action/lawList',
				})
			},
			goType(item) {
				console.log(item);
				if(item.children && item.children.length > 0){
					this.$u.route({
						type: 'navigateTo',
						url: 'pages/action/Sifa/sifaList',
						params: {
							item:JSON.stringify(item)
						}
					})
				}else{
					this.$u.route({
						type: 'navigateTo',
						url: 'pages/action/Sifa/Sifa',
						params: {
							type:item.id,
							title:item.name
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		width: 100%;
		border-bottom: 1px solid #dcdfe6;
		padding: 10upx;
		display: flex;
	}



	.left {
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		background-color: #0f4aa6;
		color: white;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;

		span {
			letter-spacing: 8upx;
		}
	}

	.right {
		margin-left: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		letter-spacing: 4upx;
		color: #f34a0d;
	}
</style>