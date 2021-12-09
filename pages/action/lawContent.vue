<template>
	<view class="box">
		<u-navbar back-text="返回" title="法律内容"></u-navbar>
		<view class="mytop-box">
			<button type="primary" size="mini">上一条</button>
			<button type="primary" size="mini">下一条</button>
		</view>
		<view class="content-box">
			<view>法律名称：{{title}}</view>
			<view>法律类型：{{lawContent.lawtype}}</view>
			<view>关键词：<text v-for="(item,index) in keyWord" :key="index">{{item }}   </text></view>
			<u-modal v-model="show" :content="content"></u-modal>

			<view>释义阐明：{{lawContent.explaination}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				lawContent:{},
				show: false,
				keyWord:[],
				content: '东临碣石，以观沧海'
			}
		},
		onLoad(e){
			console.log(e)
			this.title = e.title
			this.getLawContent()
		},
		methods: {
			async getLawContent(){
				const res = await this.$u.api.getlawContent(this.title)
				console.log(res)
				if(res.success){
					this.lawContent = res.body
					let keyWord = res.body.keyWord
					for(let key in keyWord){
						// console.log(keyWord[key])
						for(let item in keyWord[key]){
							this.keyWord.push(item)
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	width: 90%;
	margin: 0 auto;
}
.mytop-box{
	display: flex;
	// justify-content: space-around;
	justify-content: space-between;
	align-items: center;
}
.content-box{
	// display: flex;
	// flex-direction: row;
	// // align-items: center;
	// view{
		
	// }
}
</style>
