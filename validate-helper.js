/*
 * @Description:
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-07-13 17:58:43
 */
/**
 * 判断是否为外部资源
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export const validateMap = {
  Required: { required: true, trigger: "blur", message: "不能为空" },
  Number: {
    type: "number",
    trigger: "blur",
    message: "请输入Number类型参数值",
  },
  T_Number: {
    pattern: /^[-]?(([1-9]+0*(\.\d+)?)|(0\.\d+)|0|[1-9])$/,
    trigger: "blur",
    message: "请输入Number类型参数值",
  },
  T_String: {
    type: "string",
    trigger: "blur",
    message: "请输入String类型参数值",
  },
  T_Int: {
    pattern: /^[+-]?\d*$/,
    trigger: "blur",
    message: "请输入Int类型参数值",
  },
  T_Double: {
    pattern:
      /^[-+]?(\d+(\.\d*)?|\.\d+)([eE]([-+]?([012]?\d{1,2}|30[0-7])|-3([01]?[4-9]|[012]?[0-3])))?[dD]?$/,
    trigger: "blur",
    message: "请输入Double类型参数值",
  },
};

export function validateFn(...args) {
  const arrays = [];
  args.forEach(t => {
    if (validateMap[t]) {
      arrays.push(validateMap[t]);
    } else {
      console.warn(`${t} 验证规则为定义！！！`);
    }
  });
  return arrays;
}
