'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  Printer,
  Download,
  PenTool,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  SunMedium,
  Check,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import {
  getFullReportForDate,
  getProgressTotals,
} from '@/lib/storage';
import { formatFullDate } from '@/lib/utils';

export function ReportPreviewScreen() {
  const { dateKey, selectedProject, currentUser, navigate, refreshTrigger } = useAppContext();

  const report = useMemo(() => {
    return getFullReportForDate(dateKey, selectedProject);
  }, [dateKey, selectedProject, refreshTrigger]);

  const totals = useMemo(() => {
    return getProgressTotals(dateKey);
  }, [dateKey, refreshTrigger]);

  const isSigned = !!report.signedReport;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Daily Field Report"
        subtitle={formatFullDate(dateKey)}
        rightAction={
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1 rounded-lg bg-[#2C2C2E] px-2.5 py-1 text-xs font-medium text-white hover:bg-[#3A3A3C]"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print</span>
          </button>
        }
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Signature Status Alert */}
        <div
          className={`flex items-center justify-between rounded-xl p-3 text-xs ${
            isSigned
              ? 'border border-[#30D158]/30 bg-[#30D158]/10 text-[#30D158]'
              : 'border border-[#FF9F0A]/30 bg-[#FF9F0A]/10 text-[#FF9F0A]'
          }`}
        >
          <div className="flex items-center gap-2">
            {isSigned ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            <span className="font-semibold">
              {isSigned
                ? `Signed by ${report.signedReport?.preparedBy} on ${new Date(
                    report.signedReport?.signedAt || ''
                  ).toLocaleDateString()}`
                : 'Report Draft — Requires Supervisor Signature'}
            </span>
          </div>

          {!isSigned && (
            <button
              type="button"
              onClick={() => navigate('report-sign')}
              className="flex items-center gap-1 rounded-lg bg-[#FF6633] px-2.5 py-1 font-semibold text-white shadow hover:bg-[#E05526]"
            >
              <PenTool className="h-3 w-3" />
              <span>Sign Now</span>
            </button>
          )}
        </div>

        {/* Printable White Paper Document Style */}
        <div className="overflow-hidden rounded-2xl border border-[#3A3A3C] bg-white p-5 text-black shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-black pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#FF6633] px-2 py-0.5 text-xs font-extrabold uppercase tracking-wider text-white">
                  UtilityVision
                </span>
                <span className="text-xs font-semibold text-gray-500">Field Operations</span>
              </div>
              <h2 className="mt-1 text-lg font-black tracking-tight text-black">
                DAILY PROGRESS & SAFETY REPORT
              </h2>
              <p className="text-xs font-medium text-gray-600">
                Project: <strong className="text-black">{report.project.name}</strong>
              </p>
            </div>

            <div className="text-right text-xs">
              <p className="font-mono text-xs font-bold text-black">{dateKey}</p>
              <p className="text-[11px] text-gray-500">Prepared by: {currentUser.name}</p>
              <p className="text-[10px] text-gray-400">Ref: UV-{dateKey.replace(/-/g, '')}-PA</p>
            </div>
          </div>

          {/* Environmental Conditions */}
          <div className="my-3 flex items-center justify-between rounded-lg bg-gray-100 p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <SunMedium className="h-4 w-4 text-[#FF9F0A]" />
              <span className="font-semibold text-gray-800">Site Weather:</span>
              <span className="text-gray-600">72°F · Clear Skies · Wind 4-6 mph WNW · 44% RH</span>
            </div>
            <span className="rounded bg-green-100 px-2 py-0.5 font-bold text-green-800 text-[10px]">
              GOOD CONDITIONS
            </span>
          </div>

          {/* Cumulative Progress Tracking Table */}
          <div className="my-4">
            <h3 className="mb-1.5 text-xs font-black uppercase tracking-wider text-[#FF6633]">
              1. Production & Cumulative Acreage
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50 font-bold text-gray-700">
                    <th className="py-1.5 px-2">Metric / Scope</th>
                    <th className="py-1.5 px-2 text-right">Day Total</th>
                    <th className="py-1.5 px-2 text-right">Week Total</th>
                    <th className="py-1.5 px-2 text-right">Project To-Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-1.5 px-2 font-medium">Wicking Array Completed</td>
                    <td className="py-1.5 px-2 text-right font-mono font-bold text-black">
                      {totals.day.wickingAcres} ac
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-gray-600">
                      {totals.week.wickingAcres} ac
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-gray-600">
                      {totals.toDate.wickingAcres} ac
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 font-medium">Mowing Array Completed</td>
                    <td className="py-1.5 px-2 text-right font-mono font-bold text-black">
                      {totals.day.mowingAcres} ac
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-gray-600">
                      {totals.week.mowingAcres} ac
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-gray-600">
                      {totals.toDate.mowingAcres} ac
                    </td>
                  </tr>
                  <tr className="bg-gray-50/80 font-bold">
                    <td className="py-1.5 px-2">Total Work Completed</td>
                    <td className="py-1.5 px-2 text-right font-mono text-[#FF6633]">
                      {totals.day.totalAcres} ac
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-black">
                      {totals.week.totalAcres} ac
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-black">
                      {totals.toDate.totalAcres} ac
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 font-medium">Water Usage</td>
                    <td className="py-1.5 px-2 text-right font-mono font-bold text-black">
                      {totals.day.waterUsage} gal
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-gray-600">
                      {totals.week.waterUsage} gal
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-gray-600">
                      {totals.toDate.waterUsage} gal
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 font-medium">Active Operators</td>
                    <td className="py-1.5 px-2 text-right font-mono font-bold text-black">
                      {totals.day.operators}
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-gray-600">
                      {totals.week.operators}
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-gray-600">
                      {totals.toDate.operators}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Chemicals Applied Summary */}
          <div className="my-4">
            <h3 className="mb-1.5 text-xs font-black uppercase tracking-wider text-[#FF6633]">
              2. Chemical & Herbicide Usage
            </h3>
            {report.chemicals.length > 0 ? (
              <div className="flex flex-wrap gap-2 text-xs">
                {report.chemicals.flatMap((c) => c.chemicals).map((item, i) => (
                  <div key={i} className="rounded border border-gray-300 bg-gray-50 px-2.5 py-1">
                    <span className="font-semibold text-gray-900">{item.name}: </span>
                    <span className="font-mono font-bold text-black">{item.quantity} {item.unit}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">No chemical application logged today</p>
            )}
          </div>

          {/* Notes & Diary */}
          <div className="my-4">
            <h3 className="mb-1.5 text-xs font-black uppercase tracking-wider text-[#FF6633]">
              3. Field Notes & Supervisor Remarks
            </h3>
            {report.notes.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-800">
                {report.notes.map((n) => (
                  <li key={n.id}>
                    <strong>[{n.category}]</strong> {n.notes}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500 italic">No notes recorded</p>
            )}
          </div>

          {/* Equipment Status */}
          <div className="my-4">
            <h3 className="mb-1.5 text-xs font-black uppercase tracking-wider text-[#FF6633]">
              4. Equipment Pre-Trip Status
            </h3>
            {report.equipment.length > 0 ? (
              <div className="rounded border border-gray-200 bg-gray-50 p-2.5 text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Unit: {report.equipment[0].formData.machineNumber} ({report.equipment[0].formData.machineType})</span>
                  <span>Hours: {report.equipment[0].formData.asvHours}</span>
                </div>
                <p className="text-gray-600 text-[11px] mt-1">
                  Fluids: Motor Oil ({report.equipment[0].formData.motorOil}), Coolant ({report.equipment[0].formData.coolant}), Hydraulic ({report.equipment[0].formData.hydraulicOil}) • Hoses: {report.equipment[0].formData.hoses} • Attachment: {report.equipment[0].formData.attachmentName}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">Inspection pending</p>
            )}
          </div>

          {/* Supervisor Signature Block */}
          <div className="mt-6 border-t-2 border-black pt-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Supervisor Verification & Attestation
                </span>
                <p className="text-xs font-bold text-black">{currentUser.name}</p>
                <p className="text-[10px] text-gray-500">{currentUser.role} • Wick&apos;d Environmental</p>
              </div>

              <div className="text-right">
                {report.signedReport ? (
                  <div className="flex flex-col items-end">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={report.signedReport.signatureDataUrl}
                      alt="Signature"
                      className="h-12 w-36 object-contain"
                    />
                    <span className="border-t border-black pt-0.5 font-mono text-[9px] text-gray-600">
                      Signed: {new Date(report.signedReport.signedAt).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="rounded border border-dashed border-gray-400 px-4 py-2 text-center text-xs text-gray-400">
                    Signature Required
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!isSigned && (
          <button
            type="button"
            onClick={() => navigate('report-sign')}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6633] py-3.5 text-sm font-bold text-white shadow-xl hover:bg-[#E05526]"
          >
            <PenTool className="h-4 w-4" />
            <span>Sign Daily Field Report</span>
          </button>
        )}
      </div>
    </div>
  );
}
