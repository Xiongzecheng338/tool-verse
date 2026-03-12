/**
 * 侧边栏组件
 * @module ui/Sidebar
 */
import { eventBus } from '../core/EventBus.js';
import { toolRegistry } from '../core/ToolRegistry.js';

export class Sidebar {
  constructor() {
    this.element = null;
  }

  render() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    const categories = toolRegistry.getCategories();
    
    sidebar.innerHTML = `
      <nav class="p-4 space-y-2">
        <div class="mb-4">
          <button id="nav-home" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <i class="fas fa-home text-indigo-500"></i>
            <span class="font-medium">首页</span>
          </button>
        </div>
        
        <div class="border-t border-gray-200 dark:border-slate-700 pt-4 mb-2">
          <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">工具分类</h3>
        </div>
        
        <div id="category-list" class="space-y-1">
          ${categories.map(cat => this.renderCategory(cat)).join('')}
        </div>
        
        <div class="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
          <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">常用工具</h3>
          <div id="popular-tools"></div>
        </div>
      </nav>
    `;
    
    this.bindEvents();
    this.renderPopularTools();
  }

  renderCategory(categoryId) {
    const tools = toolRegistry.getByCategory(categoryId);
    const category = tools[0];
    const icon = category?.icon || '📁';
    
    return `
      <button class="category-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" data-category="${categoryId}">
        <span class="text-lg">${icon}</span>
        <span class="font-medium capitalize">${categoryId}</span>
        <span class="ml-auto text-xs text-gray-400">${tools.length}</span>
      </button>
    `;
  }

  bindEvents() {
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        eventBus.emit('category:select', category);
      });
    });

    document.getElementById('nav-home')?.addEventListener('click', () => {
      eventBus.emit('navigate:home');
    });
  }

  renderPopularTools() {
    const popular = toolRegistry.getPopular(5);
    const container = document.getElementById('popular-tools');
    if (!container) return;

    if (popular.length === 0) {
      container.innerHTML = '<p class="px-4 text-sm text-gray-400">暂无常用工具</p>';
      return;
    }

    container.innerHTML = popular.map(tool => `
      <button class="tool-btn w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" data-tool="${tool.id}">
        <span class="text-gray-400">${tool.icon}</span>
        <span class="text-sm">${tool.name}</span>
      </button>
    `).join('');

    container.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        eventBus.emit('tool:select', btn.dataset.tool);
      });
    });
  }
}
