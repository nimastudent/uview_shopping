<template>
	<view>
		<u-navbar :is-back="false" title="工作交流" title-color="#000000"></u-navbar>
		<view class="top-container">
			<view class="search">
					<u-input  placeholder="请输入搜索关键字" v-model="keyword" type="text" :border="true" />
					<u-button type="primary" style="margin: 0 10px;">搜索</u-button>
					<u-icon name="plus-circle" color="#07c160" size="68" @click="handleClickAdd"></u-icon>
			</view>
		</view>
			<work-list :consultList="workList" :isMine="false" />
			<u-back-top :scroll-top="scrollTop"></u-back-top>

		<tab-bar />
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue'
	import WorkList from './workList.vue'
	export default {
		components:{TabBar,WorkList},
		data() {
			return {
				keyword: "",
				scrollTop:0,
				workList:[]
			};
		},
		
		onLoad(){
			uni.$on('updateWork',() => {
				this.getList()
			})
			this.getList()
		},
		methods:{
			async getList(){
				const res = await this.$u.api.getWorkList({title:this.keyword})
				console.log(res);
				if(this.workList.length === 0){
					res.body.forEach((item ) => this.workList.push(item))
				}else{
					let list = []
					for(let i = 0; i < res.body.length; i++){
						if(!this.workList.find((item) => item.id === res.body[i].id)){
							this.workList.push(res.body[i])
						}
					}
				}
				console.log(this.workList);
			},
			onPageScroll(e) {
					this.scrollTop = e.scrollTop;
				},
				handleClickAdd(){
					this.scrollTop = 0;
					this.$u.route({
						type:'navigateTo',
						url:'pages/work/workAdd'
					})
				}
		}
	}
</script>

<style lang="scss" scoped>
	.top-container{
		margin: 3px;
	}
	.search {
		width:99%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0;
	}
	
	.divider{
		width: 95vw;
		margin: 2px auto;
		border: 1px solid #e6e6e6;
		
	}
</style>