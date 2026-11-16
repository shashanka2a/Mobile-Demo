'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Hospital,
  MapPin,
  Phone,
  CheckCircle2,
  Calendar,
  Save,
  Users,
  Compass,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import { getJsa, saveJsa } from '@/lib/storage';
import { JsaFormRecord } from '@/types';

export function JobSafetyScreen() {
  const { dateKey, selectedProject, triggerRefresh, navigate } = useAppContext();
  const [jsa, setJsa] = useState<JsaFormRecord | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const data = getJsa(dateKey);
    if (data) {
      setJsa(data);
    } else {
      // Default template
      setJsa({
        id: `jsa-${dateKey}`,
        projectId: selectedProject.id,
        projectName: selectedProject.name,
        dateKey,
        taskDescription: 'Chemical wicking and perimeter vegetation clearance using ASV compact track loaders with 12ft front-mount wipers.',
        objectives: ['Tailgate Safety Briefing', 'Chemical Containment Check', 'Hospital Route Verified'],
        hazards: [
          {
            id: 'hz-1',
            step: '1. Chemical Mix & Nurse Tank Fill',
            hazard: 'Splashing of concentrated herbicide, skin or eye irritation',
            controls: 'Wear full face shield, nitrile gloves, apron. Stand upwind during mix and pour.',
            risk: 'medium',
          },
          {
            id: 'hz-2',
            step: '2. Equipment Traversing Array Rows',
            hazard: 'Colliding with panel tracker arms or hidden DC wire conduit',
            controls: 'Maintain minimum 18-inch clearance from panel torque tubes. Speed limit 4 mph.',
            risk: 'high',
          },
          {
            id: 'hz-3',
            step: '3. Ground Staff Spotting & Wiper Check',
            hazard: 'Pinch points under hydraulic arms, slips on wet slopes',
            controls: 'High-visibility class 3 vests, steel toe boots. Direct eye contact before approaching cab.',
            risk: 'low',
          },
        ],
        nearestHospital: {
          name: 'Lancaster General Hospital Emergency Room',
          address: '555 N Duke St, Lancaster, PA 17602',
          phone: '(717) 544-5511',
          distanceMiles: 14.8,
          etaMinutes: 22,
        },
        emergencyGps: '39.8924° N, 76.1621° W (Main Gate 1)',
        preparedBy: 'Ricky Smith (Supervisor)',
        supervisorSigned: true,
        timestamp: new Date().toISOString(),
        syncStatus: 'synced',
      });
    }
  }, [dateKey, selectedProject]);

  const handleSave = () => {
    if (!jsa) return;
    saveJsa(dateKey, jsa);
    triggerRefresh();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!jsa) return null;

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Job Safety Analysis"
        subtitle="JSA & Emergency Action Plan"
        rightAction={<SyncStatusBadge status={jsa.syncStatus} />}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Banner */}
        <div className="flex items-center justify-between rounded-xl bg-[#30D158]/10 border border-[#30D158]/30 p-3 text-xs">
          <div className="flex items-center gap-2 text-[#30D158]">
            <ShieldCheck className="h-4 w-4" />
            <span className="font-semibold">OSHA & Site Compliant</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('safety')}
            className="text-[11px] font-semibold text-[#FF6633] hover:underline"
          >
            Toolbox Talks →
          </button>
        </div>

        {/* Task Description Card */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
            Task Description & Scope
          </h3>
          <p className="text-xs text-white leading-relaxed">
            {jsa.taskDescription}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {jsa.objectives.map((obj, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full bg-[#3A3A3C] px-2.5 py-1 text-[10px] font-medium text-white"
              >
                <CheckCircle2 className="h-3 w-3 text-[#30D158]" />
                {obj}
              </span>
            ))}
          </div>
        </div>

        {/* Hazard Breakdown Table */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
            Identified Hazards & Mitigations
          </h3>
          <div className="flex flex-col gap-3">
            {jsa.hazards.map((hz) => (
              <div
                key={hz.id}
                className="rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] p-3 text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">{hz.step}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                      hz.risk === 'high'
                        ? 'bg-[#FF453A]/20 text-[#FF453A]'
                        : hz.risk === 'medium'
                        ? 'bg-[#FF9F0A]/20 text-[#FF9F0A]'
                        : 'bg-[#30D158]/20 text-[#30D158]'
                    }`}
                  >
                    {hz.risk} risk
                  </span>
                </div>
                <p className="text-[#FF453A] font-medium mb-1">
                  ⚠️ Hazard: <span className="text-[#98989D]">{hz.hazard}</span>
                </p>
                <p className="text-[#30D158] font-medium">
                  🛡️ Control: <span className="text-[#E5E5EA]">{hz.controls}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Hospital Information */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <div className="flex items-center gap-2 mb-2 text-[#FF6633]">
            <Hospital className="h-4 w-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">
              Emergency Medical Route
            </h3>
          </div>

          <div className="rounded-lg bg-[#1C1C1E] p-3 text-xs flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-white">{jsa.nearestHospital.name}</h4>
                <p className="text-[11px] text-[#98989D]">{jsa.nearestHospital.address}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-[#FF6633]">
                  {jsa.nearestHospital.distanceMiles} mi
                </span>
                <p className="text-[10px] text-[#98989D]">~{jsa.nearestHospital.etaMinutes} mins ETA</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#3A3A3C] pt-2 text-[11px]">
              <span className="flex items-center gap-1 text-[#98989D]">
                <Phone className="h-3.5 w-3.5 text-[#30D158]" />
                {jsa.nearestHospital.phone}
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-[#98989D]">
                <Compass className="h-3 w-3 text-[#FF6633]" />
                {jsa.emergencyGps}
              </span>
            </div>
          </div>
        </div>

        {/* Sign-off button */}
        <button
          type="button"
          onClick={handleSave}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all active:scale-[0.98] ${
            isSaved ? 'bg-[#30D158]' : 'bg-[#FF6633] hover:bg-[#E05526]'
          }`}
        >
          {isSaved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{isSaved ? 'JSA Briefing Confirmed!' : 'Acknowledge & Sign JSA'}</span>
        </button>
      </div>
    </div>
  );
}
