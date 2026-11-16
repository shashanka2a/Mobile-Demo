'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wifi,
  FileCheck,
  Layers,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

interface LandingHeroProps {
  onScrollToDemo: () => void;
  onScrollToExplore: () => void;
}

export function LandingHero({ onScrollToDemo, onScrollToExplore }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 px-4 md:px-8">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-7xl bg-gradient-to-b from-[#FF6633]/15 via-transparent to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-[#FF6633]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-60 h-72 w-72 rounded-full bg-[#0A84FF]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Release / Tech Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6633]/40 bg-[#FF6633]/10 px-3.5 py-1 text-xs font-semibold text-[#FF6633] shadow-sm mb-6 animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          <span>React Native to Next.js App Router Conversion</span>
          <span className="h-1 w-1 rounded-full bg-[#FF6633]" />
          <span className="text-white/80">Interactive Product Showcase</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1] mb-6">
          Mobile Field Operations. <br />
          <span className="bg-gradient-to-r from-[#FF6633] via-[#FF855D] to-[#FF9F0A] bg-clip-text text-transparent">
            Now Powered by Next.js.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#98989D] leading-relaxed mb-8">
          Experience the full capabilities of <strong>UtilityVision FieldWorker</strong> — converted from React Native into a high-performance Next.js web application. Includes daily task hubs, chemical dosage guardrails, equipment pre-trip canvas signatures, JSA emergency plans, and printable cumulative reports.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={onScrollToDemo}
            className="flex items-center gap-2 rounded-xl bg-[#FF6633] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6633]/25 transition-all hover:bg-[#E05526] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Watch Animated Demo</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onScrollToExplore}
            className="flex items-center gap-2 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#3A3A3C] hover:border-white/20 active:scale-[0.98]"
          >
            <Smartphone className="h-4 w-4 text-[#FF6633]" />
            <span>Interact with Converted App</span>
          </button>
        </div>

        {/* Stats & Trust Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#3A3A3C]/60 pt-8 max-w-4xl mx-auto text-left">
          <div className="rounded-xl border border-[#3A3A3C]/40 bg-[#1C1C1E]/60 p-3.5">
            <span className="font-mono text-2xl font-black text-white">12</span>
            <p className="text-xs font-semibold text-[#FF6633]">Converted Modules</p>
            <p className="text-[11px] text-[#98989D]">Notes, Chem, Safety, JSA, Maps</p>
          </div>

          <div className="rounded-xl border border-[#3A3A3C]/40 bg-[#1C1C1E]/60 p-3.5">
            <span className="font-mono text-2xl font-black text-[#30D158]">100%</span>
            <p className="text-xs font-semibold text-[#30D158]">Offline Persistent</p>
            <p className="text-[11px] text-[#98989D]">Zero data loss in field dead zones</p>
          </div>

          <div className="rounded-xl border border-[#3A3A3C]/40 bg-[#1C1C1E]/60 p-3.5">
            <span className="font-mono text-2xl font-black text-[#0A84FF]">HTML5</span>
            <p className="text-xs font-semibold text-[#0A84FF]">Canvas Signatures</p>
            <p className="text-[11px] text-[#98989D]">Pre-trip & supervisor attestations</p>
          </div>

          <div className="rounded-xl border border-[#3A3A3C]/40 bg-[#1C1C1E]/60 p-3.5">
            <span className="font-mono text-2xl font-black text-[#FF9F0A]">Day/Wk</span>
            <p className="text-xs font-semibold text-[#FF9F0A]">Progress Analytics</p>
            <p className="text-[11px] text-[#98989D]">Automated cumulative totals</p>
          </div>
        </div>
      </div>
    </section>
  );
}
