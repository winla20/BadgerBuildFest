'use client';

import { ShieldCheck } from 'lucide-react';
import { ActionCard } from './ActionCard';
import type { VerificationCardProps } from '@/src/types/dashboard.types';

/**
 * VerificationCard Component
 * 
 * Card for requesting verification of credentials from employers or institutions.
 * Displays the number of unverified experiences ready for verification.
 * 
 * @param props - VerificationCardProps
 */
export function VerificationCard({
  onRequestVerification,
  unverifiedCount = 0,
}: VerificationCardProps) {
  return (
    <ActionCard
      icon={ShieldCheck}
      title="Request Verification"
      description="Ask employers or institutions to verify your credentials"
      buttonText="Request Verification"
      buttonVariant="default"
      onAction={onRequestVerification}
    >
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <p className="text-xs text-[#6b7280]">
          <span className="text-[#111827] font-medium">
            {unverifiedCount} unverified {unverifiedCount === 1 ? 'experience' : 'experiences'}
          </span>{' '}
          ready for verification
        </p>
      </div>
    </ActionCard>
  );
}

