'use client';

import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { SyncStatus } from '@/types';

interface SyncStatusBadgeProps {
  status?: SyncStatus;
  className?: string;
}

export function SyncStatusBadge({ status = 'synced', className = '' }: SyncStatusBadgeProps) {
  if (status === 'synced') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-[#30D158]/15 px-2 py-0.5 text-[10px] font-medium text-[#30D158] ${className}`}>
        <CheckCircle2 className="h-2.5 w-2.5" />
        <span>Synced</span>
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-[#FFD60A]/15 px-2 py-0.5 text-[10px] font-medium text-[#FFD60A] ${className}`}>
        <Clock className="h-2.5 w-2.5" />
        <span>Local (Pending Sync)</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-[#FF453A]/15 px-2 py-0.5 text-[10px] font-medium text-[#FF453A] ${className}`}>
      <AlertTriangle className="h-2.5 w-2.5" />
      <span>Sync Error</span>
    </span>
  );
}
