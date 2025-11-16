'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { verificationApi } from '@/lib/api';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const credentialId = searchParams.get('credentialId');
  const ownerDid = searchParams.get('ownerDid');

  const [verification, setVerification] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (credentialId && ownerDid) {
      verifyCredential();
    }
  }, [credentialId, ownerDid]);

  const verifyCredential = async () => {
    if (!credentialId || !ownerDid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await verificationApi.verify(credentialId, ownerDid);
      setVerification(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'NOT_VERIFIED':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'NO_ATTESTATION':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Verify Credential</h1>

        {loading ? (
          <p>Verifying credential...</p>
        ) : error ? (
          <div className="p-4 bg-red-100 border border-red-400 rounded text-red-700">
            {error}
          </div>
        ) : verification ? (
          <div className="space-y-6">
            <div className={`p-6 border-2 rounded-lg ${getStatusColor(verification.status)}`}>
              <h2 className="text-2xl font-semibold mb-2">Status: {verification.status}</h2>
              <p>{verification.message}</p>
            </div>

            {verification.credential && (
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Credential Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-semibold">Title:</dt>
                    <dd>{verification.credential.title}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Issuer:</dt>
                    <dd>{verification.credential.issuer}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Type:</dt>
                    <dd className="capitalize">{verification.credential.type}</dd>
                  </div>
                  {verification.credential.start_date && (
                    <div>
                      <dt className="font-semibold">Period:</dt>
                      <dd>
                        {verification.credential.start_date}
                        {verification.credential.end_date
                          ? ` - ${verification.credential.end_date}`
                          : ''}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {verification.attestation && (
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Attestation</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-semibold">Institution:</dt>
                    <dd>{verification.attestation.institution}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Timestamp:</dt>
                    <dd>{new Date(verification.attestation.timestamp).toLocaleString()}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
            Please provide credential ID and owner DID to verify
          </div>
        )}
      </div>
    </main>
  );
}

