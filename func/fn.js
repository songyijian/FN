
/**
 * yijian.song
 * desc 序列化成字符串
 * param {json}
 * return {string}
 *    jsonToStr({a:1,b:23})  //"a=1&b=23"
 */
//{}序列化成字符串
function jsonToStr(obj) {
  if (!obj) return '';
  var pairs = [];
  for (var key in obj) {
    var value = obj[key];
    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
      }
      continue;
    }
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return pairs.join('&');
}

/**
 * yijian.song
 * desc   序列化转json
 * param  {String} url  default: window.location.href
 * return {Object}
 */
function strToJson(url) {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * yijian.song
 * desc   单层json，key转层vlue使用
 * param  {json}
 * return {Array}
 *     jsonToArray({'6000':"商务",'6001':"天气"}) //[{key: "商务", val: "6000"}, {key: "天气", val: "6001"}]
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



/*
* yijian.song
* json第一层val对象转成string, Array直接转成string; (sigma通信奇怪约定处理，why！！！！)
  sigmobAgree([])  //'[]'
  sigmobAgree({a:1,b:{}})  //{a:1,b:'{}'}
*/
function sigmobAgree(json) {
  if (typeof json === 'object' && Array.isArray(json)) {
    return JSON.stringify(json)
  }

  if (typeof json === 'object') {
    let njson = {}
    for (let [key, val] of Object.entries(json)) {
      njson[key] = (typeof val === 'object') ? JSON.stringify(val) : val;
    }
    return njson
  } else {
    return new Error('参数不是合法的JSON')
  }
}


/*
干掉http：//xxxx/这个域名
*/
function trimRegion(urlstr) {
  return '/' + urlstr.replace(/https:\/\/|http:\/\//, "").split('/').slice(1).join('/')
}


// 生成随机的颜色
function getRandomColor() {
  return '#' + (Math.random() * 0xffffff << 0).toString(16);
}


module.exports = {
  trimKey,
  jsonToStr,
  jsonToArray,
  containCN,
  sigmobAgree,
  trimRegion, 
  getRandomColor
}
