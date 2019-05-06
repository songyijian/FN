
/**
 * @Description: 继承与Date对象
 * @param {type} 完全和Date一样
 * @return: {type} 完全和Date一样
 * @case: 
 *  new Dates(1257126300475) >Mon Nov 02 2009 09:45:00 GMT+0800 (中国标准时间)
 *  new Date().getTime() >1557126537720
 * ---
 * @Author: yijian.song
 * @Date: 2019-05-06 15:06:50
 */




class Dates extends Date {
  
  constructor(...arg) {
    super(...arg)
  }

  /**
   * @Description: 格式化
   * @param {*str} fmt 要格式成什么样
   * @return: {string} 格式化的样子
   * @case: 
   *  new Dates().format('yyyy-MM-dd') >"2019-05-06"
   *  new Dates().format('yyyy-MM-dd h:m:s.S') >"2019-05-06 15:12:58.763"
   */
  format(fmt = 'yyyy-MM-dd h:m:s.S') {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
  }

  /**
   * @Description: 判断闰年
   * @return: {bool} 
   * @case: new Dates().isLeapYear()  >false
   */
  isLeapYear() {
    var _year = this.getFullYear()
    return (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0))
  }

  /**
   * @Description: 当前月多数天
   * @return: {Number} 当前月多数天
   * @case: 
   *  new Dates().matchDay() >31
   */
  matchDay() {
    let m2day = this.isLeapYear() ? 29 : 28;
    let dayA = new Array(31, m2day, 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);
    return dayA[this.getMonth()]
  }

  /**
   * @Description: 当前对象的日历信息
   * @param {str} formatStr 格式化日期
   * @return: {arr} [{}]
   * @case: 
   *  new Dates('2019-03-03').getCalendar() >[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   */
  getCalendar(formatStr = 'yyyy-MM-dd') {
    let _dn = this.matchDay()         //当前月多数天
    let _year = this.getFullYear()    //年份
    let _month = this.getMonth()      //当前月
    let getCalendarArr = [];
    for (let i = 1; i <= _dn; i++) {
      let dayDate = new Dates(_year, _month, i);
      getCalendarArr.push({
        day: dayDate.format(formatStr),
        timestamp: dayDate.getTime(),
        week: dayDate.getDay()
      })
    }
    return getCalendarArr
  }


  /**
   * @Description: 获取七天前的datas对象
   * @param {number} n 正式向前跳跃，负数向后跳跃 
   * @return: {Dates} 返回跳转后的datas对象 
   * @case: 
   */
  jumpDay(n) {
    let nowTN = this.getTime()
    return new Dates((n !== undefined && typeof n === "number") ? nowTN + (86400000 * n) : nowTN)
  }
}
