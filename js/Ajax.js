define(function(){
	//ajax
	function Ajax(o){
		this.data={
			"url":"",
			"type":"POST",
			"dataType":"json",
			"data":"",
			"async":true,
			"success":function(e){},
			"err":function(e){}
		};
		for(var i in o){ this.data[i]=o[i]};
		this.fn={
			"jsonof" : function(obj){
				var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
				return isjson;
			},
			"setUrlK" : function setUrlK(ojson) {
	            var s='',name, key;
	            for(var p in ojson) {
	                if(ojson.hasOwnProperty(p)) { name = p };
	                key = ojson[p];
	                var value=null;
	                s += "&" + name + "=" +encodeURI( encodeURI(( typeof key =="object" ? JSON.stringify( key ) : key )));
	            };
	            return s.substring(1,s.length);
	        }
		};
		this.go_data="";
		if(this.data.data){
			if( this.fn.jsonof(this.data.data) ){
				this.go_data = this.fn.setUrlK(this.data.data);
			}else if( typeof this.data.data ==='string'){
				this.go_data =this.data.data;
			}else{ return null;};
		};
		this.init();
	};
	Ajax.prototype.init=function(){
		this.oAjax=window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');//1
		if(this.data.type.toUpperCase() === "GET"){
			if(this.go_data){
				this.oAjax.open(this.data.type , this.data.url+"?"+ this.go_data, this.data.async);//2
			}else{
				this.oAjax.open(this.data.type , this.data.url , this.data.async);//2
			};
		}
		if(this.data.type.toUpperCase() === "POST") {
			this.oAjax.open(this.data.type , this.data.url , this.data.async);//2
			this.oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
		};
		this.oAjax.send( this.data.type.toUpperCase() === "GET" ? null : this.go_data );//3
		
		var _this=this;
		this.oAjax.onreadystatechange=function(){_this.changefn()};//4
	};
	Ajax.prototype.changefn=function(){
		if(this.oAjax.readyState===4) {
			this.statusCode=this.oAjax.status
			if(this.statusCode===200){
				this.data.success( JSON.parse(this.oAjax.responseText) );
			}else{
				this.data.err(this.statusCode);
			};
		};
	};

    return {Ajax:Ajax}
})