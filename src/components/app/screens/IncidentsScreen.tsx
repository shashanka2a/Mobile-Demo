'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  ShieldAlert,
  X,
  FileCheck,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import { getAllIncidents, saveIncident } from '@/lib/storage';
import { createUuid, formatFriendlyDate } from '@/lib/utils';
import { IncidentEntry } from '@/types';

export function IncidentsScreen() {
  const { dateKey, selectedProject, triggerRefresh } = useAppContext();
  const [incidents, setIncidents] = useState<IncidentEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'Open' | 'Closed'>('Open');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [recordable, setRecordable] = useState(false);
  const [location, setLocation] = useState('');
  const [injuryType, setInjuryType] = useState('Bee Sting / Insect Bite');
  const [employeeName, setEmployeeName] = useState('');
  const [treatment, setTreatment] = useState('');
  const [investigation, setInvestigation] = useState('');
  const [outcome, setOutcome] = useState('');

  const loadIncidents = () => {
    setIncidents(getAllIncidents());
  };

  useEffect(() => {
    loadIncidents();
  }, [dateKey]);

  const handleSave = () => {
    if (!title.trim()) return;

    const entry: IncidentEntry = {
      id: `inc-${createUuid()}`,
      project: selectedProject.name,
      projectId: selectedProject.id,
      timestamp: new Date().toISOString(),
      title,
      status: 'Open',
      recordable,
      incidentDate: dateKey,
      incidentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      location: location || 'Field Area',
      injuryType,
      injuredEmployee: employeeName
        ? {
            name: employeeName,
            gender: 'Male',
            jobTitle: 'Field Technician',
            treatment: treatment || 'First aid applied',
            hospitalized: false,
          }
        : undefined,
      investigation,
      outcome,
      syncStatus: 'synced',
    };

    saveIncident(dateKey, entry);
    loadIncidents();
    triggerRefresh();
    setShowAddModal(false);

    // Reset
    setTitle('');
    setRecordable(false);
    setLocation('');
    setEmployeeName('');
    setTreatment('');
    setInvestigation('');
    setOutcome('');
  };

  const filtered = incidents.filter((inc) => {
    if (inc.status !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return inc.title.toLowerCase().includes(q) || inc.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Incident Reporting"
        subtitle="Injury & Safety Investigation Logs"
        rightAction={
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 rounded-full bg-[#FF453A] px-2.5 py-1 text-xs font-semibold text-white shadow hover:bg-[#E03A30]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Report</span>
          </button>
        }
      />

      <div className="flex flex-col gap-3 p-4">
        {/* Open vs Closed Tabs */}
        <div className="flex rounded-xl bg-[#2C2C2E] p-1 border border-[#3A3A3C]">
          <button
            type="button"
            onClick={() => setActiveTab('Open')}
            className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'Open'
                ? 'bg-[#FF453A] text-white shadow'
                : 'text-[#98989D] hover:text-white'
            }`}
          >
            Open Incidents
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Closed')}
            className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'Closed'
                ? 'bg-[#30D158] text-black font-bold'
                : 'text-[#98989D] hover:text-white'
            }`}
          >
            Resolved & Closed
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#98989D]" />
          <input
            type="text"
            placeholder="Search incident logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] py-2 pl-9 pr-3 text-xs text-white placeholder-[#555558] focus:border-[#FF6633] focus:outline-none"
          />
        </div>

        {/* Incidents List */}
        <div className="flex flex-col gap-2.5">
          {filtered.length > 0 ? (
            filtered.map((inc) => (
              <div
                key={inc.id}
                className="flex flex-col gap-2 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert
                      className={`h-4 w-4 ${
                        inc.recordable ? 'text-[#FF453A]' : 'text-[#FF9F0A]'
                      }`}
                    />
                    <h4 className="font-semibold text-white">{inc.title}</h4>
                  </div>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                      inc.recordable
                        ? 'bg-[#FF453A]/20 text-[#FF453A]'
                        : 'bg-[#FF9F0A]/20 text-[#FF9F0A]'
                    }`}
                  >
                    {inc.recordable ? 'OSHA Recordable' : 'First Aid Only'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[11px] text-[#98989D]">
                  <span>Date: {inc.incidentDate}</span>
                  <span>Time: {inc.incidentTime}</span>
                  <span>Location: {inc.location}</span>
                  <span>Type: {inc.injuryType}</span>
                </div>

                {inc.injuredEmployee && (
                  <div className="rounded-lg bg-[#1C1C1E] p-2 text-[11px] text-[#E5E5EA]">
                    <span className="font-semibold text-[#FF6633]">Injured: </span>
                    {inc.injuredEmployee.name} ({inc.injuredEmployee.jobTitle}) — {inc.injuredEmployee.treatment}
                  </div>
                )}

                {inc.investigation && (
                  <p className="text-[11px] text-[#98989D] italic">
                    Investigation: {inc.investigation}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#3A3A3C] py-8 text-center text-[#98989D]">
              <ShieldAlert className="h-6 w-6 mb-1 text-[#555558]" />
              <p className="text-xs">No {activeTab.toLowerCase()} incidents reported</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Incident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl border border-[#3A3A3C] bg-[#1C1C1E] p-4 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#3A3A3C] pb-3">
              <h3 className="text-sm font-semibold text-white">Log Safety Incident</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-3 text-xs">
              <div>
                <label className="text-[#98989D]">Incident Title</label>
                <input
                  type="text"
                  placeholder="e.g. Minor Bee Sting Near Perimeter Fence"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
                />
              </div>

              {/* Recordable Toggle */}
              <div className="flex items-center justify-between rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3">
                <div>
                  <span className="font-semibold text-white">OSHA Recordable Incident</span>
                  <p className="text-[11px] text-[#98989D]">Requires medical treatment beyond first aid or days away</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRecordable(!recordable)}
                  className={`h-6 w-11 rounded-full transition-colors ${
                    recordable ? 'bg-[#FF453A]' : 'bg-[#3A3A3C]'
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                      recordable ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="text-[#98989D]">Location on Site</label>
                <input
                  type="text"
                  placeholder="e.g. Perimeter Gate 3, Fence Line"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#98989D]">Injured Employee Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Tyler Johnson"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#98989D]">First Aid / Treatment Summary</label>
                <textarea
                  rows={2}
                  placeholder="First aid kit sting relief wipe applied. Employee monitored 15 mins."
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#98989D]">Investigation & Cause</label>
                <textarea
                  rows={2}
                  placeholder="Brush clearing near dormant fence post where nest was concealed."
                  value={investigation}
                  onChange={(e) => setInvestigation(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#FF453A] py-2.5 font-semibold text-white shadow-lg hover:bg-[#E03A30]"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Incident Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
