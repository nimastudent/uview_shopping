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
	let authLogin = (params = {} ) => vm.$u.post('/user/login',params)
	
	//首页咨询
	let getConsult = (params = {} ) => vm.$u.get('/information/all?start=0&len=4')
	// 获取资讯内容
	let getConsultContent = params => vm.$u.get('/information/content?id='+params)
	// 获取首页轮播图
	let getIndexSwiper = params => vm.$u.get('/information/getPicture')
	// 资讯评论获取
	let getConsultInf = params => vm.$u.get(`/comment/get/inf?id=${params}`)
	
	// 评论资讯
	let commentConsult = params => vm.$u.post('/comment/inf',params)
	
	// 获取课程视频
	let getVideo = (params = {} ) => vm.$u.get('/course/video?id='+params)
	// 获取课程
	let getCourse = (params = {} ) => vm.$u.get('/course/get?id='+params)
	// 获取课程介绍
	let getCourseIntroduce = params => vm.$u.get('/course/introduce?id='+params)
	//获取模拟考试题 
	let getMockQuestion = (params = {} ) => vm.$u.get('/mock/sample?single=5&multiple=5&judgment=5')
	
	// 获取考试试题
	let fetchExamQuestion = () => vm.$u.get('/exam/getExam')
	
	// 添加错题集
	let colllectQuestion = params => vm.$u.post('/errorBook/add',params)
	
	// 模拟考多选题 判断
	let sendMultipleAns = (params = {}) => vm.$u.post('/multipleChoice/check',params)
	
	// 模拟考单选题判断
	let sendSingleAns = (params = {}) => vm.$u.post('/singleChoice/check',params)
	
	// 模拟考判断题 判断
	let sendJudgmentAns = (params = {}) => vm.$u.post('/judgment/check',params)
	
	let computedScore = params => vm.$u.post('/exam/getExam/calculate',params)
	
	
	// 收藏资讯 type=1 法律 type = 2 新规 type = 3
	let collect = params => vm.$u.post('/collect/add ',params)
	
	
	//获取法律目录
	let getLaw = params => vm.$u.get('/law')
	
	let getLawCatalogue = parmas => vm.$u.get('/law/catalogue?lawtype='+parmas)
	
	let getlawContent = parmas => vm.$u.get('/law/content?title='+parmas)
	
	let golawContent = params => vm.$u.get('/law/content/id?id='+params)
	
	// _**************************新规获取可以在完善下**********************************
	let getNewRule = params => vm.$u.get('/rule/all?start=0&len=4')
	// _************************************************************
	
	let getNewRuleContent = params => vm.$u.get('/rule/content?id='+params)
	
	// 获取新规评论
	let fetchNewRuleComment = params => vm.$u.get('/comment/get/rule?id='+params)
	// 评论新规
	let commentNewRule = params => vm.$u.post('/comment/rule',params)
	
	//个人中心
	let getAvatar = params => vm.$u.get('/user/headPortrait/get')
	// 上传头像
	let uploadAvatar = params => vm.$u.post('/user/headPortrait/upload',params)
	// 查看错题集
	let getErrorBook = () => vm.$u.get('/errorBook/all')
	// 获取所有评论
	let getComment = () => vm.$u.get('/comment/all')
	
	// 获取收藏资讯
	let getColleCunsult = () => vm.$u.get('/collect/myInformation')
	// 获取收藏法律
	let getColleLaw = () => vm.$u.get('/collect/myLaw')
	// 获取收藏新规
	let getColleNewRule = () => vm.$u.get('/collect/myRule')
	
	// 此处使用了传入的params参数，一切自定义即可
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		authLogin,
		getConsult,
		getConsultContent,
		getIndexSwiper,
		getVideo,
		getCourse,
		getCourseIntroduce,
		getLawCatalogue,
		getlawContent,
		golawContent,
		getMockQuestion,
		sendMultipleAns,
		sendSingleAns,
		sendJudgmentAns,
		computedScore,
		getLaw,
		getNewRule,
		getNewRuleContent,
		getAvatar,
		uploadAvatar,
		getErrorBook,
		getComment,
		getColleCunsult,
		getColleLaw,
		getColleNewRule,
		getConsultInf,
		commentConsult,
		commentNewRule,
		fetchExamQuestion,
		colllectQuestion,
		fetchNewRuleComment,
		collect
	};
}

export default {
	install
}