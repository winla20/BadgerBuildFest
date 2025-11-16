'use client';

import { ImageWithFallback } from './ImageWithFallback';
import type { ProfileCardProps } from '@/src/types/dashboard.types';

/**
 * ProfileCard Component
 * 
 * Displays user profile information including:
 * - Profile picture with online status indicator
 * - Name and wallet address
 * - Verification badges (education/work)
 * - Summary text
 * - Update profile button
 * 
 * @param props - ProfileCardProps
 */
export function ProfileCard({
  name,
  walletAddress,
  profileImageUrl,
  badges,
  summary,
  onUpdateProfile,
}: ProfileCardProps) {
  // Generate initials for fallback avatar
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {profileImageUrl ? (
            <ImageWithFallback
              src={profileImageUrl}
              alt={name}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-gray-100"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center border-4 border-gray-100">
              <span className="text-white text-4xl font-medium">{initials}</span>
            </div>
          )}
          {/* Online Status Indicator */}
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#10b981] rounded-full border-4 border-white"></div>
        </div>
      </div>

      {/* Name */}
      <h2 className="text-center text-[#111827] mb-2 font-medium text-lg">{name}</h2>

      {/* Wallet Address */}
      <div className="text-center mb-4">
        <code className="text-xs text-[#6b7280] bg-gray-100 px-3 py-1 rounded-full">
          {walletAddress}
        </code>
      </div>

      {/* Verification Badges */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {badges.map((badge) => (
          <span
            key={badge.id}
            className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
              badge.type === 'education'
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            <span className="mr-1">✓</span>
            {badge.label}
          </span>
        ))}
      </div>

      {/* Summary */}
      <p className="text-sm text-[#6b7280] text-center mb-6 leading-relaxed">{summary}</p>

      {/* Update Profile Button */}
      <button
        onClick={onUpdateProfile}
        className="w-full px-4 py-2 border border-[#667eea] text-[#667eea] rounded-lg hover:bg-[#667eea] hover:text-white transition-colors font-medium"
      >
        Update Profile
      </button>
    </div>
  );
}

