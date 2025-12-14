'use client';

import { PropsWithChildren, useEffect } from 'react';
import { init, retrieveLaunchParams } from '@telegram-apps/sdk';

export function TelegramRoot({ children }: PropsWithChildren) {
  useEffect(() => {
    try {
      const launchParams = retrieveLaunchParams();
      console.log('Telegram launch params:', launchParams);

      init();
      window.Telegram?.WebApp?.ready?.();
      window.Telegram?.WebApp?.expand?.();
    } catch (err) {
      console.warn('Not running inside Telegram Mini App, mock mode', err);

      // mock 对象，防止 UI 组件访问 Telegram 报错
      window.Telegram = {
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
