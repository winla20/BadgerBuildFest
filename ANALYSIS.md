# Figma Design Analysis - Student Dashboard

## Component Breakdown

### 1. **Main Dashboard Container** (`DashboardPage.tsx`)
- **Layout**: Two-column grid (30% left, 70% right on large screens)
- **Background**: `bg-[#f9fafb]` (light gray)
- **Max Width**: `max-w-7xl`
- **Padding**: `px-8 py-8`
- **Grid**: `grid-cols-1 lg:grid-cols-[30%_1fr] gap-6`

### 2. **ProfileCard Component**
- **Location**: Left sidebar (sticky on large screens)
- **Structure**:
  - Profile picture (120x120px, rounded-full)
  - Name (centered)
  - Wallet address (code style, rounded-full badge)
  - Verification badges (education/work types)
  - Summary text
  - Update Profile button
- **Colors**:
  - Card: `bg-white rounded-xl shadow-sm`
  - Profile border: `border-4 border-gray-100`
  - Online indicator: `bg-[#10b981]` (green dot)
  - Badges: `bg-blue-100 text-blue-700` (education), `bg-purple-100 text-purple-700` (work)
  - Button: `border-[#667eea] text-[#667eea]`

### 3. **ActionCard Component** (Reusable)
- **Used for**: Verification, Staking, Profile Management
- **Structure**:
  - Icon with gradient background (`from-[#667eea] to-[#764ba2]`)
  - Title and description
  - Optional children content
  - Action button (gradient or outline variant)
- **Colors**:
  - Icon background: `bg-gradient-to-br from-[#667eea] to-[#764ba2]`
  - Card: `bg-white rounded-xl shadow-sm`
  - Button gradient: `from-[#667eea] to-[#764ba2]`

### 4. **VerificationRequestModal Component**
- **Structure**:
  - Modal overlay: `bg-black bg-opacity-50`
  - Modal container: `bg-white rounded-xl shadow-2xl max-w-2xl`
  - Header with close button
  - Scrollable content area
  - Experience list items
- **Experience Items**:
  - Icon background: `bg-blue-100` (education) or `bg-purple-100` (work)
  - Border: `border-gray-200 hover:border-[#667eea]`
  - Verified badge: `bg-[#10b981] text-white`

### 5. **TopNavigation Component**
- **Structure**:
  - Logo with gradient background
  - Search bar (centered, max-w-xl)
  - Notification and Settings icons
- **Colors**:
  - Navbar: `bg-white border-b border-gray-200`
  - Logo: `bg-gradient-to-r from-[#667eea] to-[#764ba2]`

## Color Palette

### Primary Colors
- **Gradient Start**: `#667eea` (indigo-purple)
- **Gradient End**: `#764ba2` (purple)
- **Background**: `#f9fafb` (light gray)
- **Card Background**: `#ffffff` (white)

### Text Colors
- **Primary Text**: `#111827` (dark gray)
- **Secondary Text**: `#6b7280` (medium gray)
- **Muted Text**: `#6b7280`

### Status Colors
- **Success/Verified**: `#10b981` (emerald green)
- **Education Badge**: `blue-100` / `blue-700`
- **Work Badge**: `purple-100` / `purple-700`

### Border Colors
- **Default**: `border-gray-200`
- **Hover**: `border-[#667eea]`
- **Input**: `border-gray-300`

## Typography

- **Headings**: Default Tailwind sizes (text-xl, text-2xl, etc.)
- **Body**: `text-sm` (14px) for descriptions
- **Code/Wallet**: `text-xs` (12px)
- **Font Weight**: Medium (500) for headings, Normal (400) for body

## Spacing

- **Card Padding**: `p-6` (24px)
- **Section Gap**: `gap-6` (24px)
- **Element Gap**: `gap-4` (16px), `gap-2` (8px)
- **Container Padding**: `px-8 py-8` (32px)

## Responsive Breakpoints

- **Mobile**: Default (single column)
- **Large (lg)**: `768px` - Two-column layout
- **Grid Breakpoint**: `lg:grid-cols-[30%_1fr]`

## Component Hierarchy

```
StudentDashboard (main container)
├── TopNavigation
└── Main Content
    ├── ProfileCard (left sidebar)
    └── Action Cards (right section)
        ├── VerificationCard (Request Verification)
        ├── StakingCard (Stake Your Resume)
        └── ProfileManagementCard (Update Profile)
    └── VerificationRequestModal (overlay)
```

## Key Features

1. **Sticky Sidebar**: Profile card sticks to top on large screens
2. **Hover Effects**: Cards have `hover:shadow-md` and `hover:-translate-y-0.5`
3. **Gradient Buttons**: Primary actions use gradient backgrounds
4. **Status Indicators**: Green dot for online status, badges for verified credentials
5. **Modal Overlay**: Dark overlay with centered modal dialog

