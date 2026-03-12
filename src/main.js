/**
 * 工具Verse 主入口文件
 * @module main
 */

import { App } from './core/App.js';
import { EventBus } from './core/EventBus.js';
import { ToolRegistry } from './core/ToolRegistry.js';
import { ThemeManager } from './core/ThemeManager.js';
import { LazyLoader } from './core/LazyLoader.js';
import { CacheManager } from './core/CacheManager.js';

const app = new App();

window.addEventListener('DOMContentLoaded', async () => {
  await app.init();
  
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.opacity = '0';
    setTimeout(() => loading.remove(), 300);
  }
});

window.ToolVerse = {
  app,
  EventBus,
  ToolRegistry,
  ThemeManager,
  LazyLoader,
  CacheManager
};
