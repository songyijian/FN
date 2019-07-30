/*
 * @Description:
                consoleSatatic
                console上的一些拓展方法，辅助开发在控制台输出一些信息（用完删掉别出现在线上环境）
 * @Author:  yijian.song
 * @Date: 2019-07-12 15:02:03
 * @LastEditTime: 2019-07-12 15:07:57
 * @LastEditors: Please set LastEditors
 */

module.exports = function () {
  var console = window.console
  /**
   * @Description: 把json格式化输出到控制台
   * @param { json } obj 一个json对象
   * @return: {str} 格式的json对象
   * @Author: yijian.song
   * @Date: 2019-07-12 15:02:47
   */

  console.json = function (...obj) {
    let objs = []
    for (let i = 0; i < obj.length; i++) {
      objs.push(typeof obj[i] === 'object' ? JSON.stringify(obj[i], null, '\t') : obj[i])
    }
    console.log(...objs)
  }
}