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
  var time = t
  var config = {
    ot: undefined,
    clear() {
      clearTimeout(this.ot)
      this.ot = undefined
    },
    setTime(n) {
      time = n
    },
    steps: 0
  }

  config.ot = setTimeout(function func() {
    config.steps += 1
    fn.apply(this, args)
    config.ot = config.ot && setTimeout(func, time)
    console.log(config.ot)
  }, t)

  return config
}
