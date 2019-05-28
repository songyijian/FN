
//折叠菜单
!function(){
    var oBtnL=document.getElementById("btn-left");
    var main=document.getElementById("main");
    var menu=document.getElementById("menu-box");
    var onoff=true;
    oBtnL.onclick=function(){
        if(onoff){
            main.style.marginLeft=0;
            main.style.width='100%';
            menu.style.left='-228px';
            onoff=!onoff;
        }else{
            main.style.marginLeft="228px";
            main.style.width='calc(100% - 228px)';
            menu.style.left='0';
            onoff=!onoff;
        }
    };
}();



!function(){
	var oIframe=document.getElementById('if-main');
	var menuH=_(".menu-a>h2");
	var aMenuLi=_(".menu-box li");

	// 列表样式
	for(var i=0; i<menuH.length; i++){
		menuH[i].onclick=function(){
			// V显示处理
			var nextE=this.nextElementSibling;
			var nextSpan=this.getElementsByTagName('span')[0];

			if(getStyle(nextE,'display')=="none"){
				nextSpan.style.background='url(img/menu_s.png) no-repeat 0 0';
				nextE.style.display='block';
			}else{
				nextSpan.style.background='url(img/menu_w.png) no-repeat 0 0';
				nextE.style.display='none';
			}
		}
	};
	
    var ind=0;

	//列表功能
	for (var i = aMenuLi.length - 1; i >= 0; i--) {
        aMenuLi[i].index=i;
		aMenuLi[i].onclick=function(){
			for(var i=0; i<menuH.length; i++){menuH[i].style.background="#2b3541"; };
			aMenuLi[ind].className='';
            this.className='menu-a-o';
            ind=this.index;
			
			var sHash=this.getAttribute('hash');
			this.parentNode.previousElementSibling.style.backgroundColor="#1cb09a";
			oIframe.setAttribute('src',sHash+'.html');

		}
	};
}();
