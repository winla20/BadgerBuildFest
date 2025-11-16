/**
 * Type definitions for the Student Dashboard components
 */

export type ExperienceType = 'education' | 'work';

export interface VerificationBadge {
  id: string;
  label: string;
  type: ExperienceType;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  type: ExperienceType;
  verified: boolean;
}

export interface ProfileCardProps {
  name: string;
  walletAddress: string;
  profileImageUrl?: string;
  badges: VerificationBadge[];
  summary: string;
  onUpdateProfile: () => void;
}

export interface ActionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: 'default' | 'outline';
  onAction: () => void;
  children?: React.ReactNode;
}

export interface VerificationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  experiences: Experience[];
  onRequestVerification: (experienceId: string) => void;
}

export interface StakingCardProps {
  onStake: () => void;
  isStaking?: boolean;
  stakingStats?: {
    studentCount: number;
    totalEarnings: string;
  };
}

export interface VerificationCardProps {
  onRequestVerification: () => void;
  unverifiedCount?: number;
}

