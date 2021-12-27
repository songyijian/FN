/*
 * 将秒数格式化时间
 * @val {Number} seconds: 整数类型的秒数
 * @return {String} time: 格式化之后的时间
 */
function timeMS(val) {
  if (Math.floor(parseInt(val) / 60) > 60) {
    return [
      parseInt(val / 60 / 60),
      parseInt((val / 60) % 60),
      parseInt(val % 60)
    ]
      .join(':')
      .replace(/\b(\d)\b/g, '0$1')
  }
  return [parseInt((val / 60) % 60), parseInt(val % 60)]
    .join(':')
    .replace(/\b(\d)\b/g, '0$1')
}

// 格式化
function tiemFormat(t = new Date(), fmt = 'yyyy-MM-dd h:m:s.s') {
  const tf = n => (n < 10 ? '0' + n : n)
  const ot = new Date(t)
  const obj = {
    yyyy: ot.getFullYear(),
    yy: ot.getFullYear().toString().slice(2),
    MM: tf(ot.getMonth() + 1),
    M: ot.getMonth() + 1,
    dd: tf(ot.getDate()),
    d: ot.getDate(),
    HH: tf(ot.getHours()),
    H: ot.getHours(),
    hh: tf(ot.getHours()),
    h: ot.getHours(),
    mm: tf(ot.getMinutes()),
    m: ot.getMinutes(),
    ss: tf(ot.getSeconds()),
    s: ot.getSeconds(),
    w: ['日', '一', '二', '三', '四', '五', '六'][ot.getDay()]
  }
  return fmt.replace(/[a-z]+/gi, $1 => obj[$1])
}

console.log(tiemFormat())

// // dd/mm/yyyy hh:mm:ss
// export const fFullTime = t => tiemFormat(t, 'dd/MM/yyyy hh:m:s')

// // 	29/01/2021
// export const fDate = t => tiemFormat(t, 'dd/MM/yyyy')
