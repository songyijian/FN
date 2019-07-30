
/**
 * @Description: 对Date做了一些列扩展
 * 
 *   new Date().format('yyyy-MM-dd h:m:s.S') >"2019-05-06 15:12:58.763"
 *   new Date().isLeapYear()  >false
 *   new Date('2019-03-03').getCalendar() >[{…}, {…}
 *   new Date.jumpDay() >获取几天前的data对象
 *   Date.nodeDayList('2019-03-10','2019-03-03')>[]
 * ---
 * @Author: yijian.song
 * @Date: 2019-05-06 15:06:50
 */

export default function(){
  /**
   * @Description: 格式化
   * @param {*str} fmt 要格式成什么样
   * @return: {string} 格式化的样子
   * @case: 
   *  new Date().format('yyyy-MM-dd') >"2019-05-06"
   *  new Date().format('yyyy-MM-dd h:m:s.S') >"2019-05-06 15:12:58.763"
   */
  Date.prototype.format = function format(fmt = 'yyyy-MM-dd') {
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
   * @case: new Date().isLeapYear()  >false
   */
  Date.prototype.isLeapYear = function isLeapYear() {
    var _year = this.getFullYear()
    return (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0))
  }

  /**
    * @Description: 当前月多数天
    * @return: {Number} 当前月多数天
    * @case:
    *  new Date().matchDay() >31
    */
  Date.prototype.matchDay = function matchDay() {
    let m2day = this.isLeapYear() ? 29 : 28;
    let dayA = new Array(31, m2day, 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);
    return dayA[this.getMonth()]
  }

  /**
   * @Description: 当前对象的日历信息
   * @param {str} formatStr 格式化日期
   * @return: {arr} [{}]
   * @case:
   *  new Date('2019-03-03').getCalendar() >[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   */
  Date.prototype.getCalendar = function getCalendar(formatStr = 'yyyy-MM-dd') {
    let _dn = this.matchDay()         //当前月多数天
    let _year = this.getFullYear()    //年份
    let _month = this.getMonth()      //当前月
    let getCalendarArr = [];
    for (let i = 1; i <= _dn; i++) {
      let dayDate = new Date(_year, _month, i);
      getCalendarArr.push({
        day: dayDate.format(formatStr),
        timestamp: dayDate.getTime(),
        week: dayDate.getDay()
      })
    }
    return getCalendarArr
  }

  /**
   * @Description: 获取n天前后的data对象
   * @param {number} n 正式向前跳跃，负数向后跳跃
   * @return: {Date} 返回跳转后的datas对象
   * @case:
   */
  Date.prototype.jumpDay = function jumpDay(n) {
    let nowTN = this.getTime()
    return new Date((n !== undefined && typeof n === "number") ? nowTN + (86400000 * n) : nowTN)
  }

  /**
   * @Description: 返回两个时间点直接的天对象
   * @param {new Date(str|...)} star 起点
   * @param {new Date(str|...)} end 终点
   * @return: {arr} 
   * @case: 
   *  Date.nodeDayList('2019-03-10','2019-03-03')>[]
  * ---
   * @Author: yijian.song
   * @Date: 2019-05-06 20:36:14
   */
  Date.nodeDayList = function nodeDayList(star,end) {
    try{
      var unixDb = new Date(star).getTime();
      var unixDe = new Date(end).getTime();
      var mx = Math.max(unixDb, unixDe)
      var min = Math.min(unixDb, unixDe)
      var arrtimelist = []
      var k = min
      for (; k <= mx; ) {
        arrtimelist.push(new Date(parseInt(k)))
        k += 86400000
      }
      return arrtimelist
    }catch(err){
      new Error(err)
    }
  }

  
}