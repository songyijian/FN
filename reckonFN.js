
// reckonFN 一些算法函数整理



/**
 * v 2019.07.30 修复末尾错误
 *
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
      m = [];
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





/**
 * @Description: 数组中重复值的始末位 （上面的那个好理解,性能要高一点）
 * @param {array} arr 对象
 * @param {array} val 筛选样本（要查重的元素）
 * @param {array} keep  重复的步数
 * @return: {array}  [ { val: '筛选样本', length:'重复了几次', start:'重复值在数组的始位置索引', end: '重复值在数组的结束位置索引' }]
 * @Author: yijian.song
 *  RepeatBit_One([...'011000111101011110'],1)  >[ { val: 1, length: 4, start: 6, end: 9 },{ val: 1, length: 4, start: 13, end: 16 } ]
 */
function RepeatBit_One(arr,val,keep=3) {
  if(!Array.isArray(arr)){ return Error('参数必须是合法数组')}
  if (typeof val === 'undefined') { return Error('重复参考样本不能为空')}
  var m =[], gs=[], t=0, y=1;
  arr.forEach((item, index) => {
    item == val ? m.push(index) : null
  })
  for (; t < m.length-1; ){
    if (m[t + y] - m[t] === y) {
      y++
    }else{
      if(y>keep-1){
        gs.push({
          val:val,
          length: m[t + y - 1] - m[t]+1,
          start: m[t],
          end: m[t + y - 1]
        })
      }
      t=t+y;
      y=1;
    }
  }
  return gs
}
