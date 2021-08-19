// 返回小数点后有几位
export function getFloatN(n) {
  try {
    if (typeof n === "number") {
      return Number.isSafeInteger(n) ? 0 : n.toString().split(".")[1].length;
    } else {
      return -1;
    }
  } catch (e) {
    return -1;
  }
}

console.log(getFloatN(1.23));
