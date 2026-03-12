/**
 * 字符串工具函数
 * @module utils/string
 */

/**
 * 去除字符串两端空白
 * @param {string} str - 输入字符串
 * @returns {string} 处理后的字符串
 * @example
 * trim('  hello  ') // 'hello'
 */
export function trim(str) {
  return str.trim();
}

/**
 * 字符串截断
 * @param {string} str - 输入字符串
 * @param {number} maxLength - 最大长度
 * @param {string} suffix - 省略符
 * @returns {string} 处理后的字符串
 * @example
 * truncate('hello world', 5) // 'hello...'
 */
export function truncate(str, maxLength, suffix = '...') {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * 驼峰转蛇形
 * @param {string} str - 输入字符串
 * @returns {string} 蛇形字符串
 * @example
 * camelToSnake('helloWorld') // 'hello_world'
 */
export function camelToSnake(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * 蛇形转驼峰
 * @param {string} str - 输入字符串
 * @returns {string} 驼峰字符串
 * @example
 * snakeToCamel('hello_world') // 'helloWorld'
 */
export function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 首字母大写
 * @param {string} str - 输入字符串
 * @returns {string} 处理后的字符串
 * @example
 * capitalize('hello') // 'Hello'
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 全部大写
 * @param {string} str - 输入字符串
 * @returns {string} 大写字符串
 * @example
 * upperCase('Hello') // 'HELLO'
 */
export function upperCase(str) {
  return str.toUpperCase();
}

/**
 * 全部小写
 * @param {string} str - 输入字符串
 * @returns {string} 小写字符串
 * @example
 * lowerCase('HELLO') // 'hello'
 */
export function lowerCase(str) {
  return str.toLowerCase();
}

/**
 * 单词首字母大写
 * @param {string} str - 输入字符串
 * @returns {string} 处理后的字符串
 * @example
 * titleCase('hello world') // 'Hello World'
 */
export function titleCase(str) {
  return str.replace(/\b\w/g, letter => letter.toUpperCase());
}

/**
 * 字符串重复
 * @param {string} str - 输入字符串
 * @param {number} n - 重复次数
 * @returns {string} 重复后的字符串
 * @example
 * repeat('ab', 3) // 'ababab'
 */
export function repeat(str, n) {
  return str.repeat(n);
}

/**
 * 字符串反转
 * @param {string} str - 输入字符串
 * @returns {string} 反转后的字符串
 * @example
 * reverse('hello') // 'olleh'
 */
export function reverse(str) {
  return str.split('').reverse().join('');
}

/**
 * 字符串模板
 * @param {string} template - 模板字符串
 * @param {Object} data - 数据对象
 * @returns {string} 格式化后的字符串
 * @example
 * template('Hello {{name}}', {name: 'World'}) // 'Hello World'
 */
export function template(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] ?? '');
}

/**
 * 移除HTML标签
 * @param {string} str - 输入字符串
 * @returns {string} 处理后的字符串
 * @example
 * stripTags('<p>Hello</p>') // 'Hello'
 */
export function stripTags(str) {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * HTML转义
 * @param {string} str - 输入字符串
 * @returns {string} 转义后的字符串
 * @example
 * escapeHtml('<div>') // '&lt;div&gt;'
 */
export function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, char => map[char]);
}

/**
 * HTML反转义
 * @param {string} str - 输入字符串
 * @returns {string} 反转义后的字符串
 * @example
 * unescapeHtml('&lt;div&gt;') // '<div>'
 */
export function unescapeHtml(str) {
  const map = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'" };
  return str.replace(/&(amp|lt|gt|quot|#039);/g, entity => map[entity]);
}

/**
 * 随机字符串
 * @param {number} length - 长度
 * @returns {string} 随机字符串
 * @example
 * randomString(10) // 'a1b2c3d4e5'
 */
export function randomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

/**
 * 字符串加密（简单混淆）
 * @param {string} str - 输入字符串
 * @param {number} shift - 偏移量
 * @returns {string} 加密后的字符串
 * @example
 * caesarCipher('abc', 1) // 'bcd'
 */
export function caesarCipher(str, shift = 1) {
  return str.replace(/[a-zA-Z]/g, char => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
  });
}

/**
 * 统计字符出现次数
 * @param {string} str - 输入字符串
 * @param {string} char - 字符
 * @returns {number} 出现次数
 * @example
 * countChars('hello l', 'l') // 3
 */
export function countChars(str, char) {
  return str.split(char).length - 1;
}

/**
 * 字符串相似度（Levenshtein距离）
 * @param {string} str1 - 第一个字符串
 * @param {string} str2 - 第二个字符串
 * @returns {number} 编辑距离
 * @example
 * levenshtein('kitten', 'sitting') // 3
 */
export function levenshtein(str1, str2) {
  const m = str1.length, n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }
  return dp[m][n];
}
