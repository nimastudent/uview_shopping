<template>
	<view>
		<view class="search">
			<u-input placeholder="请输入搜索关键字" v-model="title" type="text" :border="true" />
			<u-button type="primary" style="margin: 0 10px;" @click="getList">搜索</u-button>
		</view>
		<u-cell-group>
			<u-cell-item class="cell-item" v-for="(item,index) in titleArr" :name="index" :title="item.title"
				:arrow="true" arrow-direction="right" :title-style="itemStyle"
				@click="goSifaContent(item)"></u-cell-item>
		</u-cell-group>
		<view class="nulla" v-if="titleArr.length === 0">
			暂无内容！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Popshow: false,
				itemStyle: {
					'font-wight': '600'
				},
				lawtype: '',
				title: "",
				titleArr: [],
				type: 0,

			}
		},
		onLoad(e) {
			console.log(e);
			const {
				title
			} = e

			uni.setNavigationBarTitle({
				title
			})
			this.type = parseInt(e.type)
			this.getList()
		},
		methods: {
			async getList() {
				const res = await this.$u.api.getSifaList({
					type: this.type,
					title: this.title
				})
				if (res.success) {
					this.titleArr = res.body
				}
				console.log(res);
			},
			goSifaContent(e) {
				this.$u.route({
					type: 'navigateTo',
					url: 'pages/action/Sifa/sifaContent',
					params: {
						title: e.title,
						id: e.id
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cell-item {
		font-weight: 400;
		background-color: blue($color: #000000);
	}

	.my-icon {
		padding: 15upx;
		margin: 10upx;
	}

	.popItem {
		padding: 10upx;
		border: 1upx solid #000000;
	}

	.search {
		width: 99%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 10px;
	}

	.nulla {
		margin-top: 10px;
		font-size: 32upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>