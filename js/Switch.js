//轮播
define(function(){
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

    //判断是对象还是 字符串
    if(this.data.obody){
        if(typeof this.data.obody ==="string"){
            this.obody = document.getElementById(this.data.obody);
        }else if(this.data.obody.nodeType){
            this.obody = this.data.obody;
        }else{this.fn.log( "obody错误:null"); return false;}
    }else{this.fn.log( "obody错误:null"); return false;}

    if(this.data.odot){
        if(typeof this.data.odot ==="string"){
            this.dot = document.getElementById(this.data.odot);
        }else if(this.data.odot.nodeType){
            this.dot = this.data.odot;
        }
    }else{
        this.dot=null;
    };


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

    return { Switch:Switch }

});