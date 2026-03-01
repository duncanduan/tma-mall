// 日志工具，用于发送前端日志到服务器

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

interface LogOptions {
  context?: any;
  silent?: boolean;
}

class Logger {
  private originalConsole: Record<string, Function> = {};
  private isInitialized = false;

  init() {
    if (this.isInitialized) return;

    // 保存原始console方法
    this.originalConsole.log = console.log;
    this.originalConsole.warn = console.warn;
    this.originalConsole.error = console.error;
    this.originalConsole.debug = console.debug;

    // 重写console方法
    console.log = (...args) => this.log(LogLevel.INFO, args);
    console.warn = (...args) => this.log(LogLevel.WARN, args);
    console.error = (...args) => this.log(LogLevel.ERROR, args);
    console.debug = (...args) => this.log(LogLevel.DEBUG, args);

    this.isInitialized = true;
  }

  private log(level: LogLevel, args: any[]) {
    // 调用原始console方法
    this.originalConsole[level]?.(...args);

    // 构建日志消息
    const message = args.map(arg => {
      try {
        return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
      } catch {
        return String(arg);
      }
    }).join(' ');

    // 发送日志到服务器
    this.sendLog(message, level);
  }

  async sendLog(message: string, level: LogLevel = LogLevel.INFO, options: LogOptions = {}) {
    if (options.silent) return;

    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          level,
          context: options.context,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      // 日志发送失败时，使用原始console记录
      this.originalConsole.error('Failed to send log:', error);
    }
  }

  // 手动发送日志
  info(message: string, options?: LogOptions) {
    this.sendLog(message, LogLevel.INFO, options);
  }

  warn(message: string, options?: LogOptions) {
    this.sendLog(message, LogLevel.WARN, options);
  }

  error(message: string, options?: LogOptions) {
    this.sendLog(message, LogLevel.ERROR, options);
  }

  debug(message: string, options?: LogOptions) {
    this.sendLog(message, LogLevel.DEBUG, options);
  }
}

export const logger = new Logger();
