// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	// vm.$u.api = {}
	
	//登陆
	let authLogin = (params = {} ) => vm.$u.post('/user/login',params)
	
	// i闽警登录
	let iLogin = params => vm.$u.post('/user/login/app',params)
	
	
	//首页咨询
	let getConsult = params  => vm.$u.get(`/information/all`)
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
	// 根据id获取课程
	let getCourseById = id => vm.$u.get(`/course/content/get/id?id=${id}`)
	// 获取课程id
	let getAllCourseId = () => vm.$u.get('/course/all')
	
	// 9、检查课程内容是否学习完成
	let checkCourseIsFinished = (data) => vm.$u.get('/course/question/check/finish',data)
	
	// 获取课程内容下的题目
	let getQuesById = (data) => vm.$u.get('/course/question/get',data)
	
	// 提交用户做的题
	let submitUserQues = (data) => vm.$u.post('/course/question/submit',data)
	
	//提交用户学习时长
	let submitUserTime = (data) => vm.$u.post('/course/content/submit/learn/time',data)
	
	// exam start----------------------------------------------------
	
	// 用户重置顺序答题或类型练习
	let resSetOrder = data => vm.$u.post('/sequential/reset',data) 
	
	//顺序练习
	let getOrderQusetion = data => vm.$u.post('/sequential/get',data) 
	
	//获取顺序练习进度
	let getOrderProgress = () =>vm.$u.post('/sequential/get/progress')
	
	//获取模拟考题型分数
	let getMockTypeScore =() =>vm.$u.get('/simulation/get/settings')
	
	// 发送模拟考分数
	let sendMockScore = (data) => vm.$u.post('/simulation/put/record',data)
	
	// 获取模拟考记录
	let getMockRecord = () => vm.$u.get('/simulation/get/user/record')
	
	//获取模拟考试题 
	let getMockQuestion = (params = {} ) => vm.$u.get('/mock/sample')
	
	// 获取考试试题
	let fetchExamQuestion = () => vm.$u.get('/exam/getExam')
	
	// 收集错题集
	let colllectQuestion = params => vm.$u.post('/errorBook/add',params)
	
	// 添加错题集
	let addErrorBook = (data) => vm.$u.post('/errorBook/add/some',data)
	
	// 删除错题集
	let deleteErrorBooke = (params) => vm.$u.get('/errorBook/delete',params)
	
	// 模拟考多选题 判断
	let sendMultipleAns = (params = {}) => vm.$u.post('/multipleChoice/check',params)
	
	// 模拟考单选题判断
	let sendSingleAns = (params = {}) => vm.$u.post('/singleChoice/check',params)
	
	// 模拟考判断题 判断
	let sendJudgmentAns = (params = {}) => vm.$u.post('/judgment/check',params)
	
	let computedScore = params => vm.$u.post('/exam/getExam/calculate',params)
	
	// 获取所有考试列表
	let getExamList = params => vm.$u.get('/paper/select/user/all')
	
	// 根据id获取考试题目 
	let getExamById = id => vm.$u.get(`/paper/get/user/${id}`)
	
	// 提交试卷 要id的
	let submitExamById = params => vm.$u.post('/paper/exam/submit',params)
	
	// 获取已经考过试卷的分数 id
	let getscoreById = id => vm.$u.get(`/paper/exam/score/${id}`)
	// 获取我的成绩
	let getMyScore = () => vm.$u.get('/paper/getHistory')
	// exam end ----------------------------------------------------
	
	
	// 司法 相关
	let getAllType = () => vm.$u.get("/tool/type/all")
	
	let getSifaList = (params) => vm.$u.get('/tool/all',params)
	
	let getSifaById = (params) => vm.$u.get('/tool/getById',params)
	
	
	
	
	
	// 收藏资讯 type=1 法律 type = 2 新规 type = 3
	let collect = params => vm.$u.post('/collect/add ',params)
	// 删除收藏 type=1 法律 type = 2 新规 type = 3
	let cancleCollect = params => vm.$u.get('/collect/delete',params)
	
	
	//获取法律目录
	let getLaw = params => vm.$u.get('/law')
	
	let getLawCatalogue = parmas => vm.$u.get('/law/catalogue',parmas)
	
	let getlawContent = parmas => vm.$u.get('/law/content?title='+parmas)
	
	let golawContent = params => vm.$u.get('/law/content/id?id='+params)
	
	// _**************************新规获取可以在完善下**********************************
	let getNewRule = params => vm.$u.get(`/rule/all`)
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
	// 更细昵称
	let updateNickname = params => vm.$u.post('/user/manage/update/nickname',params)
	
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
	
	
	//工作交流
	let getWorkList = (params) => vm.$u.get('/topic/list',params)
	
	// 4、根据id返回具体信息
	let getWorkContentById = (params) => vm.$u.get('/topic/getById',params)
	
	//1、用户发布交流
	let insertWork = (data) => vm.$u.post('/topic/publish',data)
	
	let commetWork = (data) => vm.$u.post('/topic/comment/publish',data)
	
	//采纳评论
	let acceptComment = (params) => vm.$u.get('/topic/comment/accept',params)
	
	//取消采纳
	let cancleComment = (params) => vm.$u.get('/topic/comment/cancel/accept',params)
	
	// 用户获取自己发布的工作交流
	let getMyWork = () => vm.$u.get('/topic/my/list')
	
	// 用户删除自己发布的工作交流
	let userDeleteWork = (params) => vm.$u.get('/topic/delete',params)
	
	// 此处使用了传入的params参数，一切自定义即可
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		authLogin,
		iLogin,
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
		collect,
		updateNickname,
		getExamList,
		getExamById,
		getCourseById,
		submitExamById,
		getscoreById,
		getAllCourseId,
		cancleCollect,
		getMyScore,
		getOrderQusetion,
		getOrderProgress,
		getMockTypeScore,
		sendMockScore,
		getMockRecord,
		addErrorBook,
		resSetOrder,
		deleteErrorBooke,
		getSifaList,
		getSifaById,
		getWorkList,
		getWorkContentById,
		insertWork,
		commetWork,
		checkCourseIsFinished,
		getMyWork,
		userDeleteWork,
		acceptComment,
		cancleComment,
		getQuesById,
		submitUserQues,
		getAllType,
		submitUserTime
	};
}

export default {
	install
}