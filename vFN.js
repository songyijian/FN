

/*
   * 将秒数格式化时间
   * @val {Number} seconds: 整数类型的秒数
   * @return {String} time: 格式化之后的时间
   */
function timeMS(val) {
    if (Math.floor(parseInt(val) / 60) > 60) {
        return [
            parseInt(val / 60 / 60),
            parseInt(val / 60 % 60),
            parseInt(val % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1")
    }
    return [
        parseInt(val / 60 % 60),
        parseInt(val % 60)
    ].join(":").replace(/\b(\d)\b/g, "0$1");
}