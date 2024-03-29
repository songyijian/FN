/*
 * @Description: Object 工具函数
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-06-11 17:53:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-19 16:20:47
 */

// 拷贝标准json对象（简易版）
export function copy(args) {
  return JSON.parse(JSON.stringify(args))
}

// 合并对象
export function merge(...args) {
  return Object.assign({}, ...args)
}
