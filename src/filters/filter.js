/***
 * 策略状态字典
 */
const policyStateFilter = function (value) {
  let policyStateMap = new Map([ ['0', '停用'],
                           ['1', '启用']]);
  return policyStateMap.get(value)
}

/***
 * 布尔值
 * @type {Map}
 */

const boolFilter = function (value) {
  let boolMap = new Map([['0', '否'], ['1', '是']])
  return boolMap.get(value)
}

/***
 * 产品状态
 */

const productFilter = function (value) {
  let productMap = new Map([['0', '未激活'], ['1', '激活'], ['2', '冻结'], ['3', '停止']])
  return productMap.get(value)
}

export {productFilter, boolFilter, policyStateFilter}

