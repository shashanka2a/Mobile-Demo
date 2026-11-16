'use client';

import React, { useState, useEffect } from 'react';
import {
  Camera,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import { getAttachments, saveAttachment } from '@/lib/storage';
import { createUuid } from '@/lib/utils';
import { AttachmentEntry } from '@/types';

export function AttachmentsScreen() {
  const { dateKey, selectedProject, triggerRefresh } = useAppContext();
  const [attachments, setAttachments] = useState<AttachmentEntry[]>([]);

  const sampleImages = [
    { name: 'inverter-block-4.jpg', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80', note: 'Array 4 panel angle check' },
    { name: 'weed-wiper-rig.jpg', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80', note: 'ASV wiper roller clearance test' },
    { name: 'chemical-storage.jpg', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80', note: 'Nurse tank secondary containment' },
    { name: 'johnson-grass-patch.jpg', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80', note: 'Pre-wicking infestation density' },
  ];

  const loadData = () => {
    const list = getAttachments(dateKey);
    setAttachments(list);
  };

  useEffect(() => {
    loadData();
  }, [dateKey]);

  const handleSimulateAddPhoto = () => {
    const nextSample = sampleImages[attachments.length % sampleImages.length];
    const newEntry: AttachmentEntry = {
      id: `att-${createUuid()}`,
      project: selectedProject.name,
      projectId: selectedProject.id,
      timestamp: new Date().toISOString(),
      fileNames: [nextSample.name],
      previews: [nextSample.url],
      notes: nextSample.note,
      syncStatus: 'synced',
    };

    saveAttachment(dateKey, newEntry);
    loadData();
    triggerRefresh();
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Field Photos & Evidence"
        subtitle="Timestamped & Geotagged Site Media"
        rightAction={
          <button
            type="button"
            onClick={handleSimulateAddPhoto}
            className="flex items-center gap-1 rounded-full bg-[#FF6633] px-2.5 py-1 text-xs font-semibold text-white shadow hover:bg-[#E05526]"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Snap Photo</span>
          </button>
        }
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Quick capture button */}
        <div
          onClick={handleSimulateAddPhoto}
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#3A3A3C] bg-[#242426] py-6 text-center text-[#98989D] transition-colors hover:border-[#FF6633] hover:text-white"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6633]/15 text-[#FF6633] mb-2">
            <Camera className="h-6 w-6" />
          </div>
          <span className="text-xs font-semibold text-white">Capture / Upload Photo</span>
          <p className="text-[10px] text-[#98989D] mt-0.5">High-resolution watermark applied automatically</p>
        </div>

        {/* Gallery Grid */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#98989D]">
            Recorded Photos ({attachments.length})
          </h3>

          {attachments.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] shadow"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={att.previews?.[0] || sampleImages[0].url}
                      alt={att.fileNames[0]}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1 py-0.5 text-[9px] font-mono text-white backdrop-blur-sm">
                      {new Date(att.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="p-2 text-xs">
                    <p className="truncate font-semibold text-white">{att.fileNames[0]}</p>
                    {att.notes && (
                      <p className="line-clamp-2 text-[10px] text-[#98989D] mt-0.5">
                        {att.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#3A3A3C] py-8 text-center text-[#98989D]">
              <ImageIcon className="h-6 w-6 mb-1 text-[#555558]" />
              <p className="text-xs">No photos attached for this report day</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
