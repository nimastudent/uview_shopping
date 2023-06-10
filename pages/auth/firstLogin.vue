<template>
	<view style="padding: 30rpx;">
		<u-form :model="form" ref="nForm" label-width="120">
			<u-form-item label="真实姓名">
				<u-input v-model="form.name" />
			</u-form-item>
			<u-form-item label="电话号码">
				<u-input v-model="form.phone" />
			</u-form-item>
			<u-form-item label="昵称">
				<u-input v-model="form.nickname" />
			</u-form-item>
			<u-form-item label="部门">
				<u-input v-model="form.dept" @click="showPicker" />
			</u-form-item>
			<u-form-item label="性别">
				<u-input v-model="form.sex" type="select" @click="show = true" />
				<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			</u-form-item>
		</u-form>


		<ba-tree-picker ref="treePicker" :multiple='false' @select-change="selectChange" title="选择部门" :localdata="list"
			valueKey="id" textKey="name" childrenKey="children" />

		<u-button @click="submitForm()" type="primary">提交</u-button>
	</view>
</template>

<script>
	import baTreePicker from "@/components/ba-tree-picker/ba-tree-picker.vue"

	export default {
		components: {
			baTreePicker
		},
		data() {
			return {
				selectedDept: "",
				deptShow: true,
				list: [{
						id: "13",
						name: "测i式部3子级节点"
					},
					{
						id: "14",
						name: "测i式部4子级节点",
						children: [{
								id: "15",
								name: "测i式部4子级节点",
							},
							{
								id: "16",
								name: "测i式部78子级节点",
							}
						]
					}
				],
				show: false,
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
				],
				form: {
					name: "",
					phone: "",
					nickname: "",
					dept: "",
					sex: "",
					username: "",
				},
				rules: {
					name: [{
						required: true,
						message: '请输入真实姓名',
						trigger: ['change', 'blur'],
					}],
					phone: [{
						required: true,
						message: '请输入电话号码',
						trigger: ['change', 'blur'],
					}],
					nickname: [{
						required: true,
						message: '请输入昵称',
						trigger: ['change', 'blur'],
					}],
					dept: [{
						required: true,
						message: '请输入部门',
						trigger: ['change', 'blur'],
					}],
					sex: [{
						required: true,
						message: '请输入性别',
						trigger: ['change', 'blur'],
					}],
				}
			}
		},
		onLoad() {
			const _this = this
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					_this.form.username = res.data.loginId
					_this.form.nickname = res.data.userName
					_this.form.sex = res.data.sex
					_this.form.phone = res.data.telephone
				}
			})
			uni.request({
				url:'http://20.135.8.169:8080/police/dept/list',
				data:{
					name:null,
					parent:null
				},
				method:"POST",
				header:{
					token:_this.$store.state.vuex_token
				},
				success(res) {
					const {statusCode,data,code} = res
					if(data.success){
						_this.list = data.body
					}
				}
			})
		},
		onReady() {
			this.$refs.nForm.setRules(this.rules);
		},
		methods: {
			actionSheetCallback(index) {
				this.form.sex = this.actionSheetList[index].text;
			},
			submitForm() {
				const {
					name,
					phone,
					nickname,
					dept,
					sex,
					username
				} = this.form
				if (!name.length ||
					!phone.length ||
					!nickname.length ||
					!dept.length ||
					!sex.length ||
					!username.length) {
					uni.showToast({
						title: "请填写完整信息！"
					})
					return;
				}
				this.$u.api.firstLogin(this.form).then(res => {
					uni.switchTab({
						url: "/pages/index/index"
					})
				})

			},
			// 显示选择器
			showPicker() {
				this.$refs.treePicker._show();
			},
			//监听选择（ids为数组）
			selectChange(ids, names) {
				console.log(ids, names)
				this.form.dept = names;
			}
		}
	}
</script>

<style>

</style>