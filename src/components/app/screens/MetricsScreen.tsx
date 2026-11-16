'use client';

import React, { useState, useEffect } from 'react';
import {
  Gauge,
  CheckCircle2,
  Save,
  Droplets,
  Users,
  Compass,
  Sparkles,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import { DEFAULT_METRIC_FIELDS } from '@/lib/mockData';
import { getMetrics, saveMetrics } from '@/lib/storage';
import { MetricsEntry } from '@/types';

export function MetricsScreen() {
  const { dateKey, selectedProject, triggerRefresh } = useAppContext();
  const [values, setValues] = useState<Record<string, string>>({
    wicking_array_completed: '28.5',
    mowing_array_completed: '16.0',
    wicking_green_space_completed: '6.2',
    mowing_green_space_completed: '4.0',
    water_usage: '450',
    number_of_operators: '4',
  });
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const list = getMetrics(dateKey);
    if (list.length > 0) {
      setValues(list[0].values);
      setNotes(list[0].notes || '');
    }
  }, [dateKey]);

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setIsSaved(false);
  };

  const handleSave = () => {
    const entry: MetricsEntry = {
      id: `metric-${dateKey}`,
      project: selectedProject.name,
      projectId: selectedProject.id,
      timestamp: new Date().toISOString(),
      values,
      notes,
      syncStatus: 'synced',
    };

    saveMetrics(dateKey, entry);
    triggerRefresh();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const totalAcres =
    (parseFloat(values.wicking_array_completed || '0') || 0) +
    (parseFloat(values.mowing_array_completed || '0') || 0);

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Daily Production Metrics"
        subtitle="Acres Completed, Water & Operators"
        rightAction={<SyncStatusBadge status="synced" />}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Production Highlights Card */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-[#3A3A3C] bg-gradient-to-br from-[#2C2C2E] to-[#242426] p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF6633]">
              Total Daily Acres
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-mono text-2xl font-bold text-white">
                {totalAcres.toFixed(1)}
              </span>
              <span className="text-xs text-[#98989D]">acres</span>
            </div>
            <p className="mt-0.5 text-[10px] text-[#30D158] font-medium">✓ On daily target</p>
          </div>

          <div className="rounded-xl border border-[#3A3A3C] bg-gradient-to-br from-[#2C2C2E] to-[#242426] p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0A84FF]">
              Water Usage
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-mono text-2xl font-bold text-white">
                {values.water_usage || '0'}
              </span>
              <span className="text-xs text-[#98989D]">gal</span>
            </div>
            <p className="mt-0.5 text-[10px] text-[#98989D]">Mix & nurse tank</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
            Array & Green Space Metrics
          </h3>

          <div className="flex flex-col gap-3">
            {DEFAULT_METRIC_FIELDS.map((field) => (
              <div
                key={field.key}
                className="flex items-center justify-between border-b border-[#3A3A3C]/50 pb-2 text-xs"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-white">{field.label}</span>
                  <span className="text-[10px] text-[#98989D]">Unit: {field.unit}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={values[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-24 rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] px-2.5 py-1.5 text-right font-mono text-sm font-semibold text-white focus:border-[#FF6633] focus:outline-none"
                  />
                  <span className="w-8 text-[11px] font-medium text-[#98989D]">
                    {field.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shift Notes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#98989D]">
            Production Remarks & Crew Allocation
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Target acreage achieved for daily production goal. 4 operators on site..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs text-white placeholder-[#555558] focus:border-[#FF6633] focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSave}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all active:scale-[0.98] ${
            isSaved ? 'bg-[#30D158]' : 'bg-[#FF6633] hover:bg-[#E05526]'
          }`}
        >
          {isSaved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{isSaved ? 'Metrics Saved & Synced!' : 'Submit Daily Metrics'}</span>
        </button>
      </div>
    </div>
  );
}
