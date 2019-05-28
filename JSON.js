
/**
 * yijian.song
 * desc 清楚json里key=指定值的键值对，并返回处理后的json
 * param {} json
 * param [] rm_val
 * return {}
 * trimKey({a:'',b:1},[''])  //{b:1} 踢出了key=‘’
 */
function trimKey(json, rm_val) {
  let r_val = Array.isArray(rm_val) ? rm_val : [rm_val]
  let key = Object.keys(json)
  let val = Object.values(json)
  let njson = {}
  val.forEach((item, index) => {
    if (Object.prototype.toString.call(item).slice(8, -1) === 'Object') {
      njson[key[index]] = trimKey(item, r_val)
    } else {
      if (r_val.indexOf(item) < 0) {
        njson[key[index]] = item
      }
    }
  })
  return njson
}




/*
拷贝
  fn、date 对象不能被成功拷贝
*/
export function jsonCopy(obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone
}

