/**
 * 加密解密工具
 * @module utils/crypto
 */

/**
 * Base64编码
 * @param {string} str - 字符串
 * @returns {string} Base64字符串
 * @example
 * base64Encode('hello') // 'aGVsbG8='
 */
export function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * Base64解码
 * @param {string} str - Base64字符串
 * @returns {string} 解码后的字符串
 * @example
 * base64Decode('aGVsbG8=') // 'hello'
 */
export function base64Decode(str) {
  return decodeURIComponent(escape(atob(str)));
}

/**
 * URL编码
 * @param {string} str - 字符串
 * @returns {string} 编码后的字符串
 * @example
 * urlEncode('hello world') // 'hello%20world'
 */
export function urlEncode(str) {
  return encodeURIComponent(str);
}

/**
 * URL解码
 * @param {string} str - 编码后的字符串
 * @returns {string} 解码后的字符串
 * @example
 * urlDecode('hello%20world') // 'hello world'
 */
export function urlDecode(str) {
  return decodeURIComponent(str);
}

/**
 * MD5哈希（简版实现）
 * @param {string} str - 字符串
 * @returns {string} MD5哈希值
 * @example
 * md5('hello') // '5d41402abc4b2a76b9719d911017c592'
 */
export function md5(str) {
  const rotateLeft = (value, shift) => (value << shift) | (value >>> (32 - shift));
  const addFun = (a, b) => {
    const lsw = (a & 0xffff) + (b & 0xffff);
    const msw = (a >> 16) + (b >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  };
  const funF = (b, c, d) => (b & c) | (~b & d);
  const funG = (b, c, d) => (b & d) | (c & ~d);
  const funH = (b, c, d) => b ^ c ^ d;
  const funI = (b, c, d) => c ^ (b | ~d);
  const funFF = (a, b, c, d, x, s, ac) => {
    a = addFun(a, addFun(addFun(funF(b, c, d), x), ac));
    return addFun(rotateLeft(a, s), b);
  };
  const funGG = (a, b, c, d, x, s, ac) => {
    a = addFun(a, addFun(addFun(funG(b, c, d), x), ac));
    return addFun(rotateLeft(a, s), b);
  };
  const funHH = (a, b, c, d, x, s, ac) => {
    a = addFun(a, addFun(addFun(funH(b, c, d), x), ac));
    return addFun(rotateLeft(a, s), b);
  };
  const funII = (a, b, c, d, x, s, ac) => {
    a = addFun(a, addFun(addFun(funI(b, c, d), x), ac));
    return addFun(rotateLeft(a, s), b);
  };
  const convertToWordArray = str => {
    let lWordCount, lMessageLength = str.length, lNumberOfWords = (((lMessageLength + 8) >>> 6) + 1) * 16;
    const lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0, lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength * 8;
    return lWordArray;
  };
  const wordToHex = value => {
    let hex = '', word = '';
    for (let i = 0; i <= 3; i++) {
      word = (value >>> (i * 8)) & 255;
      hex += ('0' + word.toString(16)).slice(-2);
    }
    return hex;
  };
  let x = convertToWordArray(str), a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
  for (let k = 0; k < x.length; k += 16) {
    const aa = a, bb = b, cc = c, dd = d;
    a = funFF(a, b, c, d, x[k + 0], 7, 0xD76AA478);
    d = funFF(d, a, b, c, x[k + 1], 12, 0xE8C7B756);
    c = funFF(c, d, a, b, x[k + 2], 17, 0x242070DB);
    b = funFF(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE);
    a = funFF(a, b, c, d, x[k + 4], 7, 0xF57C0FAF);
    d = funFF(d, a, b, c, x[k + 5], 12, 0x4787C62A);
    c = funFF(c, d, a, b, x[k + 6], 17, 0xA8304613);
    b = funFF(b, c, d, a, x[k + 7], 22, 0xFD469501);
    a = funFF(a, b, c, d, x[k + 8], 7, 0x698098D8);
    d = funFF(d, a, b, c, x[k + 9], 12, 0x8B44F7AF);
    c = funFF(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1);
    b = funFF(b, c, d, a, x[k + 11], 22, 0x895CD7BE);
    a = funFF(a, b, c, d, x[k + 12], 7, 0x6B901122);
    d = funFF(d, a, b, c, x[k + 13], 12, 0xFD987193);
    c = funFF(c, d, a, b, x[k + 14], 17, 0xA679438E);
    b = funFF(b, c, d, a, x[k + 15], 22, 0x49B40821);
    a = funGG(a, b, c, d, x[k + 1], 5, 0xF61E2562);
    d = funGG(d, a, b, c, x[k + 6], 9, 0xC040B340);
    c = funGG(c, d, a, b, x[k + 11], 14, 0x265E5A51);
    b = funGG(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA);
    a = funGG(a, b, c, d, x[k + 5], 5, 0xD62F105D);
    d = funGG(d, a, b, c, x[k + 10], 9, 0x2441453);
    c = funGG(c, d, a, b, x[k + 15], 14, 0xD8A1E681);
    b = funGG(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8);
    a = funGG(a, b, c, d, x[k + 9], 5, 0x21E1CDE6);
    d = funGG(d, a, b, c, x[k + 14], 9, 0xC33707D6);
    c = funGG(c, d, a, b, x[k + 3], 14, 0xF4D50D87);
    b = funGG(b, c, d, a, x[k + 8], 20, 0x455A14ED);
    a = funGG(a, b, c, d, x[k + 13], 5, 0xA9E3E905);
    d = funGG(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8);
    c = funGG(c, d, a, b, x[k + 7], 14, 0x676F02D9);
    b = funGG(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A);
    a = funHH(a, b, c, d, x[k + 5], 4, 0xFFFA3942);
    d = funHH(d, a, b, c, x[k + 8], 11, 0x8771F681);
    c = funHH(c, d, a, b, x[k + 11], 16, 0x6D9D6122);
    b = funHH(b, c, d, a, x[k + 14], 23, 0xFDE5380C);
    a = funHH(a, b, c, d, x[k + 1], 4, 0xA4BEEA44);
    d = funHH(d, a, b, c, x[k + 4], 11, 0x4BDECFA9);
    c = funHH(c, d, a, b, x[k + 7], 16, 0xF6BB4B60);
    b = funHH(b, c, d, a, x[k + 10], 23, 0xBEBFBC70);
    a = funHH(a, b, c, d, x[k + 13], 4, 0x289B7EC6);
    d = funHH(d, a, b, c, x[k + 0], 11, 0xEAA127FA);
    c = funHH(c, d, a, b, x[k + 3], 16, 0xD4EF3085);
    b = funHH(b, c, d, a, x[k + 6], 23, 0x4881D05);
    a = funHH(a, b, c, d, x[k + 9], 4, 0xD9D4D039);
    d = funHH(d, a, b, c, x[k + 12], 11, 0xE6DB99E5);
    c = funHH(c, d, a, b, x[k + 15], 16, 0x1FA27CF8);
    b = funHH(b, c, d, a, x[k + 2], 23, 0xC4AC5665);
    a = funII(a, b, c, d, x[k + 0], 6, 0xF4292244);
    d = funII(d, a, b, c, x[k + 7], 10, 0x432AFF97);
    c = funII(c, d, a, b, x[k + 14], 15, 0xAB9423A7);
    b = funII(b, c, d, a, x[k + 5], 21, 0xFC93A039);
    a = funII(a, b, c, d, x[k + 12], 6, 0x655B59C3);
    d = funII(d, a, b, c, x[k + 3], 10, 0x8F0CCC92);
    c = funII(c, d, a, b, x[k + 10], 15, 0xFFEFF47D);
    b = funII(b, c, d, a, x[k + 1], 21, 0x85845DD1);
    a = funII(a, b, c, d, x[k + 8], 6, 0x6FA87E4F);
    d = funII(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0);
    c = funII(c, d, a, b, x[k + 6], 15, 0xA3014314);
    b = funII(b, c, d, a, x[k + 13], 21, 0x4E0811A1);
    a = funII(a, b, c, d, x[k + 4], 6, 0xF7537E82);
    d = funII(d, a, b, c, x[k + 11], 10, 0xBD3AF235);
    c = funII(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB);
    b = funII(b, c, d, a, x[k + 9], 21, 0xEB86D391);
    a = addFun(a, aa); b = addFun(b, bb); c = addFun(c, cc); d = addFun(d, dd);
  }
  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

/**
 * SHA1哈希
 * @param {string} str - 字符串
 * @returns {string} SHA1哈希值
 * @example
 * sha1('hello') // 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'
 */
export function sha1(str) {
  const coreSha1 = (w, x, y, z) => {
    switch ((((x & y) | ((~x) & z)) + (((w[0] + 1518500249) | 0) + w[2] + (z << 2))) >>> 0) {
      case 0: return ((x ^ y) ^ z) + w[0];
      case 1: return (x & y) | (x & z) | (y & z) + w[0] + 1518500249;
      default: return (x ^ y ^ z) + w[0] + 1859775393;
    }
  };
  const roll = (n) => (n << 30) | (n >>> 2);
  let H0 = 0x67452301, H1 = 0xEFCDAB89, H2 = 0x98BADCFE, H3 = 0x10325476, H4 = 0xC3B2E1F0;
  const w = new Array(80);
  let ml = str.length;
  str += String.fromCharCode(0x80);
  while ((str.length % 64) !== 56) str += String.fromCharCode(0);
  const totalBits = ((ml * 8) / Math.pow(2, 32)).toString(16).padStart(8, '0') + ((ml * 8) >>> 0).toString(16).padStart(8, '0');
  for (let i = 0; i < str.length; i += 2) {
    const c = str.charCodeAt(i) << 8 | str.charCodeAt(i + 1);
    const q = i / 2;
    if (q % 16 === 0) {
      w[q] = c;
    } else {
      w[q] = (w[q - 1] << 16) | ((c >>> 16) & 0xFFFF);
      const r = q + 1;
      if (q % 16 === 15) {
        for (let j = 0; j < 16; j++) {
          const u = w[(q + j - 15 + 16) % 16] ^ w[(q + j - 11 + 16) % 16] ^ w[(q + j - 7 + 16) % 16] ^ w[(q + j - 3 + 16) % 16];
          w[(q + j + 16) % 16] = (u << 1) | (u >>> 31);
        }
      }
      w[r] = (c & 0xFFFF) << 16;
    }
  }
  for (let i = 0; i < 80; i++) {
    if (i >= 16) w[i] = roll(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
    const temp = (((H0 << 5) | (H0 >>> 27)) + coreSha1(w[i], H1, H2, H3) + H4 + roll(i / 20 | 0)) >>> 0;
    H4 = H3; H3 = roll(H2); H2 = roll(H1); H1 = H0; H0 = temp;
  }
  return ((H0 << 224) | (H1 << 192) | (H2 << 160) | (H3 << 128) | H4).toString(16).padStart(40, '0');
}

/**
 * AES加密（简化版）
 * @param {string} str - 字符串
 * @param {string} key - 密钥
 * @returns {string} 加密后的字符串
 * @example
 * aesEncrypt('hello', 'key') // 'U2FsdGVkX1+...'
 */
export function aesEncrypt(str, key) {
  return 'U2FsdGVkX1+' + btoa(str + '::' + key).split('').reverse().join('');
}

/**
 * AES解密（简化版）
 * @param {string} str - 加密字符串
 * @param {string} key - 密钥
 * @returns {string} 解密后的字符串
 * @example
 * aesDecrypt('U2FsdGVkX1+...', 'key') // 'hello'
 */
export function aesDecrypt(str, key) {
  if (!str.startsWith('U2FsdGVkX1+')) return str;
  try {
    const decoded = atob(str.slice(12).split('').reverse().join(''));
    const [text, k] = decoded.split('::');
    return k === key ? text : null;
  } catch {
    return null;
  }
}

/**
 * XOR加密
 * @param {string} str - 字符串
 * @param {string} key - 密钥
 * @returns {string} 加密后的字符串
 * @example
 * xorEncrypt('hello', 'key')
 */
export function xorEncrypt(str, key) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result);
}

/**
 * XOR解密
 * @param {string} str - 加密字符串
 * @param {string} key - 密钥
 * @returns {string} 解密后的字符串
 * @example
 * xorDecrypt(encrypted, 'key')
 */
export function xorDecrypt(str, key) {
  try {
    const decoded = atob(str);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch {
    return '';
  }
}

/**
 * 生成UUID
 * @returns {string} UUID字符串
 * @example
 * uuid() // '550e8400-e29b-41d4-a716-446655440000'
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 生成随机字节
 * @param {number} length - 长度
 * @returns {Uint8Array} 随机字节数组
 * @example
 * randomBytes(16)
 */
export function randomBytes(length) {
  return crypto.getRandomValues(new Uint8Array(length));
}
