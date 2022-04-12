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
  var time = t
  var ot = setTimeout(function func() {
    config.steps += 1
    fn.apply(this, args)
    ot = setTimeout(func, time)
  }, t)
  var setTime = n => (time = n)
  var clear = () => {
    clearTimeout(ot)
    time = ot = null
  }
  var config = { clear, setTime, steps: 0 }
  return config
}
