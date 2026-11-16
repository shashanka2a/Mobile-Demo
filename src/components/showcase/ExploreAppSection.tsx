'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Maximize2,
  RotateCcw,
  Wifi,
  WifiOff,
  Sparkles,
  ExternalLink,
  Compass,
} from 'lucide-react';
import { DeviceFrame } from '../demo/DeviceFrame';
import { MobileAppContainer } from '../app/MobileAppContainer';
import { useAppContext } from '@/context/AppContext';

export function ExploreAppSection() {
  const {
    currentScreen,
    navigate,
    resetAllData,
    isOffline,
    setIsOffline,
    selectedProject,
  } = useAppContext();

  const [viewMode, setViewMode] = useState<'mobile' | 'expanded'>('mobile');

  const quickLinks = [
    { label: 'Dashboard', screen: 'home' },
    { label: 'Chemicals Log', screen: 'chemicals' },
    { label: 'Equipment Pre-Trip', screen: 'checklist' },
    { label: 'Toolbox Talks', screen: 'safety' },
    { label: 'Job Safety (JSA)', screen: 'job-safety' },
    { label: 'Site Observations', screen: 'observations' },
    { label: 'Boundary Map', screen: 'map' },
    { label: 'Daily Report', screen: 'report-preview' },
  ];

  return (
    <section id="explore-section" className="py-16 px-4 md:px-8 max-w-6xl mx-auto border-t border-[#3A3A3C]/60">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#30D158]">
          Live Interactive Playground
        </span>
        <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">
          Explore the Converted Mobile App
        </h2>
        <p className="mt-2 text-sm text-[#98989D] max-w-xl mx-auto">
          Test any feature, log test chemicals, sign the pre-trip canvas, toggle projects, or simulate offline mode.
        </p>

        {/* Quick Screen Switcher Pill Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
          {quickLinks.map((link) => {
            const isActive = currentScreen === link.screen;
            return (
              <button
                key={link.screen}
                type="button"
                onClick={() => navigate(link.screen)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FF6633] text-white shadow-md shadow-[#FF6633]/25 scale-105'
                    : 'bg-[#2C2C2E] text-[#98989D] hover:bg-[#3A3A3C] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Controls Toolbar */}
      <div className="mx-auto flex max-w-xl items-center justify-between rounded-2xl border border-[#3A3A3C] bg-[#242426] px-4 py-2.5 mb-8 shadow-lg">
        {/* View Mode (Phone vs Expanded) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              viewMode === 'mobile'
                ? 'bg-[#FF6633] text-white'
                : 'text-[#98989D] hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Phone Frame</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('expanded')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              viewMode === 'expanded'
                ? 'bg-[#FF6633] text-white'
                : 'text-[#98989D] hover:text-white'
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span>Expanded View</span>
          </button>
        </div>

        {/* Offline & Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              isOffline
                ? 'bg-[#FF9F0A] text-black font-bold'
                : 'bg-[#3A3A3C] text-white hover:bg-[#48484A]'
            }`}
          >
            {isOffline ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
            <span>{isOffline ? 'Offline Active' : 'Online'}</span>
          </button>

          <button
            type="button"
            onClick={resetAllData}
            title="Reset storage to clean demo data"
            className="flex items-center gap-1 rounded-lg bg-[#3A3A3C] px-2.5 py-1 text-xs font-medium text-[#FF453A] hover:bg-[#FF453A]/20 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Reset Data</span>
          </button>
        </div>
      </div>

      {/* Simulator Display */}
      <div className="flex justify-center w-full">
        {viewMode === 'mobile' ? (
          <DeviceFrame dynamicIslandText="Interactive Sandbox • Tap Anywhere">
            <MobileAppContainer />
          </DeviceFrame>
        ) : (
          <div className="w-full max-w-4xl h-[780px] rounded-3xl border border-[#3A3A3C] bg-[#1C1C1E] overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-[#3A3A3C] bg-[#242426] px-4 py-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF453A]" />
                <span className="h-3 w-3 rounded-full bg-[#FFD60A]" />
                <span className="h-3 w-3 rounded-full bg-[#30D158]" />
                <span className="ml-2 font-mono text-[11px] text-[#98989D]">
                  UtilityVision Web Container • {selectedProject.name}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#30D158]">
                Screen: /{currentScreen}
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <MobileAppContainer />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
