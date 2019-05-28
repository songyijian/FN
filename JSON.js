
/**
 * @Description: JSON 拓展一些静态方法
 *  JSON.copy()       //深拷贝
 *  JSON.delByValue   //删除key='指定值'键
 *  JSON.delKey       //删除指定key
 * ---
 * @Author: yijian.song
 * @Date: 2019-05-06 15:06:50
 */

export default function () {

  JSON.copy = function copy(obj) {
    let _obj = JSON.stringify(obj),
      objClone = JSON.parse(_obj);
    return objClone
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
    let _rkey = Array.isArray(rmkey) ? rmkey : [rmkey]
    let _obj = JSON.copy(json)
    _rkey.forEach(_key => {
      delete _obj[_key]
    })
    return _obj
  }

  /**
   * @Description: 删除key='指定值'的键，返回新对象
   * @param {Array|obj} json
   * @param {Array|str} rmval
   * @return: {Array|obj} 新对象
   * @case: delByValue({a:'',b:1},[''])  //{b:1} 踢出key=‘’
   */
  JSON.delByValue = function delByValue(json, rmval) {
    let r_val = Array.isArray(rmval) ? rmval : [rmval]
    let key = Object.keys(json)
    let val = Object.values(json)
    let njson = {}
    val.forEach((item, index) => {
      if (Object.prototype.toString.call(item).slice(8, -1) === 'Object') {
        njson[key[index]] = delByValue(item, r_val)
      } else {
        if (r_val.indexOf(item) < 0) {
          njson[key[index]] = item
        }
      }
    })
    return njson
  }


}