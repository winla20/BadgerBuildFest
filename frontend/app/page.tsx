'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';

export default function Home() {
  const { connected, publicKey } = useWallet();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Credential Verification Platform</h1>
          <WalletMultiButton />
        </div>

        {connected && publicKey ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Link href="/dashboard" className="card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
              <p className="text-gray-600">View and manage your credentials</p>
            </Link>

            <Link href="/upload" className="card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2">Upload Resume</h2>
              <p className="text-gray-600">Upload your resume to extract credentials</p>
            </Link>

            <Link href="/verify" className="card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2">Verify Credential</h2>
              <p className="text-gray-600">Verify a credential's authenticity</p>
            </Link>

            <Link href="/institution" className="card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2">Institution Portal</h2>
              <p className="text-gray-600">Sign and attest credentials</p>
            </Link>
          </div>
        ) : (
          <div className="text-center mt-16">
            <h2 className="text-2xl mb-4">Connect your wallet to get started</h2>
            <p className="text-gray-600">Use Phantom, Solflare, or Gemini Wallet</p>
          </div>
        )}

        <div className="mt-16 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Connect your Solana wallet and create your DID identity</li>
            <li>Upload your resume to extract verifiable credentials</li>
            <li>Publish credential hash commitments to Solana blockchain</li>
            <li>Request institutional attestations for your credentials</li>
            <li>Employers can verify credentials independently through the platform</li>
          </ol>
        </div>
      </div>
    </main>
  );
}

