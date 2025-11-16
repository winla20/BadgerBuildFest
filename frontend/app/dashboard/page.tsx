'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { credentialsApi } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const [credentials, setCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected && publicKey) {
      loadCredentials();
    }
  }, [connected, publicKey]);

  const loadCredentials = async () => {
    if (!publicKey) return;

    try {
      setLoading(true);
      const response = await credentialsApi.getAll(publicKey.toBase58());
      setCredentials(response.data.credentials || []);
    } catch (error: any) {
      console.error('Failed to load credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p>Please connect your wallet to view your credentials</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Credentials</h1>
          <Link
            href="/upload"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Resume
          </Link>
        </div>

        {loading ? (
          <p>Loading credentials...</p>
        ) : credentials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No credentials found</p>
            <Link
              href="/upload"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upload Your First Resume
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.map((cred, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{cred.title}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs capitalize">
                    {cred.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{cred.issuer}</p>
                {cred.start_date && (
                  <p className="text-sm text-gray-500 mb-4">
                    {cred.start_date} {cred.end_date ? `- ${cred.end_date}` : ''}
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/verify?credentialId=${cred.credential_id}&ownerDid=${cred.owner_did}`}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Verify
                  </Link>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                    Publish to Chain
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

