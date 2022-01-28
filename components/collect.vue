<template>
	<view>
		<u-icon label="收藏" size="40" :name="iconName" @click="collectConsult"></u-icon>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		props:['collectType','curentId'],
		name:'collect',
		data(){
			return{
			iconName:'star',
			}
		},
		computed:{
			collectData(){
				let obj = {
					type:this.collectType,
					articleId:this.curentId
				}
				return obj;
			}
		},
		methods:{
			
			collectConsult() {
				this.$u.api.collect(this.collectData).then(res => {
					if(res.success){
						let full = "star-fill";
						this.iconName = full;
						this.$refs.uToast.show({
											title: '收藏成功',
											type: 'success',
										})
					}
				})
			
			}
		}
	}
</script>