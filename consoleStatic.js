/*
 * @Description: consoleStatic console上的一些拓展方法
 * @Author: yijian.song
 * @Version: 3.1.2
 * @Date: 2020-04-10 14:10:14
 * @LastEditors: yijian.song
 * @LastEditTime: 2020-05-08 12:10:11
 */

export default function consoleStatic() {
  var console = window.console
  /**
   * @Description: 把json格式化输出到控制台
   * @param { json } obj 一个json对象
   * @return: {str} 格式的json对象
   * @Author: yijian.song
   * @Version: 3.1.2
   * @Date: 2020-05-08 12:09:02
   */
  console.json = function (...obj) {
    let objs = []
    for (let i = 0; i < obj.length; i++) {
      objs.push(typeof obj[i] === 'object' ? JSON.stringify(obj[i], null, '\t') : obj[i])
    }
    console.log(...objs)
  }
}
