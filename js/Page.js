// Page 分页
define(function(){
	
	function Page(obj,ojson){
			if(obj){
				this.obj=obj;	//js原生elment对象
			}else{
				console.log('obj 错误！');
				return false;
			};
			this.data={
				pageCount:ojson.pageCount || false, //总页数
			    current:ojson.current || false,		//当前页
			    prevHTML:ojson.prevHTML || '上一页',//前后按钮的html
			    nextHTML:ojson.nextHTML || '下一页',
			    initFn:ojson.initFn || function(p){},//初始化回调
			    backFn:ojson.backFn || function(p){}//点击回调
			};
			this.init(this.data);
			var _this=this;
			this.obj.onclick=function(){ _this.Event()};
		};
		Page.prototype.init=function(n){
			this.obj.innerHTML ="";
			//上一页
			if(n.current > 1){
				this.prev=document.createElement('a');
				this.prev.href="javascript:;";
				this.prev.className='prevPage';
			}else{
				this.prev=document.createElement('span');
				this.prev.className='disabled';
			};
			this.prev.innerHTML=this.data.prevHTML;
			this.obj.appendChild(this.prev);
			//中间页码
			if(n.current != 1 && n.current >= 4 && n.pageCount != 4){
				this.obj.innerHTML += '<a index="'+1+'" href="javascript:;" class="tcdNumber">'+1+'</a>';
			};
			if(n.current-2 > 2 && n.current <= n.pageCount && n.pageCount > 5){
				this.obj.innerHTML += '<span>...</span>';
			};
			var start = n.current -2,end = n.current+2;
			if((start > 1 && n.current < 4)||n.current == 1){ end++; };
			if(n.current > n.pageCount-4 && n.current >= n.pageCount){ start--; };
			for (;start <= end; start++) {
				if(start <= n.pageCount && start >= 1){
					if(start != n.current){
						this.obj.innerHTML += '<a index="'+start+'" href="javascript:;" class="tcdNumber">'+ start +'</a>';
					}else{
						this.obj.innerHTML += '<span class="current">'+ start +'</span>';
					};
				};
			};
			if(n.current + 2 < n.pageCount - 1 && n.current >= 1 && n.pageCount > 5){
				this.obj.innerHTML += '<span>...</span>';
			};
			if(n.current != n.pageCount && n.current < n.pageCount -2  && n.pageCount != 4){
				this.obj.innerHTML += '<a index="'+n.pageCount+'" href="javascript:;" class="tcdNumber">'+n.pageCount+'</a>';
			};
			//下一页
			if(n.current < this.data.pageCount){
				this.next=document.createElement('a');
				this.next.href="javascript:;";
				this.next.className='nextPage';
			}else{
				this.next=document.createElement('span');
				this.next.className='disabled';
			};
			this.next.innerHTML=this.data.nextHTML;
			this.obj.appendChild(this.next);
			n.initFn(n.current);
		};
		Page.prototype.Event=function(ev){
			var ev = ev || window.event;
			var target = ev.target || ev.srcElement;
			if(target.className === 'tcdNumber'){
				this.data.current=Number(target.innerHTML);
				this.init(this.data);
				this.data.backFn(this.data.current);
			}else if(target.className === 'prevPage'){
				this.data.current=this.data.current-1;
				this.init(this.data);
				this.data.backFn(this.data.current);
			}else if(target.className === 'nextPage'){
				this.data.current=this.data.current+1;
				this.init(this.data);
				this.data.backFn(this.data.current);
			};

		};


	return{
		Page:Page
	};
});




//应用 
/*new Page( document.getElementById('div2'),
	{
		pageCount:16,
	    current:1,
	    backFn:function(p){
	        console.log("回调："+p);
	    }
	}
);*/