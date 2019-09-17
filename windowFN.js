/*
 * @Author: 关于浏览器端 window、dom、css等常用方法整理
 * @Date: 2018-10-12 20:20:41
 * @LastEditTime: 2019-09-17 16:54:25
 * @LastEditors: Please set LastEditors
 */


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
function $(str) { return document.querySelector(str) }


/**
 * @Description: 异常捕获，注意：ios webview错误堆栈拿不到，可以使用下面的方法
 * @Author: yijian.song
 * @LastEditTime: 
 * @Date: 2019-09-17 11:19:10
 */
try {
  window.addEventListener('error', function (evt) {
    if ('message' in evt) {
      var smessage = {
        "type": 'windCodeErr',
        "errMsg": evt.message + '\n lineno:' + evt.lineno + '\n colno:' + evt.colno,
        "source": evt.source,
        "timeStamp": evt.timeStamp,
      }
      console.error(smessage)
    } else {
      var smessage = {
        "type": 'windLoadErr',
        "errMsg": evt.target.outerHTML,
        "timeStamp": evt.timeStamp,
      }
      console.error(smessage)
    }
    return false
  }, true)
} catch (error) {
  console.error(error)
}


/**
 * @Description: 针对ios webview 的异常捕获方法
 * @Author: yijian.song
 * @LastEditTime: 
 * @Date: 2019-09-17 11:23:53
 * 
 * 媒体文件错误捕获
 * <img onerror="mediaErr()"> 
 * 
 * function(){
 *  try{
 *  }catch(error){
 *    codeCatchErr(error)
 *  }
 */

window.mediaErr = function (event) {
  var ev = event || window.event;
  var _this = ev.target || ev.srcElement;
  var smessage = {
    "type": "windLoadErr",
    "nodeName": _this.nodeName,
    "src": _this.src || ""
  }
  console.error(smessage)
}

window.codeCatchErr = function (err) {
  var smessage = {
    "type": "windLoadErr",
    "errMsg": err.toString()
  }
  console.error(smessage)
}





/**
 * @Description: 检查浏览器是否支持CSS
 * @param attribute
 * @param value
 * @return {Boolean}
 *  https://developer.mozilla.org/zh-CN/docs/Web/API/CSS/supports
 *  https://zhuanlan.zhihu.com/p/29488264
 */
export const supportsCSS = (attribute, value) => {
  if (window.CSS && window.CSS.supportsCSS) {
    if (typeof value === 'undefined') return window.CSS.supportsCSS(attribute)
    return window.CSS.supportsCSS(attribute, value)
  }
  const elem = document.createElement('div')
  if (attribute in elem.style) {
    elem.style[attribute] = value
    return elem.style[attribute] === value
  }
  return false
}





/**
 * @Description: 获取dom对象的样式
 * @param {*object} domObj 要查的dom对象
 * @param {string | } attr string要获取的样式属性，空
 * @return: {string | json}  attr_返回string，空_返回样式对象
 */
function getStyle(domObj, attr) {
  if (domObj.currentStyle) {
    return attr ? domObj.currentStyle[attr] : domObj.currentStyle
  } else {
    return attr ? getComputedStyle(domObj, false)[attr] : getComputedStyle(domObj, false)
  }
}






/**
 * desc  设置Cookie
 * param {String} name
 * param {String} value
 * param {Number} days
 */
function setCookie(name, value, days) {
  var date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = name + '=' + value + ';expires=' + date;
}


/**
 * desc 读取cookie
 * param  {String} name
 * return {String}
 */
function getCookie(name) {
  var arr = document.cookie.replace(/\s/g, "").split(';');
  for (var i = 0; i < arr.length; i++) {
    var tempArr = arr[i].split('=');
    if (tempArr[0] == name) {
      return decodeURIComponent(tempArr[1]);
    }
  }
  return ''
}



/**
 * desc     删除cookie
 * param  {String} name
 */
function removeCookie(name) {
  // 设置已过期，系统会立刻删除cookie
  setCookie(name, '1', -1)
}






/*
获取设备的系统信息
  getOsData() > {os:'ios',n:'8.0.3'}
  getOsData() > {os:'Android',n:'8.0.3'}
*/
function getOsData() {
  var _nav = navigator.userAgent;
  var ver;
  if (_nav.indexOf('Android') > 0) {
    var bdArry = _nav.split(';');
    ver = {
      os: 'Android',
      n: ''
    };
    for (var i = bdArry.length - 1; i >= 0; i--) {
      if (!(bdArry[i].indexOf('Android') < 0)) {
        ver.n = bdArry[i].substr(9);
        break;
      }
    }
  } else {
    var bdArry = _nav.split('OS');
    ver = {
      os: 'ios',
      n: ''
    };
    for (var i = bdArry.length - 1; i >= 0; i--) {
      if (!(bdArry[i].indexOf('like Mac') < 0)) {
        ver.n = bdArry[i].split(' ')[1].split('_').join('.');
        break;
      }
    }
  }
  return ver
}








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
function getVideoSize(src, fn) {
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
  v.setAttribute('muted', "false");
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
function getImgSize(src, fn) {
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






/**
 * @Description: 移动端根据适口处理rem逻辑，依赖getOsData函数
 * @param {type} 
 * @return: {type}
 * @Author: yijian.song
 * @Version: 3.0.0
 * @LastEditors: yijian.song
 * @LastEditTime: 
 * @Date: 2019-09-17 15:59:10
 */
function setRem() {
  var browserData = navigator.userAgent;
  var dpr = window.devicePixelRatio || 1;
  var docEl = document.documentElement;
  var cW = docEl.clientWidth;
  var cH = docEl.clientHeight;
  var osObj = getOsData();
  docEl.setAttribute("data-dpr", dpr);
  docEl.setAttribute("data-clientWidth", cW);
  docEl.setAttribute("data-clientHeight", cH);
  if (osObj) {
    docEl.setAttribute("data-os", osObj.os);
    docEl.setAttribute("data-osVersion", osObj.n);
    if (cW > 0) {
      docEl.style.fontSize = (osObj.os == 'ios' && osObj.n[0] >= 8) || (osObj.os == 'Android' && osObj.n.substr(0, 3) > 4.4) ? 100 * (100 / 750) + 'vw' : 100 * (cW / 750) + "px";
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
  }
  if ((cW >= 1024 || cH >= 1024) || browserData.match(/pad/i)) {
    docEl.setAttribute("data-media", 'pad');
  } else {
    docEl.setAttribute("data-media", 'phone');
  }
  if (cW >= cH) {
    docEl.classList.remove("vertical");
    docEl.classList.add("transverse");
  } else {
    docEl.classList.remove("transverse");
    docEl.classList.add("vertical");
  }
}
