<template>
	<view class="u-p-30">
		<text>全国注册备案号：{{num}}</text>
	</view>
</template>

<script>
    var AndroidBridge = require('../../common/plugin.js');
	export default {
		data() {
			return {
				num:'该应用未注册',
			}
		},
		computed:{
			
		},
		mounted() {
			this.getRecordNum()
		},
		methods: {
			getRecordNum(){
				AndroidBridge.getNumber(
					(res) => {
						this.num = res
					},
					(res) => {
						this.num = res
					}
				)
			}
			
		}
	}
</script>

<style scoped>
text{
	font-size: 30upx;
}
</style>
