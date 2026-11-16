'use client';

import React from 'react';
import { ArrowLeft, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  showBack = true,
  rightAction,
}: ScreenHeaderProps) {
  const { goBack, isOffline, setIsOffline, syncStatus } = useAppContext();

  const handleBack = () => {
    if (onBack) onBack();
    else goBack();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#3A3A3C] bg-[#1C1C1E]/95 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2C2C2E] text-white transition-colors hover:bg-[#3A3A3C] active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5 text-[#FF6633]" />
          </button>
        )}
        <div>
          <h1 className="text-base font-semibold leading-tight text-white">{title}</h1>
          {subtitle && (
            <p className="text-xs font-normal text-[#98989D]">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOffline(!isOffline)}
          title={isOffline ? 'Offline mode enabled (click to go online)' : 'Online (click to simulate offline)'}
          className={`flex h-7 items-center gap-1.5 rounded-full px-2 text-[11px] font-medium transition-all ${
            isOffline
              ? 'bg-[#FF9F0A]/20 text-[#FF9F0A] ring-1 ring-[#FF9F0A]/40'
              : 'bg-[#30D158]/15 text-[#30D158]'
          }`}
        >
          {isOffline ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
          <span>{isOffline ? 'Offline' : 'Sync'}</span>
        </button>

        {rightAction}
      </div>
    </header>
  );
}
