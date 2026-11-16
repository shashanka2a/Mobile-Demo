'use client';

import React, { useState } from 'react';
import {
  Users,
  Activity,
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  TrendingUp,
  Sliders,
  Download,
  Search,
  ExternalLink,
  Droplets,
  Truck,
  Shield,
  Eye,
} from 'lucide-react';

interface ManagementDashboardViewProps {
  onOpenApp?: () => void;
}

export function ManagementDashboardView({ onOpenApp }: ManagementDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'crews' | 'chemicals' | 'equipment' | 'audit'>('overview');
  const [filterRegion, setFilterRegion] = useState('all');
  const [selectedReportModal, setSelectedReportModal] = useState<string | null>(null);

  const kpis = [
    { label: 'Active Crews Deployed', value: '14', change: '+2 vs yesterday', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Acres Treated Today', value: '184.5 ac', change: '88% of daily goal (210 ac)', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Herbicide Deployed', value: '320 Gal', change: '1 Threshold Alert active', icon: Droplets, color: 'text-[#EF4823]', bg: 'bg-orange-500/10' },
    { label: 'EPA & OSHA Compliance', value: '100%', change: 'All 14 pre-briefs signed', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  const crewRows = [
    { id: 'CR-101', site: 'Solanco Solar Farm (Gainesville, FL)', lead: 'Test Employee', task: 'Wicking & Spraying', blocks: 'Blocks A, B, C', acres: '40.0', preTrip: 'PASSED', jsa: 'SIGNED (7:00 AM)', status: 'Active', statusColor: 'bg-emerald-500' },
    { id: 'CR-102', site: 'Timberline Wind & Solar (Ocala, FL)', lead: 'Marcus Vance', task: 'Turf Mowing', blocks: 'Perimeter West', acres: '52.5', preTrip: 'PASSED', jsa: 'SIGNED (6:45 AM)', status: 'Active', statusColor: 'bg-emerald-500' },
    { id: 'CR-103', site: 'Valley Vista Energy Park (Lake Butler, FL)', lead: 'Carlos Ortiz', task: 'Woody Brush Spraying', blocks: 'Array Rows 12-28', acres: '34.0', preTrip: 'PASSED', jsa: 'SIGNED (7:15 AM)', status: 'Active', statusColor: 'bg-emerald-500' },
    { id: 'CR-104', site: 'Gator Solar Substation (Gainesville, FL)', lead: 'Dave Rodriguez', task: 'Wicking Treatment', blocks: 'Substation Yard', acres: '18.0', preTrip: 'PASSED', jsa: 'SIGNED (7:30 AM)', status: 'Completed', statusColor: 'bg-blue-500' },
    { id: 'CR-105', site: 'Suwannee Valley Solar (Live Oak, FL)', lead: 'John Baker', task: 'Invasive Weed Survey', blocks: 'Blocks E, F', acres: '40.0', preTrip: 'PASSED', jsa: 'SIGNED (6:50 AM)', status: 'Active', statusColor: 'bg-emerald-500' },
  ];

  const chemicalAlerts = [
    { site: 'Solanco Solar Farm', chemical: 'Glyphosate 4 Plus', applied: '120 GAL', limit: '100 GAL', status: 'OVER THRESHOLD', action: 'Supervisor secondary sign-off verified · SDS batch logged' },
    { site: 'Gator Solar Site', chemical: 'Non-Ionic Surfactant', applied: '8 OZ', limit: '128 OZ', status: 'NOMINAL', action: 'Standard 0.25% surfactant blend' },
    { site: 'Valley Vista Energy', chemical: '2,4-D Amine Weed Killer', applied: '14 GAL', limit: '25 GAL', status: 'NOMINAL', action: 'Targeted broadleaf spot treatment' },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-[#0B1120]/90 backdrop-blur-md px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#EF4823]/20 text-[#EF4823] border border-[#EF4823]/30">
                Operations Command
              </span>
              <span className="text-xs text-slate-400">Live Enterprise Telemetry</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              UtilityVision Management Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Real-time oversight for field operations, crew dispatch, chemical dosage thresholds, and EPA/OSHA compliance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenApp}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#EF4823] hover:bg-[#d93d1a] shadow-md transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Field App</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="bg-[#1E293B]/80 rounded-2xl border border-slate-800/80 p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{kpi.label}</span>
                  <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <div className="mt-3 text-3xl font-black text-white">{kpi.value}</div>
                <div className="mt-1 text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {kpi.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 gap-2 text-xs font-bold overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#EF4823] text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overview & Live GIS Map</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('crews')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'crews'
                ? 'border-[#EF4823] text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Crew Telemetry ({crewRows.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chemicals')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'chemicals'
                ? 'border-[#EF4823] text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Chemical Thresholds & Alerts</span>
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-400 text-[10px]">1</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('equipment')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'equipment'
                ? 'border-[#EF4823] text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Equipment Fleet Pre-Trip</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'audit'
                ? 'border-[#EF4823] text-white bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Daily Reports Audit Log</span>
          </button>
        </div>

        {/* Tab 1: Overview & Live Map */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live GIS Map Canvas */}
            <div className="lg:col-span-8 bg-[#1E293B]/80 rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#EF4823]" />
                    <span>Real-Time GIS Site Boundaries & Crew GPS</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Solanco Solar Farm · RTK GPS Telemetry Active · Accuracy ±2.5 cm
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    3 Active Spray Rigs
                  </span>
                </div>
              </div>

              {/* Interactive Vector Map */}
              <div className="relative w-full h-[380px] bg-[#0A0F1D] rounded-xl border border-slate-700/80 overflow-hidden">
                {/* SVG Solar Farm Boundaries */}
                <svg className="w-full h-full" viewBox="0 0 800 450">
                  <defs>
                    <pattern id="solar-grid-dash" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="800" height="450" fill="url(#solar-grid-dash)" />

                  {/* Site Outer Fence */}
                  <polygon
                    points="60,40 740,40 760,410 40,410"
                    fill="#0F172A"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                  />

                  {/* Panel Block A */}
                  <rect x="90" y="70" width="180" height="130" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
                  <text x="105" y="95" fill="#94A3B8" fontSize="12" fontWeight="bold">BLOCK A · COMPLETED</text>
                  <text x="105" y="115" fill="#38BDF8" fontSize="10">Wicking & Spraying Done</text>
                  <circle cx="230" cy="160" r="16" fill="#EF4823" fillOpacity="0.2" stroke="#EF4823" strokeWidth="1.5" />
                  <text x="224" y="164" fill="#EF4823" fontSize="10" fontWeight="bold">🐊</text>

                  {/* Panel Block B */}
                  <rect x="310" y="70" width="180" height="130" rx="6" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
                  <text x="325" y="95" fill="#94A3B8" fontSize="12" fontWeight="bold">BLOCK B · IN PROGRESS</text>
                  <text x="325" y="115" fill="#10B981" fontSize="10">Rig #1 (Test Employee) 40 ac</text>

                  {/* Panel Block C */}
                  <rect x="530" y="70" width="180" height="130" rx="6" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
                  <text x="545" y="95" fill="#94A3B8" fontSize="12" fontWeight="bold">BLOCK C · SCHEDULED</text>
                  <text x="545" y="115" fill="#F59E0B" fontSize="10">Cogon Grass Treatment</text>

                  {/* Retention Pond / Wildlife Buffer */}
                  <ellipse cx="230" cy="300" rx="90" ry="60" fill="#0C4A6E" fillOpacity="0.5" stroke="#0284C7" strokeWidth="2" />
                  <text x="175" y="300" fill="#7DD3FC" fontSize="11" fontWeight="bold">RETENTION POND</text>
                  <text x="160" y="315" fill="#38BDF8" fontSize="9">100ft Wildlife Buffer Zone</text>

                  {/* Substation */}
                  <rect x="530" y="260" width="180" height="110" rx="6" fill="#1E1B4B" stroke="#818CF8" strokeWidth="2" />
                  <text x="545" y="285" fill="#C7D2FE" fontSize="12" fontWeight="bold">SUBSTATION YARD</text>
                  <text x="545" y="305" fill="#A5B4FC" fontSize="10">High Voltage · PPE Required</text>

                  {/* Live Crew Tracker Pin */}
                  <g transform="translate(380, 130)">
                    <circle cx="0" cy="0" r="14" fill="#EF4823" fillOpacity="0.3" className="animate-ping" />
                    <circle cx="0" cy="0" r="8" fill="#EF4823" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="14" y="4" fill="#FFFFFF" fontSize="11" fontWeight="bold">CR-101 (ASV #123)</text>
                  </g>
                </svg>

                {/* Map Legend Overlay */}
                <div className="absolute bottom-3 left-3 bg-[#0F172A]/90 border border-slate-700/80 rounded-xl p-2.5 text-[10px] space-y-1 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>In-Progress Block</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    <span>Completed Block</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4823]" />
                    <span>Wildlife Alert (Alligator)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Alert & Action Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#1E293B]/80 rounded-2xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Active Field Observations</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                    3 Logged Today
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-rose-500/30">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Alligator in Block A Pond</span>
                      <span className="text-rose-400 font-bold text-[10px]">WILDLIFE</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Spotted near retention pond. 100ft exclusion buffer locked in GIS map. Crew notified via air horn.
                    </p>
                    <div className="mt-2 text-[10px] text-slate-500 flex justify-between">
                      <span>Logged 9:21 AM · GPS 29.8843° N</span>
                      <span className="text-emerald-400 font-semibold">Buffer Active</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Cogon Grass Treatment</span>
                      <span className="text-[#EF4823] font-bold text-[10px]">INVASIVE</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Dense patch along perimeter road. Treated with Glyphosate wicking attachment at 10 GAL dosage.
                    </p>
                    <div className="mt-2 text-[10px] text-slate-500">
                      Logged 9:21 AM · Area: Blocks A, B, C
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Equipment Maintenance Sign-Off</span>
                      <span className="text-blue-400 font-bold text-[10px]">PRE-TRIP</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      ASV Skid Steer #123 pre-trip checklist signed. Oil and coolant levels verified FULL.
                    </p>
                    <div className="mt-2 text-[10px] text-slate-500">
                      Logged 9:21 AM · Operator: Test Employee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Crew Telemetry Table */}
        {activeTab === 'crews' && (
          <div className="bg-[#1E293B]/80 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Active Field Crew Telemetry</h3>
                <p className="text-xs text-slate-400">
                  Telemetry updated every 60 seconds from FieldWorker mobile devices.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search crew or site..."
                  className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">Crew ID</th>
                    <th className="py-3 px-4">Site Location</th>
                    <th className="py-3 px-4">Supervisor</th>
                    <th className="py-3 px-4">Current Task</th>
                    <th className="py-3 px-4">Treated Acres</th>
                    <th className="py-3 px-4">Pre-Trip</th>
                    <th className="py-3 px-4">JSA Pre-Brief</th>
                    <th className="py-3 px-4 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {crewRows.map((crew) => (
                    <tr key={crew.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-white">{crew.id}</td>
                      <td className="py-3 px-4 text-slate-200 font-semibold">{crew.site}</td>
                      <td className="py-3 px-4 text-slate-300">{crew.lead}</td>
                      <td className="py-3 px-4 text-slate-300">{crew.task} ({crew.blocks})</td>
                      <td className="py-3 px-4 font-bold text-white">{crew.acres} ac</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          {crew.preTrip}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-[11px]">{crew.jsa}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                          <span className={`w-2 h-2 rounded-full ${crew.statusColor}`} />
                          {crew.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Chemical Dosage & EPA Alerts */}
        {activeTab === 'chemicals' && (
          <div className="space-y-6">
            <div className="bg-[#1E293B]/80 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-[#EF4823]" />
                    <span>EPA Part 763 & Herbicide Dosage Threshold Monitor</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Automatic enforcement of client safety thresholds (Glyphosate &gt;100 GAL / Surfactant &gt;128 oz).
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
                  1 Site Exceeded Limit
                </span>
              </div>

              <div className="space-y-3">
                {chemicalAlerts.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      item.status === 'OVER THRESHOLD'
                        ? 'bg-rose-950/20 border-rose-500/40 text-slate-200'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{item.site}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'OVER THRESHOLD'
                              ? 'bg-rose-500 text-white'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        Product: <strong className="text-white">{item.chemical}</strong> · Applied: <strong className="text-white">{item.applied}</strong> (Threshold: {item.limit})
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500">{item.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Equipment Pre-Trip Fleet Health */}
        {activeTab === 'equipment' && (
          <div className="bg-[#1E293B]/80 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Equipment Fleet Pre-Trip Inspections</h3>
            <p className="text-xs text-slate-400">Daily OSHA machine condition, operating hours, and fluid audits.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">ASV Skid Steer #123</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">PASSED</span>
                </div>
                <div className="text-xs text-slate-400">Site: Solanco Solar Farm · Op: Test Employee</div>
                <div className="text-xs text-slate-300">
                  Hours: <strong>123.4 hrs</strong> · Engine Oil: <strong className="text-emerald-400">FULL</strong> · Coolant: <strong className="text-emerald-400">FULL</strong>
                </div>
                <div className="text-[11px] text-slate-500">Digital signature captured via HTML5 canvas · 7:00 AM</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">John Deere 5075E #204</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">PASSED</span>
                </div>
                <div className="text-xs text-slate-400">Site: Timberline Wind & Solar · Op: Marcus Vance</div>
                <div className="text-xs text-slate-300">
                  Hours: <strong>412.0 hrs</strong> · Hydraulic Fluid: <strong className="text-emerald-400">FULL</strong> · Tires: <strong className="text-emerald-400">32 PSI</strong>
                </div>
                <div className="text-[11px] text-slate-500">Digital signature captured via HTML5 canvas · 6:45 AM</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Kubota SVL-97 #311</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">PASSED</span>
                </div>
                <div className="text-xs text-slate-400">Site: Valley Vista Energy · Op: Carlos Ortiz</div>
                <div className="text-xs text-slate-300">
                  Hours: <strong>89.2 hrs</strong> · Tracks: <strong className="text-emerald-400">TENSION OK</strong> · Fuel: <strong className="text-emerald-400">95%</strong>
                </div>
                <div className="text-[11px] text-slate-500">Digital signature captured via HTML5 canvas · 7:15 AM</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Daily Reports Audit Log */}
        {activeTab === 'audit' && (
          <div className="bg-[#1E293B]/80 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Submitted Daily Reports Log</h3>
                <p className="text-xs text-slate-400">All reports include digital supervisor attestation and GPS audit trail.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Solanco Solar Farm · Daily Report &amp; JSA</div>
                  <div className="text-xs text-slate-400">Date: 2026-04-06 · Supervisor: Test Employee · 40 acres treated</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    ✓ Digitally Signed
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenApp?.()}
                    className="px-3 py-1.5 rounded-lg bg-[#EF4823] text-xs font-bold text-white hover:bg-[#d93d1a]"
                  >
                    View in App
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
