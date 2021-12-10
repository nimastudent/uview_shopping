<template>
	<view class="box">
		<u-navbar back-text="返回" title="法律内容" class="navbar-top">
			<u-icon class="u-m-r-20" id="navbar-iocn" name="list" color="#2979ff" size="36" slot="right" @click="navbarListShow"></u-icon>
			<view class="navbar-list" v-show="navbarShow">
				<view class="u-m-10 ">上一条</view>
				<view class="u-m-10">下一条</view>
			</view>
		</u-navbar>
		
		<u-back-top :scroll-top="scrollTop" top=0></u-back-top>
		<view class="content-box u-m-t-20">
			<view class="content-item">法律名称：{{title}}</view>
			
			<view class="content-item">法律类型：{{lawContent.lawtype}}</view>
			<view class="content-item">关键词：
			<u-tag class="u-m-l-15" v-for="(item,index) in keyWord" :key="index"
			 :text="item"
			  type="info" 
			  size="mini" 
			  color="black" 
			  border-color="black"
			  @click="tagContent(item)"
			  />
			</view>
			<u-modal v-model="show" :content="content" :title="keyTitle"></u-modal>

			<view class="content-item">释义阐明：{{lawContent.explaination}}</view>
			</br>
			<view class="content-item">罪名解析：{{lawContent.crime}}</view>
			<!-- <view class="u-m-t-20">
				条文内容：<br></br>
				{{lawContent.conten}}
			</view> -->
			
			<view class="u-content u-m-t-20">
				条文内容：<u-parse :html="lawContent.conten"></u-parse>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'', //上一层传入法律名称
				lawContent:{}, //法律条文
				show: false, //模态框是否展示
				keyWord:[],  //关键词
				content: '', //模态框内容
				keyTitle:'', //模态框标题
				scrollTop:1,
				navbarShow:false
			}
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		onLoad(e){
			console.log(e)
			this.title = e.title
			this.getLawContent()
		},
		methods: {
			async getLawContent(){//获取法律条文
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
			},
			tagContent(item){//模态框内容
				let lawKeyWord = this.lawContent.keyWord
				for(let key in lawKeyWord){
					// console.log(this.lawContent.keyWord)
					if(lawKeyWord[key][item]){
						this.content = lawKeyWord[key][item]
						this.show = true
						this.keyTitle = item
					}
				}
			},
			navbarListShow(){
				this.navbarShow = !this.navbarShow
			}
		}
	}
</script>

<style lang="scss" scoped>
.navbar-list{
	overflow: hidden;
	position: fixed;
	right: 0;
	top: 45px;
	background-color: #2979ff;
	color: #fff;
}
.navbar-top{
	display: flex;
}
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
.content-item{
	margin-top: 15rpx;
}
</style>
