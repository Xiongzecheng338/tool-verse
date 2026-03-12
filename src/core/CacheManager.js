/**
 * 缓存管理器 - LRU内存缓存 + Storage缓存
 * @module core/CacheManager
 */
export class CacheManager {
  constructor(options = {}) {
    this.memoryCache = new Map();
    this.maxMemorySize = options.maxMemorySize || 100;
    this.memoryTTL = options.memoryTTL || 5 * 60 * 1000;
    this.storagePrefix = options.storagePrefix || 'tv_cache_';
  }

  set(key, value, options = {}) {
    const { useMemory = true, useStorage = false, ttl = this.memoryTTL } = options;
    
    if (useMemory) {
      if (this.memoryCache.size >= this.maxMemorySize) {
        const firstKey = this.memoryCache.keys().next().value;
        this.memoryCache.delete(firstKey);
      }
      this.memoryCache.set(key, {
        value,
        expire: ttl > 0 ? Date.now() + ttl : null
      });
    }
    
    if (useStorage && typeof localStorage !== 'undefined') {
      const storageKey = this.storagePrefix + key;
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          value,
          expire: ttl > 0 ? Date.now() + ttl : null
        }));
      } catch (e) {
        console.warn('CacheManager: localStorage已满', e);
      }
    }
    
    return this;
  }

  get(key, options = {}) {
    const { useMemory = true, useStorage = true } = options;
    
    if (useMemory) {
      const memItem = this.memoryCache.get(key);
      if (memItem) {
        if (!memItem.expire || memItem.expire > Date.now()) {
          return memItem.value;
        }
        this.memoryCache.delete(key);
      }
    }
    
    if (useStorage && typeof localStorage !== 'undefined') {
      const storageKey = this.storagePrefix + key;
      try {
        const item = localStorage.getItem(storageKey);
        if (item) {
          const { value, expire } = JSON.parse(item);
          if (!expire || expire > Date.now()) {
            return value;
          }
          localStorage.removeItem(storageKey);
        }
      } catch (e) {
        console.warn('CacheManager: 读取缓存失败', e);
      }
    }
    
    return null;
  }

  has(key) {
    return this.get(key, { useStorage: false }) !== null ||
           this.get(key, { useMemory: false }) !== null;
  }

  delete(key) {
    this.memoryCache.delete(key);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storagePrefix + key);
    }
    return this;
  }

  clear() {
    this.memoryCache.clear();
    if (typeof localStorage !== 'undefined') {
      Object.keys(localStorage)
        .filter(k => k.startsWith(this.storagePrefix))
        .forEach(k => localStorage.removeItem(k));
    }
    return this;
  }

  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.memoryCache) {
      if (item.expire && item.expire <= now) {
        this.memoryCache.delete(key);
      }
    }
  }
}

export const cacheManager = new CacheManager();
setInterval(() => cacheManager.cleanup(), 60000);
