import {isArray, isObj, isString} from './isfn'

var $ = function (arg){

  // 核心（选择器 & 方法）---------
  var el = 'string' == typeof arg
    ? document.querySelector(arg)
    : arg;

  el.all = function(s){
    return $(el.querySelectorAll(s));
  };

  el.get = function(s){
    return $(typeof s ==='string' ? el.querySelectorAll(s) : s);
  };

  el.each = function(fn){
    for (var i = 0, len = el.length; i < len; ++i) {
      fn($(el[i]), i);
    }
  };


  // 事件 ---------
  el.on = function(event, fn){
    if ('content loaded' == event) {
      event = window.attachEvent ? "load" : "DOMContentLoaded";
    }
    el.addEventListener
      ? el.addEventListener(event, fn, false)
      : el.detachEvent("on" + event, fn);
    return el
  };

  el.off = function(event, fn){
    if ('content loaded' == event) {
      event = window.attachEvent ? "load" : "DOMContentLoaded";
    }
    el.removeEventListener
      ? el.removeEventListener(event, fn, false)
      : el.attachEvent("on" + event, fn);
    return el
  };

  el.delegate = function(selector, event, fn){
    if(typeof selector !=='string' || typeof event !=='string' || typeof fn !=='function' ) {
      console.error('[qs delegate] arg type error')
      return el
    };
    
    return el.on(event, function(e){
      var evt = window.event ? window.event : e;
      var target = evt.target || evt.srcElement;

      function selectorTag(tag,call){
        var x = false
        if(selector.indexOf('#') === 0){
          x = tag.id === selector.replace(/\#/, "");
        }else if(selector.indexOf('.') === 0){
          var matchClassName = selector.replace(/\./, "")
          x = !!tag.className.match(new RegExp('(\\s|^)' + matchClassName + '(\\s|$)'))
        }else if(selector.indexOf('[') === 0){
          var kv = selector.replace(/\[|\]/g, "").split('=')
          x = !!tag.getAttribute(kv[0],kv[1].replace(/\"|\']/g, ""))
        }else{
          x = tag.nodeName.toUpperCase() === selector.toUpperCase()
        }
        call && call(x)
      }

      function ba(t){
        if(t){
          fn.call(target);
          return 
        }
        if(target === el) return
        target = target.parentNode
        selectorTag(target,ba)
      }
      selectorTag(target,ba)

      return target
    })
  };


  // 属性 ---------

  el.hasClass = function (name) {
    return this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
  }
  el.getClassList = function(){
    return el.classList;
  };
  el.addClass = function(name){
    el.classList.add(name)
    return el
  };
  el.rmClass = function(name){
    el.classList.remove(name)
    return el
  };
  el.toggleClass = function (name) {
    return el.classList.toggle(name);
  }
  el.attr = function(key,val){
    if(!key) return el.attributes
    if(val){
      el.setAttribute(key,val)
      return el;
    }else{
      return el.getAttribute(key)
    }
  }
  el.rmAttr = function(key){
    key && el.removeAttribute(key)
    return el;
  }

  // css --------
  el.css = function(key,val){
    if(!key) return 
    if(typeof key==='string' && val===undefined){
      return el.style[key]
    }
    if(typeof key==='string' && typeof val==='string'){
      el.style[key] = val
      return el
    }
    if(isObj(key)){
      for (var i in key) {
        if (key.hasOwnProperty(i)) {
          var element = key[i];
          el.style[i] = element
        }
      }
    }
    return el;
  }

  el.getStyle = function (gl,type){
    var typep ={
      number:parseInt,
      init:(n)=> Math.floor(parseInt(n))
    }
    var obj = {};
    var v = getComputedStyle(el,null);
    var l = isArray(gl) ? gl : isString(gl) ? [gl] :[];
    l.forEach(i => { 
      if( type === 'number' ||  type === 'init'){
        obj[i] = typep[type](v[i]) 
      }else{
        obj[i] = v[i]
      }
    });
    return obj
  };

  el.getRect = function (name) {
    var a = el.getBoundingClientRect()
    return name ? a[name] : a
  } 


  // 效果 ---------
  // visibility ,display,hidden
  el.hide = function(type){
    if(!type || type === 'display'){
      el.style.display='none'
    }else{
      type === 'visibility' && (el.style.visibility='hidden')
      type === 'visibility' && (el.hidden = ture)
    }
    return el;
  };

  // 'visible', 'collapse' ,
  // block, inline-block ....
  el.show = function(type){
    let a = Array.from(el.attributes).map(a=>a.name)
    if(a.indexOf('hidden')>=0){
      el.hidden = false;
    }
    let vb = ['visible', 'collapse']
    if(el.style.display==='none')el.style.display='';
    if(el.getStyle('display') === 'none'){ 
      el.style.display = !type && type === 'none' ? 'block' :  vb.indexOf(type)>=0 ? 'block' : type; 
    }
    if(el.style.visibility==='hidden')el.style.visibility='';
    if(el.getStyle('visibility') === 'hidden'){
      el.style.visibility = type && vb.indexOf(type)>=0 ? type :'visible'
    };
    return el;
  };


  // 文档处理 ---------
  el.append = function(dom){
    if(dom.nodeType){
      el.appendChild(dom)
    }else{
      el.innerHTML += dom
    }
    return el;
  };

  el.html = function(doms){
    if(typeof doms ==='string' ){
      el.innerHTML = doms
      return el;
    }
    return el.innerHTML
  };

  el.text = function(doms){
    if(typeof doms !=='undefined' ){
      el.innerText = doms
      return el;
    }
    return el.innerText
  };

  return el;
}

$.creacte = function(tag,text){
  var a = document.createElement(tag || 'div')
  text && (a.innerHTML = text)
  return a
}

console.log('%c [ qs $ ] ','background:#046fe0; padding: 1px; border-radius: 3px 3px 3px 3px;  color: #fff')

export default $