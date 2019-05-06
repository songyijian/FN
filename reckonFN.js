
// 算法

/**
 * 找出单层数组，重复值的始末位置
 * @param {Array} arr 
 * @param {string | number} val 筛选样本
 * @param {number} keep 连续重复位数 注意：别他妈给我个1，一位算重复吗？
 * @return {Array}  >[ { val: 1, length: 4, start: 6, end: 9 },{ val: 1, length: 4, start: 13, end: 16 } ]
 *  RepeatBit([...'011000111101011110'],1)  
 */

function RepeatBit(arr, val, keep = 3) {
  if (!Array.isArray(arr)) { return Error('参数必须是合法数组') }
  if (typeof val === 'undefined') { return Error('重复参考样本不能为空') }
  var start = arr.length + 1, m = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      if (start > i) start = i
    } else {
      if ((i - 1) - start >= keep) {
        m.push({
          val: val,
          length: (i - 1) - start,
          start: start,
          end: (i - 1)
        })
      }
      start = arr.length + 1
    }
  }
  return m
}
