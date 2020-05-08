/*
 * @Description:
 * @Author: yijian.song
 * @Version: 3.1.2
 * @Date: 2020-04-10 14:10:14
 * @LastEditors: yijian.song
 * @LastEditTime: 2020-05-08 14:00:40
 */

export default function JSONStatic () {

 /**
   * @Description: [类型函数]
   * @param {*} 
   * @return: {string} [Object|String|....]
   * @Author: yijian.song
   * @Version: 3.1.2
   * @Date: 2020-05-08 13:59:15
   */
  function isType(o) {
    return Object.prototype.toString.call(o).slice(8, -1)
  }


  
  /**
   * [对象内容比较函数]
   * @param  {[Object]} dataA [样本对象]
   * @param  {[Object]} dataB [比较对象]
   * @return {[Boolean]}       [内容是否相等]
   * compare({a:1,b:{c:2,q:1}},{b:{q:1,c:2},a:1}) > true
   * @Author: yijian.song
   * @Version: 3.1.2
   * @Date: 2020-05-08 10:39:12
   */
  function compare(dataA, dataB){
    if(isType(dataA) !== isType(dataB)) return false;
    if(Object.keys(dataA).length !== Object.keys(dataB).length) return false;
    for(let k in dataA){
      if(isType(dataA[k]) === 'Object'){
        if(!(isType(dataB[k]) === 'Object') || false === compare(dataA[k], dataB[k])) return false;
      }else{
        if(dataB[k] !== dataA[k]) return false;
      }
    }
    return true;
  }



  /**
   * @Description: copy json
   * @param {json} 
   * @return: {json} 
   * @Author: yijian.song
   * @Version: 3.1.2
   * @Date: 2020-05-08 10:40:00
   */
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
   * @Author: yijian.song
   * @Version: 3.1.2
   * @Date: 2020-05-08 10:39:12
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
   * @Description: delKeys删除指定键 支持深度遍历删除
   * @param {Array|obj} json
   * @param {Array|str} rmkey 'xx'| ['xx',0,1]
   * @param {Boolean} depth=true true深度遍历（默认） | false只处理第一层
   * @return: {Array|obj} 新对象
   * @case: 
   *    JSON.delKeys({ a: 1, b:{a:1,b:3}}, 'a'),        // {"b": {"a": 1,"b": 3}} 
   *    JSON.delKeys({ a: 1, b:{a:1,b:3}}, 'a', true),  // {"b": {"b": 3}} 
   *    JSON.delKeys([1,2,[1,2]], 0, true)              // [2,[2]]
   * @Author: yijian.song
   * @Version: 3.1.2
   * @Date: 2020-05-08 10:23:40
   */
  JSON.delKeys = function delKeys(json, rmkey, depth) {
    if ((isType(json) !== 'Object' && isType(json) !== 'Array') || typeof rmkey === 'undefined') return json;
    let _rm = Array.isArray(rmkey) ? rmkey : [rmkey]
    let n = JSON.copy(json)
    _rm.forEach(rk => { delete n[rk] })
    if (depth) {
      for (var key in n) {
        if (n.hasOwnProperty(key)) {
          let item = n[key]
          if (isType(item) === 'Object' || isType(item) === 'Array') {
            n[key] = delKeys(item, rmkey, depth)
          }
        }
      }
    }
    return isType(json) === 'Array' ? Object.values(n) : n
  }



  /**
   * [delByVals 删除对象内val符合样本的属性]
   * @param  {[json]} json  [操作对象]
   * @param  {[array|str]} rmval [样本] > 'xx'| ['xx',0,1]
   * @param  {[Boolean]} depth [false只处理第一层（默认） | true深度遍历 ]
   * @return {[json]}       [处理后的json]
   * @Author: yijian.song
   * @Version: 2.8.4
   * @Date: 2020-01-19 13:57:53
   * @LastEditors: yijian.song
   * @LastEditTime:
   *    JSON.delByVals({ a:1, b:{c:1,w:[]}, x:[1,2], d:[], e:undefined, f:''},[1,[],undefined]),      //{ b:{c:1,w:[]}, x:[1,2], f:''}
   *    JSON.delByVals({ a:1, b:{c:1,w:[]}, x:[1,2], d:[], e:undefined, f:''},[1,[],undefined],true), //{ b:{}, x:[2], f:''}
   */
  JSON.delByVals = function delByVals(json, rmval, depth) {
    if ((isType(json) !== 'Object' && isType(json) !== 'Array') || typeof rmval === 'undefined') return json;
    let _rm = Array.isArray(rmval) ? rmval : [rmval]
    let n = {};
    let keys = Object.keys(json);
    let vals = Object.values(json);
    let _rmObj = [], _rmBasic = [];
    _rm.forEach(item => {
      isType(item) === 'Object' || isType(item) === 'Array' ? _rmObj.push(item) : _rmBasic.push(item)
    })
    vals.forEach((item, index) => {
      if (isType(item) === 'Object' || isType(item) === 'Array') {
        !_rmObj.some(element => compare(item, element)) && (n[keys[index]] = depth ? delByVals(item, _rm, depth) : item)
      } else {
        _rmBasic.indexOf(item) < 0 && (n[keys[index]] = item)
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
   * @Author: yijian.song
   * @Version: 3.1.2
   * @Date: 2020-05-08 10:39:12
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
