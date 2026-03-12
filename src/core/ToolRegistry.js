/**
 * 工具注册器 - 管理所有工具模块
 * @module core/ToolRegistry
 */
import { eventBus } from './EventBus.js';

export class ToolRegistry {
  constructor() {
    this.tools = new Map();
    this.categories = new Map();
    this.searchIndex = [];
  }

  register(tool) {
    const { id, name, category, icon, description } = tool;
    
    if (this.tools.has(id)) {
      console.warn(`ToolRegistry: 工具 ${id} 已存在，将被覆盖`);
    }
    
    this.tools.set(id, tool);
    
    if (!this.categories.has(category)) {
      this.categories.set(category, []);
    }
    this.categories.get(category).push(id);
    
    this.searchIndex.push({ id, name, category, description, keywords: tool.keywords || [] });
    
    eventBus.emit('tool:registered', tool);
    return this;
  }

  unregister(id) {
    const tool = this.tools.get(id);
    if (tool) {
      this.tools.delete(id);
      const category = this.categories.get(tool.category);
      if (category) {
        const idx = category.indexOf(id);
        if (idx > -1) category.splice(idx, 1);
      }
      this.searchIndex = this.searchIndex.filter(t => t.id !== id);
      eventBus.emit('tool:unregistered', id);
    }
    return this;
  }

  get(id) {
    return this.tools.get(id);
  }

  getByCategory(category) {
    const ids = this.categories.get(category) || [];
    return ids.map(id => this.tools.get(id)).filter(Boolean);
  }

  getAll() {
    return Array.from(this.tools.values());
  }

  getCategories() {
    return Array.from(this.categories.keys());
  }

  search(query) {
    const q = query.toLowerCase();
    return this.searchIndex.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    );
  }

  getPopular(limit = 10) {
    const usage = JSON.parse(localStorage.getItem('tool_usage') || '{}');
    return Object.entries(usage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => this.tools.get(id))
      .filter(Boolean);
  }

  recordUsage(id) {
    const usage = JSON.parse(localStorage.getItem('tool_usage') || '{}');
    usage[id] = (usage[id] || 0) + 1;
    localStorage.setItem('tool_usage', JSON.stringify(usage));
  }
}

export const toolRegistry = new ToolRegistry();
