<template>
	<view class="box">
		<u-navbar id="mynavbar" back-text="返回" title="法律内容" class="navbar-top">
			<!-- <u-icon class="u-m-r-40" name="star" slot="right" size="38" @click="starLaw" ></u-icon> -->
			<collect class="u-m-r-40" :collectType="collectType" slot="right" :curentId="curentId"
				:isCollect="isCollect" @update="getLawContent"></collect>
			<!-- <u-icon class="u-m-r-30" name="list" slot="right" color="#2979ff" size="38" @click="navbarListShow"></u-icon> -->
		</u-navbar>




		<u-back-top :scroll-top="scrollTop" top=0></u-back-top>
		<view class="content-box u-m-t-20" @touchstart="closeListShow">
			<view class="content-item"><span>法律名称：</span>{{lawContent.title}}</view>

			<view class="content-item"><span>法律类型：</span>{{lawContent.lawtype}}</view>
			<view class="content-item"><span>关键词：</span>
				<u-tag class="u-m-l-15" v-for="(item,index) in keyWord" :key="index" :text="item" type="info"
					color="black" border-color="black" @click="tagContent(item)" />
			</view>
			<u-modal v-model="show" :content="content" :title="keyTitle"></u-modal>

			<view class="content-item"><span>释义阐明：</span>{{lawContent.explaination}}</view>
			</br>
			<view class="content-item"><span>罪名解析：</span>{{lawContent.crime}}</view>

			<view class="u-content content-item">
				<span>条文内容：</span>
				<u-parse :html="lawContent.conten"></u-parse>
			</view>
		</view>
		<view class="navbar-list" :style="listStyle">
			<button type="primary" @click="goLast(-1)">上一条</button>
			<button type="primary" @click="goLast(+1)">下一条</button>
		</view>
	</view>
</template>

<script>
	import collect from '../../components/collect.vue'
	export default {
		components: {
			collect
		},
		data() {
			return {
				collectType: 2,
				listStyle: {
					top: "",
				},
				title: "", //上一层传入法律名称
				lawContent: {}, //法律条文
				show: false, //模态框是否展示
				keyWord: [], //关键词
				content: "", //模态框内容
				keyTitle: "", //模态框标题
				scrollTop: 1,
				navbarShow: false,
				notLast: true, //下一条判断是否为最后一条
				iscollection: false,
				curentId: 0,
				isCollect: null
			};
		},
		onReady() {
			uni
				.createSelectorQuery()
				.select("#mynavbar")
				.fields({
						size: true,
					},
					(data) => {
						this.listStyle.top = data.height;
					}
				)
				.exec();
		},
		onLoad(e) {
			console.log(e);
			this.title = e.title;
			this.iscollection = e.iscollection;
			this.getLawContent();
		},
		methods: {
			async getLawContent() {
				//获取法律条文
				const res = await this.$u.api.getlawContent(this.title);
				if (res.success) {
					this.isCollect = res.body.isCollect;
					this.curentId = res.body.id;
					this.lawContent = res.body;

					let keyWord = res.body.keyWord;
					for (let key in keyWord) {
						for (let item in keyWord[key]) {
							this.keyWord.push(item);
						}
					}
				}
			},
			tagContent(item) {
				//模态框内容
				let lawKeyWord = this.lawContent.keyWord;
				for (let key in lawKeyWord) {
					if (lawKeyWord[key][item]) {
						this.content = lawKeyWord[key][item];
						this.show = true;
						this.keyTitle = item;
					}
				}
			},
			navbarListShow() {
				this.navbarShow = !this.navbarShow;
			},
			closeListShow() {
				this.navbarShow = false;
			},
			goLast(id) {
				this.navbarShow = false;
				if (this.lawContent.id == 1 && id == -1) {
					this.$u.toast("已是第一条");
				} else if (id == +1) {
					if (this.notLast) {
						this.$u.api.golawContent((this.lawContent.id += 1)).then((res) => {
							if (res.success) {
								if (res.body.id == undefined) {
									this.notLast = false;
									this.$u.toast("已是最后一条");
									return;
								}
								this.keyWord = [];
								this.title = res.title;
								this.lawContent = res.body;
								let keyWord = res.body.keyWord;
								for (let key in keyWord) {
									// console.log(keyWord[key])
									for (let item in keyWord[key]) {
										this.keyWord.push(item);
									}
								}
							}
						});
					}
				} else if (id == -1) {
					this.keyWord = [];
					this.$u.api.golawContent((this.lawContent.id -= 1)).then((res) => {
						if (res.success) {
							this.title = res.title;
							this.lawContent = res.body;
							let keyWord = res.body.keyWord;
							for (let key in keyWord) {
								// console.log(keyWord[key])
								for (let item in keyWord[key]) {
									this.keyWord.push(item);
								}
							}
						}
					});
				}
				uni.pageScrollTo({
					scrollTop: 1
				})
			},
			goLaw() {
				if (this.iscollection) {
					this.$u.route("pages/center/collection");
				} else {
					let lawtype = this.lawContent.lawtype;
					this.$u.route("pages/action/law?lawtype?=" + lawtype);
				}
			},
			starLaw() {
				// this.$u.api.collect()
			},
		},
	};
</script>

<style lang="scss" scoped>
	.navbar-list {
		// overflow: hidden;
		// position: fixed;
		// display: flex;
		// flex-direction: column;
		// right: 0;
		// background-color: #2979ff;
		margin: 30upx;
		display: flex;
		justify-content: space-between;
		color: #fff;
	}

	.navbar-top {
		display: flex;
	}

	.box {
		width: 90%;
		margin: 5upx auto;
	}

	.mytop-box {
		display: flex;
		// justify-content: space-around;
		justify-content: space-between;
		align-items: center;
	}

	.content-box {
		// display: flex;
		// flex-direction: row;
		// // align-items: center;
		// view{

		// }
	}

	.content-item {
		margin-top: 15upx;
	}

	.content-item span {
		font-size: 30upx;
		font-weight: 600;
	}
</style>