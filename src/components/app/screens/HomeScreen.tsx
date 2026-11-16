'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  FlaskConical,
  Gauge,
  ClipboardCheck,
  Wrench,
  Camera,
  AlertTriangle,
  ShieldCheck,
  Eye,
  Map,
  BarChart3,
  Info,
  ChevronDown,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import {
  formatFriendlyDate,
  getDateKey,
  startOfLocalDay,
  isSameLocalDay,
  isFutureLocalDay,
  parseDateKeyLocal,
} from '@/lib/utils';
import { calculateDayStatus, getSignedReport } from '@/lib/storage';
import { DayStatus } from '@/types';

// Task tiles configuration matching mobile TASK_TILES
const TASK_TILES = [
  { id: 'notes', name: 'Notes', screen: 'notes', icon: FileText, color: '#0A84FF', desc: 'Daily logs & diary' },
  { id: 'chemical', name: 'Chemicals', screen: 'chemicals', icon: FlaskConical, color: '#FF9F0A', desc: 'Spray & wicking mix' },
  { id: 'metrics', name: 'Metrics', screen: 'metrics', icon: Gauge, color: '#30D158', desc: 'Acres, water & ops' },
  { id: 'survey', name: 'Survey', screen: 'survey', icon: ClipboardCheck, color: '#FF6633', desc: '11 compliance checks' },
  { id: 'equipment', name: 'Equipment', screen: 'checklist', icon: Wrench, color: '#FF9F0A', desc: 'Pre-trip & sign-off' },
  { id: 'attachments', name: 'Photos', screen: 'attachments', icon: Camera, color: '#64D2FF', desc: 'Field evidence' },
  { id: 'incidents', name: 'Incidents', screen: 'incidents', icon: AlertTriangle, color: '#FF453A', desc: 'Injury & safety log' },
  { id: 'job-safety', name: 'Job Safety', screen: 'job-safety', icon: ShieldCheck, color: '#30D158', desc: 'JSA & emergency GPS' },
  { id: 'observations', name: 'Observations', screen: 'observations', icon: Eye, color: '#BF5AF2', desc: 'Geotagged hazards' },
  { id: 'map', name: 'Map', screen: 'map', icon: Map, color: '#0A84FF', desc: 'Project boundary' },
  { id: 'report', name: 'Report', screen: 'report-preview', icon: BarChart3, color: '#FF6633', desc: 'Preview & sign report' },
  { id: 'info', name: 'Info', screen: 'project-info', icon: Info, color: '#98989D', desc: 'Site details & emergency' },
];

export function HomeScreen() {
  const {
    selectedDate,
    setSelectedDate,
    selectedProject,
    setSelectedProject,
    projects,
    navigate,
    dateKey,
    refreshTrigger,
  } = useAppContext();

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarViewMonth, setCalendarViewMonth] = useState(() => new Date(selectedDate));

  // Compute 14-day strip around selectedDate
  const stripDays = useMemo(() => {
    const days: Date[] = [];
    const base = startOfLocalDay(new Date());
    for (let i = -7; i <= 6; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      days.push(d);
    }
    return days;
  }, []);

  const currentDayStatus = useMemo(() => {
    return calculateDayStatus(dateKey);
  }, [dateKey, refreshTrigger]);

  const signedReport = useMemo(() => {
    return getSignedReport(dateKey);
  }, [dateKey, refreshTrigger]);

  // Calendar modal grid days
  const monthDays = useMemo(() => {
    const year = calendarViewMonth.getFullYear();
    const month = calendarViewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startOffset = firstDay.getDay(); // 0 for Sunday
    const days: { date: Date; dateKey: string; isCurrentMonth: boolean }[] = [];

    // Prev month padding
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, dateKey: getDateKey(d), isCurrentMonth: false });
    }

    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push({ date: d, dateKey: getDateKey(d), isCurrentMonth: true });
    }

    // Next month padding to fill complete grid
    const remaining = 35 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, dateKey: getDateKey(d), isCurrentMonth: false });
    }

    return days;
  }, [calendarViewMonth]);

  const renderStatusDot = (status: DayStatus) => {
    switch (status) {
      case 'signed':
        return <span className="h-1.5 w-1.5 rounded-full bg-[#30D158]" title="Signed daily report" />;
      case 'unsigned':
        return <span className="h-1 w-3 rounded-full bg-[#FFD60A]" title="Data logged, unsigned" />;
      case 'missing':
        return <span className="h-1.5 w-1.5 rounded-full bg-[#FF453A]" title="Missing weekday report" />;
      default:
        return <span className="h-1.5 w-1.5 opacity-0" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* 1. Project Selector Card */}
      <section className="px-4 pt-4">
        <button
          type="button"
          onClick={() => setShowProjectModal(true)}
          className="group flex w-full items-center justify-between rounded-2xl border border-[#3A3A3C] bg-gradient-to-br from-[#2C2C2E] to-[#242426] p-3.5 text-left shadow-lg transition-all hover:border-[#FF6633]/50 active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6633]/15 text-[#FF6633] ring-1 ring-[#FF6633]/30">
              <span className="font-mono text-xs font-bold">UV</span>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FF6633]">
                Active Project
              </span>
              <h2 className="truncate text-sm font-semibold text-white">
                {selectedProject.name}
              </h2>
              <p className="truncate text-[11px] text-[#98989D]">
                {selectedProject.code} • {selectedProject.location}
              </p>
            </div>
          </div>
          <ChevronDown className="h-5 w-5 shrink-0 text-[#98989D] transition-transform group-hover:text-white" />
        </button>
      </section>

      {/* 2. Date Strip & Calendar Toggle */}
      <section className="px-4">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#98989D]">
              Reporting Date
            </h3>
            <span className="rounded bg-[#3A3A3C] px-1.5 py-0.5 font-mono text-[10px] text-white">
              {formatFriendlyDate(selectedDate)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowCalendarModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#2C2C2E] px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-[#3A3A3C]"
          >
            <CalendarIcon className="h-3.5 w-3.5 text-[#FF6633]" />
            <span>Calendar</span>
          </button>
        </div>

        {/* Horizontal Weekday Strip */}
        <div className="flex gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {stripDays.map((date) => {
            const isSelected = isSameLocalDay(date, selectedDate);
            const isToday = isSameLocalDay(date, new Date());
            const dKey = getDateKey(date);
            const status = calculateDayStatus(dKey);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'narrow' });
            const dayNumber = date.getDate();

            return (
              <button
                key={dKey}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`flex min-w-[46px] flex-col items-center justify-between rounded-xl py-2 transition-all ${
                  isSelected
                    ? 'bg-[#FF6633] text-white shadow-md shadow-[#FF6633]/30 ring-2 ring-[#FF6633]/50'
                    : isToday
                    ? 'border border-[#FF6633]/50 bg-[#2C2C2E] text-white'
                    : 'bg-[#242426] text-[#98989D] hover:bg-[#2C2C2E]'
                }`}
              >
                <span className={`text-[10px] font-medium uppercase ${isSelected ? 'text-white/90' : 'text-[#98989D]'}`}>
                  {dayName}
                </span>
                <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-white'}`}>
                  {dayNumber}
                </span>
                <div className="flex h-2 items-center justify-center">
                  {renderStatusDot(status)}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Daily Status Banner */}
      <section className="px-4">
        <div
          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition-colors ${
            currentDayStatus === 'signed'
              ? 'border border-[#30D158]/30 bg-[#30D158]/10 text-[#30D158]'
              : currentDayStatus === 'unsigned'
              ? 'border border-[#FFD60A]/30 bg-[#FFD60A]/10 text-[#FFD60A]'
              : 'border border-[#3A3A3C] bg-[#2C2C2E] text-[#98989D]'
          }`}
        >
          <div className="flex items-center gap-2">
            {currentDayStatus === 'signed' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#30D158]" />
            ) : currentDayStatus === 'unsigned' ? (
              <Clock className="h-4 w-4 shrink-0 text-[#FFD60A]" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-[#98989D]" />
            )}
            <span className="font-medium text-white">
              {currentDayStatus === 'signed'
                ? `Daily Report Signed by ${signedReport?.preparedBy || 'Supervisor'}`
                : currentDayStatus === 'unsigned'
                ? 'Field Data Logged (Awaiting Final Supervisor Signature)'
                : 'No field entries recorded yet for this day'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('report-preview')}
            className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-white/20"
          >
            {currentDayStatus === 'signed' ? 'View' : 'Review'}
          </button>
        </div>
      </section>

      {/* 4. 12 Task Tiles Grid */}
      <section className="px-4">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#98989D]">
            Daily Tasks & Modules
          </h3>
          <span className="text-[11px] text-[#98989D]">12 Modules Active</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {TASK_TILES.map((tile) => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => navigate(tile.screen)}
                className="group relative flex flex-col items-start justify-between rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-left transition-all hover:border-[#FF6633]/60 hover:bg-[#343438] active:scale-[0.98]"
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${tile.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: tile.color }} />
                  </div>
                  <span className="text-[10px] text-[#98989D] opacity-0 transition-opacity group-hover:opacity-100">
                    Open →
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-xs font-semibold text-white group-hover:text-[#FF6633]">
                    {tile.name}
                  </h4>
                  <p className="truncate text-[10px] text-[#98989D]">
                    {tile.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Calendar Month Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-[#3A3A3C] bg-[#1C1C1E] p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3A3A3C] pb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-[#FF6633]" />
                <h3 className="text-sm font-semibold text-white">
                  {calendarViewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const prev = new Date(calendarViewMonth);
                    prev.setMonth(prev.getMonth() - 1);
                    setCalendarViewMonth(prev);
                  }}
                  className="rounded p-1 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = new Date(calendarViewMonth);
                    next.setMonth(next.getMonth() + 1);
                    setCalendarViewMonth(next);
                  }}
                  className="rounded p-1 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowCalendarModal(false)}
                  className="ml-2 rounded p-1 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* DOW headers */}
            <div className="grid grid-cols-7 gap-1 pt-3 text-center font-mono text-[10px] font-semibold text-[#98989D]">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 pt-2">
              {monthDays.map(({ date, dateKey: dKey, isCurrentMonth }) => {
                const isSelected = isSameLocalDay(date, selectedDate);
                const status = calculateDayStatus(dKey);
                return (
                  <button
                    key={dKey}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date);
                      setShowCalendarModal(false);
                    }}
                    className={`flex h-9 flex-col items-center justify-center rounded-lg text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#FF6633] font-bold text-white shadow-md'
                        : isCurrentMonth
                        ? 'text-white hover:bg-[#2C2C2E]'
                        : 'text-[#555558]'
                    }`}
                  >
                    <span>{date.getDate()}</span>
                    <div className="mt-0.5">{renderStatusDot(status)}</div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between border-t border-[#3A3A3C] pt-3 text-[10px] text-[#98989D]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#30D158]" />
                <span>Signed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-[#FFD60A]" />
                <span>Logged (Unsigned)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FF453A]" />
                <span>Missing Weekday</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Switcher Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-[#3A3A3C] bg-[#1C1C1E] p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3A3A3C] pb-3">
              <h3 className="text-sm font-semibold text-white">Select Project</h3>
              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                className="rounded p-1 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-3">
              {projects.map((proj) => {
                const isActive = proj.id === selectedProject.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      setSelectedProject(proj);
                      setShowProjectModal(false);
                    }}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                      isActive
                        ? 'border-[#FF6633] bg-[#FF6633]/10 text-white'
                        : 'border-[#3A3A3C] bg-[#2C2C2E] text-[#98989D] hover:bg-[#343438]'
                    }`}
                  >
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      isActive ? 'border-[#FF6633] bg-[#FF6633]' : 'border-[#98989D]'
                    }`}>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{proj.name}</h4>
                      <p className="text-[11px] text-[#98989D]">{proj.code} • {proj.client}</p>
                      <p className="text-[10px] text-[#98989D]">{proj.location}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
