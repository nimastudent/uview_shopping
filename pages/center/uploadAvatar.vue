<template>
  <view>
    <u-upload
      ref="uUpload"
      :action="action"
      :before-upload="beforeUpload"
      :auto-upload="true"
      max-count="1"
      :header="header"
	  @on-error="successUpload"
    ></u-upload>
    <u-button @click="submit">提交</u-button>
	
	<u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      action: "http://20.105.0.113:84/xlfjxxqjxt/police/user/headPortrait/upload",
      header: { "Content-Type": "multipart/form-data" },
      file: {},
      token: "",
    };
  },
  onLoad() {
    let token = "token";
    let atoken = this.vuex_token;
    this.header[token] = atoken;
	this.action = this.$u.baseUrl + '/user/headPortrait/upload'
  },
  methods: {
    beforeUpload(index, list) {
      this.file = list[0].file;
      console.log(list[0].file);
    },
    submit() {
     const res =  this.$refs.uUpload.upload();
	
    },
	successUpload(data, index, lists, name){
		console.log(123)
	}
  },
};
</script>

<style>
</style>
