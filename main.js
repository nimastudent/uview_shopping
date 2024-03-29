import Vue from 'vue'
import App from './App'
// 引入全局uView
import uView from 'uview-ui';
import store from '@/store';
import VConsole from 'vconsole';

const vConsole = new VConsole();


Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(vConsole)

Vue.use(uView);

const app = new Vue({
	store,
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)


let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);


app.$mount()
