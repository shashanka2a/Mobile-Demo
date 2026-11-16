'use client';

import React, { useState, useEffect } from 'react';
import {
  Eye,
  Plus,
  MapPin,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  X,
  Compass,
  Sparkles,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import { getAllObservations, saveObservation } from '@/lib/storage';
import { createUuid } from '@/lib/utils';
import {
  ObservationEntry,
  ObservationType,
  ObservationCategory,
  ObservationProgress,
} from '@/types';

const TAG_GROUPS = [
  { title: 'Scale & Density', tags: ['Dense', 'Widespread', 'Patchy', 'Localized'] },
  { title: 'Physical Traits', tags: ['Tall', 'Thick', 'Deep Rut', 'Loose Cable'] },
  { title: 'Threat & Access', tags: ['Impeding Operations', 'Near Inverter', 'Concealed'] },
];

export function ObservationsScreen() {
  const { dateKey, selectedProject, triggerRefresh } = useAppContext();
  const [observations, setObservations] = useState<ObservationEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Form state
  const [category, setCategory] = useState<ObservationCategory>('negative');
  const [type, setType] = useState<ObservationType>('Invasive Vegetation');
  const [progress, setProgress] = useState<ObservationProgress>('New Occurrence');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [gpsLat, setGpsLat] = useState<number | null>(39.8934);
  const [gpsLng, setGpsLng] = useState<number | null>(-76.1608);
  const [photos, setPhotos] = useState<string[]>([]);

  const loadData = () => {
    setObservations(getAllObservations());
  };

  useEffect(() => {
    loadData();
  }, [dateKey]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCaptureGps = () => {
    // Simulate real GPS lock
    const lat = 39.8900 + Math.random() * 0.005;
    const lng = -76.1600 - Math.random() * 0.005;
    setGpsLat(parseFloat(lat.toFixed(6)));
    setGpsLng(parseFloat(lng.toFixed(6)));
  };

  const handleSimulatePhoto = () => {
    const samples = [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=300&auto=format&fit=crop&q=80',
    ];
    setPhotos((prev) => [...prev, samples[prev.length % samples.length]]);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const entry: ObservationEntry = {
      id: `obs-${createUuid()}`,
      project: selectedProject.name,
      projectId: selectedProject.id,
      timestamp: new Date().toISOString(),
      type,
      category,
      status: 'Open',
      progress,
      title,
      description,
      descriptionTags: selectedTags,
      location: location || 'Array Section 4',
      gpsLat: gpsLat || undefined,
      gpsLng: gpsLng || undefined,
      gpsAccuracyM: 3.5,
      photos,
      syncStatus: 'synced',
    };

    saveObservation(dateKey, entry);
    loadData();
    triggerRefresh();
    setShowAddModal(false);

    // Reset
    setTitle('');
    setDescription('');
    setSelectedTags([]);
    setPhotos([]);
  };

  const filtered = observations.filter((obs) => {
    if (filterType !== 'All' && obs.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        obs.title.toLowerCase().includes(q) ||
        obs.description.toLowerCase().includes(q) ||
        obs.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Site Observations"
        subtitle="Geotagged Field Hazards & Flora"
        rightAction={
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 rounded-full bg-[#FF6633] px-2.5 py-1 text-xs font-semibold text-white shadow hover:bg-[#E05526]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New</span>
          </button>
        }
      />

      <div className="flex flex-col gap-3 p-4">
        {/* Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#98989D]" />
            <input
              type="text"
              placeholder="Search observations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] py-2 pl-9 pr-3 text-xs text-white placeholder-[#555558] focus:border-[#FF6633] focus:outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] px-2.5 py-2 text-xs text-white focus:border-[#FF6633] focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Invasive Vegetation">Invasive</option>
            <option value="Hazards on Site">Hazards</option>
          </select>
        </div>

        {/* Observation Cards */}
        <div className="flex flex-col gap-2.5">
          {filtered.map((obs) => {
            const isNegative = obs.category === 'negative';
            return (
              <div
                key={obs.id}
                className="flex flex-col gap-2 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isNegative ? 'bg-[#FF453A]' : 'bg-[#30D158]'
                      }`}
                    />
                    <span className="font-semibold text-white">{obs.title}</span>
                  </div>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                      obs.status === 'Open'
                        ? 'bg-[#FF453A]/20 text-[#FF453A]'
                        : 'bg-[#30D158]/20 text-[#30D158]'
                    }`}
                  >
                    {obs.status}
                  </span>
                </div>

                <p className="text-[11px] text-[#98989D] leading-relaxed">
                  {obs.description}
                </p>

                {obs.descriptionTags && obs.descriptionTags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {obs.descriptionTags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-[#1C1C1E] px-1.5 py-0.5 text-[10px] text-[#98989D]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-[#3A3A3C]/50 pt-2 text-[10px] text-[#98989D]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#FF6633]" />
                    {obs.location}
                  </span>
                  {obs.gpsLat && obs.gpsLng && (
                    <span className="font-mono text-[#64D2FF]">
                      {obs.gpsLat.toFixed(4)}, {obs.gpsLng.toFixed(4)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Observation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl border border-[#3A3A3C] bg-[#1C1C1E] p-4 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#3A3A3C] pb-3">
              <h3 className="text-sm font-semibold text-white">Record Site Observation</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-3 text-xs">
              {/* Category selector (Positive vs Negative) */}
              <div>
                <label className="text-[#98989D]">Category</label>
                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('negative')}
                    className={`flex-1 rounded-lg py-2 font-semibold transition-all ${
                      category === 'negative'
                        ? 'bg-[#FF453A] text-white shadow'
                        : 'bg-[#2C2C2E] text-[#98989D]'
                    }`}
                  >
                    Negative / Hazard
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('positive')}
                    className={`flex-1 rounded-lg py-2 font-semibold transition-all ${
                      category === 'positive'
                        ? 'bg-[#30D158] text-black shadow'
                        : 'bg-[#2C2C2E] text-[#98989D]'
                    }`}
                  >
                    Positive / Safe
                  </button>
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="text-[#98989D]">Observation Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ObservationType)}
                  className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
                >
                  <option value="Invasive Vegetation">Invasive Vegetation</option>
                  <option value="Hazards on Site">Hazards on Site</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="text-[#98989D]">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Dense Johnson grass near inverter block 4"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[#98989D]">Detailed Notes</label>
                <textarea
                  rows={2}
                  placeholder="Condition notes, height, density, panel clearance..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-2 text-white focus:border-[#FF6633] focus:outline-none"
                />
              </div>

              {/* Quick Tags */}
              <div>
                <label className="text-[#98989D]">Condition Tags</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {TAG_GROUPS.flatMap((g) => g.tags).map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#FF6633] text-white'
                            : 'bg-[#2C2C2E] text-[#98989D] hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GPS Capture */}
              <div className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Compass className="h-4 w-4 text-[#64D2FF]" />
                    <span>Geotag Coordinates</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCaptureGps}
                    className="rounded bg-[#64D2FF]/15 px-2 py-0.5 text-[11px] font-semibold text-[#64D2FF] hover:bg-[#64D2FF]/25"
                  >
                    Lock GPS
                  </button>
                </div>
                <div className="mt-2 font-mono text-[11px] text-[#98989D]">
                  Lat: {gpsLat?.toFixed(6) ?? '—'}, Lng: {gpsLng?.toFixed(6) ?? '—'} (±3.5m accuracy)
                </div>
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSave}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#FF6633] py-2.5 font-semibold text-white shadow-lg hover:bg-[#E05526]"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Save Observation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
