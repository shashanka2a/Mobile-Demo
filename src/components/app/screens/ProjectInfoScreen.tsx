'use client';

import React from 'react';
import {
  Info,
  MapPin,
  Building,
  Calendar,
  Phone,
  Shield,
  Hospital,
  Key,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { useAppContext } from '@/context/AppContext';

export function ProjectInfoScreen() {
  const { selectedProject } = useAppContext();

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Project Information"
        subtitle={selectedProject.name}
      />

      <div className="flex flex-col gap-4 p-4 text-xs">
        {/* Core Specs Card */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
            Site Specifications
          </h3>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-[#3A3A3C]/50 pb-1.5">
              <span className="text-[#98989D]">Client Organization</span>
              <span className="font-semibold text-white">{selectedProject.client || 'Solanco Clean Energy LLC'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#3A3A3C]/50 pb-1.5">
              <span className="text-[#98989D]">Project Code</span>
              <span className="font-mono font-semibold text-[#64D2FF]">{selectedProject.code || 'SOL-2026-A'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#3A3A3C]/50 pb-1.5">
              <span className="text-[#98989D]">Total Site Footprint</span>
              <span className="font-semibold text-white">{selectedProject.acres || 420} Acres</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#3A3A3C]/50 pb-1.5">
              <span className="text-[#98989D]">Location</span>
              <span className="text-white text-right">{selectedProject.location}</span>
            </div>
          </div>
        </div>

        {/* Site Access & Gate Codes */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <div className="flex items-center gap-2 mb-2 text-[#FF9F0A]">
            <Key className="h-4 w-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">
              Gate Access & Knox Box
            </h3>
          </div>
          <div className="flex flex-col gap-2 rounded-lg bg-[#1C1C1E] p-2.5">
            <div className="flex justify-between">
              <span className="text-[#98989D]">Main Entrance Gate 1:</span>
              <span className="font-mono font-bold text-white">#8834</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#98989D]">Substation Knox Box:</span>
              <span className="font-mono font-bold text-white">#4491</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#98989D]">Chemical Nurse Tank Staging:</span>
              <span className="text-white">Lot B (North of Inverter 2)</span>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <div className="flex items-center gap-2 mb-2 text-[#30D158]">
            <Phone className="h-4 w-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">
              Emergency Contacts
            </h3>
          </div>
          <div className="flex flex-col gap-2 text-[11px]">
            <div className="rounded-lg bg-[#1C1C1E] p-2 flex justify-between">
              <div>
                <span className="font-semibold text-white">Site Supervisor (Ricky Smith)</span>
                <p className="text-[#98989D]">Mobile: (717) 555-0194</p>
              </div>
              <span className="rounded bg-[#30D158]/20 px-2 py-0.5 text-[#30D158] font-bold text-[10px]">
                Active
              </span>
            </div>
            <div className="rounded-lg bg-[#1C1C1E] p-2 flex justify-between">
              <div>
                <span className="font-semibold text-white">Operations Control Center</span>
                <p className="text-[#98989D]">24/7 Hotline: (800) 555-7392</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
