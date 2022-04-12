/*
 * @Description: js复杂类型操作方法
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-02-08 16:01:50
 */

// 遍历方法
// function each(obj, fn) {
//   pluck(obj, function (key, val) {
//     fn(key, val)
//     return false
//   })
// }

// function map(obj, fn) {
//   var res = isList(obj) ? [] : {}
//   pluck(obj, function (v, k) {
//     res[k] = fn(v, k)
//     return false
//   })
//   return res
// }

// function pluck(obj, fn) {

//   if (isList(obj)) {
//     for (var i = 0; i < obj.length; i++) {
//       if (fn(obj[i], i)) {
//         return obj[i]
//       }
//     }
//   } else {
//     for (var key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         if (fn(obj[key], key)) {
//           return obj[key]
//         }
//       }
//     }
//   }
// }

// var set = new Set([1, 2, 3, 4, 5])
var set = [1, 2, 3, 4, 5]
// var set = 123

// for (const key in set) {
//   if (Object.hasOwnProperty.call(set, key)) {
//     const element = set[key]

//     console.log(element)
//   }
// }

// for (let k of set.keys()) {
//   console.log(k)
// }

console.log(typeof set.forEach === 'function')
