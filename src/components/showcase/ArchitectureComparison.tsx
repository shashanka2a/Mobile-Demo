'use client';

import React from 'react';
import {
  Code2,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Database,
  Smartphone,
  Globe,
} from 'lucide-react';

const COMPARISON_ROWS = [
  {
    category: 'Framework & Engine',
    mobile: 'React Native 0.81.5 + Expo SDK 54',
    web: 'Next.js 15 App Router + React 19',
    advantage: 'Universal web access with zero app store install friction',
  },
  {
    category: 'Routing & Navigation',
    mobile: 'expo-router (app/(tabs), Stack)',
    web: 'Next.js App Router (app/*, file-based)',
    advantage: 'Deep-linking, SSR, and clean client-side transitions',
  },
  {
    category: 'Styling & Design Tokens',
    mobile: 'StyleSheet.create() + NativeWind',
    web: 'TailwindCSS + CSS Variables',
    advantage: 'Exact color tokens (#FF6633, #1C1C1E, #2C2C2E) with responsive utilities',
  },
  {
    category: 'Data Persistence',
    mobile: 'AsyncStorage (@react-native-async-storage)',
    web: 'localStorage with safe SSR fallback',
    advantage: 'Instant client-side offline persistence with zero latency',
  },
  {
    category: 'Digital Signatures',
    mobile: 'react-native-signature-canvas (WebView)',
    web: 'HTML5 Canvas API',
    advantage: 'Lightweight, hardware-accelerated signature pad without iframe overhead',
  },
  {
    category: 'Iconography',
    mobile: '@expo/vector-icons (Ionicons)',
    web: 'lucide-react',
    advantage: 'Crisp vector SVGs optimized for modern high-DPI displays',
  },
  {
    category: 'Field Media Capture',
    mobile: 'expo-image-picker / expo-camera',
    web: 'HTML5 File Input & simulated camera session',
    advantage: 'Cross-platform camera access and desktop file drag-and-drop',
  },
  {
    category: 'Daily Reports & Print',
    mobile: 'react-native-webview PDF injection',
    web: 'Printable HTML Document with @media print',
    advantage: 'Pixel-perfect native browser printing and instant PDF export',
  },
  {
    category: 'Project Boundary Map',
    mobile: 'react-native-webview with raw KMZ parser',
    web: 'Interactive SVG GIS boundary overlay',
    advantage: 'Interactive array polygon and clickable observation pins',
  },
];

export function ArchitectureComparison() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto border-t border-[#3A3A3C]/60">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0A84FF]">
          Technical Feature Mapping
        </span>
        <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">
          React Native to Next.js Conversion Architecture
        </h2>
        <p className="mt-2 text-sm text-[#98989D] max-w-2xl mx-auto">
          How mobile primitives, offline storage, native APIs, and business logic were mapped into modern Next.js App Router architecture.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#3A3A3C] bg-[#242426] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#3A3A3C] bg-[#1C1C1E] text-white">
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px] text-[#98989D]">
                  System Layer
                </th>
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px] text-[#FF6633]">
                  React Native / Expo
                </th>
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px] text-[#30D158]">
                  Next.js Web Implementation
                </th>
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px] text-gray-300">
                  Architectural Benefit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3A3C]/50 text-[#E5E5EA]">
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-[#2C2C2E]/60"
                >
                  <td className="py-3 px-4 font-semibold text-white">
                    {row.category}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#FF855D]">
                    {row.mobile}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#30D158]">
                    {row.web}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[#98989D]">
                    {row.advantage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
