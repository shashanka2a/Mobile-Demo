'use client';

import React, { useState, useEffect } from 'react';
import {
  Wrench,
  CheckCircle2,
  AlertCircle,
  Save,
  PenTool,
  Check,
  X,
  FileCheck,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { SignaturePad } from '../SignaturePad';
import { useAppContext } from '@/context/AppContext';
import { getEquipment, saveEquipment } from '@/lib/storage';
import { createUuid } from '@/lib/utils';
import {
  EquipmentFormData,
  EquipmentChecklistEntry,
  FluidLevel,
  HoseCondition,
  BeltCondition,
  VolumeUnit,
} from '@/types';

export function ChecklistScreen() {
  const { dateKey, selectedProject, currentUser, triggerRefresh } = useAppContext();

  const [formData, setFormData] = useState<EquipmentFormData>({
    machineNumber: 'ASV-104',
    machineType: 'Track Loader RT-40',
    machineBrand: 'ASV Posi-Track',
    lastFourVin: '8832',
    operatorName: currentUser.name,
    siteName: selectedProject.name,
    asvHours: '1,428.6',
    motorOil: 'FULL',
    motorOilAmount: '',
    motorOilUnit: 'qt',
    coolant: 'FULL',
    coolantAmount: '',
    coolantUnit: 'qt',
    hydraulicOil: 'FULL',
    hydraulicOilAmount: '',
    hydraulicOilUnit: 'qt',
    hoses: 'GOOD',
    fanBelt: 'TIGHT',
    attachmentApplicable: 'Yes',
    attachmentName: 'Wicked Weed Wiper 12ft Front Mount',
    attachmentNumber: 'ATT-02',
    attachmentCondition: 'Good',
    repairsNotes: 'Pre-trip complete. Cleaned debris from pre-cleaner screen. Track tension verified.',
  });

  const [signature, setSignature] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);
  const [showSigModal, setShowSigModal] = useState(false);

  useEffect(() => {
    const list = getEquipment(dateKey);
    if (list.length > 0) {
      setFormData(list[0].formData);
      if (list[0].signature) {
        setSignature(list[0].signature);
      }
    }
  }, [dateKey]);

  const updateField = <K extends keyof EquipmentFormData>(key: K, value: EquipmentFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    const entry: EquipmentChecklistEntry = {
      id: `equip-${dateKey}`,
      type: 'checklist',
      project: selectedProject.name,
      projectId: selectedProject.id,
      timestamp: new Date().toISOString(),
      formData,
      signature: signature || undefined,
      syncStatus: 'synced',
    };

    saveEquipment(dateKey, entry);
    triggerRefresh();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Equipment Inspection"
        subtitle="Daily Pre-Trip & Safety Checklist"
        rightAction={<SyncStatusBadge status="synced" />}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Machine Identification Card */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
            1. Machine Identification
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[#98989D]">Machine #</label>
              <input
                type="text"
                value={formData.machineNumber}
                onChange={(e) => updateField('machineNumber', e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#98989D]">Last 4 VIN</label>
              <input
                type="text"
                value={formData.lastFourVin}
                onChange={(e) => updateField('lastFourVin', e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#98989D]">Operator Name</label>
              <input
                type="text"
                value={formData.operatorName}
                onChange={(e) => updateField('operatorName', e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#98989D]">Current ASV Hours</label>
              <input
                type="text"
                value={formData.asvHours}
                onChange={(e) => updateField('asvHours', e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] p-2 font-mono text-white focus:border-[#FF6633] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Fluid Levels Card */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
            2. Fluid Levels
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Motor Oil', key: 'motorOil' as const, amtKey: 'motorOilAmount' as const, unitKey: 'motorOilUnit' as const },
              { label: 'Engine Coolant', key: 'coolant' as const, amtKey: 'coolantAmount' as const, unitKey: 'coolantUnit' as const },
              { label: 'Hydraulic Oil', key: 'hydraulicOil' as const, amtKey: 'hydraulicOilAmount' as const, unitKey: 'hydraulicOilUnit' as const },
            ].map((f) => {
              const isFull = formData[f.key] === 'FULL';
              const isLow = formData[f.key] === 'LOW';
              return (
                <div key={f.label} className="flex items-center justify-between border-b border-[#3A3A3C]/60 pb-2 text-xs">
                  <span className="font-medium text-white">{f.label}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateField(f.key, 'FULL')}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                        isFull
                          ? 'bg-[#30D158] text-black font-bold'
                          : 'bg-[#1C1C1E] text-[#98989D] hover:text-white'
                      }`}
                    >
                      FULL
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField(f.key, 'LOW')}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                        isLow
                          ? 'bg-[#FF453A] text-white font-bold'
                          : 'bg-[#1C1C1E] text-[#98989D] hover:text-white'
                      }`}
                    >
                      LOW
                    </button>

                    {isLow && (
                      <input
                        type="text"
                        placeholder="Amt"
                        value={formData[f.amtKey]}
                        onChange={(e) => updateField(f.amtKey, e.target.value)}
                        className="w-14 rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] px-2 py-1 text-xs text-white"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Condition Check */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
            3. Mechanical Inspection
          </h3>
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white">Hydraulic Hoses & Fittings</span>
              <div className="flex gap-1">
                {(['GOOD', 'BAD'] as HoseCondition[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => updateField('hoses', v)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                      formData.hoses === v
                        ? v === 'GOOD' ? 'bg-[#30D158] text-black font-bold' : 'bg-[#FF453A] text-white'
                        : 'bg-[#1C1C1E] text-[#98989D]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white">Fan Belt Tension</span>
              <div className="flex gap-1">
                {(['TIGHT', 'LOOSE'] as BeltCondition[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => updateField('fanBelt', v)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                      formData.fanBelt === v
                        ? v === 'TIGHT' ? 'bg-[#30D158] text-black font-bold' : 'bg-[#FF453A] text-white'
                        : 'bg-[#1C1C1E] text-[#98989D]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Operator Signature Pad */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
              4. Operator Pre-Trip Signature
            </h3>
            {signature && (
              <span className="flex items-center gap-1 text-[11px] text-[#30D158]">
                <CheckCircle2 className="h-3 w-3" />
                Captured
              </span>
            )}
          </div>

          <SignaturePad
            onSave={(data) => setSignature(data)}
            initialSignature={signature}
            label="Operator Sign-Off"
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
          <span>{isSaved ? 'Checklist Signed & Saved!' : 'Submit Pre-Trip Inspection'}</span>
        </button>
      </div>
    </div>
  );
}
