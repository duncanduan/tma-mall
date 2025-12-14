'use client';

import { PropsWithChildren, useEffect } from 'react';
import {
  init,
  retrieveLaunchParams,
} from '@telegram-apps/sdk';

export function TelegramRoot({ children }: PropsWithChildren) {
  useEffect(() => {
    try {
      // 如果不是在 Telegram 内，这里会抛异常
      const launchParams = retrieveLaunchParams();
      console.log('Telegram launch params:', launchParams);

      init();
      window.Telegram?.WebApp?.ready();
      window.Telegram?.WebApp?.expand();
    } catch (err) {
      // 浏览器 / Vercel 直开时会走到这里
      console.warn('Not running inside Telegram Mini App, mock mode', err);

      // 可选：给一个最小 mock，防止 UI 组件访问 Telegram 报错
      (window as any).Telegram = {
        WebApp: {
          ready() {},
          expand() {},
          close() {},
          initData: '',
          initDataUnsafe: {},
        },
      };
    }
  }, []);

  return <>{children}</>;
}
