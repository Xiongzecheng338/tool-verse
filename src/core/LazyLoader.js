/**
 * 懒加载管理器 - 动态import按需加载
 * @module core/LazyLoader
 */
export class LazyLoader {
  constructor() {
    this.loadedModules = new Map();
    this.loadingPromises = new Map();
    this.errorHandler = null;
  }

  setErrorHandler(handler) {
    this.errorHandler = handler;
  }

  async load(modulePath, options = {}) {
    const { 
      force = false, 
      timeout = 30000,
      retries = 2 
    } = options;

    if (!force && this.loadedModules.has(modulePath)) {
      return this.loadedModules.get(modulePath);
    }

    if (this.loadingPromises.has(modulePath)) {
      return this.loadingPromises.get(modulePath);
    }

    const loadPromise = this.doLoad(modulePath, retries, timeout);
    this.loadingPromises.set(modulePath, loadPromise);

    try {
      const module = await loadPromise;
      this.loadedModules.set(modulePath, module);
      return module;
    } finally {
      this.loadingPromises.delete(modulePath);
    }
  }

  async doLoad(modulePath, retries, timeout) {
    for (let i = 0; i <= retries; i++) {
      try {
        const module = await Promise.race([
          import(/* @vite-ignore */ modulePath),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('加载超时')), timeout)
          )
        ]);
        return module;
      } catch (error) {
        if (i === retries) {
          if (this.errorHandler) {
            this.errorHandler(modulePath, error);
          }
          throw error;
        }
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
  }

  preload(modulePaths) {
    return Promise.all(modulePaths.map(p => this.load(p)));
  }

  isLoaded(modulePath) {
    return this.loadedModules.has(modulePath);
  }

  clear() {
    this.loadedModules.clear();
  }
}

export const lazyLoader = new LazyLoader();
