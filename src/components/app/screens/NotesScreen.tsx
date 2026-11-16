'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Camera,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import { getNotes, saveNote, deleteNote } from '@/lib/storage';
import { createUuid, formatFriendlyDate } from '@/lib/utils';
import { NoteEntry, NoteCategory } from '@/types';

const CATEGORIES: NoteCategory[] = ['General', 'Safety', 'Equipment', 'Weather', 'Incident'];

const CATEGORY_COLORS: Record<NoteCategory, { bg: string; text: string; border: string }> = {
  General: { bg: 'bg-[#0A84FF]/15', text: 'text-[#0A84FF]', border: 'border-[#0A84FF]/30' },
  Safety: { bg: 'bg-[#30D158]/15', text: 'text-[#30D158]', border: 'border-[#30D158]/30' },
  Equipment: { bg: 'bg-[#FF9F0A]/15', text: 'text-[#FF9F0A]', border: 'border-[#FF9F0A]/30' },
  Weather: { bg: 'bg-[#64D2FF]/15', text: 'text-[#64D2FF]', border: 'border-[#64D2FF]/30' },
  Incident: { bg: 'bg-[#FF453A]/15', text: 'text-[#FF453A]', border: 'border-[#FF453A]/30' },
};

export function NotesScreen() {
  const { dateKey, selectedProject, triggerRefresh } = useAppContext();
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState<NoteCategory>('General');
  const [noteText, setNoteText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const loadNotes = () => {
    setNotes(getNotes(dateKey));
  };

  useEffect(() => {
    loadNotes();
  }, [dateKey]);

  const handleSimulatePhoto = () => {
    const samples = [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=300&auto=format&fit=crop&q=80',
    ];
    setPhotos((prev) => [...prev, samples[prev.length % samples.length]]);
  };

  const handleSave = () => {
    if (!noteText.trim()) return;

    const entry: NoteEntry = {
      id: `note-${createUuid()}`,
      project: selectedProject.name,
      projectId: selectedProject.id,
      timestamp: new Date().toISOString(),
      category,
      notes: noteText,
      photos,
      syncStatus: 'synced',
    };

    saveNote(dateKey, entry);
    loadNotes();
    triggerRefresh();
    setShowAddModal(false);
    setNoteText('');
    setPhotos([]);
  };

  const handleDelete = (id: string) => {
    deleteNote(dateKey, id);
    loadNotes();
    triggerRefresh();
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Field Notes"
        subtitle={`${formatFriendlyDate(dateKey)} • ${selectedProject.name}`}
        rightAction={
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 rounded-full bg-[#FF6633] px-2.5 py-1 text-xs font-semibold text-white shadow hover:bg-[#E05526]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Note</span>
          </button>
        }
      />

      <div className="flex flex-col gap-3 p-4">
        {notes.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {notes.map((note) => {
              const catTheme = CATEGORY_COLORS[note.category] || CATEGORY_COLORS.General;
              const timeString = new Date(note.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={note.id}
                  className="flex flex-col gap-2 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs shadow"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${catTheme.bg} ${catTheme.text} border ${catTheme.border}`}
                    >
                      {note.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#98989D]">{timeString}</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        className="rounded p-1 text-[#98989D] hover:text-[#FF453A]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-white leading-relaxed">{note.notes}</p>

                  {note.photos && note.photos.length > 0 && (
                    <div className="flex gap-1.5 overflow-x-auto pt-1">
                      {note.photos.map((p, i) => (
                        <div key={i} className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[#3A3A3C]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p} alt="Attached" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-[#3A3A3C]/40 pt-1.5 text-[10px] text-[#98989D]">
                    <span>{note.project}</span>
                    <SyncStatusBadge status={note.syncStatus} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#3A3A3C] py-12 text-center text-[#98989D]">
            <FileText className="h-8 w-8 mb-2 text-[#555558]" />
            <p className="text-xs font-medium text-white">No notes logged for this date</p>
            <p className="text-[11px] text-[#98989D] mt-0.5">Record weather, progress, or equipment remarks</p>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#FF6633] px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create First Note</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-md flex-col rounded-2xl border border-[#3A3A3C] bg-[#1C1C1E] p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3A3A3C] pb-3">
              <h3 className="text-sm font-semibold text-white">Add Field Note</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-3 text-xs">
              <div>
                <label className="text-[#98989D]">Category</label>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#FF6633] text-white shadow'
                            : 'bg-[#2C2C2E] text-[#98989D] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[#98989D]">Note Content</label>
                <textarea
                  rows={4}
                  placeholder="Record observations, work progress, ground conditions, or shift summary..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs text-white placeholder-[#555558] focus:border-[#FF6633] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[#98989D]">Photo Attachments</label>
                  <button
                    type="button"
                    onClick={handleSimulatePhoto}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#FF6633] hover:underline"
                  >
                    <Camera className="h-3 w-3" />
                    <span>Attach</span>
                  </button>
                </div>

                {photos.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto">
                    {photos.map((src, i) => (
                      <div key={i} className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[#3A3A3C]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="Attached" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={handleSimulatePhoto}
                    className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#3A3A3C] bg-[#242426] py-3 text-center text-[#98989D] hover:border-[#FF6633]"
                  >
                    <span className="text-[11px]">Tap to simulate camera photo</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#FF6633] py-2.5 font-semibold text-white shadow-lg hover:bg-[#E05526]"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Save Note</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
