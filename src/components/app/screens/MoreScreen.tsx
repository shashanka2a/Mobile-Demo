'use client';

import React from 'react';
import {
  User,
  FileCheck,
  Image as ImageIcon,
  FolderKanban,
  Settings,
  RotateCcw,
  Wifi,
  WifiOff,
  ChevronRight,
  Shield,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { useAppContext } from '@/context/AppContext';

export function MoreScreen() {
  const {
    currentUser,
    selectedProject,
    navigate,
    resetAllData,
    isOffline,
    setIsOffline,
  } = useAppContext();

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Account & Settings"
        subtitle="UtilityVision Mobile Web v1.1.6"
        showBack={false}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* User Profile Card */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#3A3A3C] bg-gradient-to-br from-[#2C2C2E] to-[#242426] p-4 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6633] text-lg font-bold text-white shadow-md">
            RS
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">{currentUser.name}</h2>
            <p className="text-xs text-[#FF6633] font-medium">{currentUser.role}</p>
            <p className="text-[11px] text-[#98989D]">{currentUser.email}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-[#3A3A3C] bg-[#2C2C2E]">
          <button
            type="button"
            onClick={() => navigate('report-preview')}
            className="flex items-center justify-between border-b border-[#3A3A3C] p-3 text-xs text-white hover:bg-[#343438] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FileCheck className="h-4 w-4 text-[#30D158]" />
              <span>Signed Daily Reports History</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#98989D]" />
          </button>

          <button
            type="button"
            onClick={() => navigate('attachments')}
            className="flex items-center justify-between border-b border-[#3A3A3C] p-3 text-xs text-white hover:bg-[#343438] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="h-4 w-4 text-[#64D2FF]" />
              <span>Full Photo & Media Gallery</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#98989D]" />
          </button>

          <button
            type="button"
            onClick={() => navigate('map')}
            className="flex items-center justify-between border-b border-[#3A3A3C] p-3 text-xs text-white hover:bg-[#343438] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FolderKanban className="h-4 w-4 text-[#FF9F0A]" />
              <span>Project Boundaries & KMZ Overlays</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#98989D]" />
          </button>

          <button
            type="button"
            onClick={() => navigate('job-safety')}
            className="flex items-center justify-between p-3 text-xs text-white hover:bg-[#343438] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="h-4 w-4 text-[#FF6633]" />
              <span>Job Safety Analysis (JSA) Standards</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#98989D]" />
          </button>
        </div>

        {/* Offline & Demo Controls */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5 text-xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#98989D]">
            System & Offline Sync
          </h3>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              {isOffline ? (
                <WifiOff className="h-4 w-4 text-[#FF9F0A]" />
              ) : (
                <Wifi className="h-4 w-4 text-[#30D158]" />
              )}
              <div>
                <span className="font-semibold text-white">
                  {isOffline ? 'Offline Mode (Local Storage)' : 'Cloud Sync Connected'}
                </span>
                <p className="text-[10px] text-[#98989D]">All data cached for zero-connectivity field work</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOffline(!isOffline)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                isOffline ? 'bg-[#FF9F0A] text-black' : 'bg-[#3A3A3C] text-white hover:bg-[#48484A]'
              }`}
            >
              {isOffline ? 'Go Online' : 'Simulate Offline'}
            </button>
          </div>

          <div className="border-t border-[#3A3A3C] pt-2">
            <button
              type="button"
              onClick={resetAllData}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3A3A3C] py-2 text-xs font-medium text-[#FF453A] hover:bg-[#FF453A]/20 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to Sample Field Demo Data</span>
            </button>
          </div>
        </div>

        {/* App Version Info */}
        <div className="text-center font-mono text-[10px] text-[#98989D]">
          UtilityVision Mobile v1.1.6 • Converted Next.js App Router
        </div>
      </div>
    </div>
  );
}
