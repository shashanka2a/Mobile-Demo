'use client';

import React from 'react';
import {
  Calendar,
  FlaskConical,
  Wrench,
  ShieldCheck,
  Eye,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Wifi,
  Sparkles,
  MapPin,
  PenTool,
} from 'lucide-react';

const FEATURES = [
  {
    id: 'calendar-hub',
    title: 'Daily Hub & Calendar Compliance',
    badge: 'Core Navigation',
    icon: Calendar,
    color: '#FF6633',
    description:
      'Seamless weekday date strip and month calendar modal with compliance dots: Green (signed report), Yellow (data logged), and Red (missing weekday).',
    bullets: [
      'Horizontal scrollable 14-day strip',
      'Multi-project switching with site metadata',
      'At-a-glance compliance status banner',
    ],
  },
  {
    id: 'chemical-guard',
    title: 'Chemical & Herbicide Safety Guardrails',
    badge: 'Dosage Safety',
    icon: FlaskConical,
    color: '#FF9F0A',
    description:
      'Independent logging for Wicking Rigs vs Spraying Tanks with instant dosage alerts when concentrated herbicides exceed recommended safety thresholds.',
    bullets: [
      'Automated high quantity warning (>100 GAL Glyphosate)',
      'Tank mix ratio alert (>128 oz Surfactant)',
      'Custom chemical additions with unit selectors (GAL, oz, L)',
    ],
  },
  {
    id: 'equipment-check',
    title: 'Equipment Pre-Trip & Canvas Signatures',
    badge: 'OSHA & Fleet Compliance',
    icon: Wrench,
    color: '#0A84FF',
    description:
      'Detailed pre-trip safety checklist for track loaders and spray rigs featuring fluid level toggles (Motor Oil, Coolant, Hydraulic Oil) and smooth digital canvas signatures.',
    bullets: [
      'Pre-trip mechanical condition (Hoses, Belts, Attachments)',
      'Smooth HTML5 Canvas signature pad with touch & mouse support',
      'Timestamped operator accountability',
    ],
  },
  {
    id: 'safety-jsa',
    title: 'Job Safety Analysis & Toolbox Briefs',
    badge: 'Tailgate Briefings',
    icon: ShieldCheck,
    color: '#30D158',
    description:
      'Structured JSA forms detailing task hazards, risk levels, and controls, paired with instant 24/7 emergency hospital routing and OSHA toolbox talks.',
    bullets: [
      'Emergency medical route with miles and ETA minutes',
      'Interactive crew attendance roster with sign-offs',
      'Built-in toolbox talk templates (AED, Slips/Trips, PPE)',
    ],
  },
  {
    id: 'hazard-observations',
    title: 'Geotagged Observations & GIS Map',
    badge: 'Field Intelligence',
    icon: Eye,
    color: '#BF5AF2',
    description:
      'Record site observations for invasive vegetation and ground hazards with density tags, GPS RTK coordinates, and interactive project boundary overlays.',
    bullets: [
      'GPS coordinate lock (±3.5m accuracy)',
      'Scale & Density tags (Dense, Widespread, Thick, Tall)',
      'Interactive satellite map with observation pin popups',
    ],
  },
  {
    id: 'cumulative-reports',
    title: 'Progress Tables & Printable Reports',
    badge: 'Automated Aggregation',
    icon: BarChart3,
    color: '#64D2FF',
    description:
      'Instantly aggregates Day Total, Week Total, and Project To-Date cumulative acreage and water volumes into a clean printable report ready for client billing.',
    bullets: [
      'Automated Day/Week/To-Date cumulative progress tables',
      'Supervisor digital attestation with legal timestamp',
      'One-click browser print and PDF export ready',
    ],
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6633]">
          Complete Mobile Capabilities
        </span>
        <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">
          Engineered for Heavy Field Operations
        </h2>
        <p className="mt-2 text-sm text-[#98989D] max-w-2xl mx-auto">
          Every screen, workflow, and business validation from the original mobile app has been preserved and elevated into responsive web components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="flex flex-col justify-between rounded-2xl border border-[#3A3A3C] bg-[#242426] p-5 shadow-lg transition-all hover:border-[#FF6633]/60 hover:bg-[#28282B] group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${feat.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: feat.color }} />
                  </div>
                  <span className="rounded-full bg-[#1C1C1E] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#98989D] border border-[#3A3A3C]">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#FF6633] transition-colors">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs text-[#98989D] leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-5 border-t border-[#3A3A3C]/60 pt-4">
                <ul className="flex flex-col gap-1.5 text-xs text-[#E5E5EA]">
                  {feat.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#30D158] mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
