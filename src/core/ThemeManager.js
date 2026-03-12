/**
 * 主题管理器 - 深色/浅色模式切换
 * @module core/ThemeManager
 */
export class ThemeManager {
  constructor() {
    this.theme = 'auto';
    this.darkClass = 'dark';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  }

  init() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.theme = saved;
    }
    this.apply();
    this.mediaQuery.addEventListener('change', () => this.apply());
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.apply();
    });
  }

  apply() {
    const isDark = this.theme === 'dark' || 
      (this.theme === 'auto' && this.mediaQuery.matches);
    document.documentElement.classList.toggle(this.darkClass, isDark);
    localStorage.setItem('theme', this.theme);
  }

  toggle() {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else if (this.theme === 'dark') {
      this.theme = 'auto';
    } else {
      this.theme = 'light';
    }
    this.apply();
    return this.theme;
  }

  setTheme(theme) {
    this.theme = theme;
    this.apply();
  }

  isDark() {
    return this.theme === 'dark' || 
      (this.theme === 'auto' && this.mediaQuery.matches);
  }
}

export const themeManager = new ThemeManager();
