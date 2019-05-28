//底层方法
define(function(){
	function qs(o){
		return document.querySelector(o);
	};
	
	function on(o,ev,fn){
	    if(o.addEventListener){//ff，webkit
	        o.addEventListener(ev,fn,false);
	    }else if(o.attachEvent){//ie 8-
	        o.attachEvent('on'+ev,function(){//默认指向window
	            fn.call(o,arguments); //this指向对象
	        });
	    }
	};

	//ajax返回状态
	function callerr(n,box){
        if(n.result===2)
            box.innerHTML="失败";
        if(n.result===3)
            box.innerHTML="服务器内部错误";
        if(n.result===6)
            box.innerHTML="参数错误";
        if(n.result===7)
            box.innerHTML="请求重复错误";
        if(n.result===-101)
            box.innerHTML="未登录";
        if(n.result===-102)
            box.innerHTML="无权限";
	};


	return {qs:qs,on:on,callerr:callerr}
}) 