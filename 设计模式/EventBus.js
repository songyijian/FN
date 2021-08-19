/*
 * @Description: 发布订阅类
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-06-11 17:53:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-19 16:24:59
 */
'use strict'

function injection(flag, type, fn, sign) {
  if (typeof fn === 'function' && typeof type === 'string') {
    ;(flag.dp[type] || (flag.dp[type] = [])).push({
      func: fn,
      type: sign
    })
  }
}

////////////////////////////////////////////////

function EventBus(name) {
  this.dp = {}
  this.name = name
}

EventBus.prototype.on = function (type, fn) {
  injection(this, type, fn, 'on')
  return this
}

EventBus.prototype.once = function (type, fn) {
  injection(this, type, fn, 'once')
  return this
}

EventBus.prototype.emit = function (type, ...args) {
  const emitList = this.dp[type]
  if (!emitList) return this
  this.dp[type] = [...emitList].filter(item => {
    item.func.call(this, ...args)
    return item.type === 'on'
  })
  return this
}

EventBus.prototype.off = function (type, fn) {
  let offs = this.dp[type]
  if (offs) {
    !fn ? delete this.dp[type] : (this.dp[type] = offs.filter(item => item.func !== fn))
  }
  return this
}

export default EventBus
