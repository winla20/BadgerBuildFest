'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { institutionApi } from '@/lib/api';
import { GraduationCap, CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface VerificationRequest {
  id: string;
  studentName: string;
  credential: string;
  date: string;
}

/**
 * InstitutionDashboardPage Component
 * 
 * Enhanced institution dashboard matching Figma design.
 * Combines existing functionality with beautiful UI.
 */
export default function InstitutionDashboardPage() {
  const { publicKey, connected } = useWallet();
  const [pendingRequests, setPendingRequests] = useState<VerificationRequest[]>([]);
  const [approvedRequests, setApprovedRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for approved requests (can be replaced with API call)
  const mockApprovedRequests: VerificationRequest[] = [
    { id: '4', studentName: 'Bob Jones', credential: 'BS Computer Science', date: '2023-12-20' },
    { id: '5', studentName: 'Emma Wilson', credential: 'MS Data Science', date: '2023-12-18' },
  ];

  const loadPendingRequests = async () => {
    if (!connected || !publicKey) {
      setError('Please connect your institution wallet');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await institutionApi.getPending(publicKey.toBase58());
      // Transform API response to match our interface
      const transformed = (response.data.requests || []).map((req: any) => ({
        id: req.credential_id || req.id,
        studentName: req.student_name || 'Student',
        credential: req.credential?.title || 'Credential',
        date: new Date(req.requested_at || Date.now()).toISOString().split('T')[0],
      }));
      setPendingRequests(transformed);
      setApprovedRequests(mockApprovedRequests);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load requests');
      // Use mock data on error for demo
      setPendingRequests([
        { id: '1', studentName: 'Alice Smith', credential: 'Bachelor of Computer Science', date: '2024-01-15' },
        { id: '2', studentName: 'John Doe', credential: 'Master of Engineering', date: '2024-01-14' },
        { id: '3', studentName: 'Sarah Johnson', credential: 'PhD in Physics', date: '2024-01-12' },
      ]);
      setApprovedRequests(mockApprovedRequests);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    if (!publicKey) return;

    const request = pendingRequests.find(r => r.id === requestId);
    if (!request) return;

    // In production, sign the credential hash with institution private key
    const signature = 'placeholder_signature_' + Date.now();

    try {
      await institutionApi.attest(publicKey.toBase58(), requestId, signature);
      alert(`Verified ${request.studentName}'s ${request.credential}`);
      loadPendingRequests();
    } catch (err: any) {
      alert('Failed to create attestation: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleRejectRequest = (requestId: string) => {
    alert('Request rejected');
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 flex items-center justify-center px-4 sm:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Institution Portal</h1>
          <p className="text-slate-600">Please connect your institution wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-teal-200/50 px-4 sm:px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl md:text-5xl text-slate-900">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Institution Dashboard
            </span>
          </h1>
          <Link href="/" className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-white/50 transition-all">
            Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-end">
            <button
              onClick={loadPendingRequests}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all shadow-lg"
            >
              {loading ? 'Loading...' : 'Load Pending Requests'}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-xl text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
            {/* Left Sidebar - School Profile */}
            <div className="bg-white/80 backdrop-blur-xl border border-purple-200/50 p-6 md:p-8 rounded-3xl shadow-xl h-fit lg:sticky lg:top-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-purple-500 flex items-center justify-center bg-white mb-6 relative shadow-lg">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-purple-500 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl text-slate-900 mb-6 font-semibold">School Profile</h2>
                
                <div className="w-full">
                  <h3 className="text-purple-700 mb-3 font-medium">School Name</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Massachusetts Institute of Technology
                  </p>
                  
                  <h3 className="text-purple-700 mb-3 font-medium">About</h3>
                  <div className="space-y-2">
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <div className="h-1.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
                    <div className="h-1.5 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Action Sections */}
            <div className="space-y-6">
              {/* Pending Requests */}
              <div className="bg-white/80 backdrop-blur-xl border border-orange-200/50 p-6 md:p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl md:text-3xl text-slate-900 mb-8">
                  <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    Pending Requests
                  </span>
                </h2>

                {loading ? (
                  <p className="text-slate-600">Loading pending requests...</p>
                ) : pendingRequests.length === 0 ? (
                  <p className="text-slate-600">No pending requests. Click "Load Pending Requests" to fetch.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200/50 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-lg hover:shadow-orange-500/10 transition-all"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg text-slate-900 font-medium">{request.studentName}</h3>
                          <p className="text-sm text-slate-600">{request.credential}</p>
                          <p className="text-xs text-slate-500 mt-1">{request.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveRequest(request.id)}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Approved Requests */}
              <div className="bg-white/80 backdrop-blur-xl border border-emerald-200/50 p-6 md:p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl md:text-3xl text-slate-900 mb-8">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Approved Requests
                  </span>
                </h2>

                <div className="space-y-3">
                  {approvedRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 p-5 rounded-2xl flex items-center justify-between hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg text-slate-900 font-medium">{request.studentName}</h3>
                        <p className="text-sm text-slate-600">{request.credential}</p>
                        <p className="text-xs text-slate-500 mt-1">Approved: {request.date}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ID Verification */}
              <Link
                href="/id-verification"
                className="bg-white/80 backdrop-blur-xl border border-indigo-200/50 p-10 rounded-3xl hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all cursor-pointer group block"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl text-slate-900">ID Verification</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
