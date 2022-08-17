<template>
	<text>

		<u-icon :label="iconData.iconLable" size="40" :name="iconData.iconName" @click="collectConsult"></u-icon>

		<u-toast ref="uToast" />

	</text>
</template>

<script>
	export default {
		props: ['collectType', 'curentId', 'isCollect'],
		name: 'collect',
		data() {
			return {

			}
		},
		computed: {
			collectData() {
				let obj = {
					// 资料的类型（type=1：资讯，type=2：法律，type=3：新规）
					type: this.collectType,
					articleId: this.curentId
				}
				return obj;
			},
			iconData() {
				console.log(this.isCollect);
				if (this.isCollect) {
					return {
						iconLable: "已收藏",
						iconName: "star-fill",
					}
				} else {
					return {
						iconLable: "收藏",
						iconName: "star",
					}
				}
			}
		},
		methods: {

			collectConsult() {
				if (this.isCollect) {
					this.cancleCollect()
				} else {
					this.addCollect()
				}

			},
			//取消收藏
			cancleCollect() {
				console.log("changeCollect");
				this.$u.api.cancleCollect({
					type: this.collectType,
					id: this.curentId
				}).then(res => {
					if (res.success) {
						this.$refs.uToast.show({
							title: '取消收藏',
							type: 'default',
						})
						this.$emit("update")
					}

				})
			},
			// 添加收藏
			addCollect() {
				this.$u.api.collect(this.collectData).then(res => {
					if (res.success) {
						this.$refs.uToast.show({
							title: '收藏成功',
							type: 'success',
						})
					} else {
						this.$refs.uToast.show({
							title: '已收藏',
							type: 'default',
						})
					}
					this.$emit("update")
				})
			}
		}
	}
</script>
