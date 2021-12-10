// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let hotSearchUrl = '/ebapi/store_api/hot_search';
// let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	// vm.$u.api = {}
	
	//登陆
	let index = (params = {}) => vm.$u.get('/api/index',params);
	
	//认证相关
	// vm.$u.api.authLogin = params => vm.$u.api.post('/api/auth/login',params)
	//登录
	let authLogin = (params = {} ) => vm.$u.post('/api/auth/login',params)
	
	//首页咨询
	let getConsult = (params = {} ) => vm.$u.get('/information/all?start=0&len=2')
	
	
	let getVideo = (params = {} ) => vm.$u.get('/course/video?id='+params)
	
	let getCourse = (params = {} ) => vm.$u.get('/course/get?id='+params)
	
	//获取模拟考试题 
	let getMockQuestion = (params = {} ) => vm.$u.get('/mock/sample?single=5&multiple=5&judgment=5')
	
	//获取法律目录
	let getLaw = params => vm.$u.get('/law')
	
	
	let sendMultipleAns = (params = {}) => vm.$u.post('/multipleChoice/check',params)
	
	// 此处使用了传入的params参数，一切自定义即可
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		index,
		authLogin,
		getConsult,
		getVideo,
		getCourse,
		getMockQuestion,
		getLaw
	};
}

export default {
	install
}