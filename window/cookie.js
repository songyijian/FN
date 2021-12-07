/*
 * @Description:Cookie操作
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-09-10 11:51:26
 */

/**
 * desc  设置Cookie
 * param {String} name
 * param {String} value
 * param {Number} days
 */
function setCookie(name, value, days = 1) {
  var date = new Date()
  date.setDate(date.getDate() + days)
  document.cookie = name + '=' + escape(value) + ';expires=' + date
}

/**
 * desc 读取cookie
 * param  {String} name
 * return {String}
 */
function getCookie(name) {
  var arr = document.cookie.replace(/\s/g, '').split(';')
  for (var i = 0; i < arr.length; i++) {
    var tempArr = arr[i].split('=')
    if (tempArr[0] == name) return unescape(tempArr[1])
  }
  return null
}

/**
 * desc     删除cookie
 * param  {String} name
 */
function removeCookie(name) {
  // 设置已过期，系统会立刻删除cookie
  setCookie(name, '1', -1)
}
