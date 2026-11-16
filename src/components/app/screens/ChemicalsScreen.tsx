'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  FlaskConical,
  Plus,
  Trash2,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Save,
  Info,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import {
  DEFAULT_CHEMICALS,
} from '@/lib/mockData';
import { getChemicals, saveChemicals } from '@/lib/storage';
import { getChemicalWarning, createUuid } from '@/lib/utils';
import { ApplicationType, ChemicalItem, ChemicalEntry } from '@/types';

const UNITS = ['GAL', 'oz', 'L'];

export function ChemicalsScreen() {
  const { dateKey, selectedProject, triggerRefresh, goBack } = useAppContext();
  const [appType, setAppType] = useState<ApplicationType>('wicking');
  const [chemicals, setChemicals] = useState<ChemicalItem[]>(DEFAULT_CHEMICALS);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [syncStatus, setSyncStatus] = useState<ChemicalEntry['syncStatus']>('synced');

  // Load existing records for the current date & app type
  useEffect(() => {
    const list = getChemicals(dateKey);
    const existing = list.find((c) => c.applicationType === appType);
    if (existing) {
      setChemicals(existing.chemicals);
      setNotes(existing.notes || '');
      setPhotos(existing.photos || []);
      setSyncStatus(existing.syncStatus || 'synced');
    } else {
      setChemicals(DEFAULT_CHEMICALS.map((c) => ({ ...c })));
      setNotes('');
      setPhotos([]);
      setSyncStatus('synced');
    }
    setIsSaved(false);
  }, [dateKey, appType]);

  const updateQuantity = (index: number, val: string) => {
    setChemicals((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: val };
      return next;
    });
    setIsSaved(false);
  };

  const updateUnit = (index: number, unit: string) => {
    setChemicals((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], unit };
      return next;
    });
    setIsSaved(false);
  };

  const addCustomChemical = () => {
    setChemicals((prev) => [
      ...prev,
      { name: 'New Chemical', quantity: '', unit: 'GAL' },
    ]);
  };

  const removeChemical = (index: number) => {
    setChemicals((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSimulatePhoto = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80',
    ];
    setPhotos((prev) => [...prev, samplePhotos[prev.length % samplePhotos.length]]);
  };

  const handleSave = () => {
    const entry: ChemicalEntry = {
      id: `chem-${appType}-${dateKey}`,
      project: selectedProject.name,
      projectId: selectedProject.id,
      timestamp: new Date().toISOString(),
      applicationType: appType,
      chemicals: chemicals.filter((c) => c.quantity.trim() !== ''),
      notes,
      photos,
      syncStatus: 'synced',
    };

    saveChemicals(dateKey, entry);
    triggerRefresh();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Chemicals Log"
        subtitle={`${selectedProject.name}`}
        rightAction={<SyncStatusBadge status={syncStatus} />}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Wicking vs Spraying Tab Selector */}
        <div className="flex rounded-xl bg-[#2C2C2E] p-1 border border-[#3A3A3C]">
          <button
            type="button"
            onClick={() => setAppType('wicking')}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              appType === 'wicking'
                ? 'bg-[#FF6633] text-white shadow'
                : 'text-[#98989D] hover:text-white'
            }`}
          >
            Wicking Rig
          </button>
          <button
            type="button"
            onClick={() => setAppType('spraying')}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              appType === 'spraying'
                ? 'bg-[#FF6633] text-white shadow'
                : 'text-[#98989D] hover:text-white'
            }`}
          >
            Spraying Tank
          </button>
        </div>

        {/* Chemicals List */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#98989D]">
              Remaining / Loaded Inventory
            </h3>
            <button
              type="button"
              onClick={addCustomChemical}
              className="flex items-center gap-1 text-xs font-medium text-[#FF6633] hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Chemical</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {chemicals.map((chem, idx) => {
              const warning = getChemicalWarning(chem.name, chem.quantity, chem.unit);
              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-3 transition-colors ${
                    warning
                      ? 'border-[#FF9F0A] bg-[#FF9F0A]/10'
                      : 'border-[#3A3A3C] bg-[#2C2C2E]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={chem.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setChemicals((prev) => {
                          const next = [...prev];
                          next[idx] = { ...next[idx], name: val };
                          return next;
                        });
                      }}
                      className="w-1/2 bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />

                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        placeholder="0.0"
                        value={chem.quantity}
                        onChange={(e) => updateQuantity(idx, e.target.value)}
                        className="w-16 rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] px-2 py-1 text-right text-sm font-mono text-white placeholder-[#555558] focus:border-[#FF6633] focus:outline-none"
                      />

                      <select
                        value={chem.unit}
                        onChange={(e) => updateUnit(idx, e.target.value)}
                        className="rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] px-1.5 py-1 text-xs font-medium text-white focus:border-[#FF6633] focus:outline-none"
                      >
                        {UNITS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => removeChemical(idx)}
                        className="rounded p-1 text-[#98989D] hover:text-[#FF453A]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {warning && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#FF9F0A]">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <span>{warning}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Notes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#98989D]">
            Mix & Application Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Mixed in nurse tank at 07:30. Good blue indicator visibility on Johnson grass foliage..."
            className="w-full rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs text-white placeholder-[#555558] focus:border-[#FF6633] focus:outline-none"
          />
        </div>

        {/* Photos & Evidence */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#98989D]">
              Tank / Product Photos
            </label>
            <button
              type="button"
              onClick={handleSimulatePhoto}
              className="flex items-center gap-1 text-xs font-medium text-[#FF6633] hover:underline"
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Attach Photo</span>
            </button>
          </div>

          {photos.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {photos.map((src, i) => (
                <div key={i} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#3A3A3C]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="Evidence" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div
              onClick={handleSimulatePhoto}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#3A3A3C] bg-[#242426] py-3 text-[#98989D] hover:border-[#FF6633]"
            >
              <Camera className="h-5 w-5 mb-1 text-[#FF6633]" />
              <span className="text-[11px]">Tap to simulate camera photo</span>
            </div>
          )}
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all active:scale-[0.98] ${
            isSaved
              ? 'bg-[#30D158]'
              : 'bg-[#FF6633] hover:bg-[#E05526] shadow-[#FF6633]/20'
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>Saved & Synced!</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Chemical Entries</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
