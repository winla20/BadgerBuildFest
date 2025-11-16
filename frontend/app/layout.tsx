import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import WalletProvider from '@/components/WalletProvider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Credential Verification Platform',
  description: 'Decentralized resume and credential verification on Solana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          {children}
          <Toaster position="top-right" />
        </WalletProvider>
      </body>
    </html>
  );
}

