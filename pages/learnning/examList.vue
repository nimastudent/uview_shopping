<template>
	<view>
		<u-cell-group>
			<u-cell-item v-for="(item,index) in examList" :key="index"  :title="item.title" :arrow="false" @click="handleExamClick(item.id)">
				<u-icon v-if="item.finish" slot="right-icon" size="32" name="checkbox-mark" color='#13ce66'></u-icon>
				<u-icon v-else slot="right-icon" size="32" name="arrow-right"></u-icon>
			</u-cell-item>
			
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			examList:[],
			
			}
		},
		created() {
		this.getAllList()
		},
		methods: {
			async getAllList() {
				const res = await this.$u.api.getExamList()
				if (res) {
					this.examList = res.body
				}
			},
			handleExamClick(id){
				this.$u.route({
								url: '/pages/learnning/exam',
								params: {
									id
								}
							})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
