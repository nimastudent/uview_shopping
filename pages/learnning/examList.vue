<template>
	<view>
		<u-cell-group>
			<u-cell-item v-for="(item,index) in examList" :key="index"  :title="item.title" :arrow="false" @click="handleExamClick(item)">
				<u-icon v-if="item.finish" slot="right-icon" size="32" name="checkbox-mark" color='#13ce66'></u-icon>
				<u-icon v-else slot="right-icon" size="32" name="arrow-right"></u-icon>
			</u-cell-item>
			
		</u-cell-group>
		<u-modal v-model="showSocreModal" :content="scoreContent" @confirm="handleCloseModal"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			examList:[],
			showSocreModal:false,
			score:0
			}
		},
		computed:{
			scoreContent(){
				return "你的分数是:" +Math.floor() 
			}
		},
		created() {
		this.getAllList()
		},
		methods: {
			async getAllList() {
				const res = await this.$u.api.getExamList()
				if (res) {
					console.log(res);
					this.examList = res.body
				}
			},
			handleExamClick(item){
				console.log(item);
				if(item.finish){
					this.$u.api.getscoreById(item.id).then(res => {
						
						this.score = res.body.score
						this.showSocreModal = true
					}
					)
				}else{
					this.$u.route({
									url: '/pages/learnning/exam',
									params: {
										id:item.id
									}
								})
				}
				
				
			},
			handleCloseModal(){
				this.showSocreModal = false
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
