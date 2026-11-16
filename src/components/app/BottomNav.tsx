'use client';

import React from 'react';
import { Home, Activity, MoreHorizontal } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export function BottomNav() {
  const { activeTab, setActiveTab } = useAppContext();

  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'activity' as const, label: 'Activity', icon: Activity },
    { id: 'more' as const, label: 'More', icon: MoreHorizontal },
  ];

  return (
    <nav className="sticky bottom-0 z-30 flex items-center justify-around border-t border-[#3A3A3C] bg-[#1C1C1E]/95 py-2 backdrop-blur-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-transform active:scale-90 ${
              isActive ? 'text-[#FF6633]' : 'text-[#98989D] hover:text-white'
            }`}
          >
            <div className={`relative flex items-center justify-center ${isActive ? 'scale-110' : ''}`}>
              <Icon className="h-5 w-5 transition-transform" />
              {tab.id === 'activity' && (
                <span className="absolute -right-1 -top-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6633] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6633]"></span>
                </span>
              )}
            </div>
            <span className={`text-[11px] font-medium leading-none ${isActive ? 'font-semibold text-[#FF6633]' : ''}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
