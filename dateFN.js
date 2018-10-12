

// 获取两个如期之间的所有日期列表

// Date.prototype.format = function() {
//     var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1)); // 获取年份
//     var day = this.getDate()>=10?this.getDate():('0'+this.getDate());//天两位
//     return this.getFullYear() + '-' +  mouth + "-" + day;   //返回日期
// }



/*
  new Date() 转 yy-mm-ss
  toYYMMSS(new Date())  // "2018-10-12"
*/
function dateToYYMMSS(timeDate) {
    function isDate (o) {  return Object.prototype.toString.call(o).slice(8, -1) === 'Date' }
    if(!isDate(timeDate )){ new Error('dateToYYMMSS 参数不是 一个Date对象 ')}

    var mouth = (timeDate.getMonth() + 1)>=10?(timeDate.getMonth() + 1):('0'+(timeDate.getMonth() + 1)); // 获取年份
    var day = timeDate.getDate()>=10?timeDate.getDate():('0'+timeDate.getDate());//天两位
    return timeDate.getFullYear() + '-' +  mouth + "-" + day;   //返回日期
}

/*
  yy-mm-ss 转 时间戳
  YYMMSStogetTime('2018-02-03') //1517641870166
*/
function YYMMSStogetTime(timeStr) {
  var timearr = timeStr.split("-");
  return new Date().setUTCFullYear(timearr[0], timearr[1] - 1, timearr[2]);
}

/*
  获取日期之前所有的天数
*/
function BetweenDay(begin, end) {
    var unixDb = YYMMSStogetTime(begin);
    var unixDe = YYMMSStogetTime(end);
    for (var k = unixDb; k <= unixDe;) {
        console.log(dateToYYMMSS(new Date(parseInt(k))));
        k = k + 24 * 60 * 60 * 1000;
    }
}








//判断某年某月的1号是星期几
function getFirstDay(_year,_month) {
    var allDay = 0, y = _year-1, i = 1;
    allDay = y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + 1;
    for ( ; i<_month; i++) {
        switch (i) {
            case 1: allDay += 31; break;
            case 2:
                if(runNian(_year)) { allDay += 29; }
                else { allDay += 28; }
                break;
            case 3: allDay += 31; break;
            case 4: allDay += 30; break;
            case 5: allDay += 31; break;
            case 6: allDay += 30; break;
            case 7: allDay += 31; break;
            case 8: allDay += 31; break;
            case 9: allDay += 30; break;
            case 10: allDay += 31; break;
            case 11: allDay += 30; break;
            case 12: allDay += 31; break;
        }
    }
    return allDay%7;
}








//判断闰年
function runNian(_year) {
    if(_year%400 === 0 || (_year%4 === 0 && _year%100 !== 0) ) {
        return true;
    }
    else { return false; }
}

/*
每个月有几天
依赖 runNian（）
mDays[x]==x月份的天数，x为0至11的自然数。
*/
var mDays=new Array(31,28+runNian(ynow),31,30,31,31,30,31,30,31,30,31);

// 当前月份
new Date().getMonth()+1
// 当前年
new Date().getFullYear()
// 当前日期
new Date().getDate()
// 当前星期几
new Date().getDay()

new Date(2008,3,1)


/*
今天星期几
new Date().getDay() //返回自然数0～6
0表示星期7，1表示星期二，2表示星期三，其余依此类推
*/
new Date().getDay() === 0 ? 7 : new Date().getDay()






    /*
    ** yijian.song
    * desc  获取n天前的date对象
    * param {Number} n=0
    * return date
    *  goOverDay(2)  //2018-07-04T09:53:04.226Z 两天前date
    */
    function goOverDay(n=0) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * n);
      return (start)
    }





/**
根据年月生成日历数组信息
*/
function getMonthDayArray(year,month) {
  function runNian(_year) { //判断闰年
      if(_year%400 === 0 || (_year%4 === 0 && _year%100 !== 0) ) { return true; }else { return false; }
  }
  var _y =  year || new Date().getFullYear();
  var _m = month ? month-1 : new Date().getMonth(); //几月份
  // var d = new Date().getDate();

  // 获取哪年的x月有几天
  function getdaylength(a_year,a_month) {
    return new Array(31,28+runNian(a_year),31,30,31,31,30,31,30,31,30,31)[a_month]
  }
  var dn = getdaylength(_y,_m);
  var arrs = [];

  for (var i = 1; i <= dn; i++) {
    var times = `${ _y }-${ _m+1<10 ? '0'+(_m+1) : _m+1 }-${ i<10 ? '0'+i : i }`;
    var od = new Date(times);
    arrs.push({
      time:times,
      date:od,
      week:od.getDay()+1
    })
  }
  return arrs
}
