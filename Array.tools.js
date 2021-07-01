/*
 * @Description: 作用Array的工具方法
 * @Author: yijian
 * @Version: 3.0.0
 * @Date: 2021-06-30 10:09:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-30 11:27:00
 */

/**
 * @Description: 删除指定原属
 * @param {Array} arr
 * @param {*} flags 清理原属
 * @return {Array} 新Array
 * trim([false, 1,  NaN, 2, undefined, ""],undefined,""); > [false, 1, NaN, 2]
 */
export function trim(arr, ...flags) {
  return arr.filter((item) => !flags.includes(item));
}
