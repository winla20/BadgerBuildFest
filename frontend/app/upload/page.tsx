'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { resumeApi } from '@/lib/api';
import { PublicKey } from '@solana/web3.js';

export default function UploadPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [credentials, setCredentials] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!connected || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const response = await resumeApi.upload(file, publicKey.toBase58());
      setCredentials(response.data.credentials);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    multiple: false,
  });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload Resume</h1>

        {!connected && (
          <div className="p-4 bg-yellow-100 border border-yellow-400 rounded mb-6">
            Please connect your wallet to upload a resume
          </div>
        )}

        <div
          {...getRootProps()}
          className={`p-12 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} disabled={uploading} />
          {uploading ? (
            <p className="text-lg">Uploading and parsing resume...</p>
          ) : isDragActive ? (
            <p className="text-lg">Drop your resume here...</p>
          ) : (
            <div>
              <p className="text-lg mb-2">
                Drag and drop your resume here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, DOCX, TXT, MD
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded text-red-700">
            {error}
          </div>
        )}

        {credentials.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Extracted Credentials ({credentials.length})
            </h2>
            <div className="space-y-4">
              {credentials.map((cred, idx) => (
                <div key={idx} className="p-4 bg-white rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{cred.title}</h3>
                      <p className="text-gray-600">{cred.issuer}</p>
                      <p className="text-sm text-gray-500 capitalize">{cred.type}</p>
                      {cred.start_date && (
                        <p className="text-sm text-gray-500">
                          {cred.start_date} {cred.end_date ? `- ${cred.end_date}` : ''}
                        </p>
                      )}
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {cred.credential_id.substring(0, 8)}...
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Dashboard
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

