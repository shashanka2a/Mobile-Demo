'use client';

import React, { useState, useMemo } from 'react';
import {
  Activity,
  FileText,
  FlaskConical,
  Gauge,
  ClipboardCheck,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Eye,
  Camera,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { useAppContext } from '@/context/AppContext';
import { ActivityItem } from '@/types';

export function ActivityScreen() {
  const { selectedProject, dateKey } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('today');

  const activities: ActivityItem[] = useMemo(
    () => [
      {
        id: 'act-1',
        type: 'report',
        title: 'Daily Report Submitted',
        subtitle: `Supervisor signature captured for ${selectedProject.name}`,
        timestamp: '16:45 PM',
        timestampDate: new Date(),
        statusBadge: 'Signed',
      },
      {
        id: 'act-2',
        type: 'chemicals',
        title: 'Chemical Wicking Logged',
        subtitle: '45 GAL Glyphosate + 64 oz Surfactant mixed in nurse tank',
        timestamp: '14:20 PM',
        timestampDate: new Date(),
        statusBadge: 'Synced',
      },
      {
        id: 'act-3',
        type: 'metrics',
        title: 'Production Metrics Recorded',
        subtitle: '28.5 acres wicking + 16.0 acres mowing completed (4 ops)',
        timestamp: '13:10 PM',
        timestampDate: new Date(),
        statusBadge: 'Synced',
      },
      {
        id: 'act-4',
        type: 'observations',
        title: 'Site Observation Logged',
        subtitle: 'Dense Johnson grass stand at Array 4 North Boundary (GPS locked)',
        timestamp: '11:05 AM',
        timestampDate: new Date(),
        statusBadge: 'Open',
      },
      {
        id: 'act-5',
        type: 'safety_talks',
        title: 'Toolbox Talk Conducted',
        subtitle: 'Automated External Defibrillator (AED) Safety Talk (4 crew signed)',
        timestamp: '07:30 AM',
        timestampDate: new Date(),
        statusBadge: 'Done',
      },
      {
        id: 'act-6',
        type: 'equipment',
        title: 'Pre-Trip Inspection Approved',
        subtitle: 'ASV-104 RT-40 Track Loader checked & signed by Ricky Smith',
        timestamp: '07:05 AM',
        timestampDate: new Date(),
        statusBadge: 'Approved',
      },
    ],
    [selectedProject]
  );

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'report':
        return <CheckCircle2 className="h-4 w-4 text-[#30D158]" />;
      case 'chemicals':
        return <FlaskConical className="h-4 w-4 text-[#FF9F0A]" />;
      case 'metrics':
        return <Gauge className="h-4 w-4 text-[#30D158]" />;
      case 'observations':
        return <Eye className="h-4 w-4 text-[#BF5AF2]" />;
      case 'safety_talks':
        return <ShieldCheck className="h-4 w-4 text-[#FF6633]" />;
      case 'equipment':
        return <Wrench className="h-4 w-4 text-[#0A84FF]" />;
      default:
        return <FileText className="h-4 w-4 text-[#98989D]" />;
    }
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Field Activity Feed"
        subtitle="Chronological Audit Trail & Sync Events"
        showBack={false}
      />

      <div className="flex flex-col gap-3 p-4">
        {/* Filters */}
        <div className="flex rounded-xl bg-[#2C2C2E] p-1 border border-[#3A3A3C]">
          {(['all', 'today', 'week'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-[#FF6633] text-white shadow'
                  : 'text-[#98989D] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Activity Stream */}
        <div className="flex flex-col gap-2">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs shadow"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1C1C1E] border border-[#3A3A3C]">
                {getIcon(act.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white truncate">{act.title}</h4>
                  <span className="font-mono text-[10px] text-[#98989D] shrink-0">{act.timestamp}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-[#98989D] leading-snug">{act.subtitle}</p>

                {act.statusBadge && (
                  <span className="mt-1.5 inline-block rounded bg-[#3A3A3C] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-white">
                    {act.statusBadge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
