<template>
	<view>
		<u-navbar back-text="返回" title="法律目录" :custom-back="backNav">
			<view slot="right">
				<u-icon name="list" size="38" class="my-icon" @click="Popshow = true"></u-icon>
			</view>
		</u-navbar>
		
		
		<view class="search">
				<u-input  placeholder="请输入搜索关键字" v-model="title" type="text" :border="true" />
				<u-button type="primary" style="margin: 0 10px;" @click="getLawCatalogue">搜索</u-button>
		</view>
		<u-cell-group>
			<u-cell-item  class="cell-item"
			v-for="(item,index) in titleArr"
			 :name="index" 
			 :title="item.name" 
			 :arrow="true" 
			 arrow-direction="right"
			 :title-style="itemStyle"
			 @click="goLawContent(item.name)"
			 ></u-cell-item>
		</u-cell-group>
		
		<u-popup mode="left" v-model="Popshow" width="60%">
					<view class="content">
						<scroll-view scroll-y="true" style="width: 100%;">
							<u-cell-group>
								<u-cell-item  class="cell-item"
								v-for="(item,index) in titleArr"
								 :name="index" 
								 :title="item.name" 
								 :arrow="true" 
								 arrow-direction="right"
								 :title-style="itemStyle"
								 @click="goLawContent(item.name)"
								 ></u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Popshow:false,
				itemStyle:{
					'font-wight':'600'
				},
				lawtype:'',
				title:"",
				titleArr:[],
			}
		},
		onLoad(e){
			if(e.lawtype!=''){
				this.lawtype = e.lawtype
				this.getLawCatalogue()
			}
		},
		methods: {
			async getLawCatalogue(){
				const res = await this.$u.api.getLawCatalogue({
					lawtype:this.lawtype,
					title:this.title
				})
				console.log(res)
				if(res.success){
					this.titleArr = res.body.title
				}
				console.log(this.titleArr)
			},
			goLawContent(e){
				this.$u.route({
					type:'navigateTo',
					url:'pages/action/lawContent',
					params:{
						title:e,
						isCollection:false
					}
				})
			},
			backNav(){
				this.$u.route({
					type:'navigateBack',
					delta:1
				})
			},
			showPop(){
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.cell-item{
	font-weight: 400;
	background-color: blue($color: #000000);
} 
.my-icon{
	padding: 15upx;
	margin: 10upx;
}
.popItem{
	padding: 10upx;
	border: 1upx solid #000000;
}
.search {
		width:99%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0;
	}
</style>
