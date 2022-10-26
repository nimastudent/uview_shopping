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
						</view>
					</view>
				</view>



			</scroll-view>

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
			hasType:{
				required:false,
				type:Object,
				default:function(){
					return {
					jud:true,
					single:true,
					mutil:true
				}
				}
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
			};
		},
		methods: {
			handleClick(index) {
				console.log(index);
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
	}

	.abtn {
		margin: 10rpx;
		border-radius: 60%;
	}

	uni-button:after {
		border: 1px solid #fff;
	}
</style>
