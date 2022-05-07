/*
 * @Description: 继承date的日期对象
 * @Author: yijian
 * @Version: 1.0.0
 * @Date: 2021-06-29 09:58:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-06 16:39:21
 */

class Time extends Date {
  // eslint-disable-next-line no-useless-constructor
  constructor(...args) {
    super(...args)
  }

  addDay(n) {
    return new Time(Date.now() + n * 24 * 60 * 60 * 1000)
  }

  isLeapYear() {
    const year = this.getFullYear()
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
  }

  format(fmt = 'yyyy-MM-dd h:m:s.s') {
    const ot = this
    const tf = n => (n < 10 ? '0' + n : n)
    const obj = {
      yyyy: ot.getFullYear(),
      yy: ot.getFullYear().toString().slice(2),
      MM: tf(ot.getMonth() + 1),
      M: ot.getMonth() + 1,
      dd: tf(ot.getDate()),
      d: ot.getDate(),
      HH: tf(ot.getHours()),
      H: ot.getHours(),
      hh: tf(ot.getHours() % 12),
      h: ot.getHours() % 12,
      mm: tf(ot.getMinutes()),
      m: ot.getMinutes(),
      ss: tf(ot.getSeconds()),
      s: ot.getSeconds(),
      w: ['日', '一', '二', '三', '四', '五', '六'][ot.getDay()]
    }
    return fmt.replace(/[a-z]+/gi, function ($1) {
      return obj[$1]
    })
  }

  getCalendar() {
    const _dn = this.getMonthDayLength()
    const _year = this.getFullYear()
    const _month = this.getMonth()
    const getCalendarArr = []
    for (let i = 1; i <= _dn; i++) {
      const dayDate = new Time(_year, _month, i)
      getCalendarArr.push({
        day: dayDate,
        timestamp: dayDate.getTime(),
        week: dayDate.getDay()
      })
    }
    return getCalendarArr
  }

  getMonthDayLength(arg) {
    const flag = arg || new Time()
    const m2day = flag.isLeapYear() ? 29 : 28
    return [31, m2day, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][flag.getMonth()]
  }

  static now() {
    new Time().getTime()
  }

  static leapYear(arg) {
    const year = (new Date(arg) || new Date()).getFullYear()
    return new Date(year, 1, 28, 24, 0, 0).getDate() === 29
  }
}

// Time.leapYear()  闰年
// Time.leapYear()

console.log(new Time().getCalendar())

// export default Time
// new Date(2024,1,28,24,0,0).getDate() === 29 为闰月
// new Date(xxxx,xxx,xxx,24,0,0) 自动晚上加一天
