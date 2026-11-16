'use client';

import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
  dynamicIslandText?: string;
}

export function DeviceFrame({
  children,
  className = '',
  dynamicIslandText = 'UtilityVision • Live Sync',
}: DeviceFrameProps) {
  return (
    <div
      className={`relative mx-auto flex flex-col overflow-hidden rounded-[52px] border-[10px] border-[#2C2C2E] bg-black p-0 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] ring-1 ring-white/10 ${className}`}
      style={{
        width: '100%',
        maxWidth: '390px',
        height: '800px',
      }}
    >
      {/* Side Buttons Simulated */}
      <div className="absolute -left-[13px] top-28 h-10 w-[3px] rounded-l-sm bg-[#48484A]" />
      <div className="absolute -left-[13px] top-42 h-14 w-[3px] rounded-l-sm bg-[#48484A]" />
      <div className="absolute -left-[13px] top-58 h-14 w-[3px] rounded-l-sm bg-[#48484A]" />
      <div className="absolute -right-[13px] top-36 h-20 w-[3px] rounded-r-sm bg-[#48484A]" />

      {/* iOS Top Status Bar & Dynamic Island */}
      <header className="relative z-40 flex h-11 shrink-0 items-center justify-between px-7 pt-2 text-white">
        <span className="font-mono text-xs font-semibold tracking-tight">9:41</span>

        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-2 flex h-7 -translate-x-1/2 items-center justify-between rounded-full bg-black px-3 py-1 ring-1 ring-white/10 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#30D158] animate-pulse" />
            <span className="text-[10px] font-semibold text-white/90 truncate max-w-[140px]">
              {dynamicIslandText}
            </span>
          </div>
          <div className="h-3 w-3 rounded-full bg-[#1C1C1E] border border-white/20 ml-2" />
        </div>

        {/* Status Icons */}
        <div className="flex items-center gap-1.5 text-white">
          <span className="text-[10px] font-bold">5G</span>
          <Wifi className="h-3 w-3" />
          <Battery className="h-3.5 w-3.5" />
        </div>
      </header>

      {/* Screen Body */}
      <div className="relative flex-1 overflow-hidden bg-[#1C1C1E]">
        {children}
      </div>

      {/* Bottom iOS Home Indicator Bar */}
      <footer className="relative z-40 flex h-6 shrink-0 items-center justify-center bg-[#1C1C1E] pb-1">
        <div className="h-1 w-32 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
      </footer>
    </div>
  );
}
