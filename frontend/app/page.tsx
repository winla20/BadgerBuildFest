'use client';

import { Shield, Zap, Award } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative px-4 sm:px-8 py-6 flex items-center justify-between backdrop-blur-sm z-10">
        <Link href="/" className="bg-white/80 backdrop-blur-md border border-teal-200/50 px-6 py-3 rounded-2xl shadow-lg shadow-teal-500/10 hover:shadow-xl hover:shadow-teal-500/20 transition-all">
          <span className="text-xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
            CredentialHub
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/employer-login">
            <Button
              variant="ghost"
              className="bg-white/80 backdrop-blur-md border border-cyan-200/50 hover:bg-white hover:shadow-lg hover:shadow-cyan-500/10"
            >
              Employer/University Login
            </Button>
          </Link>
          <WalletMultiButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-8 z-10">
        <div className="text-center mb-12 md:mb-16 space-y-6">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 md:px-8 py-3 rounded-full border border-teal-200/50 shadow-lg shadow-teal-500/10">
              <Shield className="w-5 h-5 text-teal-600" />
              <span className="text-sm text-slate-700 font-medium">Blockchain-Verified Credentials</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl tracking-tight text-slate-900 mb-6">
            <span className="block mb-2">Welcome to</span>
            <span className="block bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Credential Hub
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Manage verified credentials, connect with employers, and build your professional identity on the blockchain
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-12">
          {connected ? (
            <Link href="/dashboard">
              <Button
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-12 py-7 text-xl rounded-2xl shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/wallet-connect">
              <Button
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-12 py-7 text-xl rounded-2xl shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
          )}
          
          <p className="text-sm text-slate-500">Connect your wallet to begin</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-8">
          <div className="bg-white/70 backdrop-blur-md border border-teal-200/50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg text-slate-900 mb-2 font-semibold">Secure Verification</h3>
            <p className="text-sm text-slate-600">Blockchain-powered credential verification for ultimate trust</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md border border-cyan-200/50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg text-slate-900 mb-2 font-semibold">Instant Verification</h3>
            <p className="text-sm text-slate-600">Get verified by employers and institutions in real-time</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md border border-blue-200/50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg text-slate-900 mb-2 font-semibold">Build Reputation</h3>
            <p className="text-sm text-slate-600">Create your verified professional identity on Web3</p>
          </div>
        </div>
      </main>
    </div>
  );
}
