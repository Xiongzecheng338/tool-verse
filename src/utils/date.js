/**
 * 日期时间工具函数
 * @module utils/date
 */

/**
 * 获取当前时间戳
 * @returns {number} 时间戳（毫秒）
 * @example
 * now() // 1704067200000
 */
export function now() {
  return Date.now();
}

/**
 * 获取当前日期
 * @returns {Date} 当前日期对象
 * @example
 * today() // Date对象
 */
export function today() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * 格式化日期
 * @param {Date|number|string} date - 日期
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的日期
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD') // '2024-01-01'
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');
  const week = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
  
  return format
    .replace('YYYY', year)
    .replace('YY', String(year).slice(-2))
    .replace('MM', month)
    .replace('M', d.getMonth() + 1)
    .replace('DD', day)
    .replace('D', d.getDate())
    .replace('HH', hour)
    .replace('H', d.getHours())
    .replace('mm', minute)
    .replace('m', d.getMinutes())
    .replace('ss', second)
    .replace('s', d.getSeconds())
    .replace('W', week);
}

/**
 * 相对时间
 * @param {Date|number|string} date - 日期
 * @returns {string} 相对时间字符串
 * @example
 * relativeTime(new Date() - 60000) // '刚刚'
 */
export function relativeTime(date) {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (seconds < 60) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  if (weeks < 4) return `${weeks}周前`;
  if (months < 12) return `${months}个月前`;
  return `${years}年前`;
}

/**
 * 获取日期范围
 * @param {string} type - 范围类型
 * @returns {Date[]} [开始日期, 结束日期]
 * @example
 * dateRange('week') // [周一, 周日]
 */
export function dateRange(type = 'week') {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (type) {
    case 'today':
      return [today, new Date(today.getTime() + 86400000 - 1)];
    case 'week':
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return [weekStart, new Date(weekEnd.getTime() + 86400000 - 1)];
    case 'month':
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return [monthStart, new Date(monthEnd.getTime() + 86400000 - 1)];
    case 'year':
      const yearStart = new Date(today.getFullYear(), 0, 1);
      const yearEnd = new Date(today.getFullYear(), 11, 31);
      return [yearStart, new Date(yearEnd.getTime() + 86400000 - 1)];
    default:
      return [today, today];
  }
}

/**
 * 日期加法
 * @param {Date|number|string} date - 日期
 * @param {number} amount - 数量
 * @param {string} unit - 单位
 * @returns {Date} 计算后的日期
 * @example
 * addDays(new Date(), 7) // 7天后的日期
 */
export function addDays(date, amount) {
  return add(date, amount, 'day');
}

export function addMonths(date, amount) {
  return add(date, amount, 'month');
}

export function addYears(date, amount) {
  return add(date, amount, 'year');
}

function add(date, amount, unit) {
  const d = new Date(date);
  switch (unit) {
    case 'day': d.setDate(d.getDate() + amount); break;
    case 'month': d.setMonth(d.getMonth() + amount); break;
    case 'year': d.setFullYear(d.getFullYear() + amount); break;
    case 'hour': d.setHours(d.getHours() + amount); break;
    case 'minute': d.setMinutes(d.getMinutes() + amount); break;
    case 'second': d.setSeconds(d.getSeconds() + amount); break;
  }
  return d;
}

/**
 * 日期计算
 * @param {Date|number|string} date1 - 日期1
 * @param {Date|number|string} date2 - 日期2
 * @returns {Object} 计算结果
 * @example
 * diffDays(new Date('2024-01-01'), new Date('2024-01-10'))
 * // { days: 9, hours: 0, minutes: 0, seconds: 0 }
 */
export function diff(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d2 - d1);
  
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor((diffMs % 86400000) / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  
  return { days, hours, minutes, seconds, ms: diffMs };
}

/**
 * 判断闰年
 * @param {number} year - 年份
 * @returns {boolean} 是否闰年
 * @example
 * isLeapYear(2024) // true
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 获取星期
 * @param {Date|number|string} date - 日期
 * @returns {number} 星期（0-6，0为周日）
 * @example
 * getDayOfWeek(new Date('2024-01-01')) // 1
 */
export function getDayOfWeek(date) {
  return new Date(date).getDay();
}

/**
 * 时间戳转日期
 * @param {number} timestamp - 时间戳（秒）
 * @returns {Date} 日期对象
 * @example
 * timestampToDate(1704067200) // Date对象
 */
export function timestampToDate(timestamp) {
  return new Date(timestamp * 1000);
}

/**
 * 日期转时间戳
 * @param {Date|number|string} date - 日期
 * @returns {number} 时间戳（秒）
 * @example
 * dateToTimestamp(new Date()) // 1704067200
 */
export function dateToTimestamp(date) {
  return Math.floor(new Date(date).getTime() / 1000);
}

/**
 * 农历转换（简版）
 * @param {Date|number|string} date - 日期
 * @returns {Object} 农历信息
 * @example
 * toLunar(new Date('2024-02-10'))
 * // { year: '甲辰', month: '正', day: '初一' }
 */
export function toLunar(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  
  const lunarYear = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
    [(year - 4) % 10] + ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
    [(year - 4) % 12] + '年';
  
  const lunarMonth = ['', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'][month];
  const lunarDay = ['', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'][day];
  
  return { year: lunarYear, month: lunarMonth, day: lunarDay };
}
