/*
 * @Description: DOM 相关函数
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-07-11 10:42:29
 */

/**
 * @Description: 任意字符串宽度
 * @param {*} str
 * @param {Object} className 指定在指定类属性下的计算结果
 * @param {*} append
 * @return {Number}
 * @Author: yijian
 */
function getTextWidth(str = "", className = "", append = document.body) {
  const dom = document.createElement("span");
  dom.style.display = "inline-block";
  className && (dom.className = className);
  dom.textContent = str;
  append.appendChild(dom);
  const width = dom.clientWidth;
  append.removeChild(dom);
  return width;
}
