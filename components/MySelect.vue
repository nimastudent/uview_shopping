<template>
	<view>
		<ul v-if="data.length">
			<li v-for="(item, i) in data" :key="i" @click.native.stop="selectItem(item, i)" v-show="expandFlag">
				<div class="item">
					<!-- 展开的图标 -->
					<u-icon class="expandIcon" v-show="item.children && item.children.length"
						:name="expandArr.includes(i) ? 'arrow-down' : 'arrow-right'"
						@click.native.stop="expandItem(item, i)"></u-icon>

					<!-- 选项名 -->
					<h1>{{ item[labelKey] }}</h1>
					<!-- 选择的图标 -->
					<u-icon class="checkIcon" name="checkmark" v-show="value.find(element => element.value === item.value)" />
					<!-- <a-icon class="checkIcon" type="check" v-show="
		          value.find(element => element.value === item.value) && !item.disable
		        " /> -->
				</div>
				<my-select v-if="item.children" @input="input" :data="item.children" :valueKey="valueKey"
					:labelKey="labelKey" :disabledKey="disabledKey" :value="value" :toastText="toastText"
					:expandFlag="expandArr.includes(i)" />
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name: "MySelect",
		props: {
			// 选中的值的属性名，必传
			valueKey: String,
			// 在页面要展示的选项属性名，必传
			labelKey: String,
			// 不可选的唯一标识，如item[disabledKey]未true则不可选择，非必传
			disabledKey: String,
			// 选中的值，必传
			value: Array,
			// 控制展开，不需要传
			expandFlag: {
				type: Boolean,
				default: true
			},
			// 总数据，必传
			data: Array,
			// 不可选提示文字，非必传
			toastText: String
		},
		data() {
			return {
				// 当前级组件已展开的项
				expandArr: []
			};
		},
		methods: {
			// 子组件逐级传递选中项
			input(item) {
				this.$emit("input", item);
			},
			// 选择
			selectItem(item, i) {
				console.log(item);
				this.expandItem(item, i)
				const selectedList = this.value;
				if (this.value.length > 0) {
					return;
				}
				const index = selectedList.findIndex(
					element => element.value === item.value
				);
				console.log(index);
				if (index === -1) {
					this.addItem(item);
				} else {
					this.deleteItem(item);
				}
				console.log(this.value);
			},
			deleteItem(item) {
				console.log(item);

				//获取元素下标
				const index = this.value.findIndex(
					element => element.value === item.value
				);
				//如果存在元素 则删除
				if (index > -1) {
					this.value.splice(index, 1);
				}
			},
			addItem(item) {
				//获取元素下标
				console.log('add', item);
				// //如果没有元素 则增加
				this.value.push({
					value: item.id,
					title: item.name,
				});


			},
			// 展开
			expandItem(item, i) {
				if (item.children && item.children.length) {
					let index = this.expandArr.indexOf(i);
					if (index > -1) {
						this.expandArr.splice(index, 1);
					} else {
						this.expandArr.push(i);
					}
				}
			}
		}
	}
</script>


<style lang="less" scoped>
	ul {
		list-style: none;
		width: 100%;
		color: #2a2a2a;
		font-size: 26/75rem;
		padding-left: 10px;
		// overflow: hidden;
		background: #fff;
		border-bottom: 0.8px solid #e1e1e1;

		li {
			.item {
				padding: 14/75rem 24/75rem;
				display: flex;
				align-items: center;
				width: 100%;

				.expandIcon {
					height: 1rem;
					width: 1rem;
					font-size: 65/75rem;
					position: relative;

					&:after {
						position: absolute;
						top: 50%;
						left: 50%;
						font-size: 1rem;
						transform: translate(-50%, -50%);
					}

					&.add {
						border-color: #2a2a2a;

						&:after {
							color: #2a2a2a;
							content: "＋";
						}
					}

					&.reduce {
						border-color: #ff6633;

						&:after {
							color: #ff6633;
							content: "－";
						}
					}

					&.disabled {
						border-color: #ddd;

						&:after {
							color: #ddd;
						}
					}
				}

				.checkIcon {
					height: 1rem;
					width: 1rem;
					font-size: 65/75rem;
					padding-right: 1rem;
					color: #1890ff;
				}

				.selectIcon {
					height: 34/75rem;
					width: 34/75rem;
					border: 1.5px solid;
					border-radius: 50%;
					position: relative;

					&:after {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}

					&.checked {
						border-color: #ff6633;
						background: #ff6633;

						&:after {
							font-size: 24/75rem;
							color: #fff;
							content: "✓";
						}
					}

					&.noChecked {
						border-color: #ff6633;
					}

					&.disabled {
						border-color: #ddd;
					}
				}

				h1 {
					margin-right: 12/75rem;
					padding: 0 32/75rem;
					position: relative;
					top: 4/75rem;
					height: 120/75rem;
					line-height: 120/75rem;
					font-size: 75/75rem;
					flex: 1;
					white-space: nowrap;
					color: #2a2a2a;
					// .one-line;
					overflow-x: auto;
				}

				.disable {
					color: #a8a6a6;
				}
			}

			&:not(:first-child) {
				border-top: 0.8px solid #e1e1e1;
			}

			>ul {
				border-bottom: 0;
				padding-left: 60/75rem;

				li {
					.item {
						padding-left: 12/75rem;
					}

					border-top: 0.8px solid #e1e1e1;
				}
			}
		}
	}
</style>