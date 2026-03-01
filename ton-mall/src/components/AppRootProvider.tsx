'use client';

import { PropsWithChildren, useEffect } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { logger } from '@/lib/logger';

export function AppRootProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // 初始化日志工具
    logger.init();
    console.log('Logger initialized');
  }, []);

  return (
    <AppRoot
      appearance="light"
      platform="ios"
    >
      {children}
    </AppRoot>
  );
}
