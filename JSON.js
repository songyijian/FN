
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

export default function () {

  JSON.copy = function copy(obj) {
    let _obj = JSON.stringify(obj);
    _obj = JSON.parse(_obj);
    return _obj
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