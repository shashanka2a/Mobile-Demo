'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck,
  Download,
  Calendar,
  Search,
  ExternalLink,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Leaf,
  FileText,
} from 'lucide-react';

interface ClientPortalViewProps {
  onOpenApp?: () => void;
}

export function ClientPortalView({ onOpenApp }: ClientPortalViewProps) {
  const [selectedSite, setSelectedSite] = useState('solanco');
  const [selectedPacket, setSelectedPacket] = useState<string | null>(null);

  const packets = [
    {
      id: 'PKT-2026-0406',
      date: 'Monday, April 6, 2026',
      site: 'Solanco Solar Farm (120 MW)',
      crewLead: 'Test Employee (Lic. #FL-88219)',
      acres: '40.0 acres',
      treatment: 'Wicking & Targeted Spraying',
      compliance: '100% PASSED (8/8 Survey, 0 Near Misses)',
      pdfPages: '5 Pages · Full Stack',
      status: 'AUDITED & SIGNED',
    },
    {
      id: 'PKT-2026-0405',
      date: 'Sunday, April 5, 2026',
      site: 'Solanco Solar Farm (120 MW)',
      crewLead: 'Test Employee (Lic. #FL-88219)',
      acres: '38.5 acres',
      treatment: 'Wicking Perimeter',
      compliance: '100% PASSED',
      pdfPages: '5 Pages · Full Stack',
      status: 'AUDITED & SIGNED',
    },
    {
      id: 'PKT-2026-0404',
      date: 'Saturday, April 4, 2026',
      site: 'Solanco Solar Farm (120 MW)',
      crewLead: 'Marcus Vance (Lic. #FL-71402)',
      acres: '42.0 acres',
      treatment: 'Turf Mowing & Spot Spray',
      compliance: '100% PASSED',
      pdfPages: '4 Pages · Full Stack',
      status: 'AUDITED & SIGNED',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Audited Compliance Portal
              </span>
              <span className="text-xs text-slate-500">Asset Owner &amp; Client Access</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              UtilityVision Client Portal
            </h1>
            <p className="text-xs text-slate-600">
              Verified daily field records, EPA/OSHA compliance attestations, and certified supervisor signatures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenApp}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#EF4823] hover:bg-[#d93d1a] shadow-sm transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Field App Simulator</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Compliance Certificate Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <Award className="w-4 h-4" />
                <span>ENVIRONMENTAL COMPLIANCE CERTIFICATION · ACTIVE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Solanco Solar Farm — 100% EPA &amp; Wildlife Compliant
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                All daily wicking and spraying operations comply with EPA Part 763 herbicide application guidelines,
                OSHA 1926 crew pre-brief protocols, and Florida Wildlife Conservation Commission 100ft retention pond buffers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 shrink-0 text-center">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="text-2xl font-black text-emerald-300">100%</div>
                <div className="text-[10px] uppercase font-bold text-slate-300">JSA Attestation</div>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="text-2xl font-black text-emerald-300">0</div>
                <div className="text-[10px] uppercase font-bold text-slate-300">Violations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Audited Work Packets Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#EF4823]" />
                <span>Certified Daily Work Packets</span>
              </h3>
              <p className="text-xs text-slate-500">
                Download sealed PDFs including weather telemetry, wicking acres, equipment inspections, and electronic signatures.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                aria-label="Filter Site"
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white"
              >
                <option value="solanco">Solanco Solar Farm (Gainesville, FL)</option>
                <option value="timberline">Timberline Wind &amp; Solar (Ocala, FL)</option>
                <option value="valley">Valley Vista Energy (Lake Butler, FL)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Packet ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Certified Supervisor</th>
                  <th className="py-3 px-4">Area &amp; Treatment</th>
                  <th className="py-3 px-4">Compliance Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {packets.map((pkt) => (
                  <tr key={pkt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{pkt.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{pkt.date}</td>
                    <td className="py-3.5 px-4 text-slate-600">{pkt.crewLead}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <strong>{pkt.acres}</strong> · {pkt.treatment}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        {pkt.compliance}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedPacket(pkt.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Inspect Packet</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Inspection of Packet */}
        {selectedPacket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-950">Work Packet {selectedPacket}</h4>
                  <p className="text-xs text-slate-500">Solanco Solar Farm · Cryptographic Verification Hash: #7A4F-88E2</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPacket(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900">Included In This Signed Packet:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                    <li>Page 1: Hourly Weather Telemetry &amp; General Field Notes</li>
                    <li>Page 2: Wicking &amp; Spraying Acreage Totals + Chemical Quantities</li>
                    <li>Page 3: Signed OSHA 1926 Job Safety Analysis (JSA) &amp; Pre-Brief</li>
                    <li>Page 4: Equipment Pre-Trip Inspection Checklist with Fluid Levels</li>
                    <li>Page 5: 8/8 EPA Compliance Survey &amp; Digital Supervisor Sign-Off</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-emerald-900">Digital Signature Verified</div>
                    <div className="text-[11px] text-emerald-700">Signed by Test Employee on Nov 12, 2:18 PM</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-2 py-1 rounded">
                    VALID
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPacket(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Certified PDF Packet download initiated.');
                    setSelectedPacket(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#EF4823] hover:bg-[#d93d1a] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Signed PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
