<template>
 <view class="">
 	<p>pki跳转</p>
 </view>  
</template>

<script>
export default {
	data(){
		return {
			text:{},
			vuex:"",
			arrtoString:'',
			code:"",
			idToken:""
		}
	},
    onLoad(option) {
		// this.text = option
		// let textStr = ''
		// for (let item in option) {
		// 	textStr += option[item]
		// }
		
		// let str = textStr
		// let code = str.match(/=(\S*)id_token/)[1]
		// let idToken = str.match(/id_token=(\S*)/)[1]
		// this.idToken = idToken
		
        this.$u.get('/user/pki?id_token='+ option.id_token + '&code=' + option.code).then(res =>{
        console.log(res)
            if(res.success){
                this.$u.vuex('vuex_token',res.body.token)
                this.$u.vuex('vuex_userName',res.body.userName)
                this.$u.vuex('vuex_nickName',res.body.nickName)
                this.$u.route({
                            type:'switchTab',
                            url:'/pages/index/index'
                })
            }else {
                this.$refs.uToast.show({
                    title:'pki登录错误',
                    type: 'error',
                })
            }
        })
    }
}
</script>

<style>

</style>