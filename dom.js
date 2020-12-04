"use strict";

/**
 * @Description: 简单dom选择器，querySelector的简单封装
 * @param {type} 
 * @return: {type}
 * @Author: yijian.song
 * @Version: 3.0.0
 * @LastEditors: yijian.song
 * @LastEditTime: 
 * @Date: 2019-09-17 16:02:54
 */
// function $(str) { return document.querySelector(str) }
const $ = document.querySelector.bind(document)



/////////////////////////////////
// 样式控制

/**
 * @Description: 获取dom对象的样式
 * @param {*object} domObj 要查的dom对象
 * @param {string | } attr string要获取的样式属性，空
 * @return: {string | json}  attr_返回string，空_返回样式对象
 */
export function getStyle(domObj, attr) {
  if (domObj.currentStyle) {
    return attr ? domObj.currentStyle[attr] : domObj.currentStyle
  } else {
    return attr ? getComputedStyle(domObj, false)[attr] : getComputedStyle(domObj, false)
  }
}


export function hidden(obj,status=true) {
  if(status){
    obj.style.display='none'
  }else{
    obj.style.display=''
  }
}



/////////////////////////////////
// 属性控制

export function attr(dom,nam,set){
  if(arguments<2) return ;
  return !set ? dom.getAttribute(nam) : dom.setAttribute(nam,set)
}

export function rmattr(dom,rnam){
  if(arguments<2) return ;
  return dom.removeAttribute(rnam)
}

export function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function addClass(obj, cls) {
  if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

export function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}

export function toggleClass(obj, cls) {
  if (hasClass(obj, cls)) {
    removeClass(obj, cls);
  } else {
    addClass(obj, cls);
  }
}



/////////////////////////////////
// 获取媒体属性


/**
 * @Description: 获取视频的原本尺寸
 * @param {str}  src
 * @param {fn}  fn(err,{h,w,orient ="portrait 竖向|landscape 横 |square 方"})
 * @Author: yijian.song
 * @Version: 3.0.0
 * @LastEditors: yijian.song
 * @LastEditTime: 
 * @Date: 2019-09-16 18:20:50
 */
export function getVideoSize(src, fn) {
  if (typeof fn !== "function" || typeof src !== 'string') {
    return
  }
  var v = document.createElement("video");
  v.setAttribute("playsinline", "true");
  v.setAttribute('type', 'video/mp4');
  v.setAttribute('webkit-playsinline', "true");
  v.setAttribute('x-webkit-airplay', "true");
  v.setAttribute('x5-video-player-type', "true");
  v.setAttribute('preload', "auto");
  v.setAttribute('muted', true);
  v.addEventListener('canplay', function () {
    v.pause();
    v = null;
    var _t = this
    fn && fn(null, {
      h: _t.videoHeight,
      w: _t.videoWidth,
      orient: (function () {
        if (_t.videoHeight == _t.videoWidth) {
          return "square"
        }
        if (_t.videoHeight > _t.videoWidth) {
          return "vertical"
        }
        if (_t.videoHeight < _t.videoWidth) {
          return "transverse"
        }
      })()
    })
  });
  v.addEventListener('error', function (error) {
    fn && fn(error)
  }, false);
  v.setAttribute("src", src);
  var playPromise = v.play();
  if (playPromise !== undefined) {
    playPromise.then(function () {
    }).catch(function (error) {
      fn && fn(error)
    });
  }
}




/**
 * @Description: 获取img的原本尺寸
 * @param {str}  src
 * @param {fn}  fn(err,{h,w,orient ="portrait 竖向|landscape 横 |square 方"})
 * @Author: yijian.song
 * @Version: 3.0.0
 * @LastEditors: yijian.song
 * @LastEditTime: 
 * @Date: 2019-09-17 13:31:45
 */
export function getImgSize(src, fn) {
  if (typeof fn !== "function" || typeof src !== 'string') {
    return
  }
  var i = new Image();
  i.addEventListener('load', function (evt) {
    var _t = this;
    i = null;
    fn && fn(null, {
      h: _t.height,
      w: _t.width,
      orient: (function () {
        if (_t.height == _t.width) {
          return "square"
        }
        if (_t.height > _t.width) {
          return "vertical"
        }
        if (_t.height < _t.width) {
          return "transverse"
        }
      })()
    })
  }, false);
  i.addEventListener('error', function (error) {
    fn && fn(error)
  }, false);
  i.setAttribute("src", src);
}
