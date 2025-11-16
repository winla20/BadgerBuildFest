'use client';

import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

/**
 * WalletConnectPage Component
 * 
 * Dedicated page for wallet connection.
 * Adapted from Figma design to Next.js with Solana wallet adapter integration.
 */
export default function WalletConnectPage() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();

  // If wallet is already connected, redirect to profile setup
  if (connected && publicKey) {
    router.push('/profile-setup');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 flex items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-teal-200/50 p-8 md:p-10 rounded-3xl shadow-2xl shadow-teal-500/10">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Wallet className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl text-slate-900 mb-3 font-semibold">Connect Your Wallet</h2>
            <p className="text-slate-600">Choose your preferred wallet to continue</p>
          </div>

          {/* Wallet Options */}
          <div className="space-y-4 mb-8">
            {/* Solana Wallet Adapter Button */}
            <div className="w-full bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-300/50 px-6 py-5 rounded-2xl hover:from-teal-100 hover:to-cyan-100 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/20 transition-all">
              <div className="flex items-center justify-center">
                <WalletMultiButton className="!bg-transparent !border-0 !p-0 !h-auto !text-slate-900 !font-medium" />
              </div>
            </div>

            {/* Additional wallet options can be added here */}
            <div className="text-center text-sm text-slate-500">
              <p>Supported wallets: Phantom, Solflare, Gemini, and more</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <Shield className="w-4 h-4 text-teal-600" />
              <span>Secure connection powered by blockchain technology</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-slate-600 hover:text-slate-900 hover:bg-white/50 px-4 py-2 rounded-xl transition-all inline-block"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

