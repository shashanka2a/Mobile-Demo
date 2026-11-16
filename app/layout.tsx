import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'UtilityVision | Mobile Demo',
  description:
    'Experience UtilityVision FieldWorker converted from React Native to Next.js App Router. Features daily logs, chemical tracking with dosage guards, equipment pre-trip canvas signatures, JSA emergency plans, and automated daily compliance reports.',
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#FF6633',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#151517] text-white antialiased selection:bg-[#FF6633] selection:text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
