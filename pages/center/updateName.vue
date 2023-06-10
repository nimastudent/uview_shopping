<template>
  <view>
	  <u-navbar title="用户设置" />
    <u-cell-group>
      <u-cell-item
        :title-style="style"
        title="头像"
        :arrow="true"
        arrow-direction="right"
        @click="uploadtest"
		
      >
        <image :src="imgUrl" mode=""></image>
      </u-cell-item>
      <u-cell-item
        :title-style="style"
        title="昵称"
        :arrow="true"
        :value="nickName"
		@click="showNicknamePop"
      ></u-cell-item>
    </u-cell-group>
	
	<u-popup v-model="nickNameShow" mode="bottom">
		<u-field label-width="0" v-model="content" type="text" placeholder="请填写昵称" focus maxlength="10">
			<button size="mini" type="primary" slot="right" @click="submintNickName">提交</button>
		</u-field>
	</u-popup>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      style: {
        color: "#000000",
      },
	  content:'',
      imgUrl: "",
	  nickNameShow:false
    };
  },
  computed: {
    nickName() {
      return this.vuex_nickName;
    },
  },
  onLoad() {
    this.getImgUrl();
  },
  methods: {
    async getImgUrl() {
      await this.$u.api.getAvatar().then((res) => {
        if (res.success) {
          let arrayBuffer = res.body;
          this.imgUrl = "data:image/jpeg;base64," + arrayBuffer;
		  this.$u.vuex('vuex_avatar',this.imgUrl)
        }
      });
    },
    uploadtest() {
      var a = this.vuex_token;
      var _this = this;
	  var baseUrl = this.$u.baseUrl
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: function (res) {
			const reg2 = /^(\s|\S)+(jpg|JPG)+$/;
          if (reg2.test(res.tempFiles[0].name)) {
            uni.uploadFile({
				// "http://20.105.0.113:84/xlfjxxqjxt/police/user/headPortrait/upload"
              url: `${baseUrl}/user/headPortrait/upload`,
              file: res.tempFiles[0],
              header: {
                token: a,
              },
              success: (res) => {
                console.log(res);
				_this.getImgUrl()
				if(res.statusCode === 200){
					_this.$refs.uToast.show({
						title: '上传成功',
						type: 'success',
					})
				}
				
              },
            });
          } else {
			  
           _this.$refs.uToast.show({
           	title: '请选择 jpg 格式图片',
           	type: 'error',
           })
		   
          }
        },
      });
    },
	async submintNickName(){
		let str = this.content;
		let username = this.vuex_userName;
		let obj = {
			username,
			nickname:str
		}
		 var patrn = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im; 
		   if(!patrn.test(str)){
			const res = await this.$u.api.updateNickname(obj)
			if(res.success){
				this.$u.vuex('vuex_nickName', str);
				this.nickNameShow = false;
				this.$refs.uToast.show({
					title: '更新成功',
					type: 'success',
				})
			}
				
		   }else{
			   this.$u.toast("请输入正确的昵称（不能有特殊字符）")
		   }
	},
	showNicknamePop(){
		this.nickNameShow = true;
		this.content = '';
	}
  },
};
</script>

<style lang="scss" scoped>
image {
  height: 90upx;
  width: 90upx;
}
</style>
