'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ManagementDashboardView } from '@/components/showcase/ManagementDashboardView';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="bg-[#0B1120] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs">
        <Link
          href="/"
          className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to UtilityVision Showcase</span>
        </Link>
        <div className="flex items-center gap-3 text-slate-400">
          <Link href="/app" className="hover:text-white">Field App</Link>
          <span>•</span>
          <Link href="/portal" className="hover:text-white">Client Portal</Link>
          <span>•</span>
          <Link href="/demo" className="text-[#EF4823] font-bold">Interactive Demo</Link>
        </div>
      </div>
      <ManagementDashboardView onOpenApp={() => window.location.href = '/app'} />
    </div>
  );
}
