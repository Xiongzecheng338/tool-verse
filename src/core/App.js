/**
 * 应用主类 - 核心逻辑层
 * @module core/App
 */
import { eventBus } from './EventBus.js';
import { themeManager } from './ThemeManager.js';
import { toolRegistry } from './ToolRegistry.js';
import { lazyLoader } from './LazyLoader.js';
import { CacheManager } from './CacheManager.js';
import { ToolRenderer } from '../ui/ToolRenderer.js';
import { Header } from '../ui/Header.js';
import { Sidebar } from '../ui/Sidebar.js';
import { SearchEngine } from '../data/SearchEngine.js';
import { toolCategories, toolList } from '../data/tools.js';

export class App {
  constructor() {
    this.renderer = null;
    this.header = null;
    this.sidebar = null;
    this.searchEngine = null;
    this.currentTool = null;
    this.isInitialized = false;
  }

  async init() {
    try {
      themeManager.init();
      
      this.initEventBus();
      this.initUI();
      this.registerTools();
      this.initSearch();
      
      this.isInitialized = true;
      eventBus.emit('app:ready', this);
      
      console.log('Tool-Verse 已初始化');
    } catch (error) {
      console.error('应用初始化失败:', error);
      this.showError('应用初始化失败，请刷新页面');
    }
  }

  initEventBus() {
    eventBus.on('tool:select', (toolId) => this.loadTool(toolId));
    eventBus.on('tool:close', () => this.closeTool());
    eventBus.on('theme:toggle', () => themeManager.toggle());
    eventBus.on('search:query', (query) => this.search(query));
    eventBus.on('app:error', (error) => this.handleError(error));
  }

  initUI() {
    const app = document.getElementById('app');
    app.innerHTML = this.renderMainLayout();
    
    this.header = new Header();
    this.sidebar = new Sidebar();
    this.renderer = new ToolRenderer();
    
    this.header.render();
    this.sidebar.render();
  }

  renderMainLayout() {
    return `
      <canvas id="bg-canvas" class="fixed inset-0 -z-10 opacity-30"></canvas>
      <div class="min-h-screen flex flex-col">
        <header id="header" class="sticky top-0 z-30 glass-dark"></header>
        <div class="flex flex-1 pt-16">
          <aside id="sidebar" class="w-64 fixed left-0 top-16 bottom-0 overflow-y-auto hide-scrollbar"></aside>
          <main id="main-content" class="flex-1 ml-64 p-6">
            <div id="tool-container"></div>
          </main>
        </div>
      </div>
    `;
  }

  registerTools() {
    toolCategories.forEach(cat => {
      toolRegistry.register({
        id: cat.id,
        name: cat.name,
        category: 'category',
        icon: cat.icon,
        description: cat.description,
        isCategory: true
      });
    });
    
    toolList.forEach(tool => toolRegistry.register(tool));
  }

  initSearch() {
    this.searchEngine = new SearchEngine(toolRegistry);
  }

  async loadTool(toolId) {
    const tool = toolRegistry.get(toolId);
    if (!tool) {
      console.warn(`工具 ${toolId} 不存在`);
      return;
    }
    
    toolRegistry.recordUsage(toolId);
    this.currentTool = tool;
    
    if (tool.lazy && tool.component) {
      try {
        const module = await lazyLoader.load(tool.component);
        this.renderer.renderTool(tool, module.default || module);
      } catch (error) {
        console.error('加载工具失败:', error);
        this.showError('工具加载失败');
      }
    } else {
      this.renderer.renderTool(tool);
    }
    
    eventBus.emit('tool:loaded', tool);
  }

  closeTool() {
    this.currentTool = null;
    this.renderer.clear();
    eventBus.emit('tool:closed');
  }

  search(query) {
    return this.searchEngine.search(query);
  }

  handleError(error) {
    console.error('应用错误:', error);
    this.showError(error.message || '发生错误');
  }

  showError(message) {
    const container = document.getElementById('tool-container');
    if (container) {
      container.innerHTML = `
        <div class="glass rounded-xl p-8 text-center">
          <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
          <p class="text-gray-600 dark:text-gray-300">${message}</p>
        </div>
      `;
    }
  }
}
