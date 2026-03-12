/**
 * DOM操作工具函数
 * @module utils/dom
 */

/**
 * 元素选择器
 * @param {string} selector - 选择器
 * @param {Element} parent - 父元素
 * @returns {Element|null} 元素
 * @example
 * $('#app') // 获取id为app的元素
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * 元素选择器（多个）
 * @param {string} selector - 选择器
 * @param {Element} parent - 父元素
 * @returns {NodeList} 元素列表
 * @example
 * $$('.btn') // 获取所有.btn元素
 */
export function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * 创建元素
 * @param {string} tag - 标签名
 * @param {Object} attrs - 属性对象
 * @param {Array|string} children - 子元素
 * @returns {Element} 创建的元素
 * @example
 * createElement('div', {class: 'box'}, 'Hello')
 */
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class') {
      el.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });
  
  const childArr = Array.isArray(children) ? children : [children];
  childArr.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });
  
  return el;
}

/**
 * 添加类名
 * @param {Element} el - 元素
 * @param {...string} classes - 类名
 * @returns {Element} 元素
 * @example
 * addClass(el, 'active', 'highlight')
 */
export function addClass(el, ...classes) {
  el.classList.add(...classes);
  return el;
}

/**
 * 移除类名
 * @param {Element} el - 元素
 * @param {...string} classes - 类名
 * @returns {Element} 元素
 * @example
 * removeClass(el, 'active')
 */
export function removeClass(el, ...classes) {
  el.classList.remove(...classes);
  return el;
}

/**
 * 切换类名
 * @param {Element} el - 元素
 * @param {string} className - 类名
 * @returns {Element} 元素
 * @example
 * toggleClass(el, 'active')
 */
export function toggleClass(el, className) {
  el.classList.toggle(className);
  return el;
}

/**
 * 检查类名
 * @param {Element} el - 元素
 * @param {string} className - 类名
 * @returns {boolean} 是否包含
 * @example
 * hasClass(el, 'active')
 */
export function hasClass(el, className) {
  return el.classList.contains(className);
}

/**
 * 设置/获取数据属性
 * @param {Element} el - 元素
 * @param {string|Object} key - 键
 * @param {*} value - 值
 * @returns {*} 值
 * @example
 * data(el, 'id', '123') // 设置
 * data(el, 'id') // 获取
 */
export function data(el, key, value) {
  if (typeof key === 'object') {
    Object.entries(key).forEach(([k, v]) => el.dataset[k] = v);
    return el;
  }
  if (value !== undefined) {
    el.dataset[key] = value;
    return el;
  }
  return el.dataset[key];
}

/**
 * 设置样式
 * @param {Element} el - 元素
 * @param {string|Object} prop - 属性
 * @param {string} value - 值
 * @returns {Element} 元素
 * @example
 * css(el, 'color', 'red')
 * css(el, {color: 'red', fontSize: '14px'})
 */
export function css(el, prop, value) {
  if (typeof prop === 'object') {
    Object.assign(el.style, prop);
  } else {
    el.style[prop] = value;
  }
  return el;
}

/**
 * 获取元素位置
 * @param {Element} el - 元素
 * @returns {Object} 位置信息
 * @example
 * getPosition(el) // {top, left, width, height}
 */
export function getPosition(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
    bottom: rect.bottom + window.scrollY,
    right: rect.right + window.scrollX
  };
}

/**
 * 元素是否可见
 * @param {Element} el - 元素
 * @returns {boolean} 是否可见
 * @example
 * isVisible(el)
 */
export function isVisible(el) {
  return el.offsetParent !== null;
}

/**
 * 元素滚动到视图
 * @param {Element} el - 元素
 * @param {Object} options - 选项
 * @returns {Element} 元素
 * @example
 * scrollIntoView(el, {behavior: 'smooth'})
 */
export function scrollIntoView(el, options = {}) {
  el.scrollIntoView({ behavior: 'smooth', block: 'center', ...options });
  return el;
}

/**
 * 离屏元素
 * @param {Element} el - 元素
 * @returns {boolean} 是否离屏
 * @example
 * isOffscreen(el)
 */
export function isOffscreen(el) {
  const rect = el.getBoundingClientRect();
  return rect.right < 0 || rect.bottom < 0 ||
         rect.left > window.innerWidth || rect.top > window.innerHeight;
}

/**
 * 事件委托
 * @param {Element} parent - 父元素
 * @param {string} selector - 选择器
 * @param {string} event - 事件名
 * @param {Function} handler - 处理函数
 * @example
 * delegate(document.body, '.btn', 'click', handleClick)
 */
export function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, e => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}

/**
 * 防抖
 * @param {Function} fn - 函数
 * @param {number} delay - 延迟（毫秒）
 * @returns {Function} 防抖后的函数
 * @example
 * const debouncedFn = debounce(handleInput, 300)
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 节流
 * @param {Function} fn - 函数
 * @param {number} delay - 延迟（毫秒）
 * @returns {Function} 节流后的函数
 * @example
 * const throttledFn = throttle(handleScroll, 100)
 */
export function throttle(fn, delay = 100) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/**
 * once - 只执行一次
 * @param {Function} fn - 函数
 * @returns {Function} 只执行一次的函数
 * @example
 * const onceFn = once(initialize)
 */
export function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

/**
 * 等待
 * @param {number} ms - 毫秒
 * @returns {Promise} Promise
 * @example
 * await sleep(1000)
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 元素淡入
 * @param {Element} el - 元素
 * @returns {Promise} Promise
 * @example
 * await fadeIn(el)
 */
export async function fadeIn(el) {
  el.style.display = '';
  el.style.opacity = '0';
  const duration = 300;
  const start = performance.now();
  
  return new Promise(resolve => {
    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.style.opacity = progress;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(animate);
  });
}

/**
 * 元素淡出
 * @param {Element} el - 元素
 * @returns {Promise} Promise
 * @example
 * await fadeOut(el)
 */
export async function fadeOut(el) {
  const duration = 300;
  const start = performance.now();
  const originalOpacity = getComputedStyle(el).opacity;
  
  return new Promise(resolve => {
    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.style.opacity = originalOpacity * (1 - progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.style.display = 'none';
        resolve();
      }
    }
    requestAnimationFrame(animate);
  });
}

/**
 * 元素滑动
 * @param {Element} el - 元素
 * @param {string} direction - 方向
 * @returns {Promise} Promise
 * @example
 * await slideDown(el)
 */
export async function slideDown(el) {
  el.style.display = '';
  el.style.overflow = 'hidden';
  const height = el.scrollHeight;
  el.style.height = '0';
  
  return new Promise(resolve => {
    el.style.transition = 'height 0.3s';
    el.style.height = height + 'px';
    setTimeout(() => {
      el.style.height = '';
      el.style.overflow = '';
      resolve();
    }, 300);
  });
}

export async function slideUp(el) {
  const height = el.scrollHeight;
  el.style.overflow = 'hidden';
  
  return new Promise(resolve => {
    el.style.transition = 'height 0.3s';
    el.style.height = height + 'px';
    requestAnimationFrame(() => {
      el.style.height = '0';
      setTimeout(() => {
        el.style.display = 'none';
        el.style.height = '';
        el.style.overflow = '';
        resolve();
      }, 300);
    });
  });
}
