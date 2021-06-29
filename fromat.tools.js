/*
 * @Description: 格式化
 * @Author: yijian
 * @Version: 3.0.0
 * @Date: 2021-06-29 20:27:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-29 20:29:51
 */

/**
 * @description: 分位格式化
 * @param {number} num
 * @param {object} config = { unit, head, tail }
 * @param {string} head 头字符
 * @param {string} tail 尾字符
 * @return {string}
 * 12345678 > 12,34,56,78
 */
export const enQuantile = (num = "", config = {}) => {
  const { unit = 3, head = "", tail = "" } = config;
  let n = String(num);
  let result = "";
  while (n.length > unit) {
    result = "," + n.slice(-unit) + result;
    n = n.slice(0, n.length - unit);
  }
  n && (result = n + result);
  return String(head) + result + String(tail);
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
