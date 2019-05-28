!function(){
	new Switch({
		startPage:0,		//第一针显示哪一页 0开始
		effect:'tab',
		obody: "tab-h-body",	//移动id
		odot: "btn-tab-b",		//索引 id
		odotCalssName: 'tab_btn_o',		//索引 要切换的样式（.calss，#id）
		odotEv:"click",		//索引触发事件
		moveCall:function(_this){console.log(_this.index)}
	});

	//分页 =====================
	var pageB=document.querySelector('.tcdPageCode');
	new Page(pageB,{
	    pageCount:10,
	    current:1,
	    backFn:function(p){
	        console.log(p);
	    }
	});

	//日历列表 ===================
	if( document.getElementById('j_Date1')){
        var myDate1 = new Calender({id:'j_Date1'});
        var myDate2 = new Calender({id:'j_Date2'});
    }

}();



