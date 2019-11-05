
/**
 * @Description: JSON 拓展一些静态方法
 *  JSON.copy()       //深拷贝
 *  JSON.delByValue   //删除key='指定值'键
 *  JSON.delKey       //删除指定key
 *  JSON.cat          //合并对象
 * ---
 * @Author: yijian.song
 * @Date: 2019-05-06 15:06:50
 */

module.exports = function () {

  function isType(o) {
    return Object.prototype.toString.call(o).slice(8, -1)
  }


  JSON.copy = function copy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  /**
   * @Description: 删除指定键
   * @param {Array|obj} json
   * @param {Array|str} rmkey
   * @return: {Array|obj} 新对象
   * @case: JSON.delKey({ a: 2, b: 1 }, 'a') //{b: 1}
   *        JSON.delKey({a:2,b:1},['a','b']) //{}
   */
  JSON.delKey = function delKey(json, rmkey) {
    if (typeof json !== 'object' || !json) {
      return json
    }
    let _rmkey = arguments.length < 2 ? [] : Array.isArray(rmkey) ? rmkey : [rmkey]
    let _obj = JSON.copy(json)
    _rmkey.forEach(_key => {
      delete _obj[_key]
    })
    return _obj
  }



  /**
   * @Description: delKeys 深度遍历 删除指定键
   * @param {Array|obj} json
   * @param {Array|str} rmkey 'xx'| ['xx',0,1]
   * @param {Boolean} depth=true true深度遍历（默认） | false只处理第一层
   * @return: {Array|obj} 新对象
   * @case: JSON.delKey({ a: 2, b: 1 }, 'a') //{b: 1}
   *        JSON.delKey({a:2,b:1},['a','b']) //{}
   */
  JSON.delKeys = function delKeys(json, rmkey, depth) {
    if ((isType(json) !== 'Object' && isType(json) !== 'Array') || typeof rmkey === 'undefined' ) return json;
    let _rm = Array.isArray(rmkey) ? rmkey : [rmkey]
    let _depth = typeof depth === 'undefined' ? true : Boolean(depth)
    let n = JSON.copy(json)
    _rm.forEach(rk => { delete n[rk]})
    if(_depth){
      for (var key in n) {
        if (n.hasOwnProperty(key)) {
          let item = n[key]
          if((isType(item) === 'Object' || isType(item) === 'Array')){
            n[key] = delKeys(item,rmkey, depth)
          }
        }
      }
    }
    if(isType(json) === 'Array'){
      return Object.values(n)
    }else{
      return n
    }
  }



  /** 建议使用 delByVals更灵活
   * @Description: 删除key='指定值'的键，返回新对象
   * @param {Array|obj} json
   * @param {Array|str} rmval
   * @return: {Array|obj} 新对象
   * @case: delByValue({a:'',b:1},[''])  //{b:1}踢出key=‘’
   */
  JSON.delByVal = function delByValue(json, rmval) {
    if (typeof json !== 'object' || !json) {
      return json
    }
    let _rmval = arguments.length < 2 ? [] : Array.isArray(rmval) ? rmval : [rmval]
    let key = Object.keys(json)
    let val = Object.values(json)
    let njson = {}
    val.forEach((item, index) => {
      if (Object.prototype.toString.call(item).slice(8, -1) === 'Object') {
        njson[key[index]] = delByValue(item, _rmval)
      } else {
        if (_rmval.indexOf(item) < 0) {
          njson[key[index]] = item
        }
      }
    })
    return njson
  }


  /**
   * @Description: delByVals 深度遍历 删除key='指定值'的键，返回新对象
   * @param {Array|obj} json
   * @param {Array|str} rmval 'xx'| ['xx',0,1]
   * @param {Boolean} depth=true true深度遍历（默认） | false只处理第一层
   * @return: {Array|obj} 新对象
   * @case: delByVals({a:'',b:1},[''])  //{b:1}踢出key=‘’
   */
  JSON.delByVals = function delByVals(json, rmval, depth) {
    if ((isType(json) !== 'Object' && isType(json) !== 'Array') || typeof rmval === 'undefined') return json;
    let _rm = Array.isArray(rmval) ? rmval : [rmval]
    let _depth = typeof depth === 'undefined' ? true : Boolean(depth)
    let n = {};
    let keys = Object.keys(json)
    let vals = Object.values(json)
    vals.forEach((item, index) => {
      if ((isType(item) === 'Object' || isType(item) === 'Array') && _depth) {
        n[keys[index]] = delByVals(item, _rm, depth)
      } else {
        if (_rm.indexOf(item) < 0) {
          n[keys[index]] = item
        }
      }
    })

    if (isType(json) === 'Array') {
      return Object.values(n)
    } else {
      return n
    }
  }


  /**
   * @Description: 合并对象，返回一个前拷贝对象
   * @param {arr | json} [],{},...
   * @return: {json} 浅拷贝对象
   * @case:
   *  JSON.cat({A:1},{b:2},3,[1,2]) >{0: 1, 1: 2, A: 1, b: 2}
   */
  JSON.cat = function () {
    var argl = arguments.length
    var _obj = {}
    if (argl < 1) { return }
    for (let i = 0; i < argl; i++) {
      _obj = Object.assign(_obj, arguments[i])
    }
    return _obj
  }




}
