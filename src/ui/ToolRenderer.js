/**
 * 工具渲染器 - UI渲染层
 * @module ui/ToolRenderer
 */
import { eventBus } from '../core/EventBus.js';
import { cacheManager } from '../core/CacheManager.js';

export class ToolRenderer {
  constructor() {
    this.container = null;
    this.currentTool = null;
  }

  render() {
    this.container = document.getElementById('tool-container');
  }

  renderTool(tool, customRenderer = null) {
    if (!this.container) this.render();
    
    this.container.innerHTML = `
      <div class="tool-wrapper fade-in">
        <div class="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <span class="text-3xl">${tool.icon}</span>
              <div>
                <h2 class="text-2xl font-bold">${tool.name}</h2>
                <p class="text-gray-500 dark:text-gray-400">${tool.description || ''}</p>
              </div>
            </div>
            <button id="close-tool" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div id="tool-content">
            ${customRenderer ? '' : this.renderDefaultToolContent(tool)}
          </div>
        </div>
      </div>
    `;
    
    this.bindEvents();
    
    if (customRenderer && typeof customRenderer === 'function') {
      customRenderer(this.container.querySelector('#tool-content'), tool);
    }
  }

  renderDefaultToolContent(tool) {
    return `
      <div class="text-center py-12">
        <i class="fas fa-tools text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
        <p class="text-gray-500">工具开发中...</p>
      </div>
    `;
  }

  bindEvents() {
    document.getElementById('close-tool')?.addEventListener('click', () => {
      eventBus.emit('tool:close');
    });
  }

  clear() {
    if (this.container) {
      this.container.innerHTML = this.renderWelcome();
    }
  }

  renderWelcome() {
    return `
      <div class="glass rounded-2xl p-8 text-center">
        <h2 class="text-3xl font-bold gradient-text mb-4">欢迎使用 ToolVerse</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">从左侧选择一个工具开始使用</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div class="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
            <i class="fas fa-robot text-2xl text-indigo-500 mb-2"></i>
            <p class="text-sm font-medium">AI 智能</p>
          </div>
          <div class="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20">
            <i class="fas fa-image text-2xl text-pink-500 mb-2"></i>
            <p class="text-sm font-medium">图片处理</p>
          </div>
          <div class="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
            <i class="fas fa-code text-2xl text-green-500 mb-2"></i>
            <p class="text-sm font-medium">开发工具</p>
          </div>
          <div class="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20">
            <i class="fas fa-clock text-2xl text-yellow-500 mb-2"></i>
            <p class="text-sm font-medium">时间日期</p>
          </div>
        </div>
      </div>
    `;
  }
}
