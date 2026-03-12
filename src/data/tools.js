/**
 * 工具分类定义
 * @module data/tools
 */

export const toolCategories = [
  { id: 'ai', name: 'AI 智能', icon: '🤖', description: 'AI对话、智能生成' },
  { id: 'image', name: '图片处理', icon: '🖼️', description: '图片编辑、压缩、转换' },
  { id: 'text', name: '文本处理', icon: '📝', description: '文本格式化、转换' },
  { id: 'dev', name: '开发工具', icon: '💻', description: '代码开发辅助' },
  { id: 'time', name: '时间日期', icon: '⏰', description: '时间计算、日历' },
  { id: 'life', name: '生活实用', icon: '🏠', description: '生活常用工具' },
  { id: 'media', name: '多媒体', icon: '🎬', description: '音视频处理' },
  { id: 'entertainment', name: '休闲娱乐', icon: '🎮', description: '小游戏娱乐' },
  { id: 'data', name: '数据查询', icon: '📊', description: '数据信息聚合' },
  { id: 'finance', name: '金融财经', icon: '💰', description: '金融计算查询' },
  { id: 'education', name: '教育学习', icon: '📚', description: '学习辅助工具' },
  { id: 'health', name: '健康医疗', icon: '🏥', description: '健康计算管理' },
  { id: 'travel', name: '旅行出行', icon: '✈️', description: '旅行规划工具' },
  { id: 'food', name: '美食烹饪', icon: '🍳', description: '食谱烹饪工具' },
  { id: 'design', name: '设计创意', icon: '🎨', description: '设计辅助工具' },
  { id: 'security', name: '安全隐私', icon: '🔐', description: '加密解密工具' }
];

export const toolList = [
  // AI 智能
  { id: 'ai-chat', name: 'AI 对话助手', category: 'ai', icon: '💬', description: '智能对话交互', keywords: ['AI', 'chat', '对话', '助手'] },
  { id: 'ai-image-rec', name: '图片识别', category: 'ai', icon: '🔍', description: '图像识别分析', keywords: ['AI', '图像', '识别'] },
  { id: 'ai-translate', name: '多语言翻译', category: 'ai', icon: '🌐', description: '智能翻译', keywords: ['翻译', 'language'] },
  
  // 图片处理
  { id: 'img-compress', name: '图片压缩', category: 'image', icon: '📉', description: '批量压缩图片', keywords: ['图片', '压缩'] },
  { id: 'img-convert', name: '格式转换', category: 'image', icon: '🔄', description: '图片格式互转', keywords: ['格式', '转换'] },
  { id: 'img-watermark', name: '添加水印', category: 'image', icon: '💧', description: '图片水印添加', keywords: ['水印', 'watermark'] },
  { id: 'img-crop', name: '图片裁剪', category: 'image', icon: '✂️', description: '在线裁剪图片', keywords: ['裁剪', 'crop'] },
  { id: 'img-filter', name: '滤镜特效', category: 'image', icon: '✨', description: '图片滤镜效果', keywords: ['滤镜', 'filter'] },
  
  // 文本处理
  { id: 'text-markdown', name: 'Markdown预览', category: 'text', icon: '📄', description: 'Markdown实时预览', keywords: ['markdown', 'md'] },
  { id: 'text-qrcode', name: '二维码生成', category: 'text', icon: '⬛', description: '二维码生成解析', keywords: ['qrcode', '二维码'] },
  { id: 'text-count', name: '字数统计', category: 'text', icon: '📊', description: '文本字数统计', keywords: ['字数', '统计'] },
  { id: 'text-diff', name: '文本对比', category: 'text', icon: '🔍', description: '文本差异对比', keywords: ['diff', '对比'] },
  { id: 'text-replace', name: '批量替换', category: 'text', icon: '🔁', description: '批量文本替换', keywords: ['替换', 'replace'] },
  
  // 开发工具
  { id: 'dev-json', name: 'JSON格式化', category: 'dev', icon: '{}', description: 'JSON格式化校验', keywords: ['json', 'format'] },
  { id: 'dev-regex', name: '正则测试', category: 'dev', icon: '.*', description: '正则表达式测试', keywords: ['regex', '正则'] },
  { id: 'dev-timestamp', name: '时间戳转换', category: 'dev', icon: '🕐', description: '时间戳互转', keywords: ['timestamp', '时间戳'] },
  { id: 'dev-base64', name: 'Base64编码', category: 'dev', icon: '🔤', description: 'Base64编解码', keywords: ['base64', '编码'] },
  { id: 'dev-url', name: 'URL编码', category: 'dev', icon: '🔗', description: 'URL编解码', keywords: ['url', '编码'] },
  { id: 'dev-color', name: '颜色转换', category: 'dev', icon: '🎨', description: '颜色格式转换', keywords: ['color', '颜色'] },
  { id: 'dev-sql', name: 'SQL格式化', category: 'dev', icon: '📝', description: 'SQL语句格式化', keywords: ['sql', 'format'] },
  { id: 'dev-crypto', name: '哈希加密', category: 'dev', icon: '🔐', description: '常用加密算法', keywords: ['hash', 'md5', 'sha'] },
  
  // 时间日期
  { id: 'time-worldclock', name: '世界时钟', category: 'time', icon: '🌍', description: '全球时区时间', keywords: ['clock', '时区'] },
  { id: 'time-countdown', name: '倒计时器', category: 'time', icon: '⏳', description: '倒计时工具', keywords: ['countdown', '倒计时'] },
  { id: 'time-stopwatch', name: '秒表', category: 'time', icon: '⏱️', description: '精确计时器', keywords: ['stopwatch', '秒表'] },
  { id: 'time-calendar', name: '日历工具', category: 'time', icon: '📅', description: '万年历查询', keywords: ['calendar', '日历'] },
  { id: 'time-lunar', name: '农历转换', category: 'time', icon: '🀄', description: '公历农历转换', keywords: ['农历', 'lunar'] },
  
  // 生活实用
  { id: 'life-weather', name: '天气查询', category: 'life', icon: '🌤️', description: '实时天气查询', keywords: ['weather', '天气'] },
  { id: 'life-bmi', name: 'BMI计算', category: 'life', icon: '⚖️', description: 'BMI体质指数', keywords: ['bmi', '体重'] },
  { id: 'life-exchange', name: '汇率换算', category: 'life', icon: '💱', description: '货币汇率转换', keywords: ['exchange', '汇率'] },
  { id: 'life-unit', name: '单位换算', category: 'life', icon: '📏', description: '常用单位转换', keywords: ['unit', '单位'] },
  { id: 'life-password', name: '密码生成', category: 'life', icon: '🔑', description: '强密码生成', keywords: ['password', '密码'] },
  { id: 'life-qrscan', name: '二维码扫描', category: 'life', icon: '📱', description: '扫描二维码', keywords: ['qr', '扫描'] },
  
  // 多媒体
  { id: 'media-audio', name: '录音机', category: 'media', icon: '🎤', description: '浏览器录音', keywords: ['audio', '录音'] },
  { id: 'media-video-info', name: '视频信息', category: 'media', icon: '🎬', description: '视频信息查看', keywords: ['video', '视频'] },
  { id: 'media-gif', name: 'GIF制作', category: 'media', icon: '🎞️', description: '图片转GIF', keywords: ['gif', '动画'] },
  
  // 休闲娱乐
  { id: 'game-tetris', name: '俄罗斯方块', category: 'entertainment', icon: '🧱', description: '经典游戏', keywords: ['game', 'tetris'] },
  { id: 'game-random', name: '随机抽签', category: 'entertainment', icon: '🎲', description: '随机选择工具', keywords: ['random', '抽签'] },
  { id: 'game-decision', name: '决策助手', category: 'entertainment', icon: '🤔', description: '帮助做决定', keywords: ['decision', '决策'] },
  { id: 'game-quote', name: '每日语录', category: 'entertainment', icon: '💭', description: '励志语录', keywords: ['quote', '语录'] },
  
  // 数据查询
  { id: 'data-hotsearch', name: '实时热搜', category: 'data', icon: '🔥', description: '全网热搜聚合', keywords: ['热搜', 'hot'] },
  { id: 'data-crypto', name: '加密货币', category: 'data', icon: '₿', description: '虚拟货币行情', keywords: ['crypto', '比特币'] },
  { id: 'data-ip', name: 'IP查询', category: 'data', icon: '🌍', description: 'IP地址查询', keywords: ['ip', '查询'] },
  { id: 'data-device', name: '设备信息', category: 'data', icon: '💻', description: '浏览器设备信息', keywords: ['device', '设备'] },
  
  // 金融财经
  { id: 'finance-stock', name: '股票行情', category: 'finance', icon: '📈', description: '股票数据查询', keywords: ['stock', '股票'] },
  { id: 'finance-loan', name: '贷款计算', category: 'finance', icon: '🏦', description: '贷款还款计算', keywords: ['loan', '贷款'] },
  { id: 'finance-tax', name: '个税计算', category: 'finance', icon: '💵', description: '个人所得税计算', keywords: ['tax', '个税'] },
  { id: 'finance-invest', name: '投资计算', category: 'finance', icon: '💰', description: '投资收益计算', keywords: ['invest', '投资'] },
  
  // 教育学习
  { id: 'edu-flashcard', name: '记忆卡片', category: 'education', icon: '🗂️', description: '记忆学习卡片', keywords: ['flashcard', '记忆'] },
  { id: 'edu-pomodoro', name: '番茄钟', category: 'education', icon: '🍅', description: '专注时间管理', keywords: ['pomodoro', '专注'] },
  { id: 'edu-notes', name: '便签笔记', category: 'education', icon: '📝', description: '快捷笔记工具', keywords: ['notes', '笔记'] },
  { id: 'edu-spell', name: '拼写检查', category: 'education', icon: '✅', description: '英文拼写检查', keywords: ['spell', '拼写'] },
  
  // 健康医疗
  { id: 'health-bmi', name: 'BMI计算', category: 'health', icon: '⚖️', description: '身体质量指数', keywords: ['bmi', '体质'] },
  { id: 'health-calories', name: '卡路里计算', category: 'health', icon: '🔥', description: '食物卡路里', keywords: ['calories', '卡路里'] },
  { id: 'health-heart', name: '心率计算', category: 'health', icon: '❤️', description: '心率健康计算', keywords: ['heart', '心率'] },
  { id: 'health-sleep', name: '睡眠计算', category: 'health', icon: '😴', description: '睡眠周期计算', keywords: ['sleep', '睡眠'] },
  
  // 旅行出行
  { id: 'travel-translate', name: '旅行翻译', category: 'travel', icon: '🗣️', description: '常用旅游翻译', keywords: ['translate', '翻译'] },
  { id: 'travel-tip', name: '小费计算', category: 'travel', icon: '💲', description: '旅行小费计算', keywords: ['tip', '小费'] },
  { id: 'travel-timezone', name: '时区查询', category: 'travel', icon: '🌐', description: '全球时区对照', keywords: ['timezone', '时区'] },
  
  // 美食烹饪
  { id: 'food-recipe', name: '食谱查询', category: 'food', icon: '🍳', description: '菜谱做法', keywords: ['recipe', '食谱'] },
  { id: 'food-portion', name: '份量计算', category: 'food', icon: '🥗', description: '烹饪份量换算', keywords: ['portion', '份量'] },
  { id: 'food-temperature', name: '温度换算', category: 'food', icon: '🌡️', description: '烹饪温度换算', keywords: ['temperature', '温度'] },
  
  // 设计创意
  { id: 'design-gradient', name: '渐变生成', category: 'design', icon: '🌈', description: 'CSS渐变生成', keywords: ['gradient', '渐变'] },
  { id: 'design-shadow', name: '阴影生成', category: 'design', icon: '🖼️', description: 'CSS阴影生成', keywords: ['shadow', '阴影'] },
  { id: 'design-icon', name: '图标选择', category: 'design', icon: '⭐', description: '图标库选择', keywords: ['icon', '图标'] },
  { id: 'design-palette', name: '调色板', category: 'design', icon: '🎨', description: '配色方案生成', keywords: ['color', 'palette'] },
  
  // 安全隐私
  { id: 'security-encrypt', name: '文字加密', category: 'security', icon: '🔒', description: '文本加密解密', keywords: ['encrypt', '加密'] },
  { id: 'security-jwt', name: 'JWT解码', category: 'security', icon: '🔓', description: 'JWT Token解析', keywords: ['jwt', 'token'] },
  { id: 'security-hash', name: '哈希生成', category: 'security', icon: '#️⃣', description: '字符串哈希', keywords: ['hash', 'md5'] },
  { id: 'security-password', name: '密码强度', category: 'security', icon: '🔐', description: '密码强度检测', keywords: ['password', '强度'] }
];
