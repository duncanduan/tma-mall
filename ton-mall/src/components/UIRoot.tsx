'use client';

import { PropsWithChildren } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';

export function UIRoot({ children }: PropsWithChildren) {
  return (
    <AppRoot appearance="light" platform="ios">
      {children}
    </AppRoot>
  );
}
