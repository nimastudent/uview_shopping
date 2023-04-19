<template>
	<view>
		<u-cell-group>
			<u-cell-item  class="cell-item"
			v-for="(item,index) in list"
			 :name="index" 
			 :title="item.name" 
			 :arrow="true" 
			 arrow-direction="right"
			 @click="goSifaContent(item)"
			 ></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				itemStyle:{
					'font-wight':'600'
				},
			};
		},
		onLoad(e) {
			const item = JSON.parse(e.item)
			console.log(item);
			uni.setNavigationBarTitle({
				title:"工具列表"
			})
			this.list = item.children
		},
		methods:{
			goSifaContent(e){
				console.log(e);
				if(e.children && e.children.length > 0){
					this.list = [];
					e.children.forEach(item => {
						this.list.push(item)
					})
					
				}else{
					this.$u.route({
						type: 'navigateTo',
						url: 'pages/action/Sifa/Sifa',
						params: {
							type:e.id,
							title:e.name
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
