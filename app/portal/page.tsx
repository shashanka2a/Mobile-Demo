'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ClientPortalView } from '@/components/showcase/ClientPortalView';

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
        <Link
          href="/"
          className="text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to UtilityVision Showcase</span>
        </Link>
        <div className="flex items-center gap-3 text-slate-500">
          <Link href="/app" className="hover:text-slate-900">Field App</Link>
          <span>•</span>
          <Link href="/dashboard" className="hover:text-slate-900">Management Dashboard</Link>
          <span>•</span>
          <Link href="/demo" className="text-[#EF4823] font-bold">Interactive Demo</Link>
        </div>
      </div>
      <ClientPortalView onOpenApp={() => window.location.href = '/app'} />
    </div>
  );
}
