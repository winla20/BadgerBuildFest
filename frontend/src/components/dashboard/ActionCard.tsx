'use client';

import type { ActionCardProps } from '@/src/types/dashboard.types';

/**
 * ActionCard Component
 * 
 * Reusable card component for dashboard actions with:
 * - Icon with gradient background
 * - Title and description
 * - Optional children content
 * - Action button (gradient or outline variant)
 * 
 * @param props - ActionCardProps
 */
export function ActionCard({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonVariant = 'default',
  onAction,
  children,
}: ActionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Icon and Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-[#111827] font-medium text-lg">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-[#6b7280] mb-4">{description}</p>

      {/* Additional Content */}
      {children && <div className="mb-4">{children}</div>}

      {/* Action Button */}
      <button
        onClick={onAction}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
          buttonVariant === 'default'
            ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 text-white border-0'
            : 'border border-[#667eea] text-[#667eea] hover:bg-[#667eea] hover:text-white'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

