/*
 * @Description: 工作中常用方法整理
 * @Author: yijian.song
 * @Date: 2018-10-12 20:20:41
 * @LastEditTime: 2019-10-11 20:29:53
 * @LastEditors: Please set LastEditors
 *
 *  推荐 https://segmentfault.com/a/1190000011966867
 */


/**
 * @Description: getObjectURL 获取file文件的本地url地址
 * @param {obj} file 文件
 * @return {str} url 本地文件地址链接
 */
function getObjectURL(file) {
  var url = null;
  if (window.createObjcectURL != undefined) {
    url = window.createOjcectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}



/**
 * @Description: getImgSize 获取图片文件的信息（width,height）
 * @param {string} url 图片链接
 * @return {Promise}  //{"width":150,"height":100}
 *
 *  async function asyncCall() {
 *    var data = await getImgSize('http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg')
 *  }
 */
function getImgSize(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      })
      img = null;
    }
    img.onerror = () => {
      img = null
    }
    img.src = url
  })
}



/**
 * @Description: 按照字节长度取字符串
 * @param {str} str
 * @param {number} l 要取的字节长度，中文字符 = 2个字节
 * @return: {type} str
 */
function cutStr(str, L) {
  var result = '', strlen = str.length, chrlen = str.replace(/[^\x00-\xff]/g,'**').length, i = 0;
  if (chrlen <= L) return str
  for (i, j = 0; i < strlen; i++) {
    var chr = str.charAt(i)
    if(/[\x00-\xff]/.test(chr)){
      j++
    }else{
      j += 2
    }
    if (j <= L) {
      result += chr
    } else {
      return result
    }
  }
}




/**
 * @Description:  模版替换函数 {var}
 * @param {str} str 模版字符串
 * @param {data} data 数据对象
 * @return: {str} 替换后的domString
 *
 * 现在并不优秀，后续参考 https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
 */

function templateFill(str, data) {
  var newStr = str;
  if (typeof str !== "string") {
    throw 'templateFill 模版非字符串'
  }

  var strDataKeyList = str.match(/\{[a-zA-Z\.\_]+\}/gi); //匹配规则
  strDataKeyList.forEach(item => {
    var keylist = item.substr(1, item.length - 2).split('.')
    newStr = newStr.replace(new RegExp(item, "g"), getObj(data.dataList, keylist))
  })
  newStr = newStr.replace(/:src/g, 'src') // 处理静态文件初始化报错
  return newStr

  /* 对象 多层取值方法 */
  function getObj(data, keylist) {
    var oj = data;
    keylist.forEach(k => {
      oj = oj[k]
    })
    return typeof oj === "object" ? JSON.stringify(oj) : oj
  }
}



/**
 * @Description: 干掉URL的origin
 * @param {string} url
 * @return: {string}
 *  trimRegion("http://wiki.sigmob.cn/pages/viewpage.action")
 *          >"pages/viewpage.action"
 */
function trimRegion(url) {
  return '/' + url.replace(/https:\/\/|http:\/\//, "").split('/').slice(1).join('/')
}



/**
 * @Description: 单层json,转数组
 * @param {obj} obj 要转的json数据
 * @return: {Array} 返回[{key,val}]
 *  jsonToArray({'6000':"商务",'6001':"天气"}) //[{key: "商务", val: "6000"}, {key: "天气", val: "6001"}]
 */
function jsonToArray(obj) {
  let ndata = []
  for (let [val, key] of Object.entries(obj)) {
    ndata.push({
      val: key,
      key: val
    })
  }
  return ndata
}




/**
 * @Description: html尖括号转译
 * @param {str} str 要转译的html字符串
 * @return: {str} 转译后string
 */
function escapeHtml(str) {
  if (/</g.test(str)) {
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
  }
  return str;
}







/**
 * @Description:  URLParams url参数序列化和反序列化
 * @param {str | obj} o 携带参数的url字符串 | json会格式化成参数str
 * @return: {obj | str}  obj>格式化字符串 | str格式化成json
 *
 *  URLParams({a:'trtfds',b:123456}) > a=trtfds&b=123456
 *  URLParams("demos/FN验证.html?q=searchParams&topic=api") > {"q":"searchParams","topic":"api"}
 */
function URLParams(o){
  if(typeof o === 'string' && o.trim().length>2){
    let url = o
    if(o.lastIndexOf('?')>=0){
      url = o.split('?')[1]
    }
    return JSON.parse('{"' + decodeURIComponent(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }else if(Object.prototype.toString.call(o).slice(8, -1) === 'Object'){
    if (!o) return '';
    let pairs = [];
    for (var key in o) {
      var value = o[key];
      if (value instanceof Array) {
        for (var i = 0; i < value.length; ++i) {
          pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]))
        }
        continue
      }
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(o[key]));
    }
    return pairs.join('&');
  }

  throw 'URLParams 参数错误！'
}







// Random ---------
/**
 * @desc 生成指定范围随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
function randomNum(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}




/**
 * @Description: 版本比较方法函数
 * @param {string} a  '2.1.0'
 * @param {string} f  比较符合 "=" | ">" | "<"  
 * @param {string} b '10.1.0'
 * @return: {bool} true |false
 * @Author: yijian.song
 * @Version: 3.0.0
 * @LastEditors: yijian.song
 * @LastEditTime: 
 * @Date: 2019-10-11 20:27:19
 */
function cprversion(a, f, b) {
  if (arguments.length < 2) { return }
  function toNum(a) {
    var a = a.toString();
    var c = a.split('.');
    var num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
    for (var i = 0; i < c.length; i++) {
      var len = c[i].length;
      c[i] = r[len] + c[i];
    }
    var res = c.join('');
    return res;
  }

  if (typeof f !== "undefined" && (f === "<" || f === ">" || f === "=")) {
    if (f === "=") { return toNum(a) === toNum(b); }
    if (f === ">") { return toNum(a) > toNum(b); }
    if (f === "<") { return toNum(a) < toNum(b); }
  } else {
    return toNum(a) > toNum(b);
  }
}