//选择器
function _(o){
	return document.querySelectorAll(o);
};

function getStyle(obj,attr){ 
	if(obj.currentStyle){
	  return obj.currentStyle[attr];
	}else{
	  return getComputedStyle(obj,false)[attr];
	}
};


//oop 弹窗========================
function BombBox(t,key){
    this.t=t;
    this.key=key
    var _this=this;
    this.dataJ={
        'center':true,            //中间位置 (mr)
        'bg':true,                //是否有背景(mr)
        'closeHtml':false,        //关闭按钮的内容
        'goFn':false,             //初始化fun
        'closeFn': false,         //关闭回调
        'append': document.body   //放在什么位置
    };
    for(var i in key){this.dataJ[i]=key[i]};
    this.init();
    this.bombClose.onclick=function(){  _this.close() };
};
BombBox.prototype.init=function(){
    if(this.dataJ.goFn){this.dataJ.goFn();};
    this.bombBox=document.createElement('div');
    this.bombBox.className="bomb-box";
    this.bombClose=document.createElement('big');
    this.bombClose.className="bomb-close";
    if(this.dataJ.closeHtml){ this.bombClose.innerHTML= this.dataJ.closeHtml; }
    this.bombText=document.createElement('div');
    this.bombText.className="bomb-html";
    if(this.dataJ.bg){ 
        this.bombBg=document.createElement('div');
        this.bombBg.className="bomb-bg";
        this.dataJ.append.appendChild(this.bombBg);
    }
    this.bombBox.appendChild(this.bombClose);
    this.bombBox.appendChild(this.bombText);
    this.dataJ.append.appendChild(this.bombBox);
    this.bombText.innerHTML= this.t;

    if(this.dataJ.center){ this.center(); }
};
//居中对齐
BombBox.prototype.center=function(){
    if(this.bombBox.currentStyle){
        this.bombBox.width=this.bombBox.currentStyle['width'];
        this.bombBox.height=this.bombBox.currentStyle['height'];
    }else{
        this.bombBox.width=getComputedStyle(this.bombBox,false)['width'];
        this.bombBox.height=getComputedStyle(this.bombBox,false)['height'];
    };
    this.bombBox.style.cssText='top:50%; left:50%;margin-left:'+parseInt(this.bombBox.width)/-2+'px; margin-top:'+parseInt(this.bombBox.height)/-2+'px';
};
//关闭
BombBox.prototype.close=function(){
    this.dataJ.append.removeChild(this.bombBox);
    if(this.dataJ.bg == true){this.dataJ.append.removeChild(this.bombBg);}
    if(this.dataJ.closeFn){this.dataJ.closeFn();};
};




//轮播封装===================================================
function Switch(key){
    this.data={
        effect:'slide',         //切换效果 tab，slide
        toop:false,             //循环模式
        nWidth: 0,              //第一个的宽度*
        obody: false,           //内容区（移动id） *
        odot: false,            //索引 id
        odotAuto:false,         //制动生成索引点
        startPage:0,            //第一针显示哪一页 0开始, slide 模式下可以传px
        odotCalssName: false,   //索引切换calss calssName不加点（ *有索引必填）
        odotEv:"click",         //索引触发事件
        prevBtn: false,         //向前
        nextBtn: false,         //后
        btnEv:"click",          //前后按钮的触发事件
        step: 1,                //移动步长(几个,默认1)，可以写具体距离但是要写px（50px）
        moveSteep: 300,         //动画速度
        timeMove: 0,            //毫秒(不开启定时轮播)必填*
        stopMouse:false,        //鼠标放在上面暂停（'#p1, .p2, p）可以传多个
        initCall:function(_this){}, //初始化回调函数
        moveCall:function(_this){}, //每次变化回调函数
        nextCall:function(_this){}, //走到到最后一格回调
        prevCall:function(_this){}  //回到起点回调
    };
    for( var i in key){ this.data[i]=key[i]};
    function hasClass( elements,cName ){  return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); };  
    this.fn={
        'on': function (o,ev,fn){
            if(o.addEventListener){//ff，webkit
                o.addEventListener(ev,fn,false);
            }else if(o.attachEvent){//ie 8-
                o.attachEvent('on'+ev,function(){//默认指向window
                    fn.call(o,arguments); //改变this指向
                });
            }
        },
        'log':function(o){ if(window.console){ console.log(o)} },
        "addClass":function( elements,cName ){  
            if( !hasClass( elements,cName ) ){  
                elements.className += " " + cName;  
            };  
        },
        "removeClass":function( elements,cName ){  
            if( hasClass( elements,cName ) ){  
                elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
            };  
        }
    };
    this.obody=document.getElementById(this.data.obody);
    if(!this.obody){ this.fn.log( "obody错误:null"); return false; };
    this.data.odot ? this.dot=document.getElementById(this.data.odot):this.dot=null;
    this.goLength=this.obody.children.length;
    this.index=this.data.startPage;
    this.time; 
    this.initState();
    this.initEvent();
};
Switch.prototype.initState=function(){
    //模式初始化状态
    var _this=this;
    if(this.data.effect==="tab"){
        if(this.goLength===this.dot.children.length){ 
            for( var i=0; i<this.obody.children.length; i++){
                this.obody.children[i].index=this.dot.children[i].index=i;
                this.obody.children[i].style.display="none";
                this.data.odotCalssName ? this.fn.removeClass(this.dot.children[i],this.data.odotCalssName) : null;
                this.fn.on(this.dot.children[i],this.data.odotEv,function(){
                    _this.index=this.index;
                    _this.move(_this.index);
                })
            };
            this.obody.children[this.data.startPage].style.display="block";
            this.data.odotCalssName ? this.fn.addClass(this.dot.children[this.data.startPage],this.data.odotCalssName):null;
        }else{ this.fn.log("tab：#"+this.data.odot+"内容和索引的数量不匹配  || odotCalssName==false") };
        
    }else if(this.data.effect==="slide"){
        this.obody.width=(this.obody.children.length * this.data.nWidth);
        this.obody.style.width= (this.obody.children.length * this.data.nWidth)+ 'px';

        //像素步长处理
        if( typeof(this.data.step)==='string' ){    
            this.goLength=Math.ceil( this.obody.width / parseInt(this.data.step) );
        }
        //定格帧
        if( typeof(this.data.startPage)==='string' && typeof(this.data.step)==='string'){
            this.obody.style.left= "-"+this.data.startPage;
        }else{
            this.obody.style.left= -(this.data.nWidth * this.data.startPage)+ 'px';
        };

        if(this.dot){
            if(this.data.odotAuto){//自动生成索引点
                this.dot.innerHTML='';
                for( var i=0; i<this.goLength;i++){
                    if(typeof(this.data.odotAuto)==='string'){
                        var dotNewDom=document.createElement(this.data.odotAuto);
                    }else if(typeof(this.data.odotAuto)==="boolean"){
                        var dotNewDom=document.createElement('li');
                    }
                    this.dot.appendChild(dotNewDom);
                }
            };
            if(this.goLength===this.dot.children.length){
                for( var i=0; i<this.dot.children.length; i++){
                    this.dot.children[i].index=i;
                    this.data.odotCalssName ? this.fn.removeClass(this.dot.children[i],this.data.odotCalssName):null;
                    this.fn.on(this.dot.children[i],this.data.odotEv,function(){
                        _this.index=this.index;
                        _this.move(_this.index);
                    });
                };
                this.data.odotCalssName ? this.fn.addClass(this.dot.children[this.data.startPage],this.data.odotCalssName):null;
            }else{ this.fn.log("#"+this.data.odot+"内容和索引的数量不匹配  || odotCalssName==false") };
        }
    };
    this.data.initCall(this)
};
//基础事件初始化
Switch.prototype.initEvent=function(){
    //前后按钮
    var _this=this;
    if(this.data.prevBtn){
        this.prevBtn=document.getElementById(this.data.prevBtn);
        if(this.prevBtn){
            this.fn.on(this.prevBtn,this.data.btnEv,function(){_this.add()});
        }else{
            this.fn.log("prevBtn错误:null")
        };
    }
    if(this.data.nextBtn){
        this.nextBtn=document.getElementById(this.data.nextBtn);
        if(this.nextBtn){
            this.fn.on(this.nextBtn,this.data.btnEv,function(){_this.subtract()});
        }else{
            this.fn.log("nextBtn错误:null")
        };
    }
    //第一针参数
    if(this.data.startPage>=this.obody.children.length ||this.data.startPage<0){
        this.fn.log("startPage错误:> || < 总页数")
    }
    //定时器
    if(this.data.timeMove){
        var _this=this;
        this.timeGo(_this.data.timeMove);//启动定时器
        //暂停时器
        if(this.prevBtn){
            this.fn.on(this.prevBtn,'mouseover',function(){_this.timeStop()});
            this.fn.on(this.prevBtn,'mouseout',function(){_this.timeGo(_this.data.timeMove)});
        }
        if(this.nextBtn){
            this.fn.on(this.nextBtn,'mouseover',function(){_this.timeStop()});
            this.fn.on(this.nextBtn,'mouseout',function(){_this.timeGo(_this.data.timeMove)});
        }
        if(this.obody){
            this.fn.on(this.obody,'mouseover',function(){_this.timeStop()});
            this.fn.on(this.obody,'mouseout',function(){_this.timeGo(_this.data.timeMove)});
        }
        if(this.dot){
            this.fn.on(this.dot,'mouseover',function(){_this.timeStop()});
            this.fn.on(this.dot,'mouseout',function(){_this.timeGo(_this.data.timeMove)});
        }
    };
};
//动作
Switch.prototype.move=function(n){
    if(this.data.effect==="tab"){
        for( var i=0; i<this.obody.children.length; i++){
            this.obody.children[i].index=this.dot.children[i].index=i;
            this.obody.children[i].style.display="none";
            this.fn.removeClass(this.dot.children[i],this.data.odotCalssName)
        };
        this.obody.children[n].style.display="block";
        this.fn.addClass(this.dot.children[n],this.data.odotCalssName)
    }else if(this.data.effect==="slide"){
        if(this.dot){
            for( var i=0; i<this.dot.children.length; i++){
                this.dot.children[i].index=i;
                this.fn.removeClass(this.dot.children[i],this.data.odotCalssName)
            };
            this.fn.addClass(this.dot.children[n],this.data.odotCalssName)
        }
        if( typeof(this.data.step)==='string' ){    //像素步长处理
            startMove(this.obody,{'left':-(parseInt(this.data.step) * n)},this.data.moveSteep,'easeIn');
        }else if( typeof(this.data.step)==='number' ){
            startMove(this.obody,{'left':-(this.data.step*this.data.nWidth* n)},this.data.moveSteep,'easeIn');
        };
    };
    this.index=n;
    this.data.moveCall(this);
    if(n<=0){
        this.data.prevCall(this)
    }else if(n>=this.goLength-1){
        this.data.nextCall(this)
    }
    return this;
};

//时器
Switch.prototype.timeGo=function(timeMS){
    var _this=this;
    clearInterval(this.time)
    this.time=setInterval(function(){
        _this.add();
    },timeMS || this.data.timeMove || 2500);
    return this;
};
//时器
Switch.prototype.timeStop=function(){
    clearInterval(this.time);
    return this;
};
//加
Switch.prototype.add=function(){
    if(this.data.toop){
        if(this.index < this.goLength-1){
            this.index++;
        }else{
            this.index=0;
        };
    }else{
        if(this.index < this.goLength-1){
            this.index++;
        };
    };
    this.move(this.index);
};
//减
Switch.prototype.subtract=function(){
    if(this.data.toop){
        if(this.index==0){
            this.index=this.goLength-1;         
        }else{
            this.index--;
        };  
    }else{
        if(this.index>0){
            this.index--;
        };
    };
    this.move(this.index);
};








// 日历控件所用便捷函数 =================================
_CalF = {
    // 选择元素
    $:function(arg,context){
        var tagAll,n,eles=[],i,sub = arg.substring(1);
        context = context||document;
        if(typeof arg =='string'){
            switch(arg.charAt(0)){
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if(context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = _CalF.$('*',context);
                    n = tagAll.length;
                    for(i = 0;i<n;i++){
                        if(tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },
    // 绑定事件
    bind:function(node,type,handler){
        node.addEventListener?node.addEventListener(type, handler, false):node.attachEvent('on'+ type, handler);
    },
    // 获取元素位置
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },
    // 添加样式名
    addClass:function(c,node){
        node.className = node.className + ' ' + c;
    },
    // 移除样式名
    removeClass:function(c,node){
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)","g");
        node.className = node.className.replace(reg, '');
    },
    // 阻止冒泡
    stopPropagation:function(event){
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    }
};

// 日历控件 
function Calender() {
    this.initialize.apply(this, arguments);
}
Calender.prototype = {
    constructor:Calender,
    // 模板数组
    _template :[
        '<dl>',
        '<dt class="title-date">',
        '<span class="prevyear">prevyear</span><span class="prevmonth">prevmonth</span>',
        '<span class="nextyear">nextyear</span><span class="nextmonth">nextmonth</span>',
        '</dt>',
        '<dt><strong>日</strong></dt>',
        '<dt>一</dt>',
        '<dt>二</dt>',
        '<dt>三</dt>',
        '<dt>四</dt>',
        '<dt>五</dt>',
        '<dt><strong>六</strong></dt>',
        '<dd></dd>',
        '</dl>'],
    // 初始化对象
    initialize :function (options) {
        this.id = options.id; // input的ID
        this.input = _CalF.$('#'+ this.id); // 获取INPUT元素
        this.isSelect = options.isSelect;   // 是否支持下拉SELECT选择年月，默认不显示
        this.inputEvent(); // input的事件绑定，获取焦点事件
    },
    // 创建日期最外层盒子，并设置盒子的绝对定位
    createContainer:function(){
        // 如果存在，则移除整个日期层Container
        var odiv = _CalF.$('#'+ this.id + '-date');
        if(!!odiv) odiv.parentNode.removeChild(odiv);
        var container = this.container = document.createElement('div');
        container.id = this.id + '-date';
        container.style.position = "absolute";
        container.zIndex = 999;
        // 获取input表单位置inputPos
        var input = _CalF.$('#' + this.id),
                inputPos = _CalF.getPos(input);
        // 根据input的位置设置container高度
        container.style.left = inputPos.left + 'px';
        container.style.top = inputPos.bottom - 1 + 'px';
        // 设置日期层上的单击事件，仅供阻止冒泡，用途在日期层外单击关闭日期层
        _CalF.bind(container, 'click', _CalF.stopPropagation);
        document.body.appendChild(container);
    },
    // 渲染日期
    drawDate:function (odate) { // 参数 odate 为日期对象格式
        var dateWarp, titleDate, dd, year, month, date, days, weekStart,i,l,ddHtml=[],textNode;
        var nowDate = new Date(),nowyear = nowDate.getFullYear(),nowmonth = nowDate.getMonth(),
                nowdate = nowDate.getDate();
        this.dateWarp = dateWarp = document.createElement('div');
        dateWarp.className = 'calendar';
        dateWarp.innerHTML = this._template.join('');
        this.year = year = odate.getFullYear();
        this.month = month = odate.getMonth()+1;
        this.date = date = odate.getDate();
        this.titleDate = titleDate = _CalF.$('.title-date', dateWarp)[0];
        // 是否显示SELECT
        if(this.isSelect){
            var selectHtmls =[];
            selectHtmls.push('<select>');
            for(i = 2020;i>1970;i--){
                if(i != this.year){
                    selectHtmls.push('<option value ="'+ i +'">'+ i +'</option>');
                }else{
                    selectHtmls.push('<option value ="'+ i +'" selected>'+ i +'</option>');
                }
            }
            selectHtmls.push('</select>');
            selectHtmls.push('年');
            selectHtmls.push('<select>');
            for(i = 1;i<13;i++){
                if(i != this.month){
                    selectHtmls.push('<option value ="'+ i +'">'+ i +'</option>');
                }else{
                    selectHtmls.push('<option value ="'+ i +'" selected>'+ i +'</option>');
                }
            }
            selectHtmls.push('</select>');
            selectHtmls.push('月');
            titleDate.innerHTML = selectHtmls.join('');
            // 绑定change事件
            this.selectChange();
        }else{
            textNode = document.createTextNode(year + '年' + month + '月');
            titleDate.appendChild(textNode);
            this.btnEvent();
        }
        // 获取模板中唯一的DD元素
        this.dd = dd = _CalF.$('dd',dateWarp)[0];
        // 获取本月天数
        days = new Date(year, month, 0).getDate();
        // 获取本月第一天是星期几
        weekStart = new Date(year, month-1,1).getDay();
        // 开头显示空白段
        for (i = 0; i < weekStart; i++) {
            ddHtml.push('<a>&nbsp;</a>');
        }
        // 循环显示日期
        for (i = 1; i <= days; i++) {
            if (year < nowyear) {
                ddHtml.push('<a class="live disabled">' + i + '</a>');
            } else if (year == nowyear) {
                if (month < nowmonth + 1) {
                    ddHtml.push('<a class="live disabled">' + i + '</a>');
                } else if (month == nowmonth + 1) {
                    if (i < nowdate) ddHtml.push('<a class="live disabled">' + i + '</a>');
                    if (i == nowdate) ddHtml.push('<a class="live tody">' + i + '</a>');
                    if (i > nowdate) ddHtml.push('<a class="live">' + i + '</a>');
                } else if (month > nowmonth + 1) {
                    ddHtml.push('<a class="live">' + i + '</a>');
                }
            } else if (year > nowyear) {
                ddHtml.push('<a class="live">' + i + '</a>');
            }
        }
        dd.innerHTML = ddHtml.join('');

        // 如果存在，则先移除
        this.removeDate();
        // 添加
        this.container.appendChild(dateWarp);

        //IE6 select遮罩
        var ie6  = !!window.ActiveXObject && !window.XMLHttpRequest;
        if(ie6) dateWarp.appendChild(this.createIframe());

        // A link事件绑定
        this.linkOn();
        // 区域外事件绑定
        this.outClick();
    },

    createIframe:function(){
        var myIframe =  document.createElement('iframe');
        myIframe.src = 'about:blank';
        myIframe.style.position = 'absolute';
        myIframe.style.zIndex = '-1';
        myIframe.style.left = '-1px';
        myIframe.style.top = 0;
        myIframe.style.border = 0;
        myIframe.style.filter = 'alpha(opacity= 0 )';
        myIframe.style.width = this.container.offsetWidth + 'px';
        myIframe.style.height = this.container.offsetHeight + 'px';
        return myIframe;

    },

    // SELECT CHANGE 事件
    selectChange:function(){
        var selects,yearSelect,monthSelect,that = this;
        selects = _CalF.$('select',this.titleDate);
        yearSelect = selects[0];
        monthSelect = selects[1];
        _CalF.bind(yearSelect, 'change',function(){
            var year = yearSelect.value;
            var month = monthSelect.value;
            that.drawDate(new Date(year, month-1, that.date));
        });
        _CalF.bind(monthSelect, 'change',function(){
            var year = yearSelect.value;
            var month = monthSelect.value;
            that.drawDate(new Date(year, month-1, that.date));
        })
    },
    // 移除日期DIV.calendar
    removeDate:function(){
        var odiv = _CalF.$('.calendar',this.container)[0];
        if(!!odiv) this.container.removeChild(odiv);
    },
    // 上一月，下一月按钮事件
    btnEvent:function(){
        var prevyear = _CalF.$('.prevyear',this.dateWarp)[0],
                prevmonth = _CalF.$('.prevmonth',this.dateWarp)[0],
                nextyear = _CalF.$('.nextyear',this.dateWarp)[0],
                nextmonth = _CalF.$('.nextmonth',this.dateWarp)[0],
                that = this;
        prevyear.onclick = function(){
            var idate = new Date(that.year-1, that.month-1, that.date);
            that.drawDate(idate);
        };
        prevmonth.onclick = function(){
            var idate = new Date(that.year, that.month-2,that.date);
            that.drawDate(idate);
        };
        nextyear.onclick = function(){
            var idate = new Date(that.year + 1,that.month - 1, that.date);
            that.drawDate(idate);
        };
        nextmonth.onclick = function(){
            var idate = new Date(that.year , that.month, that.date);
            that.drawDate(idate);
        }
    },
    // A 的事件
    linkOn:function(){
        var links = _CalF.$('.live',this.dd),i,l=links.length,that=this;
        for(i = 0;i<l;i++){
            links[i].index = i;
            links[i].onmouseover = function(){
                _CalF.addClass("on",links[this.index]);
            };
            links[i].onmouseout = function(){
                _CalF.removeClass("on",links[this.index]);
            };
            links[i].onclick = function(){
                that.date = this.innerHTML;
                that.input.value = that.year + '-' + that.month + '-' + that.date;
                that.removeDate();
            }
        }
    },
    // 表单的事件
    inputEvent:function(){
        var that = this;
        _CalF.bind(this.input, 'focus',function(){
            that.createContainer();
            that.drawDate(new Date());
        });
    },
    // 鼠标在对象区域外点击，移除日期层
    outClick:function(){
        var that = this;
        _CalF.bind(document, 'click',function(event){
            event = event || window.event;
            var target = event.target || event.srcElement;
            if(target == that.input)return;
            that.removeDate();
        })
    }
};