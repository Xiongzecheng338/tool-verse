/**
 * 网络请求工具函数
 * @module utils/network
 */

/**
 * GET请求
 * @param {string} url - 请求URL
 * @param {Object} options - 选项
 * @returns {Promise} Promise
 * @example
 * await get('/api/user')
 */
export async function get(url, options = {}) {
  return request(url, { ...options, method: 'GET' });
}

/**
 * POST请求
 * @param {string} url - 请求URL
 * @param {*} data - 数据
 * @param {Object} options - 选项
 * @returns {Promise} Promise
 * @example
 * await post('/api/user', {name: 'test'})
 */
export async function post(url, data, options = {}) {
  return request(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
}

/**
 * PUT请求
 * @param {string} url - 请求URL
 * @param {*} data - 数据
 * @param {Object} options - 选项
 * @returns {Promise} Promise
 */
export async function put(url, data, options = {}) {
  return request(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
}

/**
 * DELETE请求
 * @param {string} url - 请求URL
 * @param {Object} options - 选项
 * @returns {Promise} Promise
 */
export async function del(url, options = {}) {
  return request(url, { ...options, method: 'DELETE' });
}

/**
 * 通用请求
 * @param {string} url - 请求URL
 * @param {Object} options - 选项
 * @returns {Promise} Promise
 */
export async function request(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null,
    timeout = 30000,
    credentials = 'same-origin',
    cache = 'default'
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      credentials,
      cache,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return { ok: response.ok, status: response.status, data, headers: response.headers };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('请求超时');
    }
    throw error;
  }
}

/**
 * JSONP请求
 * @param {string} url - 请求URL
 * @param {string} callback - 回调函数名
 * @returns {Promise} Promise
 * @example
 * await jsonp('/api?callback=handleData', 'handleData')
 */
export function jsonp(url, callback) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timeout = setTimeout(() => {
      reject(new Error('JSONP请求超时'));
      script.remove();
    }, 10000);

    window[callback] = (data) => {
      clearTimeout(timeout);
      resolve(data);
      script.remove();
      delete window[callback];
    };

    script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + callback;
    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('JSONP请求失败'));
      script.remove();
    };
    document.head.appendChild(script);
  });
}

/**
 * 上传文件
 * @param {string} url - 请求URL
 * @param {File|FormData} file - 文件
 * @param {Function} onProgress - 进度回调
 * @returns {Promise} Promise
 * @example
 * await uploadFile('/api/upload', file, (p) => console.log(p))
 */
export function uploadFile(url, file, onProgress = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`上传失败: ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('上传失败')));
    xhr.open('POST', url);
    xhr.send(formData);
  });
}

/**
 * 下载文件
 * @param {string} url - 文件URL
 * @param {string} filename - 文件名
 * @returns {void}
 * @example
 * downloadFile('https://example.com/file.pdf', 'file.pdf')
 */
export function downloadFile(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}

/**
 * 轮询请求
 * @param {Function} requestFn - 请求函数
 * @param {Function} checkFn - 检查函数
 * @param {number} interval - 间隔（毫秒）
 * @param {number} maxAttempts - 最大次数
 * @returns {Promise} Promise
 * @example
 * await poll(() => fetch('/api/status'), (res) => res.done, 1000, 30)
 */
export async function poll(requestFn, checkFn, interval = 1000, maxAttempts = 10) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const result = await requestFn();
    if (checkFn(result)) return result;
    await new Promise(r => setTimeout(r, interval));
    attempts++;
  }
  throw new Error('轮询超时');
}

/**
 * 并发请求限制
 * @param {Array} tasks - 任务数组
 * @param {number} limit - 并发限制
 * @returns {Promise} Promise
 * @example
 * await concurrentLimit([() => fetch('/api/1'), () => fetch('/api/2')], 2)
 */
export async function concurrentLimit(tasks, limit = 3) {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);
    
    if (limit <= tasks.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  
  return Promise.all(results);
}

/**
 * 重试请求
 * @param {Function} fn - 请求函数
 * @param {number} retries - 重试次数
 * @param {number} delay - 延迟（毫秒）
 * @returns {Promise} Promise
 * @example
 * await retry(() => fetch('/api'), 3, 1000)
 */
export async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(r => setTimeout(r, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

/**
 * 检查网络状态
 * @returns {boolean} 是否在线
 * @example
 * isOnline() // true/false
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * 获取网络类型
 * @returns {string} 网络类型
 * @example
 * getNetworkType() // '4g'/'wifi'/etc
 */
export function getNetworkType() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return connection?.effectiveType || 'unknown';
}
