/**
 * 头部组件
 * @module ui/Header
 */
import { eventBus } from '../core/EventBus.js';
import { themeManager } from '../core/ThemeManager.js';

export class Header {
  constructor() {
    this.element = null;
  }

  render() {
    const header = document.getElementById('header');
    if (!header) return;
    
    header.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold gradient-text">ToolVerse</h1>
          <span class="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full">Pro</span>
        </div>
        
        <div class="flex-1 max-w-xl mx-8">
          <div class="relative">
            <input 
              type="text" 
              id="search-input"
              placeholder="搜索工具..." 
              class="input-field pl-10"
            >
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <button id="theme-toggle" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            <i class="fas fa-moon dark:hidden"></i>
            <i class="fas fa-sun hidden dark:inline"></i>
          </button>
          <button class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            <i class="fas fa-cog"></i>
          </button>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  bindEvents() {
    const searchInput = document.getElementById('search-input');
    const themeToggle = document.getElementById('theme-toggle');
    
    let searchTimeout;
    searchInput?.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        eventBus.emit('search:query', e.target.value);
      }, 300);
    });
    
    themeToggle?.addEventListener('click', () => {
      themeManager.toggle();
    });
  }
}
