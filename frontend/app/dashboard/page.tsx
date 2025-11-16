'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { credentialsApi } from '@/lib/api';
import { StudentDashboard } from '@/src/components/dashboard/StudentDashboard';
import type { Experience, VerificationBadge } from '@/src/types/dashboard.types';

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const [credentials, setCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected && publicKey) {
      loadCredentials();
    }
  }, [connected, publicKey]);

  const loadCredentials = async () => {
    if (!publicKey) return;

    try {
      setLoading(true);
      const response = await credentialsApi.getAll(publicKey.toBase58());
      setCredentials(response.data.credentials || []);
    } catch (error: any) {
      console.error('Failed to load credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p>Please connect your wallet to view your credentials</p>
        </div>
      </main>
    );
  }

  // Transform credentials to experiences format
  const experiences: Experience[] = credentials.map((cred, idx) => ({
    id: cred.credential_id || `cred-${idx}`,
    title: cred.title || 'Untitled Credential',
    organization: cred.issuer || 'Unknown',
    type: (cred.type === 'education' ? 'education' : 'work') as Experience['type'],
    verified: false, // You can update this based on your verification status
  }));

  // Extract badges from verified credentials
  const badges: VerificationBadge[] = credentials
    .filter((cred) => cred.verified || cred.status === 'verified')
    .slice(0, 5) // Limit to 5 badges
    .map((cred, idx) => ({
      id: cred.credential_id || `badge-${idx}`,
      label: cred.title || 'Credential',
      type: (cred.type === 'education' ? 'education' : 'work') as VerificationBadge['type'],
    }));

  // Generate user name from credentials or use default
  const userName = credentials.length > 0 
    ? `${credentials[0]?.issuer || 'User'}'s Profile`
    : 'Student User';

  const handleUpdateProfile = () => {
    // TODO: Implement profile update navigation
    console.log('Update profile clicked');
  };

  const handleRequestVerification = (experienceId: string) => {
    // TODO: Implement verification request API call
    console.log('Request verification for:', experienceId);
  };

  const handleStake = () => {
    // TODO: Implement staking functionality
    console.log('Stake clicked');
  };

  return (
    <StudentDashboard
      name={userName}
      walletAddress={publicKey?.toBase58().slice(0, 10) + '...' + publicKey?.toBase58().slice(-5) || 'Not connected'}
      badges={badges}
      summary={`${credentials.length} credential${credentials.length !== 1 ? 's' : ''} | ${badges.length} verified`}
      experiences={experiences}
      onUpdateProfile={handleUpdateProfile}
      onRequestVerification={handleRequestVerification}
      onStake={handleStake}
      stakingStats={{
        studentCount: 523,
        totalEarnings: '$247k',
      }}
    />
  );
}
