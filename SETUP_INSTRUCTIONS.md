# Setup Instructions for Student Dashboard Components

## Quick Start

### 1. Install Required Dependencies

The components require `lucide-react` for icons. Install it:

```bash
cd frontend
npm install lucide-react
```

### 2. Verify File Structure

Ensure you have the following structure:

```
frontend/
├── src/
│   ├── components/
│   │   └── dashboard/
│   │       ├── StudentDashboard.tsx
│   │       ├── ProfileCard.tsx
│   │       ├── VerificationCard.tsx
│   │       ├── StakingCard.tsx
│   │       ├── ActionCard.tsx
│   │       ├── RequestVerificationModal.tsx
│   │       ├── ImageWithFallback.tsx
│   │       └── README.md
│   └── types/
│       └── dashboard.types.ts
└── app/
    └── dashboard/
        └── page.tsx
```

### 3. Run Development Server

```bash
cd frontend
npm run dev
```

Navigate to `http://localhost:3000/dashboard` to see the new dashboard.

## Component Usage

The dashboard is already integrated into `/app/dashboard/page.tsx`. The `StudentDashboard` component accepts the following props:

```typescript
<StudentDashboard
  name="John Doe"
  walletAddress="0x1234...5678"
  profileImageUrl="https://..." // optional
  badges={[...]} // VerificationBadge[]
  summary="Your summary text"
  experiences={[...]} // Experience[]
  onUpdateProfile={() => {...}}
  onRequestVerification={(id) => {...}}
  onStake={() => {...}}
  isStaking={false}
  stakingStats={{ studentCount: 523, totalEarnings: '$247k' }}
/>
```

## Customization

### Colors
The primary gradient colors are defined in `tailwind.config.js`:
- `gradient-start`: `#667eea`
- `gradient-end`: `#764ba2`

You can customize these in the Tailwind config or use the hex values directly in components.

### Responsive Breakpoints
- Mobile: Default (single column)
- Large: `768px` (two-column layout)

## Troubleshooting

### Icons Not Showing
Make sure `lucide-react` is installed:
```bash
npm install lucide-react
```

### TypeScript Errors
Ensure your `tsconfig.json` has the path alias:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tailwind Classes Not Working
Verify `tailwind.config.js` includes the `src` directory:
```javascript
content: [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  // ...
]
```

## Next Steps

1. Connect to your API endpoints for:
   - Loading user profile data
   - Requesting verification
   - Staking functionality
   - Profile updates

2. Add error handling and loading states

3. Add unit tests for components

4. Customize styling to match your brand (if needed)

