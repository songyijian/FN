/*
 * @Description: UTC 国际标准时间
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-24 16:55:20
 */

// 获取utc和当前时间差，返回毫秒数
const getUTCdifferenza = () => new Date().getTimezoneOffset() * 60 * 1000

// 获取utc时间对象
const getUTCdate = () => new Date(Date.now() + getUTCdifferenza())

// 获取当地时间
const UTCtoLocaleDate = () =>
  new Date(getUTCdate().getTime() - getUTCdifferenza())

// utc时间戳,通过时区换算成当地时间
const getLocalTime = (utc, zone) => new Date(new Date(utc) + 3600000 * zone)

// 获取当前环境时区
const getLocalTimeZone = () => new Date().getTimezoneOffset() / 60

console.log(UTCtoLocaleDate())
console.log(getLocalTime(Date.now(), getLocalTimeZone()))
