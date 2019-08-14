/*
 * @Author: 关于dom、css、浏览器
 * @Date: 2018-10-12 20:20:41
 * @LastEditTime: 2019-08-14 19:49:34
 * @LastEditors: Please set LastEditors
 */


 
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
