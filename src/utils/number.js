/**
 * 数字工具函数
 * @module utils/number
 */

/**
 * 随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机整数
 * @example
 * randomInt(1, 10) // 5
 */
export function randomInt(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 随机浮点数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @param {number} decimals - 小数位数
 * @returns {number} 随机浮点数
 * @example
 * randomFloat(1, 10, 2) // 5.23
 */
export function randomFloat(min = 0, max = 1, decimals = 2) {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

/**
 * 数字格式化（千分位）
 * @param {number} num - 数字
 * @returns {string} 格式化后的字符串
 * @example
 * formatNumber(1234567) // '1,234,567'
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 数字缩写
 * @param {number} num - 数字
 * @returns {string} 缩写字符串
 * @example
 * abbreviateNumber(1500) // '1.5K'
 */
export function abbreviateNumber(num) {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
}

/**
 * 数字补零
 * @param {number} num - 数字
 * @param {number} length - 长度
 * @returns {string} 补零后的字符串
 * @example
 * padZero(5, 3) // '005'
 */
export function padZero(num, length = 2) {
  return num.toString().padStart(length, '0');
}

/**
 * 数字范围限制
 * @param {number} num - 数字
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 限制后的数字
 * @example
 * clamp(15, 0, 10) // 10
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * 数字四舍五入
 * @param {number} num - 数字
 * @param {number} decimals - 小数位数
 * @returns {number} 四舍五入后的数字
 * @example
 * round(3.14159, 2) // 3.14
 */
export function round(num, decimals = 0) {
  return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
}

/**
 * 数字求和
 * @param {...number} nums - 数字序列
 * @returns {number} 总和
 * @example
 * sum(1, 2, 3, 4) // 10
 */
export function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}

/**
 * 数字平均值
 * @param {...number} nums - 数字序列
 * @returns {number} 平均值
 * @example
 * average(1, 2, 3, 4) // 2.5
 */
export function average(...nums) {
  return nums.length ? sum(...nums) / nums.length : 0;
}

/**
 * 中位数
 * @param {...number} nums - 数字序列
 * @returns {number} 中位数
 * @example
 * median(1, 2, 3, 4, 5) // 3
 */
export function median(...nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * 标准差
 * @param {...number} nums - 数字序列
 * @returns {number} 标准差
 * @example
 * stdDev(2, 4, 4, 4, 5, 5, 7, 9) // 2
 */
export function stdDev(...nums) {
  const avg = average(...nums);
  const squareDiffs = nums.map(n => Math.pow(n - avg, 2));
  return Math.sqrt(average(...squareDiffs));
}

/**
 * 数字判断
 * @param {*} value - 输入值
 * @returns {boolean} 是否为数字
 * @example
 * isNumber(123) // true
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * 整数判断
 * @param {*} value - 输入值
 * @returns {boolean} 是否为整数
 * @example
 * isInteger(123) // true
 */
export function isInteger(value) {
  return Number.isInteger(value);
}

/**
 * 浮点数判断
 * @param {*} value - 输入值
 * @returns {boolean} 是否为浮点数
 * @example
 * isFloat(123.5) // true
 */
export function isFloat(value) {
  return isNumber(value) && !Number.isInteger(value);
}

/**
 * 数字在范围内判断
 * @param {number} num - 数字
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {boolean} 是否在范围内
 * @example
 * inRange(5, 1, 10) // true
 */
export function inRange(num, min, max) {
  return num >= min && num <= max;
}

/**
 * 数字百分比
 * @param {number} value - 值
 * @param {number} total - 总数
 * @param {number} decimals - 小数位数
 * @returns {string} 百分比字符串
 * @example
 * percentage(25, 100) // '25%'
 */
export function percentage(value, total, decimals = 0) {
  if (total === 0) return '0%';
  return (value / total * 100).toFixed(decimals) + '%';
}

/**
 * 数字人民币格式化
 * @param {number} num - 数字
 * @returns {string} 人民币格式
 * @example
 * formatRMB(1234.5) // '¥1,234.50'
 */
export function formatRMB(num) {
  return '¥' + formatNumber(num.toFixed(2));
}

/**
 * 数字美元格式化
 * @param {number} num - 数字
 * @returns {string} 美元格式
 * @example
 * formatUSD(1234.5) // '$1,234.50'
 */
export function formatUSD(num) {
  return '$' + formatNumber(num.toFixed(2));
}
