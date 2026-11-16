'use client';

import React, { useState } from 'react';
import {
  PenTool,
  CheckCircle2,
  Calendar,
  User,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SignaturePad } from '../SignaturePad';
import { useAppContext } from '@/context/AppContext';
import { saveSignedReport } from '@/lib/storage';
import { formatFullDate } from '@/lib/utils';
import { SignedReportEntry } from '@/types';

export function SignReportScreen() {
  const { dateKey, selectedProject, currentUser, triggerRefresh, navigate, goBack } = useAppContext();
  const [signatureData, setSignatureData] = useState<string>('');
  const [signedName, setSignedName] = useState<string>(currentUser.name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSaveSignature = () => {
    if (!signatureData) {
      alert('Please provide your signature on the pad before confirming.');
      return;
    }

    setIsSubmitting(true);

    const signedEntry: SignedReportEntry = {
      signedAt: new Date().toISOString(),
      preparedBy: signedName || currentUser.name,
      signatureDataUrl: signatureData,
      projectName: selectedProject.name,
      dateKey,
    };

    saveSignedReport(dateKey, signedEntry);
    triggerRefresh();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      setTimeout(() => {
        navigate('report-preview');
      }, 1200);
    }, 600);
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Sign Daily Report"
        subtitle={formatFullDate(dateKey)}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Context card */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5 text-xs">
          <div className="flex items-center gap-2 mb-2 text-[#FF6633]">
            <ShieldCheck className="h-4 w-4" />
            <span className="font-semibold uppercase tracking-wider">
              Legal Attestation & Verification
            </span>
          </div>
          <p className="text-[#98989D] leading-relaxed">
            By signing below, I certify that all acreage, chemical volumes, safety surveys, and equipment pre-trip logs recorded for <strong className="text-white">{selectedProject.name}</strong> on <strong className="text-white">{dateKey}</strong> are true, accurate, and compliant with client standards.
          </p>

          <div className="mt-3 flex flex-col gap-1.5 border-t border-[#3A3A3C] pt-2 text-[11px]">
            <label className="text-[#98989D]">Supervisor Full Legal Name</label>
            <input
              type="text"
              value={signedName}
              onChange={(e) => setSignedName(e.target.value)}
              className="w-full rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] p-2 font-semibold text-white focus:border-[#FF6633] focus:outline-none"
            />
          </div>
        </div>

        {/* Canvas Signature Pad */}
        <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FF6633]">
            Draw Supervisor Signature
          </h3>
          <SignaturePad
            onSave={(data) => setSignatureData(data)}
            height={160}
            label="Sign Here with Mouse or Touch"
          />
        </div>

        {/* Submit button */}
        <button
          type="button"
          disabled={!signatureData || isSubmitting || isDone}
          onClick={handleSaveSignature}
          className={`flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-xl transition-all active:scale-[0.98] ${
            isDone
              ? 'bg-[#30D158] text-black font-extrabold'
              : !signatureData
              ? 'bg-[#3A3A3C] text-[#98989D] cursor-not-allowed'
              : 'bg-[#FF6633] hover:bg-[#E05526]'
          }`}
        >
          {isDone ? (
            <>
              <CheckCircle2 className="h-5 w-5" />
              <span>Report Signed & Archived!</span>
            </>
          ) : isSubmitting ? (
            <span>Securing Signature...</span>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>Finalize & Sign Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
