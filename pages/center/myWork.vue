<template>
	<view>
		<work-list :consultList="alist" :isMine="true" ></work-list>
	</view>
</template>

<script>
	import WorkList from'../work/workList.vue'
	export default {
		components:{
			WorkList
		},
		data() {
			return {
				alist:[]
			};
		},
		created() {
			this.getList()
		},
		methods:{
			getList(){
				this.$u.api.getMyWork().then((res) => {
					console.log(res)
					if(this.alist.length === 0){
						res.body.forEach((item ) => this.alist.push(item))
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
