'use client';

import { X, Building2, GraduationCap } from 'lucide-react';
import type { VerificationRequestModalProps } from '@/src/types/dashboard.types';

/**
 * RequestVerificationModal Component
 * 
 * Modal dialog for requesting verification of experiences.
 * Displays a list of experiences (education/work) with verification status.
 * 
 * @param props - VerificationRequestModalProps
 */
export function RequestVerificationModal({
  isOpen,
  onClose,
  experiences,
  onRequestVerification,
}: VerificationRequestModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-[#111827] font-medium text-xl">Request Verification</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          <p className="text-sm text-[#6b7280] mb-6">
            Select an experience from your resume to request verification from the institution or
            employer.
          </p>

          <div className="space-y-4">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#667eea] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        experience.type === 'education' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}
                    >
                      {experience.type === 'education' ? (
                        <GraduationCap
                          className={`w-5 h-5 ${
                            experience.type === 'education' ? 'text-blue-600' : 'text-purple-600'
                          }`}
                        />
                      ) : (
                        <Building2 className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#111827] mb-1 font-medium">{experience.title}</h4>
                      <p className="text-sm text-[#6b7280] mb-2">{experience.organization}</p>
                      {experience.verified && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#10b981] text-white">
                          <span className="mr-1">✓</span>
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onRequestVerification(experience.id)}
                    disabled={experience.verified}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      experience.verified
                        ? 'border border-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-0 hover:opacity-90'
                    }`}
                  >
                    {experience.verified ? 'Verified' : 'Request'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

