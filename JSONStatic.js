
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

  /**
  * [类型函数]
  * @type {*}
  * @return {[str]}       [Object|...]
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
   */
  function compare(dataA, dataB){
    if(isType(dataA) !== isType(dataB)) return false;
    if(Object.keys(dataA).length !== Object.keys(dataB).length) return false;
    for(let k in dataA){
      if(isType(dataA[k]) === 'Object'){
        if(
          !(isType(dataB[k]) === 'Object')
          || false === compare(dataA[k], dataB[k])
        ) return false;
      }else{
        if(dataB[k] !== dataA[k]) return false;
      }
    }
    return true;
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
   * [delByVals 删除对象内val复核样本的属性]
   * @param  {[json]} json  [操作对象]
   * @param  {[array|str]} rmval [样本] > 'xx'| ['xx',0,1]
   * @param  {[Boolean]} depth [false只处理第一层（默认） | true深度遍历 ]
   * @return {[json]}       [处理后的json]
   *
   *   JSON.delByVals({ a:1, b:{c:2,q:1}, x:[0,1], d:[], e:undefined, f:''},[1,undefined,[],{c:2,q:1}],false) >{x: [0, 1], f: ""}
   *   JSON.delByVals({ a:1, b:{c:2,q:1}, x:[0,1], d:[], e:undefined, f:''},[1,undefined,[],{c:2,q:1}],true) >{x:[0], f: ""}
   */
  JSON.delByVals = function delByVals(json, rmval, depth) {
    if ((isType(json) !== 'Object' && isType(json) !== 'Array') || typeof rmval === 'undefined') return json;
    let _rm = Array.isArray(rmval) ? rmval : [rmval]
    let _depth = typeof depth === 'undefined' ? false : Boolean(depth)
    let n = {};
    let keys = Object.keys(json);
    let vals = Object.values(json);
    let _rmObj =[],_rmBasic =[];
    _rm.forEach(item=>{
      isType(item) === 'Object' || isType(item) === 'Array' ? _rmObj.push(item) : _rmBasic.push(item)
    })
    vals.forEach((item, index) => {
      if (isType(item) === 'Object' || isType(item) === 'Array') {
        !_rmObj.some(element => compare(item,element)) && (n[keys[index]] = _depth ? delByVals(item, _rm, depth) : item)
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
