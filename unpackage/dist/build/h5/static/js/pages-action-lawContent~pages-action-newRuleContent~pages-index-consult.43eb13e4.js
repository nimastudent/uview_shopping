(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-action-lawContent~pages-action-newRuleContent~pages-index-consult"],{"0efd":function(t,e,i){"use strict";i.r(e);var n=i("fc63"),r=i("f4be");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("9545");var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"01dfbd2e",null,!1,n["a"],a);e["default"]=c.exports},"124a":function(t,e,i){"use strict";i.r(e);var n=i("a572"),r=i("ce46");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=c.exports},"1f91":function(t,e,i){"use strict";var n=i("305c"),r=i.n(n);r.a},"27d9":function(t,e,i){var n=i("7b8a");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("122a51fc",n,!0,{sourceMap:!1,shadowMode:!1})},"305c":function(t,e,i){var n=i("3983");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("a7eb6424",n,!0,{sourceMap:!1,shadowMode:!1})},3469:function(t,e,i){"use strict";i("c975"),i("a9e3"),i("b64b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"u-toast",props:{zIndex:{type:[Number,String],default:""}},data:function(){return{isShow:!1,timer:null,config:{params:{},title:"",type:"",duration:2e3,isTab:!1,url:"",icon:!0,position:"center",callback:null,back:!1},tmpConfig:{}}},computed:{iconName:function(){if(["error","warning","success","info"].indexOf(this.tmpConfig.type)>=0&&this.tmpConfig.icon){var t=this.$u.type2icon(this.tmpConfig.type);return t}},uZIndex:function(){return this.isShow?this.zIndex?this.zIndex:this.$u.zIndex.toast:"999999"}},methods:{show:function(t){var e=this;this.tmpConfig=this.$u.deepMerge(this.config,t),this.timer&&(clearTimeout(this.timer),this.timer=null),this.isShow=!0,this.timer=setTimeout((function(){e.isShow=!1,clearTimeout(e.timer),e.timer=null,"function"===typeof e.tmpConfig.callback&&e.tmpConfig.callback(),e.timeEnd()}),this.tmpConfig.duration)},hide:function(){this.isShow=!1,this.timer&&(clearTimeout(this.timer),this.timer=null)},timeEnd:function(){if(this.tmpConfig.url){if("/"!=this.tmpConfig.url[0]&&(this.tmpConfig.url="/"+this.tmpConfig.url),Object.keys(this.tmpConfig.params).length){var t="";/.*\/.*\?.*=.*/.test(this.tmpConfig.url)?(t=this.$u.queryParams(this.tmpConfig.params,!1),this.tmpConfig.url=this.tmpConfig.url+"&"+t):(t=this.$u.queryParams(this.tmpConfig.params),this.tmpConfig.url+=t)}this.tmpConfig.isTab?uni.switchTab({url:this.tmpConfig.url}):uni.navigateTo({url:this.tmpConfig.url})}else this.tmpConfig.back&&this.$u.route({type:"back"})}}};e.default=n},3983:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.u-toast[data-v-070c62ba]{position:fixed;z-index:-1;transition:opacity .3s;text-align:center;color:#fff;border-radius:%?8?%;background:#585858;display:flex;flex-direction:row;align-items:center;justify-content:center;font-size:%?28?%;opacity:0;pointer-events:none;padding:%?18?% %?40?%}.u-toast.u-show[data-v-070c62ba]{opacity:1}.u-icon[data-v-070c62ba]{margin-right:%?10?%;display:flex;flex-direction:row;align-items:center;line-height:normal}.u-position-center[data-v-070c62ba]{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-width:70%}.u-position-top[data-v-070c62ba]{left:50%;top:20%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.u-position-bottom[data-v-070c62ba]{left:50%;bottom:20%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.u-type-primary[data-v-070c62ba]{color:#2979ff;background-color:#ecf5ff;border:1px solid #d7eafe}.u-type-success[data-v-070c62ba]{color:#19be6b;background-color:#dbf1e1;border:1px solid #bef5c8}.u-type-error[data-v-070c62ba]{color:#fa3534;background-color:#fef0f0;border:1px solid #fde2e2}.u-type-warning[data-v-070c62ba]{color:#f90;background-color:#fdf6ec;border:1px solid #faecd8}.u-type-info[data-v-070c62ba]{color:#909399;background-color:#f4f4f5;border:1px solid #ebeef5}.u-type-default[data-v-070c62ba]{color:#fff;background-color:#585858}',""]),t.exports=e},"71dc":function(t,e,i){"use strict";var n=i("4ea4");i("99af"),i("caad"),i("c975"),i("acd8"),i("e25e"),i("ac1f"),i("2532"),i("466d"),i("5319"),i("841c"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,o=n(i("b85c")),a=uni.getSystemInfoSync(),s=a.windowWidth,c=(a.platform,i("d1d1")),l={name:"parser",data:function(){return{uid:this._uid,showAm:"",nodes:[]}},props:{html:String,autopause:{type:Boolean,default:!0},autoscroll:Boolean,autosetTitle:{type:Boolean,default:!0},domain:String,lazyLoad:Boolean,selectable:Boolean,tagStyle:Object,showWithAnimation:Boolean,useAnchor:Boolean},watch:{html:function(t){this.setContent(t)}},created:function(){this.imgList=[],this.imgList.each=function(t){for(var e=0,i=this.length;e<i;e++)this.setItem(e,t(this[e],e,this))},this.imgList.setItem=function(t,e){if(void 0!=t&&e){if(0==e.indexOf("http")&&this.includes(e)){for(var i,n=e.split("://")[0],r=n.length;i=e[r];r++){if("/"==i&&"/"!=e[r-1]&&"/"!=e[r+1])break;n+=Math.random()>.5?i.toUpperCase():i}return n+=e.substr(r),this[t]=n}if(this[t]=e,e.includes("data:image")){var o=e.match(/data:image\/(\S+?);(\S+?),(.+)/);if(!o)return}}}},mounted:function(){var t=this;this.document=document.getElementById("rtf"+this._uid),r&&(this.search=function(e){return r(t,e)}),this.html&&this.setContent(this.html)},beforeDestroy:function(){this._observer&&this._observer.disconnect(),this.imgList.each((function(t){})),clearInterval(this._timer)},methods:{setContent:function(t,e){var i=this;if(t){var n=document.createElement("div");e?this.rtf?this.rtf.appendChild(n):this.rtf=n:(this.rtf&&this.rtf.parentNode.removeChild(this.rtf),this.rtf=n),n.innerHTML=this._handleHtml(t,e);for(var r,a=this.rtf.getElementsByTagName("style"),l=0;r=a[l++];)r.innerHTML=r.innerHTML.replace(/body/g,"#rtf"+this._uid),r.setAttribute("scoped","true");!this._observer&&this.lazyLoad&&IntersectionObserver&&(this._observer=new IntersectionObserver((function(t){for(var e,n=0;e=t[n++];)e.isIntersecting&&(e.target.src=e.target.getAttribute("data-src"),e.target.removeAttribute("data-src"),i._observer.unobserve(e.target))}),{rootMargin:"500px 0px 500px 0px"}));var u=this,f=this.rtf.getElementsByTagName("title");f.length&&this.autosetTitle&&uni.setNavigationBarTitle({title:f[0].innerText});var d=function(t){var e=t.getAttribute("src");i.domain&&e&&("/"==e[0]?"/"==e[1]?t.src=(i.domain.includes("://")?i.domain.split("://")[0]:"")+":"+e:t.src=i.domain+e:e.includes("://")||0==e.indexOf("data:")||(t.src=i.domain+"/"+e))};this.imgList.length=0;for(var h,p=this.rtf.getElementsByTagName("img"),m=0,g=0;h=p[m];m++)parseInt(h.style.width||h.getAttribute("width"))>s&&(h.style.height="auto"),d(h),h.hasAttribute("ignore")||"A"==h.parentElement.nodeName||(h.i=g++,u.imgList.push(h.getAttribute("original-src")||h.src||h.getAttribute("data-src")),h.onclick=function(t){t.stopPropagation();var e=!0;this.ignore=function(){return e=!1},u.$emit("imgtap",this),e&&uni.previewImage({current:this.i,urls:u.imgList})}),h.onerror=function(){c.errorImg&&(u.imgList[this.i]=this.src=c.errorImg),u.$emit("error",{source:"img",target:this})},u.lazyLoad&&this._observer&&h.src&&0!=h.i&&(h.setAttribute("data-src",h.src),h.removeAttribute("src"),this._observer.observe(h));var b,v=this.rtf.getElementsByTagName("a"),y=(0,o.default)(v);try{for(y.s();!(b=y.n()).done;){var x=b.value;x.onclick=function(t){t.stopPropagation();var e=!0,i=this.getAttribute("href");if(u.$emit("linkpress",{href:i,ignore:function(){return e=!1}}),e&&i)if("#"==i[0])u.useAnchor&&u.navigateTo({id:i.substr(1)});else{if(0==i.indexOf("http")||0==i.indexOf("//"))return!0;uni.navigateTo({url:i})}return!1}}}catch(L){y.e(L)}finally{y.f()}var w=this.rtf.getElementsByTagName("video");u.videoContexts=w;for(var C,_=0;C=w[_++];)d(C),C.style.maxWidth="100%",C.onerror=function(){u.$emit("error",{source:"video",target:this})},C.onplay=function(){if(u.autopause)for(var t,e=0;t=u.videoContexts[e++];)t!=this&&t.pause()};var T,k,I=this.rtf.getElementsByTagName("audio"),A=(0,o.default)(I);try{for(A.s();!(T=A.n()).done;){var S=T.value;d(S),S.onerror=function(){u.$emit("error",{source:"audio",target:this})}}}catch(L){A.e(L)}finally{A.f()}if(this.autoscroll){var $,O=this.rtf.getElementsByTagName("table"),E=(0,o.default)(O);try{for(E.s();!($=E.n()).done;){var N=$.value,B=document.createElement("div");B.style.overflow="scroll",N.parentNode.replaceChild(B,N),B.appendChild(N)}}catch(L){E.e(L)}finally{E.f()}}e||this.document.appendChild(this.rtf),this.$nextTick((function(){i.nodes=[1],i.$emit("load")})),setTimeout((function(){return i.showAm=""}),500),clearInterval(this._timer),this._timer=setInterval((function(){i.rect=i.rtf.getBoundingClientRect(),i.rect.height==k&&(i.$emit("ready",i.rect),clearInterval(i._timer)),k=i.rect.height}),350),this.showWithAnimation&&!e&&(this.showAm="animation:_show .5s")}else this.rtf&&!e&&this.rtf.parentNode.removeChild(this.rtf)},getText:function(){arguments.length>0&&void 0!==arguments[0]||this.nodes;var t="";return t=this.rtf.innerText,t},in:function(t){t.page&&t.selector&&t.scrollTop&&(this._in=t)},navigateTo:function(t){var e=this;if(!this.useAnchor)return t.fail&&t.fail("Anchor is disabled");var i=" ",n=uni.createSelectorQuery().in(this._in?this._in.page:this).select((this._in?this._in.selector:"#_top")+(t.id?"".concat(i,"#").concat(t.id,",").concat(this._in?this._in.selector:"#_top").concat(i,".").concat(t.id):"")).boundingClientRect();this._in?n.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect():n.selectViewport().scrollOffset(),n.exec((function(i){if(!i[0])return t.fail&&t.fail("Label not found");var n=i[1].scrollTop+i[0].top-(i[2]?i[2].top:0)+(t.offset||0);e._in?e._in.page[e._in.scrollTop]=n:uni.pageScrollTo({scrollTop:n,duration:300}),t.success&&t.success()}))},getVideoContext:function(t){if(!t)return this.videoContexts;for(var e=this.videoContexts.length;e--;)if(this.videoContexts[e].id==t)return this.videoContexts[e]},_handleHtml:function(t,e){if(!e){var i="<style scoped>@keyframes _show{0%{opacity:0}100%{opacity:1}}img{max-width:100%}";for(var n in c.userAgentStyles)i+="".concat(n,"{").concat(c.userAgentStyles[n],"}");for(n in this.tagStyle)i+="".concat(n,"{").concat(this.tagStyle[n],"}");i+="</style>",t=i+t}return t.includes("rpx")&&(t=t.replace(/[0-9.]+\s*rpx/g,(function(t){return parseFloat(t)*s/750+"px"}))),t}}};e.default=l},"7b8a":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"@-webkit-keyframes _show-data-v-01dfbd2e{0%{opacity:0}100%{opacity:1}}@keyframes _show-data-v-01dfbd2e{0%{opacity:0}100%{opacity:1}}\n\n\n\n",""]),t.exports=e},9545:function(t,e,i){"use strict";var n=i("27d9"),r=i.n(n);r.a},a572:function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uIcon:i("dfc1").default,uToast:i("b5fa").default},r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-text",[i("u-icon",{attrs:{label:"收藏",size:"40",name:t.iconName},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.collectConsult.apply(void 0,arguments)}}}),i("u-toast",{ref:"uToast"})],1)},o=[]},b5fa:function(t,e,i){"use strict";i.r(e);var n=i("f6b9"),r=i("bfd7");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("1f91");var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"070c62ba",null,!1,n["a"],a);e["default"]=c.exports},b85c:function(t,e,i){"use strict";i("a4d3"),i("e01a"),i("d28b"),i("d3b7"),i("3ca3"),i("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var n=r(i("06c5"));function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var i;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=(0,n.default)(t))||e&&t&&"number"===typeof t.length){i&&(t=i);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,c=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return s=t.done,t},e:function(t){c=!0,a=t},f:function(){try{s||null==i["return"]||i["return"]()}finally{if(c)throw a}}}}},b96a:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:["collectType","curentId"],name:"collect",data:function(){return{iconName:"star"}},computed:{collectData:function(){var t={type:this.collectType,articleId:this.curentId};return t}},methods:{collectConsult:function(){var t=this;this.$u.api.collect(this.collectData).then((function(e){if(e.success){var i="star-fill";t.iconName=i,t.$refs.uToast.show({title:"收藏成功",type:"success"})}else t.$refs.uToast.show({title:"已收藏",type:"default"})}))}}};e.default=n},bfd7:function(t,e,i){"use strict";i.r(e);var n=i("3469"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},ce46:function(t,e,i){"use strict";i.r(e);var n=i("b96a"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},d1d1:function(t,e,i){i("ac1f"),i("1276");var n={errorImg:null,filter:null,highlight:null,onText:null,entities:{quot:'"',apos:"'",semi:";",nbsp:" ",ensp:" ",emsp:" ",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…"},blankChar:r(" , ,\t,\r,\n,\f"),boolAttrs:r("allowfullscreen,autoplay,autostart,controls,ignore,loop,muted"),blockTags:r("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),ignoreTags:r("area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr"),richOnlyTags:r("a,colgroup,fieldset,legend"),selfClosingTags:r("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),trustTags:r("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),userAgentStyles:{address:"font-style:italic",big:"display:inline;font-size:1.2em",blockquote:"background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",mark:"background-color:yellow",pre:"font-family:monospace;white-space:pre;overflow:scroll",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",u:"text-decoration:underline"}};function r(t){for(var e=Object.create(null),i=t.split(","),n=i.length;n--;)e[i[n]]=!0;return e}t.exports=n},f4be:function(t,e,i){"use strict";i.r(e);var n=i("71dc"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},f6b9:function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uIcon:i("dfc1").default},r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-toast",class:[t.isShow?"u-show":"","u-type-"+t.tmpConfig.type,"u-position-"+t.tmpConfig.position],style:{zIndex:t.uZIndex}},[i("v-uni-view",{staticClass:"u-icon-wrap"},[t.tmpConfig.icon?i("u-icon",{staticClass:"u-icon",attrs:{name:t.iconName,size:30,color:t.tmpConfig.type}}):t._e()],1),i("v-uni-text",{staticClass:"u-text"},[t._v(t._s(t.tmpConfig.title))])],1)},o=[]},fc63:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.nodes.length?t._e():t._t("default"),i("v-uni-view",{style:t.showAm+(t.selectable?";user-select:text;-webkit-user-select:text":""),attrs:{id:"_top"}},[i("div",{attrs:{id:"rtf"+t.uid}})])],2)},o=[]}}]);