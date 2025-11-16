# Dashboard Components

This directory contains the refactored React + TypeScript components for the Student Dashboard, converted from the Figma-generated code.

## Components

### `StudentDashboard.tsx`
Main dashboard container component. Combines all dashboard sections into a responsive layout.

### `ProfileCard.tsx`
Displays user profile information including:
- Profile picture with online status indicator
- Name and wallet address
- Verification badges (education/work)
- Summary text
- Update profile button

### `VerificationCard.tsx`
Card for requesting verification of credentials from employers or institutions.

### `StakingCard.tsx`
Card for staking verified credentials to earn APY (15-25%).

### `ActionCard.tsx`
Reusable card component for dashboard actions with icon, title, description, and action button.

### `RequestVerificationModal.tsx`
Modal dialog for requesting verification of experiences. Displays a list of experiences with verification status.

### `ImageWithFallback.tsx`
Image component with fallback handling for broken image URLs.

## Dependencies

### Required Packages

Install the following package if not already installed:

```bash
npm install lucide-react
```

This package provides the icons used in the components:
- `ShieldCheck` (VerificationCard)
- `Lock` (StakingCard)
- `UserCog` (Profile Management)
- `X`, `Building2`, `GraduationCap` (RequestVerificationModal)

## Usage

```tsx
import { StudentDashboard } from '@/src/components/dashboard/StudentDashboard';

export default function DashboardPage() {
  return (
    <StudentDashboard
      name="John Doe"
      walletAddress="0x1234...5678"
      badges={[
        { id: '1', label: "MIT '98", type: 'education' },
        { id: '2', label: 'Google SWE', type: 'work' },
      ]}
      experiences={[
        {
          id: '1',
          title: 'Bachelor of Science',
          organization: 'MIT',
          type: 'education',
          verified: true,
        },
      ]}
      onUpdateProfile={() => console.log('Update profile')}
      onRequestVerification={(id) => console.log('Request verification', id)}
      onStake={() => console.log('Stake')}
    />
  );
}
```

## Styling

All components use Tailwind CSS classes matching the Figma design:
- Primary gradient: `from-[#667eea] to-[#764ba2]`
- Background: `bg-[#f9fafb]`
- Text colors: `text-[#111827]` (primary), `text-[#6b7280]` (secondary)
- Success/Verified: `bg-[#10b981]`

## Responsive Design

- Mobile: Single column layout
- Large screens (768px+): Two-column layout with sticky profile card

## Type Definitions

All TypeScript interfaces are defined in `@/src/types/dashboard.types.ts`.

