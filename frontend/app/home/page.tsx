'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { Bell, Settings, User, ShieldCheck, Briefcase, Share2, CheckCircle, Clock, X, Send, Search, Building2 } from 'lucide-react';
import Link from 'next/link';

interface VerificationRequest {
  id: string;
  work: string;
  time: string;
  status: 'pending' | 'verified';
}

/**
 * UserHomePage Component
 * 
 * Alternative dashboard view with job matches and resume sharing features.
 * Adapted from Figma design to Next.js.
 */
export default function UserHomePage() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [verificationQueue] = useState<VerificationRequest[]>([
    { id: '1', work: 'Software Engineer at Meta', time: '2 days ago', status: 'pending' },
    { id: '2', work: 'Bachelor of CS at MIT', time: '5 days ago', status: 'verified' },
    { id: '3', work: 'Teaching Assistant at MIT', time: '1 week ago', status: 'verified' },
  ]);

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showJobMatchesModal, setShowJobMatchesModal] = useState(false);
  const [showShareResumeModal, setShowShareResumeModal] = useState(false);
  
  // Verification Modal State
  const [verificationType, setVerificationType] = useState('');
  const [verificationEntity, setVerificationEntity] = useState('');
  const [verificationDetails, setVerificationDetails] = useState('');
  
  // Share Resume Modal State
  const [recipientEmail, setRecipientEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const mockJobMatches = [
    { id: '1', company: 'Google', position: 'Senior Software Engineer', location: 'Mountain View, CA', match: '95%' },
    { id: '2', company: 'Meta', position: 'Full Stack Developer', location: 'Menlo Park, CA', match: '92%' },
    { id: '3', company: 'Amazon', position: 'Software Development Engineer', location: 'Seattle, WA', match: '88%' },
  ];

  const displayName = 'Bob Jones'; // TODO: Get from user data/state
  const profileImageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';

  const handleRequestVerification = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Verification request submitted!');
    setShowVerificationModal(false);
    setVerificationType('');
    setVerificationEntity('');
    setVerificationDetails('');
  };

  const handleShareResume = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Resume shared with ${recipientEmail}!`);
    setShowShareResumeModal(false);
    setRecipientEmail('');
    setShareMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-teal-200/50 px-4 sm:px-8 py-5 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-2xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
          CredentialHub
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-3 hover:bg-teal-50 rounded-xl transition-all relative group">
            <Bell className="w-5 h-5 text-slate-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>
          <button className="p-3 hover:bg-teal-50 rounded-xl transition-all">
            <Settings className="w-5 h-5 text-slate-700" />
          </button>
          <button className="p-3 hover:bg-teal-50 rounded-xl transition-all">
            <User className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 sm:px-8 py-10">
        <h1 className="text-4xl md:text-5xl text-slate-900 mb-10">
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-teal-200/50 p-6 md:p-8 rounded-3xl shadow-xl">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-6">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt={displayName}
                      className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-teal-500 flex items-center justify-center bg-teal-50">
                      <User className="w-16 h-16 text-teal-400" />
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                <h2 className="text-2xl text-slate-900 mb-4 font-semibold">{displayName}</h2>

                <div className="flex gap-2 mb-6 flex-wrap justify-center">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium">
                    MIT
                  </span>
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium">
                    Google SWE
                  </span>
                </div>

                <div className="w-full space-y-2 mb-6">
                  <div className="h-1.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                  <div className="h-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                  <div className="h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full w-3/4"></div>
                </div>

                <Link
                  href="/profile-setup"
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl px-4 py-2 text-center font-medium transition-all"
                >
                  Update Profile
                </Link>
              </div>
            </div>

            {/* Verification Queue */}
            <div className="bg-white/80 backdrop-blur-xl border border-teal-200/50 p-6 md:p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl text-slate-900 mb-6 font-semibold">
                Verification Queue
              </h3>
              
              <div className="space-y-3">
                {verificationQueue.map((item) => (
                  <div key={item.id} className="bg-gradient-to-r from-slate-50 to-teal-50/50 border border-teal-200/30 p-4 rounded-2xl hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-slate-900 mb-1 font-medium">{item.work}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                      <div className="flex items-center">
                        {item.status === 'verified' ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-orange-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Action Cards */}
          <div className="space-y-6">
            {/* Request Verification */}
            <div 
              onClick={() => setShowVerificationModal(true)}
              className="bg-white/80 backdrop-blur-xl border border-teal-200/50 p-8 md:p-10 rounded-3xl hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl text-slate-900 font-semibold">Request Verification</h2>
              </div>
            </div>

            {/* Your Job Matches */}
            <div 
              onClick={() => setShowJobMatchesModal(true)}
              className="bg-white/80 backdrop-blur-xl border border-emerald-200/50 p-8 md:p-10 rounded-3xl hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl text-slate-900 font-semibold">Your Job Matches</h2>
              </div>
            </div>

            {/* Share Your Resume */}
            <div 
              onClick={() => setShowShareResumeModal(true)}
              className="bg-white/80 backdrop-blur-xl border border-orange-200/50 p-8 md:p-10 rounded-3xl hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl text-slate-900 font-semibold">Share Your Resume</h2>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Request Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 z-50" onClick={() => setShowVerificationModal(false)}>
          <div className="bg-white/95 backdrop-blur-xl border border-teal-200/50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-teal-200/50 p-6 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 font-semibold">Request Verification</h2>
              <button 
                onClick={() => setShowVerificationModal(false)}
                className="p-2 hover:bg-teal-50 rounded-xl transition-all"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            
            <form onSubmit={handleRequestVerification} className="p-6 space-y-6">
              <div>
                <label className="text-teal-700 mb-2 block font-medium">Verification Type</label>
                <select
                  value={verificationType}
                  onChange={(e) => setVerificationType(e.target.value)}
                  className="w-full border-2 border-teal-200/50 focus:border-teal-500 rounded-xl h-12 px-4 focus:outline-none"
                  required
                >
                  <option value="">Select type</option>
                  <option value="employment">Employment History</option>
                  <option value="education">Education Degree</option>
                  <option value="certification">Professional Certification</option>
                  <option value="skill">Skill Endorsement</option>
                </select>
              </div>

              <div>
                <label className="text-teal-700 mb-2 block font-medium">Company/Institution Name</label>
                <input
                  type="text"
                  value={verificationEntity}
                  onChange={(e) => setVerificationEntity(e.target.value)}
                  placeholder="e.g., Google, MIT, etc."
                  className="w-full border-2 border-teal-200/50 focus:border-teal-500 rounded-xl h-12 px-4 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-teal-700 mb-2 block font-medium">Details</label>
                <textarea
                  value={verificationDetails}
                  onChange={(e) => setVerificationDetails(e.target.value)}
                  placeholder="Provide additional details about what needs to be verified..."
                  className="w-full border-2 border-teal-200/50 focus:border-teal-500 rounded-xl min-h-[120px] px-4 py-3 focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white h-12 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowVerificationModal(false)}
                  className="flex-1 border-2 border-slate-300 hover:bg-slate-50 h-12 rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Matches Modal */}
      {showJobMatchesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 z-50" onClick={() => setShowJobMatchesModal(false)}>
          <div className="bg-white/95 backdrop-blur-xl border border-emerald-200/50 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-emerald-200/50 p-6 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 font-semibold">Your Job Matches</h2>
              <button 
                onClick={() => setShowJobMatchesModal(false)}
                className="p-2 hover:bg-emerald-50 rounded-xl transition-all"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search job matches..."
                    className="w-full border-2 border-emerald-200/50 focus:border-emerald-500 rounded-xl h-12 pl-12 px-4 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {mockJobMatches.map((job) => (
                  <div key={job.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 p-6 rounded-2xl hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg text-slate-900 font-semibold">{job.position}</h3>
                          <p className="text-sm text-slate-600">{job.company}</p>
                          <p className="text-xs text-slate-500 mt-1">{job.location}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium">
                        {job.match} Match
                      </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl py-2 font-medium transition-all">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Resume Modal */}
      {showShareResumeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 z-50" onClick={() => setShowShareResumeModal(false)}>
          <div className="bg-white/95 backdrop-blur-xl border border-orange-200/50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-orange-200/50 p-6 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 font-semibold">Share Your Resume</h2>
              <button 
                onClick={() => setShowShareResumeModal(false)}
                className="p-2 hover:bg-orange-50 rounded-xl transition-all"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            
            <form onSubmit={handleShareResume} className="p-6 space-y-6">
              <div>
                <label className="text-orange-700 mb-2 block font-medium">Recipient Email</label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="employer@company.com"
                  className="w-full border-2 border-orange-200/50 focus:border-orange-500 rounded-xl h-12 px-4 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-orange-700 mb-2 block font-medium">Message (Optional)</label>
                <textarea
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  placeholder="Add a personal message to your resume..."
                  className="w-full border-2 border-orange-200/50 focus:border-orange-500 rounded-xl min-h-[120px] px-4 py-3 focus:outline-none"
                />
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200/50 p-4 rounded-2xl">
                <h4 className="text-sm text-orange-900 mb-2 font-medium">Resume Preview</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900 font-medium">{displayName}_Resume.pdf</p>
                    <p className="text-xs text-slate-500">Last updated 3 days ago</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white h-12 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Share Resume
                </button>
                <button
                  type="button"
                  onClick={() => setShowShareResumeModal(false)}
                  className="flex-1 border-2 border-slate-300 hover:bg-slate-50 h-12 rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

