/**
 * 搜索引擎 - 工具检索
 * @module data/SearchEngine
 */
import { eventBus } from '../core/EventBus.js';

export class SearchEngine {
  constructor(toolRegistry) {
    this.registry = toolRegistry;
    this.recentSearches = [];
    this.initRecentSearches();
  }

  initRecentSearches() {
    try {
      this.recentSearches = JSON.parse(localStorage.getItem('recent_searches') || '[]');
    } catch {
      this.recentSearches = [];
    }
  }

  search(query) {
    if (!query || query.trim() === '') {
      return this.getAllTools();
    }

    const results = this.registry.search(query);
    this.addRecentSearch(query);
    
    eventBus.emit('search:results', results);
    return results;
  }

  getAllTools() {
    return this.registry.getAll().filter(t => !t.isCategory);
  }

  addRecentSearch(query) {
    if (!this.recentSearches.includes(query)) {
      this.recentSearches.unshift(query);
      this.recentSearches = this.recentSearches.slice(0, 10);
      localStorage.setItem('recent_searches', JSON.stringify(this.recentSearches));
    }
  }

  getRecentSearches() {
    return this.recentSearches;
  }

  clearRecentSearches() {
    this.recentSearches = [];
    localStorage.removeItem('recent_searches');
  }
}
