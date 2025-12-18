'use client';

import { PropsWithChildren } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export function TonConnectProvider({ children }: PropsWithChildren) {
  return (
    <TonConnectUIProvider
      manifestUrl="https://tma-mall-6sbf.vercel.app/tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/ton_mall_bot',
      }}
    >
      {children}
    </TonConnectUIProvider>
  );
}
