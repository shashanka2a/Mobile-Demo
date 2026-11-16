'use client';

import React, { useState } from 'react';
import { Smartphone, FileCheck2, ArrowRight } from 'lucide-react';

interface StackedReportsShowcaseProps {
  onOpenApp?: () => void;
}

export function StackedReportsShowcase({ onOpenApp }: StackedReportsShowcaseProps) {
  const [activeSheet, setActiveSheet] = useState<'daily-1' | 'jsa-pdf' | 'daily-2'>('daily-1');

  const sheetsOrder = [
    {
      id: 'daily-1' as const,
      badge: 'REPORT VIEW 01 · DAILY REPORT (PAGES 1–2)',
      title: 'Daily Report — Weather, General Notes, Metrics & Wicking Chemicals',
    },
    {
      id: 'jsa-pdf' as const,
      badge: 'REPORT VIEW 02 · JSA & PRE-BRIEF PDF',
      title: 'Signed Job Safety Analysis (JSA) & Crew Pre-Brief Report',
    },
    {
      id: 'daily-2' as const,
      badge: 'REPORT VIEW 03 · DAILY REPORT (PAGES 3–5)',
      title: 'Observations, Equipment Checklist, 8/8 Site Survey & Supervisor Sign-Off',
    },
  ];

  const cycleNextSheet = () => {
    const idx = sheetsOrder.findIndex((s) => s.id === activeSheet);
    const nextIdx = (idx + 1) % sheetsOrder.length;
    setActiveSheet(sheetsOrder[nextIdx].id);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-200/80 overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-[#EF4823]/25 text-[#EF4823] text-xs font-bold uppercase tracking-wider">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>INSTANT AUDIT-READY PDF GENERATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Every Field Tap Compiles Into Signed, Stacked{' '}
              <span className="text-[#EF4823]">Daily & JSA Reports.</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The moment a supervisor signs off in the Field App, Utility Vision formats your
              crew&apos;s weather telemetry, wicking & spraying metrics, herbicide quantities,
              equipment checklists, and JSA signatures into clean, client-ready PDF packages.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select a report view to preview on top of the stack:
              </div>
              {sheetsOrder.map((sheet) => {
                const isFront = activeSheet === sheet.id;
                return (
                  <button
                    key={sheet.id}
                    type="button"
                    onClick={() => setActiveSheet(sheet.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isFront
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div
                        className={`text-[10px] font-extrabold uppercase tracking-wider ${
                          isFront ? 'text-[#EF4823]' : 'text-slate-400'
                        }`}
                      >
                        {sheet.badge}
                      </div>
                      <div className="text-xs sm:text-sm font-bold">{sheet.title}</div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0 ${
                        isFront ? 'bg-[#EF4823] text-white' : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {isFront ? 'Active' : 'Preview'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenApp}
                className="px-5 py-3 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer bg-[#EF4823]"
              >
                <Smartphone className="w-4 h-4" />
                <span>See Report Sign-Off in Field App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Stack Visualizer */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-10 px-6 sm:px-12">
            {/* Ambient Glow */}
            <div className="absolute w-72 h-96 rounded-3xl bg-gradient-to-tr from-slate-200/80 via-orange-100/50 to-slate-100 blur-2xl pointer-events-none" />

            {/* Stack Container */}
            <div
              onClick={cycleNextSheet}
              title="Click to cycle through report pages"
              className="relative w-full max-w-[330px] sm:max-w-[350px] h-[480px] cursor-pointer select-none group"
            >
              {/* Layer 4 (Bottom-most paper) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-white rounded-xl border border-slate-300/90 shadow-md translate-x-10 -translate-y-6 rotate-[9deg] scale-[0.94] transition-transform duration-300 group-hover:translate-x-11 group-hover:rotate-[10deg]"
              />

              {/* Layer 3 */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-white rounded-xl border border-slate-300/90 shadow-md -translate-x-9 translate-y-5 -rotate-[7.5deg] scale-[0.95] transition-transform duration-300 group-hover:-translate-x-10 group-hover:-rotate-[8.5deg]"
              />

              {/* Layer 2 */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-white rounded-xl border border-slate-300 shadow-lg translate-x-6 translate-y-4 rotate-[4.5deg] scale-[0.97] transition-transform duration-300 group-hover:translate-x-7 group-hover:rotate-[5.5deg]"
              />

              {/* Layer 1 */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-white rounded-xl border border-slate-300 shadow-lg -translate-x-4 -translate-y-3 -rotate-[3deg] scale-[0.985] transition-transform duration-300 group-hover:-translate-x-5 group-hover:-rotate-[4deg]"
              />

              {/* Active Front Sheet Card */}
              <div className="relative z-20 w-full h-full bg-white rounded-xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col justify-between">
                {/* SHEET 1: DAILY REPORT PAGES 1-2 */}
                {activeSheet === 'daily-1' && (
                  <>
                    <div>
                      {/* Top Dark Bar */}
                      <div className="bg-[#111114] text-white px-3.5 py-2 flex items-center justify-between text-[9px] font-bold">
                        <div>
                          <div>Date Mon, 04/06/2026</div>
                          <div className="text-[8px] text-zinc-300 font-medium">Prepared by Test Employee</div>
                        </div>
                        <div className="text-right">
                          <div>Job # 9999</div>
                          <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-bold">
                            ✓ Signed PDF
                          </span>
                        </div>
                      </div>

                      {/* Site Header */}
                      <div className="px-3.5 py-2 border-b border-slate-200 flex items-center justify-between bg-white">
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Gator Solar Site</h3>
                          <p className="text-[9px] text-slate-500">Gainesville, Florida · 32608</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-black tracking-tighter text-[#EF4823]">W</span>
                          <div className="leading-none">
                            <div className="text-[10px] font-black tracking-tight text-slate-900">WICK&apos;D</div>
                            <div className="text-[5px] font-bold uppercase tracking-widest text-[#EF4823]">
                              ENVIRONMENTAL
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Document Body */}
                      <div className="p-2.5 space-y-2 text-[8.5px]">
                        {/* Weather */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white bg-[#EF4823]">
                            WEATHER
                          </div>
                          <div className="grid grid-cols-3 divide-x divide-slate-200 text-center py-1.5 bg-white">
                            <div className="px-1">
                              <div className="text-[8px] font-bold text-slate-700">9 AM</div>
                              <div className="text-xs font-extrabold text-slate-900">72°F</div>
                              <div className="text-[7px] text-slate-500">Wind 8 mph</div>
                            </div>
                            <div className="px-1">
                              <div className="text-[8px] font-bold text-slate-700">12 PM</div>
                              <div className="text-xs font-extrabold text-slate-900">79°F</div>
                              <div className="text-[7px] text-slate-500">Wind 7 mph</div>
                            </div>
                            <div className="px-1">
                              <div className="text-[8px] font-bold text-slate-700">4 PM</div>
                              <div className="text-xs font-extrabold text-slate-900">70°F</div>
                              <div className="text-[7px] text-slate-500">Wind 12 mph</div>
                            </div>
                          </div>
                        </div>

                        {/* General Notes */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white bg-[#EF4823]">
                            GENERAL NOTES
                          </div>
                          <div className="p-1.5 space-y-1 text-[8px] text-slate-700">
                            <div>
                              <strong>1. Weather</strong> — Weather delays. · <strong>2. Wildlife</strong> — Gopher turtle burrow.
                            </div>
                            <div>
                              <strong>4. Progress</strong> — Blocks A, B, C completed. Cogon grass treated.
                            </div>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white bg-[#EF4823]">
                            METRICS
                          </div>
                          <table className="w-full text-[8px] text-left">
                            <tbody className="divide-y divide-slate-100">
                              <tr>
                                <td className="py-1 px-2 font-semibold">Wicking Array Completed</td>
                                <td className="py-1 px-2 text-right font-bold">30 acres</td>
                              </tr>
                              <tr>
                                <td className="py-1 px-2 font-semibold">Wicking Green Space</td>
                                <td className="py-1 px-2 text-right font-bold">10 acres</td>
                              </tr>
                              <tr>
                                <td className="py-1 px-2 font-semibold">Water Usage / Operators</td>
                                <td className="py-1 px-2 text-right font-bold">200 Gal / 5</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Chemicals */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white flex items-center justify-between bg-[#EF4823]">
                            <span>CHEMICALS</span>
                            <span>WICKING</span>
                          </div>
                          <div className="p-1.5 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[8px]">
                            <div className="flex justify-between">
                              <span>Glyphosate</span>
                              <strong className="text-slate-900">10 GAL</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Surfactant</span>
                              <strong className="text-slate-900">8 OZ</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Super Dye</span>
                              <strong className="text-slate-900">6 OZ</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>2,4-D</span>
                              <strong className="text-slate-900">2 GAL</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
                      <span className="font-bold text-slate-700">Gator Solar Site · Daily PDF</span>
                      <span className="text-[#EF4823] font-bold">Tap stack to flip →</span>
                    </div>
                  </>
                )}

                {/* SHEET 2: JSA & PRE-BRIEF PDF */}
                {activeSheet === 'jsa-pdf' && (
                  <>
                    <div>
                      {/* Top Dark Bar */}
                      <div className="bg-[#111114] text-white px-3.5 py-2 flex items-center justify-between text-[9px] font-bold">
                        <span>Date Mon, 04/06/2026</span>
                        <span className="tracking-wider uppercase text-[#EF4823]">JSA & PRE-BRIEF</span>
                      </div>

                      {/* Site Header */}
                      <div className="px-3.5 py-2 border-b border-slate-200 flex items-center justify-between bg-white">
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-900">Gator Solar Site</h3>
                          <p className="text-[8px] text-slate-500">Wick&apos;d Environmental · JSA & PRE-BRIEF</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[8px] font-bold">
                          OSHA 1926 Compliant
                        </span>
                      </div>

                      {/* Body */}
                      <div className="p-2.5 space-y-2 text-[8.5px]">
                        {/* Objectives */}
                        <div className="border border-slate-200 rounded-md p-2 bg-slate-50/70">
                          <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-500">
                            SAFETY OBJECTIVES
                          </div>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-orange-100 text-[#EF4823] font-bold text-[8px]">
                              Wicking
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-orange-100 text-[#EF4823] font-bold text-[8px]">
                              Spraying
                            </span>
                            <span className="text-[8px] text-slate-600">Work Area: Blocks A, B, C</span>
                          </div>
                        </div>

                        {/* Hazard Matrix */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white bg-[#EF4823] flex items-center justify-between">
                            <span>KEY HAZARD IDENTIFICATION</span>
                            <span className="bg-rose-600 px-1.5 py-0.2 rounded text-[7px]">HIGH RISK</span>
                          </div>
                          <div className="p-2 space-y-1 bg-white">
                            <div className="font-bold text-slate-900">Alligator in Retention Pond</div>
                            <div className="text-[8px] text-slate-600 leading-tight">
                              <strong>Mitigation:</strong> Maintain minimum 100ft buffer around retention pond. Do not approach water edge. Sound air horn if spotted near array rows.
                            </div>
                            <div className="pt-1 flex items-center justify-between text-[7.5px] text-slate-500 border-t border-slate-100">
                              <span>Hospital: Lake Butler (~9.6 mi)</span>
                              <span className="font-bold text-slate-700">Emergency Signal: 3 Horn Blasts</span>
                            </div>
                          </div>
                        </div>

                        {/* Crew Pre-Brief Sign-Offs */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white bg-[#0F172A] flex items-center justify-between">
                            <span>CREW PRE-BRIEF ATTENDANCE</span>
                            <span>3 / 3 SIGNED</span>
                          </div>
                          <div className="divide-y divide-slate-100 text-[8px] bg-white">
                            <div className="p-1.5 flex items-center justify-between">
                              <span className="font-semibold text-slate-900">Test Employee (Crew Lead)</span>
                              <span className="text-emerald-700 font-bold">✓ Signed 7:00 AM</span>
                            </div>
                            <div className="p-1.5 flex items-center justify-between">
                              <span className="font-semibold text-slate-900">Marcus Vance (Applicator)</span>
                              <span className="text-emerald-700 font-bold">✓ Signed 7:02 AM</span>
                            </div>
                            <div className="p-1.5 flex items-center justify-between">
                              <span className="font-semibold text-slate-900">Dave Rodriguez (Equipment Op)</span>
                              <span className="text-emerald-700 font-bold">✓ Signed 7:05 AM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
                      <span className="font-bold text-slate-700">JSA Pre-Brief · Safety File #JSA-406</span>
                      <span className="text-[#EF4823] font-bold">Tap stack to flip →</span>
                    </div>
                  </>
                )}

                {/* SHEET 3: DAILY REPORT PAGES 3-5 */}
                {activeSheet === 'daily-2' && (
                  <>
                    <div>
                      {/* Top Dark Bar */}
                      <div className="bg-[#111114] text-white px-3.5 py-2 flex items-center justify-between text-[9px] font-bold">
                        <span>Date Mon, 04/06/2026</span>
                        <span className="tracking-wider uppercase text-emerald-400">AUDIT ATTESTATIONS</span>
                      </div>

                      {/* Site Header */}
                      <div className="px-3.5 py-2 border-b border-slate-200 flex items-center justify-between bg-white">
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Gator Solar Site</h3>
                          <p className="text-[8px] text-slate-500">Pages 3–5 Audit Summary</p>
                        </div>
                        <span className="text-[8px] font-bold text-slate-500">ID: UV-88219</span>
                      </div>

                      {/* Body */}
                      <div className="p-2.5 space-y-2 text-[8.5px]">
                        {/* Observations */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white bg-[#EF4823]">
                            OBSERVATIONS (3 LOGGED)
                          </div>
                          <div className="p-1.5 space-y-1 text-[8px] bg-white">
                            <div className="flex justify-between">
                              <span><strong>Alligator</strong> · Panel Block A pond</span>
                              <span className="text-rose-600 font-bold">OPEN</span>
                            </div>
                            <div className="flex justify-between">
                              <span><strong>Cogon Grass</strong> · Blocks A, B, C</span>
                              <span className="text-rose-600 font-bold">OPEN</span>
                            </div>
                            <div className="flex justify-between">
                              <span><strong>Dogfennel</strong> · Outside Block C</span>
                              <span className="text-rose-600 font-bold">OPEN</span>
                            </div>
                          </div>
                        </div>

                        {/* Equipment Checklist */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white bg-[#EF4823]">
                            EQUIPMENT CHECKLIST
                          </div>
                          <div className="p-2 grid grid-cols-2 gap-1 bg-slate-50">
                            <div>
                              <span className="text-slate-400 block text-[7px]">MACHINE</span>
                              <strong>ASV Skid Steer (123 hrs)</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[7px]">FLUIDS</span>
                              <strong className="text-emerald-700">Oil / Coolant: FULL</strong>
                            </div>
                          </div>
                        </div>

                        {/* Survey (8/8) */}
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white bg-[#EF4823]">
                            SURVEY (8/8 ANSWERED)
                          </div>
                          <div className="p-2 space-y-1 bg-white">
                            <div className="flex justify-between">
                              <span>Accidents or near-misses today?</span>
                              <strong>☑ No</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Visitors on site? (Company engineer)</span>
                              <strong className="text-emerald-700">☑ Yes</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>PPE requirements followed?</span>
                              <strong className="text-emerald-700">☑ Yes</strong>
                            </div>
                          </div>
                        </div>

                        {/* Electronic Signature */}
                        <div className="border border-slate-200 rounded-md p-2 bg-slate-50 flex items-center justify-between">
                          <div>
                            <div className="font-serif italic text-xs font-bold text-slate-900">Test Employee</div>
                            <div className="text-[7px] text-slate-500">Reviewed & signed electronically</div>
                          </div>
                          <span className="text-[7px] font-bold text-emerald-700">Nov 12, 2:18 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
                      <span className="font-bold text-slate-700">Audit Summary · Pages 3–5</span>
                      <span className="text-[#EF4823] font-bold">Tap stack to flip →</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
