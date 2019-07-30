
// 算法

/**
 * v 2019.07.30
 *   修复末尾错误
 * 找出单层数组，重复值的始末位置
 * @param {Array} arr 
 * @param {string | number} val 筛选样本
 * @param {number} keep 连续重复位数 注意：别他妈给我个1，一位算重复吗？
 * @return {Array}  
 *  RepeatBit([1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1], 1, 2) 
 *      >[{"val":1,"length":3,"start":0,"end":2},{"val":1,"length":4,"start":5,"end":8},{"val":1,"length":2,"start":14,"end":15}]
 */

function RepeatBit(arr, val, keep = 3) {
  if (!Array.isArray(arr)) { return Error('参数必须是合法数组') }
  if (typeof val === 'undefined') { return Error('重复参考样本不能为空') }
  var start = arr.length + 1, 
      m = [],
      setState = function (index) {
        if (index - start >= keep) {
          m.push({
            val: val,
            length: index - start,
            start: start,
            end: (index - 1)
          })
        }
        start = arr.length + 1
      };
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      if (start > i)start = i;
      // 最后一位差异处理
      if ((i == arr.length - 1) && (i - start >= keep - 1)) {
        m.push({
          val: val,
          length: (i+1 - start),
          start: start,
          end: i
        })
        start = arr.length + 1
      }
    } else {
      if (i - start >= keep) {
        m.push({
          val: val,
          length: i - start,
          start: start,
          end: (i - 1)
        })
      }
      start = arr.length + 1
    }
    
  }
  return m
}


// test
// var tarr = [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1]
// console.log(
//   RepeatBit([1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1], 1, 2)
// )
