/*
 * @Description:
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-04-12 18:55:44
 */

/**
 * @Description: 模拟定时器
 * @param {*} fn
 * @param {*} t
 * @param {array} args
 * @return {*}
 * @Author: yijian
 */
export function tIntervarl(fn, t = 0, ...args) {
  clearTimeout(ot)
  let time = t
  let ot = setTimeout(function func() {
    fn.apply(this, args)
    ot = setTimeout(func, time)
  }, t)

  let setTime = n => (time = n)
  let clear = () => {
    clearTimeout(ot)
    time = ot = null
  }
  return { clear, setTime }
}
