<template>
	<view>
		<u-modal v-model="tikaShow" width="85%" :show-title="false" :mask-close-able="true"
			:show-confirm-button="false">
			<view class="tikaTitle">
				题卡
			</view>
			<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll-contianer">

				<view v-if="this.hasType.jud">
					<view class="type-title">
						判断题
					</view>
					<view class="tika-btn-continar">
						<view class="tika-butoon" v-for="(item,key) in this.judList" :key="key">
							<button class="abtn" :type="item.checked?'primary':'default'" :custom-style="customStyle"
								@click="handleClick(key)">{{parseInt(key)+1}}</button>
							<i  v-if="isErroBook" @click="handleDelete(item)">&times;</i>
						</view>
					</view>
				</view>


				<view v-if="this.hasType.single">
					<view class="type-title">
						单选题
					</view>
					<view class="tika-btn-continar">
						<!-- <view class="tika-butoon" v-for="(item,index) in this.questionList" :key="index">
				<button class="abtn" :type="item.checked?'primary':'default'" :custom-style="customStyle"
					@click="handleClick(index)">{{index+1}}</button>
			</view> -->
						<view class="tika-butoon" v-for="(item,key) in this.singleList" :key="key">
							<button class="abtn" :type="item.checked?'primary':'default'" :custom-style="customStyle"
								@click="handleClick(key)">{{parseInt(key)+1}}</button>
							<i  v-if="isErroBook" @click="handleDelete(item)">&times;</i>
						</view>
					</view>
				</view>



				<view v-if="this.hasType.mutil">
					<view class="type-title">
						多选题
					</view>
					<view class="tika-btn-continar">
						<!-- <view class="tika-butoon" v-for="(item,index) in this.questionList" :key="index">
				<button class="abtn" :type="item.checked?'primary':'default'" :custom-style="customStyle"
					@click="handleClick(index)">{{index+1}}</button>
			</view> -->
						<view class="tika-butoon" v-for="(item,key) in this.mutiList" :key="key">
							<button class="abtn" :type="item.checked?'primary':'default'" :custom-style="customStyle"
								@click="handleClick(key)">{{parseInt(key)+1}}</button>
							<i v-if="isErroBook" @click="handleDelete(item)">&times;</i>
						</view>
					</view>
				</view>
			</scroll-view>

		</u-modal>

		<u-modal v-model="deleteModalShow" show-cancel-button :async-close="true"  @confirm="deleteConfirm">
			<view style="display: flex;justify-content: center;align-items: center;padding: 40upx;">
				请确认是否删除该题？
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		name: "tika",
		props: {
			tikaModalShow: {
				required: true,
				type: Boolean
			},
			questionList: Array,
			hasType: {
				required: false,
				type: Object,
				default: function() {
					return {
						jud: true,
						single: true,
						mutil: true
					}
				}
			},
			isErroBook:{
				required: false,
				type:Boolean,
				default:false
			}
		},
		computed: {
			tikaShow: {
				get() {
					return this.tikaModalShow
				},
				set(value) {
					this.$emit("update:tikaModalShow", value)
				}
			},
			judList() {
				//type 1 
				return this.sliceQues(this.questionList, 1)
			},
			singleList() {
				//type 2
				return this.sliceQues(this.questionList, 2)
			},
			mutiList() {
				//type 3
				return this.sliceQues(this.questionList, 3)
			}
		},
		data() {
			return {
				fengexian: '50%',
				customStyle: {
					borderRadius: '50%'
				},
				deleteModalShow: false,
				deleteItem:{}
			};
		},
		methods: {
			handleClick(index) {
				
				this.$emit('goIndex', parseInt(index))
			},
			sliceQues(arr, type) {
				let res = {}
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].type === type) {
						res = Object.assign({}, res, {
							[i]: arr[i]
						})
					}
				}
				return res;
			},
			handleDelete(item) {
				this.deleteModalShow = true
				this.deleteItem = item
			},
			deleteConfirm(){
				this.$u.api.deleteErrorBooke({type:this.deleteItem.type,id:this.deleteItem.id}).then(res => {
					if(res.success){
						this.deleteModalShow = false
						uni.showToast({
							title:"删除成功，请重新进入错题集！",
							duration:1500
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tikaTitle {
		font-size: 38upx;
		font-weight: 700;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20upx;
	}



	.scroll-contianer {
		height: 70vh;

		.type-title {
			margin-left: 5vw;
			padding: 20upx;
			font-size: 32upx;
			font-weight: 600;
		}
	}

	.tika-btn-continar {
		width: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.tika-butoon {
		width: 18%;
		position: relative;

		i {
			color: red;
			font-size: 50upx;
			position: absolute;
			right: 1px;
			top: -8px;
		}
	}

	.abtn {
		margin: 10upx;
		border-radius: 60%;

	}

	uni-button:after {
		border: 1px solid #fff;
	}
	
</style>
