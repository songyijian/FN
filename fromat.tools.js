/*
 * @Description: 格式化
 * @Author: yijian
 * @Version: 3.0.0
 * @Date: 2021-06-29 20:27:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-30 11:11:03
 */

/**
 * @description: 分位格式化
 * @param {number} num
 * @param {number} unit
 * @return {string}
 * 12345678 > 12,345,678
 */
export const enQuantile = (num = "", unit = 3) => {
  let n = String(num);
  let result = "";
  while (n.length > unit) {
    result = "," + n.slice(-unit) + result;
    n = n.slice(0, n.length - unit);
  }
  n && (result = n + result);
  return result;
};

/**
 * @description: 反解分位
 * @param {string} str
 * @param {function} type Number｜String 得到类型的构造函数
 * @return {string ｜ number}
 * 12,34,56,78 > 12345678
 */
export const deQuantile = (str = "", type = Number) => {
  if (str === "") return;
  let a = String(str).split(",").join("");
  return type(a);
};

/**
 * @Description: 首字母大写
 * @param {string} str
 * @return {string}
 * upper > Upper
 */
export function titleCase(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, -1);
}
