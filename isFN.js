/*
* @Description: 数据类型验证函数集合
* @Author: songyijian
* @Date: 2019-07-15 14:00:39
 * @LastEditTime: 2019-10-11 20:26:46
 * @LastEditors: Please set LastEditors
*/


// 数据类型的验证 ==========================

  //类型判断 返回数据类型
  function isType(o) {
    return Object.prototype.toString.call(o).slice(8, -1)
  }

  //是否字符串
  function isString(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "String"
  }

  //是否数字
  function isNumber(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Number"
  }

  //是否boolean
  function isBoolean(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Boolean"
  }

  //是否函数
  function isFunction(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Function"
  }

  //是否为null
  function isNull(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Null"
  }

  //是否undefined
  function isUndefined(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Undefined"
  }

  //是否对象
  function isObj(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Object"
  }

  //是否数组
  function isArray(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Array"
  }

  //是否时间
  function isDate(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Date"
  }

  //是否正则
  function isRegExp(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "RegExp"
  }

  //是否错误对象
  function isError(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Error"
  }

  //是否Symbol函数
  function isSymbol(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Symbol"
  }

  //是否Promise对象
  function isPromise(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Promise"
  }

  //是否Set对象
  function isSet(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Set"
  }

  //是否Map对象
  function isMap(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Map"
  }

  //是不是 false
  function isFalse(o) {
    if (!o || o === "null" || o === "undefined" || o === "false" || o === "NaN") return true
    return false
  }

  //是不是true
  function isTrue(o) {
    return !isFalse(o)
  }

  //是不是一个文件
  function isFile(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "File"
  }

  //是不是整数
  function isInteger(o) {
    try {
      return typeof o === "number" && o % 1 === 0
    } catch (e) {
      return false
    }
  }

  // ArrayBuffer
  function isArrayBuffer(val) {
    return Object.prototype.toString.call(val) === "[object ArrayBuffer]";
  }


  // 是否包含中文字符
  function isContainCN(str) {
    return !(escape(str).indexOf("%u") < 0)
  }




// 一些业务上常用的验证 =================
  // 是否为身份证号
  function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  }

  // 是否为手机号
  function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
  }

  // 是否为URL地址
  function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
  }
