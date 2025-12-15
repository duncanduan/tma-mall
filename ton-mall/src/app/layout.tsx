// app/layout.tsx (Server Component)
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import { AppRootProvider } from '@/components/AppRootProvider';

export const metadata: Metadata = {
  title: 'TON Mall',
  description: 'Telegram Mini App Mall',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <AppRootProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
        </AppRootProvider>
      </body>
    </html>
  );
}
