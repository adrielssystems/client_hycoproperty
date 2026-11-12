import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { TenantAuthProvider } from '@/context/TenantAuthContext';

export const viewport: Viewport = {
  themeColor: '#070D18',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'HYCO Property Management — Tenant Portal (PWA)',
  description: 'Self-service tenant portal for rent payments, live Hikvision CCTV, 24/7 maintenance helpdesk, and building announcements.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HYCO Portal',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="bg-[#070D18] text-[#F8FAFC] antialiased selection:bg-[#D4AF37]/30 selection:text-white">
        <LanguageProvider>
          <TenantAuthProvider>
            {children}
          </TenantAuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
