'use client';

import { useState } from 'react';
import { Building2, CheckCircle, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';

interface VerificationRequest {
  id: string;
  studentName: string;
  credential: string;
  date: string;
}

/**
 * EmployerDashboardPage Component
 * 
 * Dashboard for employers to manage verification requests.
 * Adapted from Figma design to Next.js.
 */
export default function EmployerDashboardPage() {
  const [pendingRequests] = useState<VerificationRequest[]>([
    { id: '1', studentName: 'Alice Smith', credential: 'Software Engineering Intern', date: '2024-01-15' },
    { id: '2', studentName: 'John Doe', credential: 'Full Stack Developer', date: '2024-01-14' },
    { id: '3', studentName: 'Sarah Johnson', credential: 'Product Manager Intern', date: '2024-01-12' },
  ]);

  const [approvedRequests] = useState<VerificationRequest[]>([
    { id: '4', studentName: 'Bob Jones', credential: 'Software Engineer', date: '2023-12-20' },
    { id: '5', studentName: 'Emma Wilson', credential: 'UX Designer', date: '2023-12-18' },
  ]);

  const [sharedResumes] = useState([
    { id: '1', studentName: 'Michael Brown', position: 'Senior Developer', sharedDate: '2024-01-10' },
    { id: '2', studentName: 'Lisa Anderson', position: 'Data Scientist', sharedDate: '2024-01-08' },
  ]);

  const handleApproveRequest = (requestId: string) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      alert(`Verified ${request.studentName}'s ${request.credential}`);
    }
  };

  const handleRejectRequest = (requestId: string) => {
    alert('Request rejected');
  };

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
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Employer Dashboard
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
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
            {/* Left Sidebar - Company Profile */}
            <div className="bg-white/80 backdrop-blur-xl border border-blue-200/50 p-6 md:p-8 rounded-3xl shadow-xl h-fit lg:sticky lg:top-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 shadow-lg">
                  <span className="text-white text-5xl font-bold">G</span>
                </div>

                <h2 className="text-2xl text-slate-900 mb-6 font-semibold">Google</h2>
                
                <div className="w-full">
                  <h3 className="text-blue-700 mb-3 font-medium">Company Name</h3>
                  <p className="text-sm text-slate-600 mb-6">Google</p>
                  
                  <h3 className="text-blue-700 mb-3 font-medium">About</h3>
                  <div className="space-y-2">
                    <div className="h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                    <div className="h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-3/4"></div>
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

              {/* Resumes Shared */}
              <div className="bg-white/80 backdrop-blur-xl border border-cyan-200/50 p-6 md:p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl md:text-3xl text-slate-900 mb-8">
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Resumes Shared
                  </span>
                </h2>

                <div className="space-y-3">
                  {sharedResumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-lg hover:shadow-cyan-500/10 transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg text-slate-900 font-medium">{resume.studentName}</h3>
                        <p className="text-sm text-slate-600">{resume.position}</p>
                        <p className="text-xs text-slate-500 mt-1">Shared: {resume.sharedDate}</p>
                      </div>
                      <button className="border-2 border-cyan-300 hover:bg-cyan-50 rounded-xl px-4 py-2 text-sm font-medium transition-all flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-600" />
                        View Resume
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

