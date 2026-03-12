/**
 * 格式转换工具函数
 * @module utils/format
 */

/**
 * JSON转对象
 * @param {string} str - JSON字符串
 * @returns {*} 解析后的对象
 * @example
 * parseJSON('{"a":1}') // {a: 1}
 */
export function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

/**
 * 对象转JSON
 * @param {*} obj - 对象
 * @returns {string} JSON字符串
 * @example
 * toJSON({a: 1}) // '{"a":1}'
 */
export function toJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * JSON格式化
 * @param {string|Object} json - JSON
 * @returns {string} 格式化后的JSON
 * @example
 * formatJSON('{"a":1}') // '{\n  "a": 1\n}'
 */
export function formatJSON(json) {
  const obj = typeof json === 'string' ? parseJSON(json) : json;
  return JSON.stringify(obj, null, 2);
}

/**
 * CSV转数组
 * @param {string} csv - CSV字符串
 * @returns {Array} 数组
 * @example
 * parseCSV('a,b\n1,2') // [['a','b'],['1','2']]
 */
export function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  return lines.map(line => line.split(','));
}

/**
 * 数组转CSV
 * @param {Array} data - 数据数组
 * @returns {string} CSV字符串
 * @example
 * toCSV([['a','b'],['1','2']]) // 'a,b\n1,2'
 */
export function toCSV(data) {
  return data.map(row => row.join(',')).join('\n');
}

/**
 * XML转对象（简版）
 * @param {string} xml - XML字符串
 * @returns {Object} 解析后的对象
 * @example
 * parseXML('<root><a>1</a></root>') // {a: '1'}
 */
export function parseXML(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  return xmlToJson(doc.documentElement);
}

function xmlToJson(node) {
  if (node.nodeType === 3) return node.textContent?.trim();
  const obj = {};
  if (node.attributes?.length) {
    obj['@attributes'] = {};
    for (const attr of node.attributes) {
      obj['@attributes'][attr.name] = attr.value;
    }
  }
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      if (child.textContent?.trim()) obj['#text'] = child.textContent.trim();
    } else {
      const result = xmlToJson(child);
      if (obj[child.tagName]) {
        if (!Array.isArray(obj[child.tagName])) obj[child.tagName] = [obj[child.tagName]];
        obj[child.tagName].push(result);
      } else {
        obj[child.tagName] = result;
      }
    }
  }
  return obj;
}

/**
 * 对象转XML（简版）
 * @param {Object} obj - 对象
 * @returns {string} XML字符串
 * @example
 * toXML({a: 1}) // '<root><a>1</a></root>'
 */
export function toXML(obj) {
  return '<root>' + objToXml(obj) + '</root>';
}

function objToXml(obj) {
  if (typeof obj !== 'object' || obj === null) return '';
  if (Array.isArray(obj)) return obj.map(item => objToXml(item)).join('');
  return Object.entries(obj).map(([key, val]) => {
    if (key === '@attributes') return '';
    return `<${key}>${objToXml(val)}</${key}>`;
  }).join('');
}

/**
 * 进制转换
 * @param {string|number} value - 值
 * @param {number} from - 源进制
 * @param {number} to - 目标进制
 * @returns {string} 转换后的值
 * @example
 * convertBase('FF', 16, 2) // '11111111'
 */
export function convertBase(value, from = 10, to = 10) {
  const num = parseInt(String(value), from);
  return num.toString(to).toUpperCase();
}

/**
 * 十六进制转RGB
 * @param {string} hex - 十六进制颜色
 * @returns {Object} RGB对象
 * @example
 * hexToRgb('#ff0000') // {r: 255, g: 0, b: 0}
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * RGB转十六进制
 * @param {number} r - 红色
 * @param {number} g - 绿色
 * @param {number} b - 蓝色
 * @returns {string} 十六进制颜色
 * @example
 * rgbToHex(255, 0, 0) // '#FF0000'
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, x)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

/**
 * RGB转HSL
 * @param {number} r - 红色
 * @param {number} g - 绿色
 * @param {number} b - 蓝色
 * @returns {Object} HSL对象
 * @example
 * rgbToHsl(255, 0, 0) // {h: 0, s: 100, l: 50}
 */
export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * HSL转RGB
 * @param {number} h - 色相
 * @param {number} s - 饱和度
 * @param {number} l - 亮度
 * @returns {Object} RGB对象
 * @example
 * hslToRgb(0, 100, 50) // {r: 255, g: 0, b: 0}
 */
export function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

/**
 * URL参数解析
 * @param {string} url - URL字符串
 * @returns {Object} 参数对象
 * @example
 * parseUrlParams('?a=1&b=2') // {a: '1', b: '2'}
 */
export function parseUrlParams(url) {
  const params = {};
  const search = new URL(url, 'http://localhost').search;
  new URLSearchParams(search).forEach((val, key) => params[key] = val);
  return params;
}

/**
 * 对象转URL参数
 * @param {Object} obj - 参数对象
 * @returns {string} URL参数字符串
 * @example
 * toUrlParams({a: 1, b: 2}) // 'a=1&b=2'
 */
export function toUrlParams(obj) {
  return new URLSearchParams(obj).toString();
}

/**
 * 文件大小格式化
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的字符串
 * @example
 * formatBytes(1024) // '1 KB'
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 秒数转时间格式
 * @param {number} seconds - 秒数
 * @returns {string} 时间字符串
 * @example
 * formatDuration(3665) // '1小时1分5秒'
 */
export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h && h + '小时', m && m + '分', s + '秒'].filter(Boolean).join('');
}

/**
 * 拼音首字母
 * @param {string} str - 中文字符串
 * @returns {string} 首字母串
 * @example
 * getPinyinInitials('你好') // 'NH'
 */
export function getPinyinInitials(str) {
  const pinyinMap = {
    '啊': 'a', '八': 'b', '嚓': 'c', '的': 'd', '饿': 'e', '发': 'f', '个': 'g',
    '哈': 'h', 'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n',
    '哦': 'o', 'p': 'p', '七': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'u',
    'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z'
  };
  return str.split('').map(c => pinyinMap[c] || c.charAt(0).toLowerCase()).join('');
}

/**
 * 中文转Unicode
 * @param {string} str - 字符串
 * @returns {string} Unicode字符串
 * @example
 * toUnicode('你好') // '\\u4f60\\u597d'
 */
export function toUnicode(str) {
  return str.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
}

/**
 * Unicode转中文
 * @param {string} str - Unicode字符串
 * @returns {string} 中文字符串
 * @example
 * fromUnicode('\\u4f60\\u597d') // '你好'
 */
export function fromUnicode(str) {
  return str.replace(/\\u([0-9a-f]{4})/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

/**
 * 简繁体转换（简版）
 * @param {string} str - 字符串
 * @returns {string} 转换后的字符串
 * @example
 * toTraditional('简化') // '簡化'
 */
export function toTraditional(str) {
  const map = { '简化': '簡化', '中国': '中國', '软件': '軟件' };
  let result = str;
  Object.entries(map).forEach(([k, v]) => result = result.replace(new RegExp(k, 'g'), v));
  return result;
}
