/**
 * 事件总线 - 模块间通信机制
 * @module core/EventBus
 */
export class EventBus {
  constructor() {
    this.events = new Map();
    this.maxListeners = 10;
  }

  on(event, callback, context = null) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    const listeners = this.events.get(event);
    if (listeners.length >= this.maxListeners) {
      console.warn(`EventBus: 超过最大监听器数量 ${this.maxListeners}`);
    }
    listeners.push({ callback, context });
    return this;
  }

  once(event, callback, context = null) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      callback.apply(context, args);
    };
    return this.on(event, wrapper, context);
  }

  off(event, callback) {
    if (!event) {
      this.events.clear();
      return this;
    }
    if (!callback) {
      this.events.delete(event);
      return this;
    }
    const listeners = this.events.get(event);
    if (listeners) {
      this.events.set(event, listeners.filter(l => l.callback !== callback));
    }
    return this;
  }

  emit(event, ...args) {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(({ callback, context }) => {
        try {
          callback.apply(context, args);
        } catch (error) {
          console.error(`EventBus: 事件 ${event} 执行错误:`, error);
        }
      });
    }
    return this;
  }

  clear() {
    this.events.clear();
  }
}

export const eventBus = new EventBus();
