<template>
	<view>
		这里是大学习
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(){
			this.getCourse()
			this.getVideo()
		},
		methods: {
			getVideo(){
				this.$u.api.getVideo(1).then( (res) => {
					console.log(res)
				})
			},
			getCourse(){
				this.$u.api.getCourse(1).then((res) => {
					console.log(res)
				})
			}
			
		}
	}
</script>

<style>

</style>
