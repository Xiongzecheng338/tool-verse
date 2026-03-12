/**
 * 验证工具函数
 * @module utils/validator
 */

/**
 * 验证邮箱
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 * @example
 * isEmail('test@example.com') // true
 */
export function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 验证手机号（中国）
 * @param {string} phone - 手机号
 * @returns {boolean} 是否有效
 * @example
 * isPhone('13800138000') // true
 */
export function isPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}

/**
 * 验证URL
 * @param {string} url - URL地址
 * @returns {boolean} 是否有效
 * @example
 * isUrl('https://example.com') // true
 */
export function isUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证IP地址
 * @param {string} ip - IP地址
 * @returns {boolean} 是否有效
 * @example
 * isIP('192.168.1.1') // true
 */
export function isIP(ip) {
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
}

/**
 * 验证IPv6
 * @param {string} ip - IPv6地址
 * @returns {boolean} 是否有效
 * @example
 * isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334') // true
 */
export function isIPv6(ip) {
  return /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(ip);
}

/**
 * 验证身份证号（中国）
 * @param {string} idCard - 身份证号
 * @returns {boolean} 是否有效
 * @example
 * isIdCard('110101199001011234') // true
 */
export function isIdCard(idCard) {
  return /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(idCard);
}

/**
 * 验证中文名
 * @param {string} name - 姓名
 * @returns {boolean} 是否有效
 * @example
 * isChineseName('张三') // true
 */
export function isChineseName(name) {
  return /^[\u4e00-\u9fa5]{2,10}$/.test(name);
}

/**
 * 验证银行卡号
 * @param {string} card - 银行卡号
 * @returns {boolean} 是否有效
 * @example
 * isBankCard('6217000010012345678') // true
 */
export function isBankCard(card) {
  return /^[1-9]\d{9,29}$/.test(card);
}

/**
 * 验证车牌号（中国）
 * @param {string} plate - 车牌号
 * @returns {boolean} 是否有效
 * @example
 * isPlateNumber('京A12345') // true
 */
export function isPlateNumber(plate) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/.test(plate);
}

/**
 * 验证邮政编码
 * @param {string} code - 邮政编码
 * @returns {boolean} 是否有效
 * @example
 * isZipCode('100000') // true
 */
export function isZipCode(code) {
  return /^[1-9]\d{5}$/.test(code);
}

/**
 * 验证用户名
 * @param {string} username - 用户名
 * @returns {boolean} 是否有效
 * @example
 * isUsername('user_123') // true
 */
export function isUsername(username) {
  return /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/.test(username);
}

/**
 * 验证密码强度
 * @param {string} password - 密码
 * @returns {Object} 强度信息
 * @example
 * getPasswordStrength('Aa123456')
 * // { level: 3, text: '中等', valid: true }
 */
export function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  const levels = [
    { level: 0, text: '太弱', color: 'red' },
    { level: 1, text: '弱', color: 'orange' },
    { level: 2, text: '较弱', color: 'yellow' },
    { level: 3, text: '中等', color: 'blue' },
    { level: 4, text: '强', color: 'green' },
    { level: 5, text: '非常强', color: 'green' },
    { level: 6, text: '极强', color: 'green' }
  ];
  
  return { 
    level: levels[score]?.level || 0, 
    text: levels[score]?.text || '太弱',
    color: levels[score]?.color || 'red',
    valid: score >= 3
  };
}

/**
 * 验证JSON字符串
 * @param {string} str - 字符串
 * @returns {boolean} 是否为有效JSON
 * @example
 * isJSON('{"a":1}') // true
 */
export function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证日期格式
 * @param {string} date - 日期字符串
 * @returns {boolean} 是否有效
 * @example
 * isDate('2024-01-01') // true
 */
export function isDate(date) {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
}

/**
 * 验证时间格式
 * @param {string} time - 时间字符串
 * @returns {boolean} 是否有效
 * @example
 * isTime('12:30:00') // true
 */
export function isTime(time) {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(time);
}

/**
 * 验证HTML标签
 * @param {string} html - HTML字符串
 * @returns {boolean} 是否有效
 * @example
 * isHTML('<div>test</div>') // true
 */
export function isHTML(html) {
  return /<([a-z]+)[^>]*>(.*?)<\/\1>/i.test(html);
}

/**
 * 验证Base64
 * @param {string} str - 字符串
 * @returns {boolean} 是否为Base64
 * @example
 * isBase64('SGVsbG8=') // true
 */
export function isBase64(str) {
  return /^[A-Za-z0-9+/]*={0,2}$/.test(str);
}

/**
 * 验证Hex颜色
 * @param {string} color - 颜色值
 * @returns {boolean} 是否有效
 * @example
 * isHexColor('#ff0000') // true
 */
export function isHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * 验证信用卡号（Luhn算法）
 * @param {string} card - 信用卡号
 * @returns {boolean} 是否有效
 * @example
 * isCreditCard('4532015112830366') // true
 */
export function isCreditCard(card) {
  const digits = card.replace(/\D/g, '');
  if (!/^\d{13,19}$/.test(digits)) return false;
  
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}
