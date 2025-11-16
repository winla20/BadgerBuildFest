'use client';

import { useState } from 'react';
import { UserCog } from 'lucide-react';
import { ProfileCard } from './ProfileCard';
import { VerificationCard } from './VerificationCard';
import { StakingCard } from './StakingCard';
import { ActionCard } from './ActionCard';
import { RequestVerificationModal } from './RequestVerificationModal';
import type {
  Experience,
  VerificationBadge,
  ProfileCardProps,
} from '@/src/types/dashboard.types';

interface StudentDashboardProps {
  // User data
  name?: string;
  walletAddress?: string;
  profileImageUrl?: string;
  badges?: VerificationBadge[];
  summary?: string;

  // Experiences data
  experiences?: Experience[];

  // Callbacks
  onUpdateProfile?: () => void;
  onRequestVerification?: (experienceId: string) => void;
  onStake?: () => void;
  onVerificationModalOpen?: () => void;

  // Staking data
  isStaking?: boolean;
  stakingStats?: {
    studentCount: number;
    totalEarnings: string;
  };
}

/**
 * StudentDashboard Component
 * 
 * Main dashboard container for student users. Displays:
 * - Profile card (left sidebar)
 * - Action cards (verification, staking, profile management)
 * - Verification request modal
 * 
 * Responsive: Single column on mobile, two columns on large screens (768px+)
 * 
 * @param props - StudentDashboardProps
 */
export function StudentDashboard({
  name = 'Bob Jones',
  walletAddress = '0xM.E.T...98',
  profileImageUrl,
  badges = [
    { id: '1', label: "MIT '98", type: 'education' },
    { id: '2', label: 'Google SWE', type: 'work' },
  ],
  summary = 'Computer Science @ MIT | Software Engineer @ Google | 3 verified credentials',
  experiences = [],
  onUpdateProfile,
  onRequestVerification,
  onStake,
  onVerificationModalOpen,
  isStaking = false,
  stakingStats = { studentCount: 523, totalEarnings: '$247k' },
}: StudentDashboardProps) {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  // Calculate unverified experiences count
  const unverifiedCount = experiences.filter((exp) => !exp.verified).length;

  const handleRequestVerification = (experienceId: string) => {
    if (onRequestVerification) {
      onRequestVerification(experienceId);
    }
    setIsVerificationModalOpen(false);
  };

  const handleOpenVerificationModal = () => {
    setIsVerificationModalOpen(true);
    if (onVerificationModalOpen) {
      onVerificationModalOpen();
    }
  };

  const handleStake = () => {
    if (onStake) {
      onStake();
    }
  };

  const handleUpdateProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile();
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-6">
          {/* Left Section - Profile Card */}
          <div className="lg:sticky lg:top-8 h-fit">
            <ProfileCard
              name={name}
              walletAddress={walletAddress}
              profileImageUrl={profileImageUrl}
              badges={badges}
              summary={summary}
              onUpdateProfile={handleUpdateProfile}
            />
          </div>

          {/* Right Section - Action Cards */}
          <div className="space-y-6">
            {/* Request Verification Card */}
            <VerificationCard
              onRequestVerification={handleOpenVerificationModal}
              unverifiedCount={unverifiedCount}
            />

            {/* Staking Card */}
            <StakingCard
              onStake={handleStake}
              isStaking={isStaking}
              stakingStats={stakingStats}
            />

            {/* Profile Management Card */}
            <ActionCard
              icon={UserCog}
              title="Update Profile"
              description="Edit your information, add credentials, manage privacy"
              buttonText="Edit Profile"
              buttonVariant="outline"
              onAction={handleUpdateProfile}
            >
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-[#6b7280]">
                  Last updated: <span className="text-[#111827] font-medium">3 days ago</span>
                </p>
              </div>
            </ActionCard>
          </div>
        </div>
      </main>

      {/* Verification Request Modal */}
      <RequestVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        experiences={experiences}
        onRequestVerification={handleRequestVerification}
      />
    </div>
  );
}

