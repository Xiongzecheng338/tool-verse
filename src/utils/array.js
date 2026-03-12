/**
 * 数组工具函数
 * @module utils/array
 */

/**
 * 数组去重
 * @param {Array} arr - 输入数组
 * @returns {Array} 去重后的数组
 * @example
 * unique([1, 2, 2, 3]) // [1, 2, 3]
 */
export function unique(arr) {
  return [...new Set(arr)];
}

/**
 * 数组分块
 * @param {Array} arr - 输入数组
 * @param {number} size - 每块大小
 * @returns {Array[]} 分块后的数组
 * @example
 * chunk([1,2,3,4,5], 2) // [[1,2], [3,4], [5]]
 */
export function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * 数组扁平化
 * @param {Array} arr - 输入数组
 * @param {number} depth - 扁平深度
 * @returns {Array} 扁平化后的数组
 * @example
 * flat([1,[2,[3]]], 2) // [1, 2, 3]
 */
export function flat(arr, depth = 1) {
  if (depth === 0) return arr;
  return arr.reduce((acc, val) => {
    return Array.isArray(val) 
      ? [...acc, ...flat(val, depth - 1)]
      : [...acc, val];
  }, []);
}

/**
 * 数组差集
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 差集数组
 * @example
 * difference([1,2,3], [2,3,4]) // [1]
 */
export function difference(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(x => !set2.has(x));
}

/**
 * 数组交集
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 交集数组
 * @example
 * intersection([1,2,3], [2,3,4]) // [2, 3]
 */
export function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(x => set2.has(x));
}

/**
 * 数组并集
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 并集数组
 * @example
 * union([1,2,3], [2,3,4]) // [1, 2, 3, 4]
 */
export function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}

/**
 * 随机打乱数组
 * @param {Array} arr - 输入数组
 * @returns {Array} 打乱后的数组
 * @example
 * shuffle([1,2,3,4,5]) // [3, 1, 5, 2, 4]
 */
export function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 数组随机取样
 * @param {Array} arr - 输入数组
 * @param {number} n - 取样数量
 * @returns {Array} 取样结果
 * @example
 * sample([1,2,3,4,5], 2) // [2, 5]
 */
export function sample(arr, n = 1) {
  const shuffled = shuffle(arr);
  return n === 1 ? shuffled[0] : shuffled.slice(0, n);
}

/**
 * 数组排序（支持多字段）
 * @param {Array} arr - 输入数组
 * @param {Function|String} compareFn - 比较函数或字段名
 * @returns {Array} 排序后的数组
 * @example
 * sortBy([{a:3},{a:1},{a:2}], 'a') // [{a:1},{a:2},{a:3}]
 */
export function sortBy(arr, compareFn) {
  return [...arr].sort((a, b) => {
    if (typeof compareFn === 'function') {
      return compareFn(a, b);
    }
    if (a[compareFn] < b[compareFn]) return -1;
    if (a[compareFn] > b[compareFn]) return 1;
    return 0;
  });
}

/**
 * 数组分组
 * @param {Array} arr - 输入数组
 * @param {Function} fn - 分组函数
 * @returns {Object} 分组结果
 * @example
 * groupBy([1,2,3,4,5], x => x % 2 === 0 ? '偶数' : '奇数')
 * // { '奇数': [1,3,5], '偶数': [2,4] }
 */
export function groupBy(arr, fn) {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});
}

/**
 * 数组压缩（移除空值）
 * @param {Array} arr - 输入数组
 * @returns {Array} 压缩后的数组
 * @example
 * compact([0, 1, false, 2, '', 3, null]) // [1, 2, 3]
 */
export function compact(arr) {
  return arr.filter(Boolean);
}

/**
 * 数组查找重复元素
 * @param {Array} arr - 输入数组
 * @returns {Array} 重复元素数组
 * @example
 * duplicates([1, 2, 2, 3, 3, 3]) // [2, 3]
 */
export function duplicates(arr) {
  const seen = new Set();
  const dup = new Set();
  for (const item of arr) {
    if (seen.has(item)) dup.add(item);
    else seen.add(item);
  }
  return [...dup];
}

/**
 * 数组移动元素
 * @param {Array} arr - 输入数组
 * @param {number} from - 起始索引
 * @param {number} to - 目标索引
 * @returns {Array} 处理后的数组
 * @example
 * move([1,2,3,4], 0, 2) // [2, 3, 1, 4]
 */
export function move(arr, from, to) {
  const result = [...arr];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

/**
 * 数组首尾元素操作
 * @param {Array} arr - 输入数组
 * @returns {{first: *, last: *, rest: Array}} 首尾元素及剩余数组
 * @example
 * headTail([1,2,3,4]) // {first:1, last:4, rest:[2,3]}
 */
export function headTail(arr) {
  return {
    first: arr[0],
    last: arr[arr.length - 1],
    rest: arr.slice(1, -1)
  };
}
