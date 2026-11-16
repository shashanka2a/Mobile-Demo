'use client';

import React, { useState } from 'react';
import {
  Download,
  Calendar,
  FileText,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export function CTASection() {
  const { navigate } = useAppContext();
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleExportSample = () => {
    setDownloadStarted(true);
    navigate('report-preview');
    setTimeout(() => setDownloadStarted(false), 2500);
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto border-t border-[#3A3A3C]/60">
      <div className="relative overflow-hidden rounded-3xl border border-[#3A3A3C] bg-gradient-to-br from-[#242426] via-[#1C1C1E] to-[#151517] p-8 md:p-12 shadow-2xl">
        {/* Glow circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF6633]/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#30D158]/10 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FF6633]/15 px-3 py-1 text-xs font-bold text-[#FF6633] mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready for Field Deployment</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
            Modernize Your Utility & Solar Field Reporting Today
          </h2>

          <p className="text-sm sm:text-base text-[#98989D] leading-relaxed mb-8">
            Eliminate lost paper clipboards, messy WhatsApp groups, and late billing cycles. UtilityVision delivers certified compliance, instant progress tracking, and complete offline autonomy for industrial vegetation and utility maintenance crews.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              type="button"
              onClick={handleExportSample}
              className="flex items-center gap-2 rounded-xl bg-[#FF6633] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6633]/25 transition-all hover:bg-[#E05526] hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText className="h-4 w-4" />
              <span>{downloadStarted ? 'Opening Daily Report...' : 'View Sample Daily Report'}</span>
            </button>

            <a
              href="#explore-section"
              className="flex items-center gap-2 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#3A3A3C] active:scale-[0.98]"
            >
              <Smartphone className="h-4 w-4 text-[#30D158]" />
              <span>Try Live App Sandbox</span>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap items-center gap-6 border-t border-[#3A3A3C]/60 pt-6 text-xs text-[#E5E5EA]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#30D158]" />
              <span>OSHA 1910 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#30D158]" />
              <span>Zero-Loss Offline Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#30D158]" />
              <span>Cross-Platform (iOS, Android, Web)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
