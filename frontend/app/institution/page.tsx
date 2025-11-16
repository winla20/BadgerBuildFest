'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { institutionApi } from '@/lib/api';

export default function InstitutionPage() {
  const { publicKey, connected } = useWallet();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPendingRequests = async () => {
    if (!connected || !publicKey) {
      setError('Please connect your institution wallet');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await institutionApi.getPending(publicKey.toBase58());
      setRequests(response.data.requests || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAttest = async (credentialId: string) => {
    if (!publicKey) return;

    // In production, sign the credential hash with institution private key
    // For MVP, we'll use a placeholder signature
    const signature = 'placeholder_signature_' + Date.now();

    try {
      await institutionApi.attest(publicKey.toBase58(), credentialId, signature);
      alert('Attestation created successfully');
      loadPendingRequests();
    } catch (err: any) {
      alert('Failed to create attestation: ' + (err.response?.data?.error || err.message));
    }
  };

  if (!connected) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Institution Portal</h1>
          <p>Please connect your institution wallet</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Institution Portal</h1>
          <button
            onClick={loadPendingRequests}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load Pending Requests
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p>Loading pending requests...</p>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No pending verification requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="p-6 bg-white rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{req.credential.title}</h3>
                    <p className="text-gray-600">{req.credential.issuer}</p>
                    <p className="text-sm text-gray-500 capitalize">{req.credential.type}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Requested: {new Date(req.requested_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAttest(req.credential_id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Sign & Attest
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

