/*
 * @Description: 分页组件
 * @Author:  yijian.song
 * @Date: 2019-05-29 09:43:13
 * @LastEditTime: 2019-05-29 17:15:58
 * @LastEditors: Please set LastEditors
 */

/**
 * @Description: Pages
 * @param {domObj} el 要插入的位置
 * @param {Obj} config 配置信息
 * @case: 
 * 	new Pages( document.getElementById('div2'), {
			pageCount:50,
			current:1,
			changeFn:function(p){
				console.log("回调："+p);
			}
		});
		pg.update({ pageCount: 30})
 */ 

function Pages(el,config){
	if (!(typeof el === 'object' && el.nodeName)){
		throw new Error('Pages el 非合法dom对象')
	}
	this.el = el;
	this.data={
		pageCount:config.pageCount || false,//总页数
		current:config.current || false,		//当前页
		prevHTML:config.prevHTML || '上一页',	//前后按钮的html
		nextHTML:config.nextHTML || '下一页',
		initFn:config.initFn || function(p){},	//初始化回调
		changeFn:config.changeFn || function(p){}//点击回调
	}
	this.init();
	var _this=this;
	this.el.addEventListener('click', function () { _this.Event() },false)
}
Pages.prototype.init=function(){
	var n = this.data;
	this.el.innerHTML = "";
	//上一页
	if(n.current > 1){
		this.prev=document.createElement('a');
		this.prev.href="javascript:;";
		this.prev.className='prevPage';
	}else{
		this.prev=document.createElement('span');
		this.prev.className='disabled';
	}
	this.prev.innerHTML=this.data.prevHTML;
	this.el.appendChild(this.prev);
	//中间页码
	if (n.current != 1 && n.current >= 4 && n.pageCount != 4) {
		this.el.innerHTML += '<a index="'+1+'" href="javascript:;" class="tcdNumber">'+1+'</a>';
	}
	if(n.current > 4 && n.current <= n.pageCount && n.pageCount > 5){
		this.el.innerHTML += '<span class="prevMore">...</span>';
	}

	var start = n.current - 2;
	var end = n.current + 2;
	if(n.current > n.pageCount - 4 && n.current >= n.pageCount){ start--; }
	if((start > 1 && n.current < 4)||n.current == 1){ end++; }

	for (;start <= end; start++) {
		if(start <= n.pageCount && start >= 1){
			if(start != n.current){
				this.el.innerHTML += '<a index="'+start+'" href="javascript:;" class="tcdNumber">'+ start +'</a>';
			}else{
				this.el.innerHTML += '<span class="current">'+ start +'</span>';
			}
		}
	}
	if(n.current + 2 < n.pageCount - 1 && n.current >= 1 && n.pageCount > 5){
		this.el.innerHTML += '<span class="nextMore">...</span>';
	}
	if(n.current != n.pageCount && n.current < n.pageCount -2  && n.pageCount != 4){
		this.el.innerHTML += '<a index="'+n.pageCount+'" href="javascript:;" class="tcdNumber">'+n.pageCount+'</a>';
	}
	//下一页
	if(n.current < this.data.pageCount){
		this.next=document.createElement('a');
		this.next.href="javascript:;";
		this.next.className='nextPage';
	}else{
		this.next=document.createElement('span');
		this.next.className='disabled';
	}
	this.next.innerHTML=this.data.nextHTML;
	this.el.appendChild(this.next);
	n.initFn(n.current);
}

Pages.prototype.Event=function(ev){
	var ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	if(target.className === 'tcdNumber'){
		this.data.current=Number(target.innerHTML);
		this.init();
		this.data.changeFn(this.data.current);
	}
	if (target.className === 'prevPage') {
		this.data.current = this.data.current - 1;
		this.init();
		this.data.changeFn(this.data.current);
	}
	// if (target.className === 'prevMore'){
	// 	this.data.current=this.data.current-1;
	// 	this.init();
	// 	this.data.changeFn(this.data.current);
	// }
	// if (target.className === 'nextMore') {
	// 	this.data.current = this.data.current - 1;
	// 	this.init();
	// 	this.data.changeFn(this.data.current);
	// }
	if(target.className === 'nextPage'){
		this.data.current=this.data.current+1;
		this.init();
		this.data.changeFn(this.data.current);
	}
}

Pages.prototype.update = function (updateConfig) {
	for (const key in updateConfig) {
		if (updateConfig.hasOwnProperty(key)) {
			this.data[key] = updateConfig[key];
		}
	}
	this.init();
	var _this = this;
	this.el.addEventListener('click', function () { _this.Event() }, false)
}

window.Pages = Pages
// export default Pages
