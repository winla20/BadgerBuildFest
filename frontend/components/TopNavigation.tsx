'use client';

import { Search, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';

export function TopNavigation() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-lg">
            <span className="tracking-tight font-semibold">CredentialHub</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search credentials, institutions..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

