<template>
	<view>
		<u-tabbar height="100" v-model="current" :list="list" :mid-button="false" @change="ChangBar"></u-tabbar>
	</view>
</template>

<script>
	export default {
		name: "TabBar",
		data() {
			return {
				current: 0,
				list: [{
						"pagePath": "pages/index/index",
						"iconPath": require("@/static/tabbarIcon/i.png"),
						"selectedIconPath": require("@/static/tabbarIcon/ic.png"),
						"text": "首页",
						"iconfont":{
							"fontSize":"25px"
						}
					}, {
						"pagePath": "pages/consult/index",
						"iconPath": require("@/static/tabbarIcon/x.png"),
						"selectedIconPath": require("@/static/tabbarIcon/xc.png"),
						"text": "在线课堂"
					}, {
						"pagePath": "pages/learnning/index",
						"iconPath": require("@/static/tabbarIcon/l.png"),
						"selectedIconPath": require("@/static/tabbarIcon/lc.png"),
						"text": "练兵答题"
					},
					{
						"pagePath": "pages/work/work",
						"iconPath": require("@/static/tabbarIcon/work.png"),
						"selectedIconPath": require("@/static/tabbarIcon/wc.png"),
						"text": "交流平台"
					},
					{
						"pagePath": "pages/action/action",
						"iconPath": require("@/static/tabbarIcon/f.png"),
						"selectedIconPath": require("@/static/tabbarIcon/fc.png"),
						"text": "执法工具箱"
					}, {
						"pagePath": "pages/center/index",
						"iconPath": require("@/static/tabbarIcon/c.png"),
						"selectedIconPath": require("@/static/tabbarIcon/cc.png"),
						"text": "个人中心"
					}
				]
			};
		},
		methods: {
			ChangBar(e) {
				uni.switchTab({
					url: '/' + this.list[e].pagePath
				})
			}
		}
	}
</script>

<style>

</style>