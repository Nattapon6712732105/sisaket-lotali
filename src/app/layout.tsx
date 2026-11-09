import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ผลการออกรางวัลสลากกาชาด งานเทศกาลปีใหม่สี่เผ่าไทยศรีสะเกษ ประจำปี ๒๕๗๐',
  description: 'ระบบถ่ายทอดและประกาศผลการออกรางวัลสลากกาชาด จังหวัดศรีสะเกษ แบบ Real-time อัปเดตทุก 5 วินาที พร้อมโหมดสไลด์เวที',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&family=Chakra+Petch:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-orange-50/50 via-slate-50 to-amber-50/30 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
