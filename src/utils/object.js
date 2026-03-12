/**
 * 对象工具函数
 * @module utils/object
 */

/**
 * 深拷贝
 * @param {*} obj - 输入对象
 * @returns {*} 拷贝后的对象
 * @example
 * deepClone({a: {b: 1}}) // {a: {b: 1}}
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(deepClone);
  if (obj instanceof Set) return new Set(obj);
  if (obj instanceof Map) return new Map(Array.from(obj.entries()));
  const clone = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}

/**
 * 浅拷贝
 * @param {Object} obj - 输入对象
 * @returns {Object} 拷贝后的对象
 * @example
 * shallowClone({a: 1}) // {a: 1}
 */
export function shallowClone(obj) {
  return Array.isArray(obj) ? [...obj] : { ...obj };
}

/**
 * 对象合并
 * @param {...Object} sources - 源对象
 * @returns {Object} 合并后的对象
 * @example
 * merge({a: 1}, {b: 2}) // {a: 1, b: 2}
 */
export function merge(...sources) {
  return Object.assign({}, ...sources);
}

/**
 * 深合并
 * @param {...Object} sources - 源对象
 * @returns {Object} 合并后的对象
 * @example
 * deepMerge({a: {b: 1}}, {a: {c: 2}}) // {a: {b: 1, c: 2}}
 */
export function deepMerge(...sources) {
  return sources.reduce((acc, obj) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (isPlainObject(acc[key]) && isPlainObject(obj[key])) {
          acc[key] = deepMerge(acc[key], obj[key]);
        } else {
          acc[key] = obj[key];
        }
      }
    }
    return acc;
  }, {});
}

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 获取对象路径值
 * @param {Object} obj - 输入对象
 * @param {string} path - 路径字符串
 * @param {*} defaultValue - 默认值
 * @returns {*} 获取的值
 * @example
 * get({a: {b: 1}}, 'a.b') // 1
 */
export function get(obj, path, defaultValue) {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }
  return result ?? defaultValue;
}

/**
 * 设置对象路径值
 * @param {Object} obj - 输入对象
 * @param {string} path - 路径字符串
 * @param {*} value - 要设置的值
 * @returns {Object} 处理后的对象
 * @example
 * set({}, 'a.b.c', 1) // {a: {b: {c: 1}}}
 */
export function set(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;
  for (const key of keys) {
    if (!(key in current) || !isPlainObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  current[lastKey] = value;
  return obj;
}

/**
 * 对象映射
 * @param {Object} obj - 输入对象
 * @param {Function} fn - 映射函数
 * @returns {Object} 映射后的对象
 * @example
 * mapObject({a: 1, b: 2}, (k, v) => [k, v * 2]) // {a: 2, b: 4}
 */
export function mapObject(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => fn(k, v))
  );
}

/**
 * 对象过滤
 * @param {Object} obj - 输入对象
 * @param {Function} fn - 过滤函数
 * @returns {Object} 过滤后的对象
 * @example
 * pick({a: 1, b: 2, c: 3}, ['a', 'b']) // {a: 1, b: 2}
 */
export function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {});
}

/**
 * 对象排除
 * @param {Object} obj - 输入对象
 * @param {Array} keys - 要排除的键
 * @returns {Object} 排除后的对象
 * @example
 * omit({a: 1, b: 2, c: 3}, ['c']) // {a: 1, b: 2}
 */
export function omit(obj, keys) {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * 对象键值对转换
 * @param {Object} obj - 输入对象
 * @returns {Array} 键值对数组
 * @example
 * entries({a: 1, b: 2}) // [['a', 1], ['b', 2]]
 */
export function entries(obj) {
  return Object.entries(obj);
}

/**
 * 键值对转对象
 * @param {Array} pairs - 键值对数组
 * @returns {Object} 转换后的对象
 * @example
 * fromEntries([['a', 1], ['b', 2]]) // {a: 1, b: 2}
 */
export function fromEntries(pairs) {
  return Object.fromEntries(pairs);
}

/**
 * 对象比较
 * @param {Object} obj1 - 第一个对象
 * @param {Object} obj2 - 第二个对象
 * @returns {boolean} 是否相等
 * @example
 * equals({a: 1}, {a: 1}) // true
 */
export function equals(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * 获取对象大小
 * @param {Object} obj - 输入对象
 * @returns {number} 对象键数量
 * @example
 * size({a: 1, b: 2}) // 2
 */
export function size(obj) {
  return Object.keys(obj).length;
}

/**
 * 对象翻转
 * @param {Object} obj - 输入对象
 * @returns {Object} 翻转后的对象
 * @example
 * invert({a: 1, b: 2}) // {1: 'a', 2: 'b'}
 */
export function invert(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [v, k])
  );
}

/**
 * 递归冻结对象
 * @param {Object} obj - 输入对象
 * @returns {Object} 冻结后的对象
 * @example
 * deepFreeze({a: {b: 1}}) // 冻结后的对象
 */
export function deepFreeze(obj) {
  Object.keys(obj).forEach(key => {
    if (isPlainObject(obj[key])) {
      deepFreeze(obj[key]);
    }
  });
  return Object.freeze(obj);
}
