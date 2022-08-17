<template>
	<view>
		<u-navbar back-text="返回" title="法律目录" :custom-back="backNav">
			<view slot="right">
				<u-icon name="list" size="38" class="my-icon" @click="Popshow = true"></u-icon>
			</view>
		</u-navbar>
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
				const res = await this.$u.api.getLawCatalogue(this.lawtype)
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
					type:'switchTab',
					url:'pages/action/action'
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
	padding: 15rpx;
	margin: 10rpx;
}
.popItem{
	padding: 10rpx;
	border: 1rpx solid #000000;
}
</style>
