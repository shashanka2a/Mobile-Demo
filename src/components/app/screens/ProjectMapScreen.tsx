'use client';

import React, { useState } from 'react';
import {
  Map as MapIcon,
  Layers,
  MapPin,
  Crosshair,
  Compass,
  Eye,
  Info,
  Maximize2,
  AlertTriangle,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { useAppContext } from '@/context/AppContext';
import { getAllObservations } from '@/lib/storage';
import { ObservationEntry } from '@/types';

export function ProjectMapScreen() {
  const { selectedProject } = useAppContext();
  const [mapType, setMapType] = useState<'satellite' | 'vector' | 'hybrid'>('satellite');
  const [showPins, setShowPins] = useState(true);
  const [showBoundary, setShowBoundary] = useState(true);
  const [selectedPin, setSelectedPin] = useState<ObservationEntry | null>(null);

  const observations = getAllObservations();

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Project Map & Boundary"
        subtitle={`${selectedProject.name}`}
      />

      <div className="relative flex flex-col gap-3 p-4">
        {/* Map Viewport Container */}
        <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-[#3A3A3C] bg-[#151517] shadow-xl">
          {/* Simulated Satellite & Terrain Grid Canvas */}
          <div
            className={`absolute inset-0 transition-opacity ${
              mapType === 'satellite'
                ? 'bg-gradient-to-br from-[#1E251E] via-[#2A3528] to-[#1B2319]'
                : 'bg-[#1C1C1E]'
            }`}
          >
            {/* Grid Lines simulating agricultural/solar farm rows */}
            <svg className="h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#555558" strokeWidth="0.5" />
                </pattern>
                <pattern id="solarArrays" width="80" height="40" patternUnits="userSpaceOnUse">
                  <rect x="5" y="5" width="70" height="12" fill="#1B3A4B" rx="1" stroke="#3A6B88" strokeWidth="0.5" />
                  <rect x="5" y="22" width="70" height="12" fill="#1B3A4B" rx="1" stroke="#3A6B88" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
              <rect x="40" y="40" width="320" height="280" fill="url(#solarArrays)" opacity="0.6" />

              {/* Boundary Polygon (KMZ perimeter) */}
              {showBoundary && (
                <polygon
                  points="35,35 375,45 365,330 25,310"
                  fill="#FF6633"
                  fillOpacity="0.08"
                  stroke="#FF6633"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
              )}

              {/* Substation Pad */}
              <rect x="50" y="50" width="40" height="30" fill="#FF9F0A" fillOpacity="0.3" stroke="#FF9F0A" strokeWidth="1.5" />
              <text x="54" y="68" fill="#FF9F0A" fontSize="9" fontWeight="bold">SUB 1</text>

              {/* Inverter alley lines */}
              <line x1="120" y1="35" x2="115" y2="315" stroke="#30D158" strokeWidth="1.5" opacity="0.8" />
              <line x1="200" y1="38" x2="195" y2="320" stroke="#30D158" strokeWidth="1.5" opacity="0.8" />
              <line x1="280" y1="40" x2="275" y2="325" stroke="#30D158" strokeWidth="1.5" opacity="0.8" />
            </svg>

            {/* Interactive Observation Pins */}
            {showPins && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPin({
                      id: 'pin-1',
                      title: 'Dense Johnson Grass Stand',
                      description: 'Array 4 northern rows entering bottom panel clearance.',
                      category: 'negative',
                      type: 'Invasive Vegetation',
                      status: 'Open',
                      progress: 'New Occurrence',
                      location: 'Inverter Alley 2',
                      descriptionTags: ['Dense', 'Tall'],
                      project: selectedProject.name,
                      timestamp: new Date().toISOString(),
                    })
                  }
                  className="group absolute left-[45%] top-[35%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute h-8 w-8 animate-ping rounded-full bg-[#FF453A] opacity-60" />
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF453A] text-white shadow-lg ring-2 ring-white">
                      <AlertTriangle className="h-3 w-3" />
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedPin({
                      id: 'pin-2',
                      title: 'Washout Trench Repaired',
                      description: 'Conduit ditch compacted with 2A stone. Safe for track loaders.',
                      category: 'positive',
                      type: 'Hazards on Site',
                      status: 'Resolved',
                      progress: 'Improved',
                      location: 'Inverter Pad #2 Road',
                      descriptionTags: ['Compacted'],
                      project: selectedProject.name,
                      timestamp: new Date().toISOString(),
                    })
                  }
                  className="group absolute left-[70%] top-[65%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#30D158] text-black shadow-lg ring-2 ring-white">
                      <MapPin className="h-3 w-3" />
                    </span>
                  </div>
                </button>
              </>
            )}

            {/* Current GPS Crosshair */}
            <div className="pointer-events-none absolute left-[55%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <span className="h-5 w-5 rounded-full border-2 border-[#0A84FF] bg-[#0A84FF]/20" />
              <span className="absolute h-1.5 w-1.5 rounded-full bg-[#0A84FF]" />
            </div>
          </div>

          {/* Map Overlay Controls */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5 rounded-xl bg-[#1C1C1E]/90 p-1.5 backdrop-blur-md border border-[#3A3A3C]">
            <button
              type="button"
              onClick={() => setMapType(mapType === 'satellite' ? 'vector' : 'satellite')}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium text-white hover:bg-[#2C2C2E]"
            >
              <Layers className="h-3 w-3 text-[#FF6633]" />
              <span className="capitalize">{mapType}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowBoundary(!showBoundary)}
              className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors ${
                showBoundary ? 'text-[#FF6633] bg-[#FF6633]/15' : 'text-[#98989D]'
              }`}
            >
              <span>KMZ Boundary</span>
            </button>
          </div>

          <div className="absolute right-3 top-3 flex flex-col items-end gap-1 font-mono text-[10px] text-white/90 bg-black/60 px-2 py-1 rounded-lg backdrop-blur-md">
            <span>{selectedProject.center?.[0] ?? 39.892}° N</span>
            <span>{selectedProject.center?.[1] ?? -76.162}° W</span>
          </div>

          {/* Scale & Compass Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[#98989D]">
            <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md backdrop-blur-md">
              <Compass className="h-3 w-3 text-[#FF6633]" />
              <span>North 0° • GPS RTK ±1.2m</span>
            </div>
            <div className="bg-black/60 px-2 py-1 rounded-md backdrop-blur-md font-mono">
              Scale 1:2,500
            </div>
          </div>
        </div>

        {/* Selected Pin Details Card */}
        {selectedPin && (
          <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    selectedPin.category === 'negative' ? 'text-[#FF453A]' : 'text-[#30D158]'
                  }`}
                >
                  {selectedPin.type}
                </span>
                <h4 className="font-semibold text-white">{selectedPin.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPin(null)}
                className="text-[#98989D] hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-[11px] text-[#98989D]">{selectedPin.description}</p>
            <p className="mt-1 text-[10px] text-[#64D2FF]">Location: {selectedPin.location}</p>
          </div>
        )}
      </div>
    </div>
  );
}
